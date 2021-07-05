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
import { XSuperTokenAbi } from "./XSuperTokenAbi"

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
const demoAccount = '0x609683612D80A091C69747a76ec6efE284a7cf46'
const DEFAULT_KITTY_ID = '31459'
const PROXY_API_URL = 'http://mars.muzamint.com:3000/'
const KITTY_API_URL = 'https://api.cryptokitties.co/kitties/' // example: https://api.cryptokitties.co/kitties/31459
const SXContract = "0x68cB5B558F15799920E0D038eF87544e670af503" // copy machine address
const CopyTokenContract = "0x50C715221c3ca24678ad11B51980bBa1A1599F3e" // ERC1155 -> CopyToken
// COPY token is a copy a cryptoKitty in ERC1155 form. balanceOf (address, id) where id is the kitty id
const XSuperTokenContract = "0x54e2bBD7E820655C4Ee2A1Cf3DEe4Eb989a31520" // ERC777 -> INativeSuperTokenCustom
// Xerox Super Token is the total amount of credit (steamed) to this copy machine for this account

var signer: any
var sf: any

class NoEthereumProviderError extends Error {
  public constructor() {
    super()
    this.name = this.constructor.name
    this.message = 'No Ethereum provider was found on window.ethereum.'
  }
}

const provider2 = new ethers.providers.Web3Provider(window.ethereum)
console.log("provider2 ->", provider2)

