# Editing Google Sheet With Service Account

- Visit [Google Cloud Console][google-cloud-console]
- Create a new project or select an existing project to enable the Google Sheets API.
- Create a `Service Account` with `Owner` access.
- Create a `KEY` for the newly added `Service Account`. This key would be automatically downloaded which we'll use to authenticate the `Robot User`.
- Visit `APIs and Services > Library` and _ENABLE_ the `Google Sheets API` to interact with a `Google Sheet`.
- Create a `Google Sheet` in your user account and click on `Share`. Share it with the `Robot User` - the email would be something like `service-accountu3928492@appsparkler-sheet-editor.iam.gserviceaccount.com` with `Editor` access.

> Service Account is a fancy name for a `Robot User`.

[google-cloud-console]: https://console.cloud.google.com

Now you can read, write, append cell values for any spreadsheet to which the Robot User has access to.
