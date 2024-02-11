# rss-notification-service-v2

## Motivation
The general motivation is to receive notifications for an RSS channel feed that I'm following. After encountering the account limit on a popular app called [Zapier](https://zapier.com/), I did some calculations and realized that, for my personal use, running a simple EC2 instance on AWS on the free tier is cost-free, whereas using Zapier would cost $20 [Zapier starter plan](https://zapier.com/pricing?utm_source=google&utm_medium=cpc&utm_campaign=gaw-gbl-nua-search-brand-remarketing&utm_adgroup=brand_plans&utm_term=zapier%20plans&utm_content=1007850&gad_source=1&gclid=CjwKCAiA2pyuBhBKEiwApLaIO5Glo4ea9FOqi7AWCdIH_IcMMSAwuSEEwR1AyXfkuK7aCWL_p-8oIhoClv0QAvD_BwE)

I'm making this repository public for general overview and/or usage.

## Configuration

### Google API

For data store google sheets API is used as easy to access and modify from any device source.

[Google Api access credentials](https://developers.google.com/workspace/guides/create-credentials) needs to be granted and
saved in root directory under any name.

### Discord

As notification provider discord bot is sending DMs to personal account.
[Discord Application](https://discord.com/developers/applications) needs to be created and invited to any server.

Configuration part TBD.

## Installation

Install dependencies:

```
$ npm ci
```

### Environments

```$ cp .env.example .env```

GOOGLE_SHEET_ID is taken from google sheet url: docs.google.com/spreadsheets/d/<GOOGLE_SHEET_ID>/edit#gid=0

GOOGLE_SHEET_TAB_NAME is name of tab

GOOGLE_API_CREDENTIALS_FILE is previously saved json file with credentials. Do not provide extension it is json by default.

DISCORD_NOTIFICATION_USER is unique user id taken from discord server.

DISCORD_APP_TOKEN is API key credential from discord application.

## Usage

To start application:
```
$ npm run start
```

To build application:
```
$ npm run build
```

To run application from build:
```
$ npm run start:prod
```

## Deployment

TBD
