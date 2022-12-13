# Doctolib Monitor

## Prerequisites

1. Create a free account at [https://twilio.com](https://twilio.com) and request a phone number.
2. Create a .env file in the root directory with the following content and replace the empty strings with your own:

    ```env
    TWILIO_ACCOUNT_SID=""
    TWILIO_AUTH_TOKEN=""
    TWILIO_PHONE_NUMBER=""
    SMS_RECIPIENT=""
    ```

## Installation

```bash
npm install
npm run build
```

## Usage

```bash
npm start -- --id [DOCTOLIB_ID]
```

## Options

| Option | Description | Default |
| --- | --- | --- |
| `--id` | The id of the doctor. | |
| `--timeout` | The timeout in seconds. | 30 |

### How to get the doctor id

Visit the doctor's page on Doctolib web site and copy the id from the url. For example, if the url is `https://www.doctolib.fr/medecin-generaliste/paris/jean-michel` the id is `jean-michel`.
