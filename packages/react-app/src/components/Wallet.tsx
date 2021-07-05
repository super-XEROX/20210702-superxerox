import React, { useState, useEffect } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { BigNumber } from "@ethersproject/bignumber";
import { InjectedConnector } from "@web3-react/injected-connector";
import {  NetworkConnector } from "@web3-react/network-connector";
import { Sdk, MetaMaskWalletProvider } from 'etherspot';
import { ethers } from "ethers";

import { usePoller } from '@leafygreen-ui/hooks';
const fetch = require('node-fetch')
import './index.css'
const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const Infura = new NetworkConnector({
  urls: { 1: 'https://mainnet.infura.io/v3/84842078b09946638c03157f83405213' },
  defaultChainId: 1
})

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
import { CopyTokenAbi } from "./CopyTokenAbi";

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
const PROXY_API_URL = 'http://mars.muzamint.com:3000/'
const KITTY_API_URL = 'https://api.cryptokitties.co/kitties/' // example: https://api.cryptokitties.co/kitties/31459
const SXContract = "0x68cB5B558F15799920E0D038eF87544e670af503"
const CopyTokenContract = "0x50C715221c3ca24678ad11B51980bBa1A1599F3e"
var signer: any

class NoEthereumProviderError extends Error {
  public constructor() {
    super()
    this.name = this.constructor.name
    this.message = 'No Ethereum provider was found on window.ethereum.'
  }
}
export const Wallet = () => {
  if (!window) {
    throw new NoEthereumProviderError()
  } else{
console.log("window.ethereum -> ", window.ethereum)
  }
  const provider2 = new ethers.providers.Web3Provider(window.ethereum)
  console.log("provider2 ->", provider2)


  const [netFlow, setNetFlow] = useState('🦄');
  const [id, setId] = useState(DEFAULT_KITTY_ID);
  const [kittyImage, setKittyImage] = useState('🦄'); 
  const [newURI, setNewURI] = useState('🦄'); 
  const [copies, setCopies] = useState(1); 
  const [print, setPrint] = useState([]); 
  const [kittyOwner, setKittyOwner] = useState('🦄');
  const [ownCopies, setOwnCopies] = useState(0);  

  const currentProvider = useWeb3React<Web3Provider>();
  const { library, account, activate, active, chainId } = currentProvider;
  const superXeroXContract_ro = new Contract(
    SXContract,
    abi,
    library
  );

  const copyTokenContract_ro = new Contract( // erc1155
    CopyTokenContract,
    CopyTokenAbi,
    library
  );

  const copyTokenContract_rw = new Contract( // erc1155
    CopyTokenContract,
    CopyTokenAbi,
    signer
  );

  console.log(currentProvider);
  if (currentProvider.library !== undefined) {
    console.log("provider -> ", currentProvider.library.provider);
    signer = library.getSigner() // is a Promise
    console.log("Signer:" , signer)

//const signature = signer.signMessage('a');
//console.log("signature: ----> ", signature)
  }
  usePoller(()=>{
    console.log('tick')
    updateNetFlow()
    updateKittyImageURL()
    getURI()
    getBalanceOf()
    getOwner()
    genNumber()
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


  const onClick = async () => {
    //activate(bscConnector); // TODO
    activate(injectedConnector); // use metaMask
    //activate(Infura) // use Infura
  };

  const initialize = async () => {
    if (!MetaMaskWalletProvider.detect()) {
      console.log('MetaMask not detected');
      return;
    }
  
    const walletProvider = await MetaMaskWalletProvider.connect();
  
    const sdk = new Sdk(walletProvider);
  
    console.info('SDK created');
  console.log("provider -> ", walletProvider);

    const sf = new SuperfluidSDK.Framework({
      ethers: provider2,
      version: "v1", //"test" or "v1"
      tokens: ["fDAI", "fDAIx"]
  });
    await sf.initialize()
let daix = sf.tokens.fDAIx;
    console.log(sf)
  };

  const updateKittyImageURL = async () => {
    const url = KITTY_API_URL + id.toString()
    console.log(url)
    const response = await fetch(url);
    const json = await response.json()
    setKittyImage(json.image_url_cdn)
    console.log(json.image_url_cdn) // it cound be a svg or image file
  };

  const getOwner = async () => {
    const url = KITTY_API_URL + id.toString()
    console.log(url)
    const response = await fetch(url);
    const json = await response.json()
    setKittyOwner(json.owner.address)
    console.log(json.owner.address) // it cound be a svg or image file
  };

  function updateNetFlow() {
    superXeroXContract_ro.getNetFlow()
      .then(
        (x: BigNumber) => {
          console.log(x)
          setNetFlow(x.toString())
        }
      )
  }

  function getURI() {
    copyTokenContract_ro.uri(id)
      .then(
        (x: string) => {
          const number = parseInt(id)
	        const hexString = number.toString(16).padStart(64, "0") // 000000000000000000000000000000000000000000000000000000000004cce0
          const newTokenURI = PROXY_API_URL + hexString + '.json'
          setNewURI(newTokenURI)
          console.log(newTokenURI)
        }
      )
  }

  function getBalanceOf() {
    copyTokenContract_ro.balanceOf(account, id)
      .then(
        (x: string) => {
          console.log(x)
          setOwnCopies(parseInt(x.toString()))
        }
      )
  }

async  function mintNewToken () {
		var bytes: any[] = []; 
		for (var i = 0; i < newURI.length; ++i) {
			var code = newURI.charCodeAt(i);
			bytes = bytes.concat([code]);
		}
    console.log(bytes)
    console.log('signer =>' , signer)
    let tx = await copyTokenContract_rw.mint(account, parseInt(id), copies, bytes)
      .then(
        (x: string) => {
          console.log("xxxxx " + x)

        }
      )
    console.log("TX Hash: " + tx)
  }
  var numbers: number[] = []

  const genNumber = () => {
    if (kittyOwner === account) {
      alert("You are not the owner of this NFT, you can't make the copy")
    } else {
//      setOwnCopies(0) // don't need
    numbers = [];
    for (var i = 1; i <= ownCopies; i++) {
      numbers.push(i);
   }
   console.log(numbers)
   setPrint(numbers)
    }
  }

  function CopyList(props: { numbers: any; }) {
    const numbers = props.numbers;
    const listItems = numbers.map((number: number) =>
    <div  className='copies' >
      {number}
    <img src={kittyImage}/>
    </div>
    );
    return (
         <div className='container'>
           {listItems}
         </div>
    );
  }

  return (
    <div>
      {active ? (
        <div>
          <button type="button" onClick={initialize}>
            📡 superfluod initialization!! 🌪
          </button>
          <button type="button" onClick={updateNetFlow}>
            📡 check super Xerox netflow!! 🌪
          </button>
          <button type="button" onClick={updateKittyImageURL}>
            🛰 update Kitty Image URL
          </button>
          <button type="button" onClick={getURI}>
            🛰 get ERC1155 URI
          </button>
          <button onClick={genNumber}> 👁👄👁 to show my own copies </button>
          <button type="button" onClick={getOwner}>
          🌪 get Kitty Owner
          </button>
          <h1>netFlow: {netFlow}</h1>
          <button type="button" onClick={mintNewToken}>
          🌪 star to print !!!!🔮🔮🔮
          </button>
          <h2> How many copies to print? </h2>
          <button onClick={() => {
            let x = (copies-1) < 0 ? 0 : copies -1
            setCopies(x)
            }}> - </button>
    
           {copies} {copies <= 1?'copy':'copies'} 
          <button onClick={() => {setCopies(copies+1)}}> + </button>
          <h5>chain ID:{chainId}</h5>
          <h5>:{library.connection.url}</h5>
          <h1>account:{account}</h1>
          <h3>cryptokitty ID for COPY: {id}</h3>
          <h3>cryptokitty ID owner: {kittyOwner}</h3>
          <h5>cryptokitty image URL: {kittyImage}</h5>
          <div  className='main' >
          <img src={kittyImage}/>
          </div>
           Original Copy
        <CopyList numbers={print} />
          <h2>To CHANGE cryptokitty ID</h2>
          <input type="text" onChange={(e)=>{ 
            setPrint([])
            setOwnCopies(0)
            setId(e.target.value)
            /* 用e.target.value去setState */ }} />
          <h5>new COPY Token's URI: {newURI}</h5>
        </div>
      ) : (
        <button type="button" onClick={onClick}>
          Login with MetaMask (switch network to Rinkeby) 🐝
        </button>
      )}
    </div>
  );
};

