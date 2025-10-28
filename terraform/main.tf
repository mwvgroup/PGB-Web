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

resource "google_artifact_registry_repository" "web_registry" {
  location      = var.region
  repository_id = "web-artifacts"
  format        = "docker"
  description   = "Docker artifact registry for hosting images used by the broker website"

  cleanup_policies {
    id     = "keep-recent"
    action = "KEEP"
    most_recent_versions {
      keep_count = 5
    }
  }
}

# Mirror images to Artifact Registry
resource "null_resource" "mirror_images" {
  depends_on = [google_artifact_registry_repository.web_registry]
  provisioner "local-exec" {
    command     = <<EOT
      set -euo pipefail

      # Authenticate Docker to Artifact Registry
      gcloud auth configure-docker ${var.region}-docker.pkg.dev

      # Pull public images
      echo "Pulling remote images..."
      docker pull ${local.api_image_public}
      echo "Pulling nginx..."
      docker pull ${local.proxy_image_public}

      # Tag for Artifact Registry
      echo "Assigning new image tags..."
      docker tag ${local.api_image_public} ${local.api_image_artifact}
      docker tag ${local.proxy_image_public} ${local.proxy_image_artifact}

      echo "Pushing images to artifact registry..."
      # Push to Artifact Registry
      docker push ${local.api_image_artifact}
      docker push ${local.proxy_image_artifact}
    EOT
    interpreter = ["/bin/bash", "-c"]
  }
}

resource "google_cloud_run_v2_service" "default" {
  name                = var.service_name
  depends_on          = [null_resource.mirror_images]
  location            = var.region
  deletion_protection = false
  client              = "terraform"
  description         = "Cloud Run service encapsulating the full application container stack"

  template {
    containers {
      name       = "pgb-web-api"
      image      = local.api_image_artifact
      depends_on = ["pgb-web-proxy"]
      ports {
        container_port = 8081
      }
    }

    containers {
      name  = "pgb-web-proxy"
      image = local.proxy_image_artifact
      startup_probe {
        http_get {
          path = "/"
          port = 80
        }
        initial_delay_seconds = 5
        period_seconds        = 5
        failure_threshold     = 10
      }
    }
  }
}

resource "google_cloud_run_v2_service_iam_member" "noauth" {
  location = google_cloud_run_v2_service.default.location
  name     = google_cloud_run_v2_service.default.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
