export const abi = [
	{
		"inputs": [
			{
				"internalType": "contract ISuperToken",
				"name": "_superToken",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_agreementClass",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "_agreementId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "_ctx",
				"type": "bytes"
			}
		],
		"name": "afterAgreementCreated",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "newCtx",
				"type": "bytes"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract ISuperToken",
				"name": "_superToken",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_agreementClass",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "_agreementId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "_agreementData",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "_ctx",
				"type": "bytes"
			}
		],
		"name": "afterAgreementTerminated",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "newCtx",
				"type": "bytes"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract ISuperToken",
				"name": "_superToken",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_agreementClass",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "_agreementId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "_ctx",
				"type": "bytes"
			}
		],
		"name": "afterAgreementUpdated",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "newCtx",
				"type": "bytes"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "tokensReceived",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract ISuperfluid",
				"name": "host",
				"type": "address"
			},
			{
				"internalType": "contract IConstantFlowAgreementV1",
				"name": "cfa",
				"type": "address"
			},
			{
				"internalType": "contract ISuperToken",
				"name": "acceptedToken",
				"type": "address"
			},
			{
				"internalType": "contract ISuperToken",
				"name": "copyToken",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "contract ISuperToken",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "beforeAgreementCreated",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract ISuperToken",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "beforeAgreementTerminated",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract ISuperToken",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "beforeAgreementUpdated",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNetFlow",
		"outputs": [
			{
				"internalType": "int96",
				"name": "",
				"type": "int96"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]