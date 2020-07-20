# Project Name

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## Server Endpoints and API routes


### Create reservation for a listing
  * POST `/api/:listing_id/bookings`

**Success Status Code:** `201`

**Error Status Code:** `404: listing not found`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "id": "Number",
      "checkin": "Date",
      "checkout": "Date",
      "guests": {
        "adults": "Number",
        "children": "Number",
        "infants": "Number"
      }
    }
```

### Read all reservations for a specific listing
  * GET `/api/:listing_id/bookings`

**Path Parameters:**
  * `listing_id`

**Success Status Code:** `200`

**Erorr Status Code:** `404: listing not found`

**Returns:** JSON

```json
    {
      "id": "Number",
      "bookings": [{
        "id": "Number",
        "checkin": "Date",
        "checkout": "Date",
        "guests": {
          "adults": "Number",
          "children": "Number",
          "infants": "Number"
        }
      },
      {
        "id": "Number",
        "checkin": "Date",
        "checkout": "Date",
        "guests": {
          "adults": "Number",
          "children": "Number",
          "infants": "Number"
        }
      },
      {
        "id": "Number",
        "checkin": "Date",
        "checkout": "Date",
        "guests": {
          "adults": "Number",
          "children": "Number",
          "infants": "Number"
        }
      }]
    }
```

### Update reservation info for a specific reservation for a listing
  * PATCH `/api/:listing_id/bookings/:booking_id`

**Path Parameters:**
  * `listing_id`
  * `booking_id`

**Success Status Code:** `204`

**Error Status Code:** `404: booking not found`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "id": "Number",
      "checkin": "Date",
      "checkout": "Date",
      "guests": {
        "adults": "Number",
        "children": "Number",
        "infants": "Number"
      }
    }
```

### Delete a reservation for a specific listing
  * DELETE `/api/:listing_id/booking/:booking_id`

**Path Parameters:**
  * `listing_id`
  * `booking_id`

**Success Status Code:** `204`

**Error Status Code:** `404: booking not found`
