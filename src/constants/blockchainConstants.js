module.exports = {
  DEPLOYEMNT_NETWORK: "testnet",
  FORTMATIC_KEY: process.env.REACT_APP_FORTMATIC_API_KEY,
  CONTRACT_ADDRESS: {
    erc721: "0x0E556a4094403a9A0dEBD23687d232392EB1Ccc6",
    marketplace: "0x6eD1b11740F3eBFa28969b7D5c15a19F0D1C2a6e",
  },
  BLOCKCHAIN_NETWORK: {
    // ETHEREUM_RINKEBY: '4',
    // POLYGON_MUMBAI: '80001',
    // ETHEREUM_MAINNET: '1',
    // POLYGON_MAINNET: '137',
    BINANCE_TESTNET: "97",
    //BINANCE_MAINNET: '56'
  },
  CHAIN_ID: {
    MAINNET: {
      ETHEREUM: 1,
      POLYGON: 137,
      BINANCE: 56,
    },
    TESTNET: {
      ETHEREUM: 4,
      POLYGON: 80001,
      BINANCE: 97,
    },
  },
  CHAIN_RPC_URLS: {
    80001:
      "https://polygon-mumbai.g.alchemy.com/v2/QgYOFbUUBWIKOCTtKpB4wSYMiZovErfI",
    97: "https://data-seed-prebsc-1-s3.binance.org:8545",
  },
  EXPLORERS: {
    1: "https://etherscan.io",
    137: "https://polygonscan.com",
    56: "https://bscscan.com",
    4: "https://rinkeby.etherscan.io",
    80001: "https://mumbai.polygonscan.com",
    97: "https://testnet.bscscan.com",
  },
  SYMBOLS: {
    1: "ETH",
    137: "MATIC",
    56: "BNB",
    4: "ETH (Rinkeby)",
    80001: "MATIC",
    97: "BNB",
  },
  ICONS: {
    97: "/img/binance-coin.png",
    1: "/img/eth.png",
    137: "/img/polygon-logo.png",
    56: "/img/binance-coin.png",
    80001: "/img/polygon-logo.png",
    4: "/img/eth.png",
    creditCard: "/img/creditcard.png",
    ideal: "/img/ideal.png",
  },

  NATIVE_CURRENCY: {
    1: "ETH",
    56: "bnb",
    97: "bnb",
    137: "MATIC",
    80001: "MATIC",
  },
  AVAILABLE_NETWORKS: [
    { label: "Binance SmartChain Testnet", value: 97 },
    { label: "Polygon Mumbai Testnet", value: 80001 },
    { label: "Binance SmartChain Mainnet", value: 56 },
    { label: "Polygon Mainnet", value: 137 },
  ],

  NETWORK_PARAMS: {
    97: [
      {
        chainId: "0x61",
        chainName: "Binance Smart Chain Testnet",
        nativeCurrency: {
          name: "BNB",
          symbol: "bnb",
          decimals: 18,
        },
        rpcUrls: ["https://data-seed-prebsc-1-s3.binance.org:8545/"],
        blockExplorerUrls: ["https://testnet.bscscan.com"],
        iconUrls: ["https://bscscan.com/images/svg/brands/bnb.svg?v=1.3"],
      },
    ],

    80001: [
      {
        chainId: "0x13881",
        chainName: "Polygon Testnet",
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18,
        },
        rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
        blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
        iconurls: ["https://polygonscan.com/images/svg/brands/polygon.svg"],
      },
    ],
    137: [
      {
        chainId: "0x89",
        chainName: "Polygon Mainnet",
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18,
        },
        rpcUrls: ["https://polygon-rpc.com/"],
        blockExplorerUrls: ["https://polygonscan.com/"],
        iconurls: ["https://polygonscan.com/images/svg/brands/polygon.svg"],
      },
    ],
    56: [
      {
        chainId: "0x38",
        chainName: "Binance SmartChain Mainnet",
        nativeCurrency: {
          name: "BNB",
          symbol: "bnb",
          decimals: 18,
        },
        rpcUrls: ["https://bsc-dataseed.binance.org"],
        blockExplorerUrls: ["https://bscscan.com"],
        iconUrls: ["https://bscscan.com/images/svg/brands/bnb.svg?v=1.3"],
      },
    ],
  },
};
