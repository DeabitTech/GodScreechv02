import React, { useEffect,useState } from 'react'
import { useWallet } from '../../hooks/useWallet';
import { getEtherBalance } from '../../lib/walletActions';
import { View, Text,TouchableOpacity,TextInput } from 'react-native'
import tw from 'tailwind-rn'
import { FixedNumber } from 'ethers';


const NativeSendTab = () => {
    const {wallet,sendAsset} = useWallet()
    const [transaction,setTransaction] = useState()
    const [addressTo,setAddressTo] = useState("");
    const [amountSend,setAmountSend] = useState();
    const [nativeCoinBalance,setNativeCoinBalance] = useState(0)
    
    
    const getBalance = async () => {let balanceNative = await getEtherBalance(wallet); setNativeCoinBalance(balanceNative);} 
    const sendAssetNative = async () => {
        let tx
        tx = await sendAsset(wallet,addressTo,amountSend,"ETH"); 
    
        setTransaction(tx)
    }
    
    
    return (
        <View style={tw("flex-1 items-center mt-5 ")}>
            <View style={tw("flex-row items-center mt-5")}>
            <TouchableOpacity onPress={getBalance} style={tw("w-32 p-3 rounded-xl bg-green-400")}>
                <Text style={[tw("text-center text-white text-xl"),{fontFamily:'Nunito_600SemiBold'}]}>Balance</Text>
            </TouchableOpacity>
            <Text style={[tw("text-3xl pl-2"),{fontFamily:'Nunito_600SemiBold'}]} numberOfLines={1}>{Number(nativeCoinBalance)?.toFixed(4)} BNB</Text>    
            </View>
            <Text style={[tw("text-center text-xl p-4 text-red-400"),{fontFamily:'Nunito_600SemiBold'}]}>Inserisci l'indirizzo del destinatario</Text>
            <TextInput 
                style={[tw("text-center text-xl pb-2 w-72"),{fontFamily:'Nunito_600SemiBold'}]} 
                placeholder="Address di destinazione"
                value={addressTo}
                numberOfLines={1}
                onChangeText={setAddressTo}
                />     
            <Text style={[tw("text-center p-4 text-xl text-red-400"),{fontFamily:'Nunito_600SemiBold'}]}>Inserisci l'importo che vuoi inviare</Text>
            <TextInput 
                style={[tw("text-center text-xl pb-2 w-44"),{fontFamily:'Nunito_600SemiBold'}]} 
                placeholder="Importo da inviare"
                keyboardType='numeric'
                value={amountSend}
                onChangeText={setAmountSend}
                />
            <TouchableOpacity onPress={sendAssetNative} style={tw("w-32 p-3 rounded-xl bg-green-400 items-center mt-5")}>
                <Text style={[tw("text-center text-white text-xl"),{fontFamily:'Nunito_600SemiBold'}]}>Invia</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NativeSendTab
