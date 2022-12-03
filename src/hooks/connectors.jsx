import { InjectedConnector } from '@web3-react/injected-connector';

import { CHAIN_ID } from '../constants/blockchainConstants';

const { MAINNET, TESTNET } = CHAIN_ID;
const SUPPORTED_CHAIN_IDS = [
	MAINNET.BINANCE,
	MAINNET.ETHEREUM,
	MAINNET.POLYGON,
	TESTNET.BINANCE,
	TESTNET.ETHEREUM,
	TESTNET.POLYGON
];

export const injected = new InjectedConnector({ supportedChainIds: SUPPORTED_CHAIN_IDS });


