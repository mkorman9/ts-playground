## Start

- `cp .env.template .env`
- `npm ci`
- `npm start`

## Run Postman tests

- `npm install -g newman`
- `newman run postman/postman_collection.json`

## Firebase integration

- `GOOGLE_APPLICATION_CREDENTIALS` needs to be provided in order for integration to work. GOOGLE_APPLICATION_CREDENTIALS points to a file that stores service account configuration and can be generated [here](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk). On Google Cloud this is configured by default
- To start in emulator mode set `FIRESTORE_EMULATOR_HOST`, `FIREBASE_AUTH_EMULATOR_HOST` and `GCLOUD_PROJECT` variables in place of `GOOGLE_APPLICATION_CREDENTIALS`. Emulator can be started with:

```sh
firebase emulators:start
```
