# Frontend ( 🏗 Scaffold-ETH 2 )

More information about Scaffold ETH can be found **[here](https://docs.scaffoldeth.io)**.

Built using NextJS, RainbowKit, Hardhat, Wagmi, and Typescript.

## Requirements

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## QuickStart

This project can be viewed on-line if you navigate to the **[GitHub pages](https://andysign.github.io/token-vote-dapp/)** page but, before that to start this project in DEV mode you, do the following:

```sh
yarn install ;
# OPEN HARD_HAT NODE IN A DIFFERENT TERMINAL
# npx hardhat node
# COMPILE AND DEPLOY THE CONTRACT
cd ./packages/nextjs/
cat scaffold.config.ts | sed "s/sepolia/hardhat/" > /tmp/scaffold.config.ts && cp /tmp/scaffold.config.ts .
yarn start ;
NEXT_PUBLIC_BACKEND_URL="http://localhost:8080" \
NEXT_PUBLIC_TOKEN_ADDRESS="0x5FbDB2315678afecb367f032d93F642f64180aa3" \
NEXT_PUBLIC_THRESHOLD="20000000000000000000" yarn start
```

To build the static _html+css+js_ files that need to go into the GH Pages GUI ( in branch **`gh-pages`** ) do the following while omitting the addition of any ENV variables:

```sh
yarn publish
```

## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Screenshots

<img width="1111" alt="image" src="https://github.com/andysign/token-vote-dapp/assets/11134288/1b86c4d9-ff87-42f7-abc2-7c9f03515801">

## Changes

In order to suppress some bugs that keep popping when trying to execute `next export` the standard vanilla Scaffold ETH 2 had to be changed:

* Removed all the **`./pages/blockexplorer/*`** pages to prevent NextJs Export bug.

* Added **`images.unoptimized`** ( true ) in config to bypass an export issue.

* Added yarn run scripts to make the export of the stat html files faster.

* Removed refs about explorer from **`Footer.tsx`** and **`index.tsx`**.

* Added a pathPrefix change, therefore the project will only run on **`http://localhost:3000/token-vote-dapp/`** instead of **`/`**.

Exported the first set of static page files.

## Components

```
Home
• PageBody
  WalletInfo
  • TokenInfo
      TokenName
      TokenBalance
      TokenAddressFromApi
      RequestTokens
      SelfDelegate
  • TokenizedBallotPage
      TokenizedBallotGeneralInformation
      DeployCard
  • TokenizedBallotCard
      TokenizedBallotVote
      TokenizedBallotWinner
```

## Contributing

Contact the repository owner.

---
