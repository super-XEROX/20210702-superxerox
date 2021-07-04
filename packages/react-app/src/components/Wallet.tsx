import React, { useState, useEffect } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { BigNumber } from "@ethersproject/bignumber";
import { InjectedConnector } from "@web3-react/injected-connector";
import { usePoller } from '@leafygreen-ui/hooks';

import {
  Currency,
  currencyEquals,
  ETHER,
  Percent,
  WETH,
  Pair,
} from "@uniswap/sdk";
import { splitSignature } from "@ethersproject/bytes";
import { Contract } from "@ethersproject/contracts";
//import { abi } from "./FIXabi";
import { abi } from "./SuperXeroxabi";

let nonce = 0;
const value = 300000;
const deadline = 2613887589;
const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan
    56, // Binance Smart Chain (testnet)
    77, // POA (mainnet)
    79, // Binance Smart Chain (mainnet)
    99, // POA sokol (testnet)
    100, // xDAI
  ],
});

export const Wallet = () => {
  const [temperature, setTemperature] = useState('🦄');
  const [id, setId] = useState('1')
  const currentProvider = useWeb3React<Web3Provider>();
  const { library, account, activate, active, chainId } = currentProvider;
  const tokenContract_ro = new Contract(
    "0x68cB5B558F15799920E0D038eF87544e670af503",
    abi,
    library
  );
  console.log(currentProvider);
  if (currentProvider.library !== undefined) {
    console.log(currentProvider.library);
  }
  usePoller(()=>{
    console.log('tick')
    approveSwapSwap()
  }, {
    interval: 3000,
    immediate: true,
    enabled: true,
  });

  const [signatureData, setSignatureData] = useState<{
    v: number;
    r: string;
    s: string;
    deadline: number;
  } | null>(null);


  const onClick = () => {
    //activate(bscConnector); // TODO
    activate(injectedConnector); // use metaMask
  };

  const startToSwapSwap = () => {
    if (signatureData !== null) {
      console.log("start to swap swap");
      const signer = library.getSigner(account);
      console.log(signer);
      console.log(account);
      const tokenContract = new Contract(
        "0xC8d545324a12F7E87D4e5196d6d962595c6Ef78f",
        abi,
        signer
      );
      const args = [
        account,
        "0x9E4C996EFD1Adf643467d1a1EA51333C72a25453",
        value,
        deadline,
        signatureData.v,
        signatureData.r,
        signatureData.s,
      ];

      const gas = tokenContract.estimateGas.permit(...args);

      console.log(gas);
      console.log(signatureData);
      tokenContract.permit(
        account,
        "0x9E4C996EFD1Adf643467d1a1EA51333C72a25453",
        value,
        deadline,
        signatureData.v,
        signatureData.r,
        signatureData.s
      );
    }
  };

  function approveSwapSwap() {
    console.log("swap ... swap ... 🤖💩 🥊 🇹🇼 Flag: Taiwan");
    tokenContract_ro.getNetFlow()
      .then(
        (x: BigNumber) => {
          console.log(x)
          setTemperature(x.toString())
        }
      )
  }

  return (
    <div>
      {active ? (
        <div>
          <button type="button" onClick={approveSwapSwap}>
            📡 check super Xerox netflow!! 🌪
          </button>
          <button type="button" onClick={startToSwapSwap}>
            🛰 start to swap swap
          </button>
          <h1>chain ID:{chainId}</h1>
          <h1>account:{account}</h1>
          <h1>connection:{library.connection.url}</h1>
          <h1>netFlow: {temperature}</h1>
          <h1>cryptokitty id: {id}</h1>
          <input type="text" onChange={(e)=>{ 
            setId(e.target.value)
            /* 用e.target.value去setState */ }} />
        </div>
      ) : (
        <button type="button" onClick={onClick}>
          Connect🦄
        </button>
      )}
    </div>
  );
};

