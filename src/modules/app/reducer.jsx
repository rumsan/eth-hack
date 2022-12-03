/* eslint-disable import/no-anonymous-default-export */
import ACTIONS from './action';

export default (state, action) => {
	switch (action.type) {
		case ACTIONS.SET_WALLET:
			return {
				...state,
				wallet: action.data
			};

		case ACTIONS.SET_PROVIDER:
			return {
				...state,
				provider: action.data.provider,
				web3: action.data.web3
			};

		case ACTIONS.SET_HTTP_PROVIDER:
			return {
				...state,
				httpProvider: action.data.httpProvider
			};

		case ACTIONS.SET_WALLET_ADDRESS:
			return {
				...state,
				walletAddress: action.data
			};

		default:
			return state;
	}
};
