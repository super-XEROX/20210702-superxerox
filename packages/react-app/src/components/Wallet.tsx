import React, { useState, useEffect } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { BigNumber } from "@ethersproject/bignumber";
import { InjectedConnector } from "@web3-react/injected-connector";
import { usePoller } from '@leafygreen-ui/hooks';
const fetch = require('node-fetch')
import './index.css'


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

const DEFAULT_KITTY_ID = '31459'
const KITTY_API_URL = 'https://api.cryptokitties.co/kitties/' // example: https://api.cryptokitties.co/kitties/31459

export const Wallet = () => {
  const [netFlow, setNetFlow] = useState('🦄');
  const [id, setId] = useState(DEFAULT_KITTY_ID);
  const [kittyImage, setKittyImage] = useState('🦄'); 
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
    updateNetFlow()
    updateKittyImageURL()
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

  const updateKittyImageURL = async () => {
    const url = KITTY_API_URL + id.toString()
    console.log(url)
    const response = await fetch(url);
    const json = await response.json()
    setKittyImage(json.image_url_cdn)
    console.log(json.image_url_cdn) // it cound be a svg or image file
  };

  function updateNetFlow() {
    tokenContract_ro.getNetFlow()
      .then(
        (x: BigNumber) => {
          console.log(x)
          setNetFlow(x.toString())
        }
      )
  }

  return (
    <div>
      {active ? (
        <div>
          <button type="button" onClick={updateNetFlow}>
            📡 check super Xerox netflow!! 🌪
          </button>
          <button type="button" onClick={updateKittyImageURL}>
            🛰 update Kitty Image URL
          </button>
          <h1>chain ID:{chainId}</h1>
          <h1>account:{account}</h1>
          <h1>connection:{library.connection.url}</h1>
          <h1>netFlow: {netFlow}</h1>
          <h1>cryptokitty ID for COPY: {id}</h1>
          <h5>cryptokitty image URL: {kittyImage}</h5>
          <div  className='container' >
          <img src={kittyImage}/>
          </div>
          <h2>To CHANGE cryptokitty ID</h2>
          <input type="text" onChange={(e)=>{ 
            setId(e.target.value)
            /* 用e.target.value去setState */ }} />
        </div>
      ) : (
        <button type="button" onClick={onClick}>
          Login with MetaMask 🐝
        </button>
      )}
    </div>
  );
};

