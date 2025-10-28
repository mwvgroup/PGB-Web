provider "google" {
  project = var.project_id
}

locals {
  api_image_full = "${var.region}-docker.pkg.dev/${var.project_id}/web-artifacts/auto-rest:${var.api_version}"
  proxy_image_full = "${var.region}-docker.pkg.dev/${var.project_id}/web-artifacts/nginx:${var.proxy_version}"
}

resource "google_artifact_registry_repository" "web-artifacts" {
  location      = var.region
  repository_id = "web-artifacts"
  format        = "docker"
  description   = "Docker artifact registry for hosting images used by the broker website"

  cleanup_policies {
    id          = "keep-recent"
    action      = "KEEP"
    most_recent_versions {
      keep_count = 5
    }
  }
}

resource "google_cloud_run_v2_service" "default" {
  name        = var.service_name
  location    = var.region
  client      = "terraform"
  description = "Cloud Run service encapsulating the full application container stack"

  template {
    containers {
      name        = "pgb-web-api"
      image       = local.api_image_full
      depends_on  = ["pgb-web-proxy"]
      ports {
        container_port = 8081
      }
    }

    containers {
      name        = "pgb-web-proxy"
      image       = local.proxy_image_full
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
