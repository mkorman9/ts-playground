## Start

- `cp .env.template .env`
- `npm ci`
- `npm start`

## Run Postman tests

- `npm install -g newman`
- `newman run postman/postman_collection.json`

## Firebase integration

- Both `GCLOUD_PROJECT` and `GOOGLE_APPLICATION_CREDENTIALS` need to be provided in order for integration to work.
GOOGLE_APPLICATION_CREDENTIALS points to a file that stores service account configuration and can be generated [here](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk)
- `FIRESTORE_EMULATOR_HOST` can be provided in place of `GOOGLE_APPLICATION_CREDENTIALS`. The app will use emulator in place of real Firestore
