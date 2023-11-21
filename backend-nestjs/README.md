# Token Ballot Minting and Voting Dapp Backend

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
<!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
[![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

---

## Overview

Created using [Nest](https://github.com/nestjs/nest) framework.

---

## Description

The first backend version, configured to run on port in DEV mode on **`localhost`** on port **`8080`**.

This one has a **`Dockerfile`**. This docker build is useful because whenever a merge to main happens the a docker container will be build, all the files from **`./distil/`** will be added in it and that docker will become available at **[https://tokenvotedapp-9jc31xz7.b4a.run/](https://tokenvotedapp-9jc31xz7.b4a.run/)** on port **`80`**.

Run with:

```sh
nano ./.env.development # ADD YOUR KEY AND ALCHEMY API KEY ( eventually edit .env as well and add your own contract )
```

```sh
npm install
# then
npm run start
# OR
npm run start:dev
```

Also don't forget, when committing something that needs to go in the _cloud_ to always prepare the files for the container ( **`Dockerfile`** ), therefore always do:

```sh
npm run build
```

---

## Running The App

Start in DEV mode.

```bash
# debug mode ( with private key extracted from Hardhat Node )
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80" RPC_ENDPOINT_URL="http://127.0.0.1:8545" TOKEN_ADDRESS="0x5FbDB2315678afecb367f032d93F642f64180aa3" npm run start:dev
# OR
# npm run start:debug
```

To build the distilled, aka _./distil/_ backend ( the back2app DOT com platform will pick the files out automatically from the `main` branch and rebuild the container ), use ( after putting the correct information inside the **`.env`** file ) the following:

```sh
npm run build
```

---

## Screenshots

<img width="1111" alt="image" src="https://github.com/andysign/token-vote-dapp/assets/11134288/b22bc331-53a2-4ed5-983d-6a3b936cc785">

---

## Test

Although the tests are not done, they can be run with

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

---

## Support

Contact the repository owner.

---

---
