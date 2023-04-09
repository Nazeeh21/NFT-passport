const contracts = {
  5: [
    {
      name: "goerli",
      chainId: "5",
      contracts: {
        MainContract: {
          address: "0x8E78cFe464CA0e8d966792b2c71137A1E42dDB32",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "countryName",
                  type: "string",
                },
              ],
              name: "collectStamp",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              name: "countryStampAddresses",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "countryName",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "currency",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "dataUri",
                  type: "string",
                },
              ],
              name: "createCountryStamp",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "dataUri",
                  type: "string",
                },
              ],
              name: "createPassport",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "getStampsCollectedByAddress",
              outputs: [
                {
                  components: [
                    {
                      internalType: "string",
                      name: "countryName",
                      type: "string",
                    },
                    {
                      internalType: "uint256",
                      name: "stampTokenId",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct MainContract.StampsCollected[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "passport",
              outputs: [
                {
                  internalType: "contract Passport",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "userToPassportId",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              name: "userToStamp",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "userToStampsCollected",
              outputs: [
                {
                  internalType: "string",
                  name: "countryName",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "stampTokenId",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
  31337: [
    {
      name: "localhost",
      chainId: "31337",
      contracts: {
        MainContract: {
          address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "countryName",
                  type: "string",
                },
              ],
              name: "collectStamp",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              name: "countryStampAddresses",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "countryName",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "currency",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "dataUri",
                  type: "string",
                },
              ],
              name: "createCountryStamp",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "dataUri",
                  type: "string",
                },
              ],
              name: "createPassport",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "getStampsCollectedByAddress",
              outputs: [
                {
                  components: [
                    {
                      internalType: "string",
                      name: "countryName",
                      type: "string",
                    },
                    {
                      internalType: "uint256",
                      name: "stampTokenId",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct MainContract.StampsCollected[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "passport",
              outputs: [
                {
                  internalType: "contract Passport",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "userToPassportId",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              name: "userToStamp",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "userToStampsCollected",
              outputs: [
                {
                  internalType: "string",
                  name: "countryName",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "stampTokenId",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
