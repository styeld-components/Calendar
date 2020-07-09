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


### Create listing
  * POST `/api/:placeID`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "id": "Number",
      "nightly_fee": "Number",
      "cleaning_fee": "Number",
      "occupancy_tax_rate": "Number",
      "avg_rating": "Number",
      "reviews": "Number",
      "city": "String",
      "max_capacity": "Number",
      "bookings": [{
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

### Read listing info
  * GET `/api/:placeID`

**Path Parameters:**
  * `placeID` listing id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "id": "Number",
      "nightly_fee": "Number",
      "cleaning_fee": "Number",
      "occupancy_tax_rate": "Number",
      "avg_rating": "Number",
      "reviews": "Number",
      "city": "String",
      "max_capacity": "Number",
      "bookings": [{
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

### Update listing info
  * PATCH `/api/:placeID`

**Path Parameters:**
  * `placeID` listing id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
     "bookings": [{
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

### Delete listing
  * DELETE `/api/:placeID`

**Path Parameters:**
  * `placeID` listing id

**Success Status Code:** `204`
