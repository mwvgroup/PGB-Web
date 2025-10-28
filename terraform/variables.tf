variable "project_id" {
  type        = string
  description = "GCP project ID"
}

variable "service_name" {
  type        = string
  description = "Cloud Run service name"
}

variable "region" {
  type        = string
  description = "Deployment region"
}

variable "api_version" {
  type        = string
  description = "Auto-REST application version to deploy"
}

variable "proxy_version" {
  type        = string
  description = "Nginx proxy version to deploy"
}
