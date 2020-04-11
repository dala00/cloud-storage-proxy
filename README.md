# Cloud Storage Proxy

Proxy Google Cloud Storage files On Now (by Zeit).

## Development

The way to develop on local.

### Install dependencies

```
yarn
```

### Use GCP integration

https://zeit.co/integrations/gcloud

### Create now.json

You can copy from now.example.json.

### Set environment variables

Set environment variables by .env. You can copy .env.example.

Set GCLOUD_CREDENTIALS to base64 encoded json credential of GCP service account.

(Like `cat your.json | base64`)

### Start server

Start server.

```
yarn start
```

Then, you can access URL like this. Path for URL (like `images/image.jpg`) is a public URL for your Cloud Storage files in specified bucket.

```
http://localhost:3000/images/image.jpg
```

## Deployment

Deploy application to now by command `now`.

### Set project name

Change project name in now.json keyed by `name`.

### Environment variables

Set Environment variables by secret. See `env` value in now.json.

```
now secret add gcp-project-id aaaa-2432234
```

### Change json key file name

Change json path in `files` in now.json.

### Deploy

```
now
```

## Contribution

Feel free to create issue or PR.
