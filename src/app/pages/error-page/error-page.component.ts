import { Component, OnInit } from "@angular/core";

/**
 * A generic error page for presenting the user with an error code and status
 * message. The error code (`errorCode`) and error message (`errorDescription`)
 * are determined from the router state. If not provided, the error code
 * defaults 404 and the message is determined dynamically based on the
 * error code.
 */
@Component({
  selector: "app-error-page",
  templateUrl: "error-page.component.html",
  styleUrl: "error-page.component.scss"
})
export class ErrorPageComponent implements OnInit {
  protected errorCode!: number;
  protected errorDescription!: string;

  /** Define error descriptions for common error codes. */
  private defaultDescription: string = "An unexpected error occurred.";
  private errorCodeDescriptions: { [code: number]: string } = {
    400: "The server received a bad request.",
    401: "You need to log in to access this page.",
    403: "You don't have permission to view this page.",
    404: "We couldn't find the page you're looking for.",
    405: "The request method is not allowed for the requested resource.",
    408: "The server timed out while handling your request.",
    418: "Tea kettle services are temporarily offline.",
    429: "Too many requests have been made in a given amount of time.",
    500: "Something went wrong on our end. Please try again later.",
    503: "The service is currently unavailable. Please check back soon.",
    504: "The server timed out while waiting for an upstream resource."
  };

  /** Initialize the error code and description values from the router state. */
  ngOnInit(): void {
    const navigation = history.state as { errorCode?: number, errorDescription?: string };
    this.errorCode = navigation?.errorCode || 404;
    this.errorDescription = navigation?.errorDescription
      ?? this.errorCodeDescriptions[this.errorCode]
      ?? this.defaultDescription;
  }
}
