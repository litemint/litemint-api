# Litemint API client library for apps and games

## Description

The Litemint API client library for javaScript client-application developers to integrate apps and games on the Litemint platform.

> Note: Contact hello@litemint.com to get your `APP ID` and to submit your app.

## Features

The JavaScript client library supports various interfaces to initialize an app, retrieve the authenticated Litemint user from auth token, retrieve his/her public data from the Stellar blockchain and submit high scores.

[Click here to learn more](https://litemint.com/business/) about the advantages of publishing your apps and games on Litemint.

Installing
==========

### Browser

Include on your page in the `<script>` tag:

```html
<!-- Latest compiled minified JavaScript version -->
<script src="litemint.api.min.js"></script>
```
Usage
==========

#### Initialize the app once:

```js
Litemint.initialize();
```

#### Retrieve the user token:

```js
Litemint.getToken().then(token => {
    console.log(token);
});
```

#### Validate the token and retrieve the user object:

```js
// Set onlyFederated to true if your game requires accounts with gamer ID.
const onlyFederated = false;
Litemint.validateToken(token, onlyFederated)
.then(user => {
    console.log(user.id || user.address);
})
.catch(err => {
    console.log(err);
});
```

#### Submit a score (usually from your game server):

```js
const scoreToSubmit = 700;
Litemint.submitScore(token, scoreToSubmit).then(result => {
    console.log(result.error);
});
```

And much more...
