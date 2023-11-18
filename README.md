# Token Ballot Minting and Voting Dapp

> **Weekend Project**

> This is a group activity for at least 3 students:

> * Complete the projects together with your group

> * Create a voting dApp to cast votes, delegate and query results on chain

> * Request voting tokens to be minted using the API

> * (bonus) Store a list of recent votes in the backend and display that on frontend

> * (bonus) Use an oracle to fetch off-chain data to define the proposals instead of passing them in constructor

> Voting dApp integration guidelines:

> * Single POST method: Request voting tokens from API

> * Use these tokens to interact with the tokenized ballot

> * All other interactions must be made directly on-chain

This project is split in back-end and front-end: 1). the front-end can be found in **`./frontend-scaffoldeth`** ; 2). the back-end can be found in **`./backend-nestjs/`**.

The idea is to serve the front-end as a static _html_ file using **[GitHub pages](https://andysign.github.io/token-vote-dapp/) and at the same time host the back-end in the cloud, as in, more exactly using the **[back4app.com](https://www.back4app.com/)** free cloud platform ( the back-end can be found at: **[https://tokenvotedapp-9jc31xz7.b4a.run/](https://tokenvotedapp-9jc31xz7.b4a.run/)** ).

For more information about the front-end read the README file from **[./frontend-scaffoldeth](./frontend-scaffoldeth/)**.

Similarly, for more information about the back-end read the README file from **[./backend-nestjs/README.md](./backend-nestjs/README.md)**.

<img width="1321" alt="image" src="https://github.com/andysign/token-vote-dapp/assets/11134288/3f9352a4-ba16-4b6d-9c94-0748790a59f6">

---