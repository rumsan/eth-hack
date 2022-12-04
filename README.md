# ease-nft

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


### `General Overview of ease-nft`

Ease-nft is a basic nft marketplace build during ethIndia Hackathon. This project demonstrates the basic work flow of nft marketplaces. This is fully decentralized marketplace without any center server for data storage. In general scenario ,nft trading is technically complicated process. Developer as well as end user encounters some huddles in current process. So, to simply this process we are trying 
to use various OpenSource APIs and make nft marketplace seamless to use.  Different new protocols such as Push Protocol, Covalent Api and StackOs were implemented in this project.

#### `Push Notification Protocol`
Push Protocol is a web3 communication network, enabling cross-chain notifications and messaging for dapps, wallets, and services.
You can learn more in [Push Protocol](https://push.org/)
We have implemented push protocol in our project to 
-Send notification to user after sucess of their transaction.
-List all the notification of user in their profile page

### `Covalent Api`
The Covalent API isRESTful. The API is designed around the main resources that's available through the web interface.
The Covalent Unified API can be used to pull balances, positions and historical granular transaction data from dozens of blockchain networks.
You can learn more in [Covalent Api](https://www.covalenthq.com/)
We have implemented Covalent API
-To query the nft list and nft metadata associated with particular contract address

### `Stack Os`
In StackOs protocol, developers get connected with a decentralized cloud. The decentralized computer power (cloud) is a UI-based, no-code application deployment engine.
You can learn more in [Stack Os](https://www.stackos.io/)
We have deployed our app in stack Os. Stack Os is better than AWS services.So, we have choosen stack os for our dapp deployement

### `Smart Contract`
Our system includes 2 different smart contracts.NFT contract for minting and burning functionality of ERC721. MarketPlace contract ,where actual nft buy and sell take place. We have deployed our contract in 2 different networks Polygon Testnet and Binance Testnet 