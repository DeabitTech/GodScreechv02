import { ethers } from 'ethers'
import erc20ABI from '../contractsABI/erc20ABI';

export const sendEther = async (wallet, to, amount) => {
    const network = await wallet.provider.getNetwork()
    const transaction = await wallet.sendTransaction({
      to,
      value: ethers.utils.parseEther(amount.toString()),
      chainId: network.chainId
    });
    return transaction
}


export const sendToken = async (wallet,to,amount,type) => { 
    if (type === "ETH") throw new Error('Use sendEther function to send ETH')
  
    const tokenAddress = "0x70FE32815e5aae69cbfC20f7Fe249f2A70034052"
    const contract = new ethers.Contract(tokenAddress, erc20ABI, wallet)
    const decimals = await contract.decimals()
    const transaction = await contract.transfer(to, ethers.utils.parseUnits(amount.toString(), decimals))
    return transaction
  }
  

export const getEtherBalance = async (wallet) => {
    const balance = await wallet.provider.getBalance(wallet.address)
    return Number(ethers.utils.formatEther(balance))
}

export const getTokenBalance = async (wallet) => {
   
    const contract = new ethers.Contract("0x70FE32815e5aae69cbfC20f7Fe249f2A70034052", erc20ABI, wallet)
    const balance = await contract.balanceOf(wallet.address);
    const decimals = await contract.decimals()
    const tokenBalance = ethers.utils.formatUnits(balance, decimals)
    return Number(tokenBalance)
}
  