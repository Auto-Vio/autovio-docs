---
title: Error Codes
description: Reference for the standard Error object returned by the AutoVio API.
---

# Error Codes

The AutoVio API returns a consistent **Error** object in JSON for error responses. This page summarizes the error schema and where it is used.

## Error schema

Defined in the OpenAPI document (`components.schemas.Error`):

```json
{
  "error": "Resource not found",
  "details": "The requested project does not exist"
}
```

| Field | Type | Description |
|-------|------|-------------|
| error | string | Short error message (e.g. `"Resource not found"`, `"Invalid credentials"`). |
| details | string | Optional additional details about the error. |

All error responses that reference `#/components/schemas/Error` use this structure.

## Typical HTTP statuses

From the OpenAPI document and architecture:

| Status | Meaning | Example causes |
|--------|---------|----------------|
| 400 | Bad Request | Invalid body, ID mismatch, missing required header. |
| 401 | Unauthorized | Missing or invalid JWT/API token. |
| 404 | Not Found | Project, work, template, asset, or scene not found. |
| 409 | Conflict | Email already exists on register. |

Each endpoint documents which status codes it can return and when it uses the `Error` schema.

## Examples

- **Invalid credentials (login):**

  - Status: `401`
  - Body:

  ```json
  {
    "error": "Invalid credentials",
    "details": "Email or password is incorrect"
  }
  ```

- **Project not found:**

  - Status: `404`
  - Body:

  ```json
  {
    "error": "Resource not found",
    "details": "The requested project does not exist"
  }
  ```

## Handling errors

- Check the HTTP status code to differentiate auth errors, validation errors, and missing resources.
- Use the `error` field for user-facing messages.
- Use the `details` field for logs or debugging.

## See also

- [API Overview](/api/overview/)
- [Authentication](/api/authentication/)
- [Projects API](/api/projects/), [Works API](/api/works/)

