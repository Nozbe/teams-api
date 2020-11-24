# @nozbe/teams-api

<h4 align="center">
  A npm package to connect with Nozbe Teams ✅
</h4>

<p align="center">
  <a href="https://github.com/Nozbe/WatermelonDB/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License">
  </a>

  <!-- <a href="https://travis-ci.com/Nozbe/WatermelonDB">
    <img src="https://api.travis-ci.com/Nozbe/WatermelonDB.svg?branch=master" alt="CI Status">
  </a> -->

  <!-- <a href="https://www.npmjs.com/package/@nozbe/watermelondb">
    <img src="https://img.shields.io/npm/v/@nozbe/watermelondb.svg" alt="npm">
  </a> -->
</p>

<!-- |     | @nozbe/teams-api                                               |
| --- | -------------------------------------------------------------- |
| ⚡️ | **Launch your app instantly** no matter how much data you have | -->

## What is `@nozbe/teams-api`?

**@nozbe/teams-api** is a way to interact with your [Nozbe Teams](https://teams.nozbe.com) account.

It allows you to create utilities for Nozbe Teams, list your projects, manage your tasks and comment on them. For now - It is continuosly developed to give you more possibilities.

> ⚠️ Note this package is still a WIP and the API may change (even if we do what we can to avoid that)

## Installation

```
npm install @nozbe/teams-api
```

or

```
yarn add @nozbe/teams-api
```

## Usage

**Quick (over-simplified) example:** adding the task to your Single Actions

To interact with Nozbe Teams you need to grab an API token from _Settings_ -> _Integrations_.

First, you create a Nozbe Teams client:

```js
import NozbeTeams from "@nozbe/teams-api";

const nozbeClient = new NozbeTeams("fakeApiToken123456");
```

Then, you can add a new task:

```js
await client.addTask("Build a brand new app for Nozbe Teams!");
```

Simple as that.

You can find the basic API reference [here](./API.md).

## Contributing

<img src="https://github.com/Nozbe/WatermelonDB/raw/master/assets/needyou.jpg" alt="We need you" width="220" />

**`@nozbe/teams-api` is an open-source project and it needs your help to thrive!**

If there's a missing feature, a bug, or other improvement you'd like, we encourage you to contribute! Feel free to open an issue to get some guidance. <!-- and see [Contributing guide](./CONTRIBUTING.md) for details about project setup, testing, etc. -->

<!-- If you're just getting started, see [good first issues](https://github.com/Nozbe/WatermelonDB/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) that are easy to contribute to. If you make a non-trivial contribution, email me, and I'll send you a nice 🍉 sticker! -->

If you make or are considering making an app using `@nozbe/teams-api`, please let us know!

## Authors and license

`@nozbe/teams-api` was created by [@Nozbe](https://github.com/Nozbe). Main author is [Krystian Kościelniak](https://github.com/kkoscielniak) and main maintainer is [Radek Pietruszewski](https://github.com/radex).

`@nozbe/teams-api` is available under the MIT license. <!-- See the [LICENSE file](./LICENSE) for more info. -->
