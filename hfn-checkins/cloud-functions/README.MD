# Important Firebase Commands

```sh
firebase login
firebase projects:list
firebase init emulators # select emulators : for ex. functions and firestore
firebase emulators:start # start the emulators
```

# The update aggregate method does two things:

1. Updates the `aggregations > checkins` document.
1. If the `CheckinsAggregateData["dataAppendedForPreviousCheckins"]` is not `truthy`, bulk-values are updated to Google Sheets.

# Next version...

S - Strategy
P - Product
E - Engineering
E - Experience
D - Data

# Deploying the Firebase Cloud Functions

Reference : https://rushjs.io/pages/maintainer/deploying/

- Delete `/common/config/rush/deploy.json` file

```sh
rushx prepare:deploy # from the cloud-functions project
```

```sh
# Create common/config/rush/deploy.json and configure it to deploy "@hfn-checkins/cloud-functions"
rush init-deploy --project @hfn-checkins/cloud-functions

rush deploy
```

Next Steps:

- open `common/deploy/hfn-checkins/cloud-functions` in the terminal.
- change the version of dependencies from `workspace:*`
  to actual version - for ex `@hfn-checkins/types: "2.0.0"` in the package.json
- run `yarn install` to update the `yarn.lock` file
- run `yarn deploy:dev` to deploy dev or `yarn deploy:prod` to deploy prod
