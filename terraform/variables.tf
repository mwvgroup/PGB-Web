variable "project_id" {
  type        = string
  description = "GCP project ID"
}

variable "region" {
  type        = string
  description = "Deployment region"
}

variable "service_name" {
  type        = string
  description = "Cloud Run service name"
}

variable "proxy_version" {
  type        = string
  description = "Nginx proxy version to deploy"
}

variable "api_version" {
  type        = string
  description = "Auto-REST application version to deploy"
}
