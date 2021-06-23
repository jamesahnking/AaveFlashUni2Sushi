// See <http://truffleframework.com/docs/advanced/configuration> to customize your Truffle configuration!
// contracts_build_directory: path.join(__dirname, "client/src/contracts"),

// const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider")
require("dotenv").config()

module.exports = {

	networks: {
		mainnet_fork: {
			host: "127.0.0.1", // Localhost (default: none)
			port: 8545, // Standard Ethereum port (default: none)
			network_id: "999", // Any network (default: none)
		  },
	//   development: {
	//     host: "127.0.0.1",
	//     port: 8545,
	//     // gas: 20000000,
	//     network_id: "*",
	//     skipDryRun: true
	//   },

	//   ropsten: {
	//     provider: new HDWalletProvider(process.env.DEPLOYMENT_ACCOUNT_KEY, "https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY),
	//     network_id: 3,
	//     gas: 5000000,
	// 	gasPrice: 5000000000, // 5 Gwei
	// 	skipDryRun: true
	//   },
	//   kovan: {
	//     provider: new HDWalletProvider(process.env.DEPLOYMENT_ACCOUNT_KEY, "https://kovan.infura.io/v3/" + process.env.INFURA_API_KEY),
	//     network_id: 42,
	//     gas: 5000000,
	// 	gasPrice: 5000000000, // 5 Gwei
	// 	skipDryRun: true},
	// 		"kovan-fork": {
	// 			// provider: new HDWalletProvider(process.env.DEPLOYMENT_ACCOUNT_KEY, "https://kovan.infura.io/v3/" + process.env.INFURA_API_KEY),
	// 			host: "127.0.0.1",
	// 		port: 8545,
	// 		network_id: 42,
	// 		gas: 5000000,
	// 		gasPrice: 5000000000, // 5 Gwei
	// 		skipDryRun: true,
	//   },
	//   mainnet: {
	//     provider: new HDWalletProvider(process.env.DEPLOYMENT_ACCOUNT_KEY, "https://mainnet.infura.io/v3/" + process.env.INFURA_API_KEY),
	//     network_id: 1,
	//     gas: 5000000,
	//     gasPrice: 5000000000 // 5 Gwei
	//   },
	  
	},
	compilers: {
		solc: {
			version: '^0.6.6', // Fetch exact version from solc-bin (default: truffle's version)
		},
	},
}
