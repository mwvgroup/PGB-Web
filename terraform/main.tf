provider "google" {
  project = var.project_id
}

locals {
  # Public container images
  api_image_public   = "ghcr.io/better-hpc/auto-rest:${var.api_version}"
  proxy_image_public = "docker.io/nginx:${var.proxy_version}"

  # Artifact Registry image URLs
  api_image_artifact   = "${var.region}-docker.pkg.dev/${var.project_id}/web-artifacts/auto-rest:${var.api_version}"
  proxy_image_artifact = "${var.region}-docker.pkg.dev/${var.project_id}/web-artifacts/nginx:${var.proxy_version}"
}

# Create an Artifact Registry repository for storing Docker images
resource "google_artifact_registry_repository" "web_registry" {
  location      = var.region
  repository_id = "web-artifacts"
  format        = "docker"
  description   = "Docker artifact repository for hosting images used by the broker website"

  cleanup_policies {
    id     = "keep-recent"
    action = "KEEP"
    most_recent_versions {
      keep_count = 5
    }
  }
}

# Mirror public images to Artifact Registry for consistent availability and reduced external dependencies
# This ensures images are pulled from GCP-managed storage rather than external registries
resource "null_resource" "mirror_images" {
  depends_on = [google_artifact_registry_repository.web_registry]
  provisioner "local-exec" {
    command     = <<EOT
      set -euo pipefail

      # Authenticate Docker to Artifact Registry
      gcloud auth configure-docker ${var.region}-docker.pkg.dev

      # Pull public images as amd64
      echo "Pulling remote images..."
      docker pull --platform=linux/amd64 ${local.api_image_public}
      docker pull --platform=linux/amd64 ${local.proxy_image_public}

      # Tag for Artifact Registry
      echo "Assigning new image tags..."
      docker tag ${local.api_image_public} ${local.api_image_artifact}
      docker tag ${local.proxy_image_public} ${local.proxy_image_artifact}

      echo "Pushing images to artifact registry..."
      docker push ${local.api_image_artifact}
      docker push ${local.proxy_image_artifact}
    EOT
    interpreter = ["/bin/bash", "-c"]
  }
}

# Deploy a multi-container Cloud Run service with proxy and API containers
resource "google_cloud_run_v2_service" "default" {
  name                = var.service_name
  depends_on          = [null_resource.mirror_images]
  location            = var.region
  deletion_protection = false
  client              = "terraform"
  description         = "Cloud Run service encapsulating the full application container stack"

  template {
    # Nginx proxy container handling external traffic
    containers {
      name  = "proxy"
      image = local.proxy_image_artifact
      ports {
        container_port = 80
      }
    }

    # API container running the REST API
    containers {
      name  = "api"
      image = local.api_image_artifact
      args = [
        "--sqlite",
        "--db-name",
        "temp",
      ]
    }
  }
}

# Allow unauthenticated public access to the Cloud Run service
resource "google_cloud_run_v2_service_iam_member" "noauth" {
  location = google_cloud_run_v2_service.default.location
  name     = google_cloud_run_v2_service.default.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
