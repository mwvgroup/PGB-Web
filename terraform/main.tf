provider "google" {
  project = var.project_id
}

resource "google_artifact_registry_repository" "web-artifacts" {
  location      = var.region
  repository_id = "web-artifacts"
  description   = "Container registry for images used by the broker website."
  format        = "docker"
  cleanup_policies {
    id     = "keep-recent"
    action = "KEEP"
    most_recent_versions {
      keep_count = 5
    }
  }
}


resource "google_cloud_run_v2_service" "default" {
  name     = var.service_name
  location = var.region
  client   = "terraform"

  template {
    containers {
      name       = "pgb-web-api"
      image      = var.api_image
      depends_on = ["pgb-web-proxy"]
      ports {
        container_port = 8081
      }
    }
    containers {
      name  = "pgb-web-proxy"
      image = var.proxy_image
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
