'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useIsMounted } from './useIsMounted';
import { useEffect, useState } from 'react';
const { ethers } = require("ethers");
const abi = require("./tokenAbi.json");
const factoryAbi = require("./factoryAbi.json");
const routerAbi = require('./routerAbi.json')
const pairAbi = require('./pairAbi.json')



export default function Home() {
  const { address } = useAccount();
  const [bnbBalance, setBNBBalance] = useState("0000000");
  const [tokenBalance, setBalance] = useState("0000000");
  const [tokenPrice, setTokenPrie] = useState("000000");
  const [tokenMarketCap, setMcap] = useState("000000");
  const mounted = useIsMounted();

  const contractAddress = "0x28a9af9e1b1641c4532ad91d90a003b4a3a7dc32";
  const routerAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E"
  const factoryAddress = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73"
  const wBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
  const usd = "0x55d398326f99059fF775485246999027B3197955"

  useEffect(() => {
    async function checkTokenBalance() {

      //provider
      const provider = new ethers.providers.JsonRpcProvider("https://summer-powerful-meadow.bsc.discover.quiknode.pro/6e12ae53f44d456f93dd94f54bc3f48e77e75727/");
      const tokenContract = new ethers.Contract(contractAddress, abi, provider);
      const decimalstoken = await tokenContract.decimals()

      //router and factory contract
      const routerContract = new ethers.Contract(routerAddress, routerAbi, provider)
      const factoryContract = new ethers.Contract(factoryAddress, factoryAbi, provider);

      const pairAddress = await factoryContract.getPair(contractAddress, wBNB);
      const pairContract = new ethers.Contract(pairAddress, pairAbi, provider);

      const reserves = await pairContract.getReserves();
      const reserve0 = reserves[0];
      const reserve1 = reserves[1];


      const tokenSupply = await tokenContract.totalSupply();
      // const tokenReserve = contractAddress.toLowerCase() === pairAddress.toLowerCase() ? reserve0 : reserve1;
      // const circulatingSupply = tokenSupply.sub(tokenReserve);


      let supply = tokenSupply.toString();
      supply = ethers.utils.formatUnits(supply, decimalstoken);


      //burn supply
      const burnAddress = '0x000000000000000000000000000000000000dead';
      let burnBalance = await tokenContract.balanceOf(burnAddress);
      burnBalance = burnBalance.toString();
      burnBalance = ethers.utils.formatUnits(burnBalance, decimalstoken);

      //circulating supply
      supply = supply - burnBalance

      //token price in BNB
      let bnbInUsd = await routerContract.getAmountsOut(ethers.utils.parseEther('1'), [wBNB, usd])
      bnbInUsd = ethers.utils.formatEther(bnbInUsd[1], 18);
      let tokenPrice = await routerContract.getAmountsOut(1000000000, [contractAddress, wBNB])
      tokenPrice = ethers.utils.formatEther(tokenPrice[1]);

      //token price in USD
      let finalTokenPrice = (tokenPrice * bnbInUsd)


      let tokenMarketCap = finalTokenPrice.toFixed(18) * supply
      // tokenMarketCap = parseInt(tokenMarketCap)

      tokenMarketCap = tokenMarketCap.toFixed(2)
      finalTokenPrice = finalTokenPrice.toFixed(8)

      setTokenPrie(finalTokenPrice)
      setMcap(tokenMarketCap)


      if (address) {

        const walletAddress = address;

        //bnb balance
        let bnbBalance = await tokenContract.balanceOf(walletAddress);
        bnbBalance = bnbBalance.toString();
        bnbBalance = ethers.utils.formatUnits(bnbBalance, 18);
        setBNBBalance(bnbBalance);

        // token Balance
        let balance = await tokenContract.balanceOf(walletAddress);
        balance = balance.toString();
        balance = ethers.utils.formatUnits(balance, 9);
        setBalance(balance);
      }
    }

    checkTokenBalance();
  }, [address]);

  return (
    <div>
      <h1>{bnbBalance}</h1>
      <h1>{tokenBalance}</h1>
      <h1>{tokenPrice}</h1>
      <h1>{tokenMarketCap}</h1>
    </div>
  );
}
