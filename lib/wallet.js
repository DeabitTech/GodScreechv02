import AsyncStorage from '@react-native-async-storage/async-storage';
//import * as Random from 'expo-random';
import { generateSecureRandom } from 'react-native-awesome-secure-random';
import "@ethersproject/shims"
import { ethers } from 'ethers'
import { sendEther, sendToken } from './walletActions';

const PRIVATE_KEY_STORAGE_KEY = 'Ethereum.privatekey'





const generateMnemonics = async () => {
    const randomBytes = await generateSecureRandom(16)
  return ethers.utils.entropyToMnemonic(randomBytes).split(' ')
}

const loadWalletFromMnemonics = async (mnemonics) => {
  if (!(mnemonics instanceof Array)) throw new Error('invalid mnemonic');

  const provider = getProvider()
  provider.getBalance = provider.getBalance.bind(provider)
  const wallet = ethers.Wallet.fromMnemonic(mnemonics.join(' ')).connect(provider)
  return wallet
}

export const getProvider = () =>{
  
    return new ethers.providers.StaticJsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/",97)
}

const loadWalletFromPrivateKey = async (privateKey) => {
  const provider = getProvider()
  provider.getBalance = provider.getBalance.bind(provider)
  const wallet = new ethers.Wallet(privateKey, provider)
  return wallet
}

export const createWallet = async () => {
    
  const mnemonics = await generateMnemonics()
 
  const wallet = await loadWalletFromMnemonics(mnemonics)
  await AsyncStorage.setItem(PRIVATE_KEY_STORAGE_KEY, JSON.stringify(wallet.privateKey))
 
  return wallet
}

export const loadWallet = async (type, mnemonics) => {
  switch(type) {
    case "PRIVATE_KEY":
        //password da mettere
      const privateKey = await AsyncStorage.getItem(PRIVATE_KEY_STORAGE_KEY)
      if (!privateKey) throw new Error(`No private key in storage`)
      return loadWalletFromPrivateKey(JSON.parse(privateKey))
    case "MNEMONICS":
      if (!mnemonics) throw new Error(`No mnemonics provided`)
      return loadWalletFromMnemonics(mnemonics)
  }
}

export const sendAsset = async (wallet,to,amount,type) => {
    console.log(to,amount,type)
  return type === "ETH" ? await sendEther(wallet,to,amount,type) : await sendToken(wallet,to,amount,type)
}