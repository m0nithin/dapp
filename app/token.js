'use client'

import { useAccount } from 'wagmi';
import { useIsMounted } from './useIsMounted';
import { useEffect, useState } from 'react';
import Image from 'next/image';
const { ethers } = require("ethers");
const abi = require("./tokenAbi.json");
const factoryAbi = require("./factoryAbi.json");
const routerAbi = require('./routerAbi.json')
const pairAbi = require('./pairAbi.json')


export default function Home() {
    const { address } = useAccount();
    const [ethPrice, setethPrice] = useState("0000000");
    const [bnbBalance, setBNBBalance] = useState("0000000");
    const [tokenBalance, setBalance] = useState("0000000");
    const [tokenPrice, setTokenPrie] = useState("000000");
    const [tokenMarketCap, setMcap] = useState("000000");
    const mounted = useIsMounted();

    /* ETH */
    const contractAddress = "0x6982508145454Ce325dDbE47a25d4ec3d2311933";
    const routerAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
    const factoryAddress = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"
    const wETH = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    const usd = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"

    /* BSC */
    // const contractAddress = "0x28a9af9e1b1641c4532ad91d90a003b4a3a7dc32";
    // const routerAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E"
    // const factoryAddress = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73"
    // const wBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    // const usd = "0x55d398326f99059fF775485246999027B3197955"

    useEffect(() => {
        async function checkTokenBalance() {

            //provider
            const provider = new ethers.providers.JsonRpcProvider("https://wild-necessary-sailboat.discover.quiknode.pro/6e859a94316331c04b67706fac4ed970dc8681ab/");
            const tokenContract = new ethers.Contract(contractAddress, abi, provider);
            const decimalstoken = await tokenContract.decimals()

            //router and factory contract
            const routerContract = new ethers.Contract(routerAddress, routerAbi, provider)
            const factoryContract = new ethers.Contract(factoryAddress, factoryAbi, provider);

            const pairAddress = await factoryContract.getPair(contractAddress, wETH);
            const pairContract = new ethers.Contract(pairAddress, pairAbi, provider);

            const reserves = await pairContract.getReserves();
            const reserve0 = reserves[0];
            const reserve1 = reserves[1];


            //token price in BNB
            let bnbInUsd = await routerContract.getAmountsOut(ethers.utils.parseEther("1"), [wETH, usd])
            bnbInUsd = bnbInUsd[1] / (1 * Math.pow(10, 6))

            setethPrice(bnbInUsd)

            let tokenPrice = await routerContract.getAmountsOut(ethers.utils.parseEther("1"), [contractAddress, wETH])
            tokenPrice = ethers.utils.formatEther(tokenPrice[1]);

            //token price in USD
            let finalTokenPrice = (tokenPrice * bnbInUsd)

            const tokenSupply = await tokenContract.totalSupply();

            const tokenReserve = contractAddress.toLowerCase() === pairAddress.toLowerCase() ? reserve0 : reserve1;
            const circulatingSupply = tokenSupply.sub(tokenReserve);



            let supply = circulatingSupply.toString();
            supply = ethers.utils.formatUnits(supply, decimalstoken);

            const circulatingSupplyLiq = finalTokenPrice.toFixed(18) * supply
            console.log(circulatingSupplyLiq)


            //burn supply
            const burnAddress = '0x000000000000000000000000000000000000dead';
            let burnBalance = await tokenContract.balanceOf(burnAddress);
            burnBalance = burnBalance.toString();
            burnBalance = ethers.utils.formatUnits(burnBalance, decimalstoken);

            //circulating supply
            supply = supply - burnBalance


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
    }, []);

    return ethPrice, bnbBalance, tokenBalance, tokenPrice, tokenMarketCap;
}
