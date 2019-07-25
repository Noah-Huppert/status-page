[status.kscout.io](https://status.kscout.io)

# Status Page
Status page.

# Table Of Contents
- [Overview](#overview)
- [Use](#use)
- [Deploy](#deploy)

# Overview
Status page using [Statusfy](https://statusfy.co/).

# Use
The status page is a generated static site.  

The site generator uses NodeJS.

Install dependencies:

```
npm install
```

Create new incidents:

```
make new
```

Generate the site:

```
make build
```

# Deploy
The status page is hosted via [GitHub pages](https://pages.github.com/).

A CNAME entry exists from status.kscout.io to kscout.github.io/status-page.

The `docs/` directory in the master branch is served.