export const Wallet = () => {
  if (!window) {
    throw new NoEthereumProviderError()
  } else{
console.log("window.ethereum -> ", window.ethereum)
  }

  const [netFlow, setNetFlow] = useState('🦄');
  const [id, setId] = useState(DEFAULT_KITTY_ID);
  const [kittyImage, setKittyImage] = useState('🦄'); 
  const [newURI, setNewURI] = useState('🦄'); 
  const [copies, setCopies] = useState(1); 
  const [print, setPrint] = useState([]); 
  const [kittyOwner, setKittyOwner] = useState('🦄');
  const [ownCopies, setOwnCopies] = useState(0);  
  const [ownX, setOwnX] = useState(0);  
  const [ownDAIx, setOwnDAIx] = useState('🦄');  

  const currentProvider = useWeb3React<Web3Provider>();
  const { library, account, activate, active, chainId } = currentProvider;
  const superXeroXContract_ro = new Contract(
    SXContract,
    abi,
    library
  );

  const xTokenContract_ro = new Contract( // erc1155
    XSuperTokenContract,
    XSuperTokenAbi,
    library
  );

  const xTokenContract_rw = new Contract( // erc1155
    XSuperTokenContract,
    XSuperTokenAbi,
    signer
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
  useEffect(() => {
    initialize()
  }, []);
  usePoller(()=>{
    console.log('tick')
    updateNetFlow()
    updateKittyImageURL()
    getURI()
    getBalanceOf()
    getOwner()
    getSTBalance()
    getXBalanceOf()
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

      sf = new SuperfluidSDK.Framework({
      ethers: provider2,
      version: "v1", //"test" or "v1"
      tokens: ["fDAI", "fDAIx"]
  });
    await sf.initialize()
    let daix = sf.tokens.fDAIx;
    console.log(sf)

}

const getAllBalance = async () => {
  await getSTBalance();
  await getXBalanceOf();
}

const getSTBalance = async () => {
     // super token

const daiAddress = await sf.resolver.get("tokens.fDAI");
const daixAddress = await sf.resolver.get("tokens.fDAIx");
console.log(daiAddress)
const dai = await sf.contracts.TestToken.at(daiAddress);
console.log(dai)

const bob = sf.user(
  { address: account,
  token: sf.tokens.fDAIx.address }
);
    const x = await dai.balanceOf(bob.address)

const y = x.div(BigNumber.from(1000000000))
const z = y.div(BigNumber.from(1000000000))
setOwnDAIx(z.toString())
console.log('my fDAIx balance', x)
console.log('my fDAIx balance', z)
const details = await bob.details();
console.log(details);
//const result = await sf.cfa.getFlow({superToken: daixAddress, sender: bob.address, receiver: SXContract})
//console.log('ming-> ',result) // not working.
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
          const y = x.div(BigNumber.from(1000000000))
          const z = y.div(BigNumber.from(277777))
          setNetFlow(z.toString())
        }
      )
  }

  function spendXtoken() {
    xTokenContract_rw.transferFrom(account,SXContract,ethers.utils.parseEther(copies.toString()))
    .then(console.log)
  }

  function getURI() {
    copyTokenContract_ro.uri(id)
      .then(
        (x: BigNumber) => {
          const number = parseInt(id)
	        const hexString = number.toString(16).padStart(64, "0") // 000000000000000000000000000000000000000000000000000000000004cce0
          const newTokenURI = PROXY_API_URL + hexString + '.json'
          setNewURI(newTokenURI)
          console.log(newTokenURI)
        }
      )
  }

  function getXBalanceOf() {
    xTokenContract_ro.balanceOf(account)
      .then(
        (x: BigNumber) => {
          console.log(x)
          const y = x.div(BigNumber.from(1000000000))
          const z = y.div(BigNumber.from(1000000000))
          setOwnX(parseInt(z.toString()))
        }
      )
  }

  function getBalanceOf() {
    copyTokenContract_ro.balanceOf(account, id)
      .then(
        (x: BigNumber) => {
          console.log(x)
          setOwnCopies(parseInt(x.toString()))
        }
      )
  }

async  function mintNewToken () {
  if (copies === 0) {
    alert('How many copies do you want to print.') 
  } else 
  if (ownX < copies) {   
    const message = 'You need  ' + copies + '  COPY Super ' + (copies > 1? 'Token.':'Tokens.\n You can stream fDAIx supter tokens to 0x68cB5B558F15799920E0D038eF87544e670af503\n And you will get COPY super tokens in return.')
    alert(message)
 } else 
 if (!(kittyOwner === account || account === demoAccount)) {
   alert("You are not the owner of this NFT, you can't make the copy.")
 } else {
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
    spendXtoken() // deduct X super token, after copyed.
  }
}
  var numbers: number[] = []

  const genNumber = () => {
    numbers = [];
    for (var i = 1; i <= ownCopies; i++) {
      numbers.push(i);
   }
   console.log(numbers)
   setPrint(numbers)
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
          <button type="button" onClick={spendXtoken}>
            🌪 deduct X tokens
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
          <button type="button" onClick={getAllBalance}>
            🛰 get my fDAIx balance
          </button>
          <button onClick={genNumber}> 👁👄👁 to show my own copies </button>
          <button type="button" onClick={getOwner}>
          🌪 get Kitty Owner
          </button>
          <h2>You can stream fDAIx supter tokens to 0x68cB5B558F15799920E0D038eF87544e670af503 to pay for the NFT copies. </h2>
          <h2>And you will get same amount of the COPY super tokens in return.</h2>
          <a href="https://app.superfluid.finance/">(use Superfluid Dashboard)</a>
          <h1>netFlow: {netFlow} per hour </h1>
          <button type="button" onClick={mintNewToken}>
          🌪 star to print !!!! 👈 👈 👈
          </button>
          <h2> How many copies to print? </h2>
          <button onClick={() => {
            let x = (copies-1) < 0 ? 0 : copies -1
            setCopies(x)
            }}> - </button>
    
           {copies} {copies <= 1?'copy':'copies'} 
          <button onClick={() => {setCopies(copies+1)}}> + </button>
          <h5>chain ID: {chainId}</h5>
          <h5>:{library.connection.url}</h5>
          <h1>account: {account}</h1>
          <h1>you own fDAIx: {ownDAIx}</h1>
          <h1>You have {ownX} Super XEROX (COPY) Tokens. (0x54e2bBD7E820655C4Ee2A1Cf3DEe4Eb989a31520)</h1>
          <h1>cryptokitty ID for COPY: {id}</h1>
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
        <>
        <h1>Please To Use Rinkeby Testnet and Pay fDAIx for Printing.</h1>
        <a href="https://app.superfluid.finance/">Go to Superfluid Dashboard</a>
        <p></p>
        <button type="button" onClick={onClick}>
          Login with MetaMask 🐝
        </button>
        </>
      )}
    </div>
  );
};

