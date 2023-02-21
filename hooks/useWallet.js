import React, { createContext,useContext,useEffect,useMemo,useState} from 'react';
import { createWallet,loadWallet,sendAsset,getProvider } from '../lib/wallet';

const WalletContext = createContext({

})

export const WalletProvider = ({children}) => {
    const [error,setError] = useState(null)
    const [wallet,setWallet] = useState()
    const [loading,setLoading] = useState(false)

    const getWallet = async () => {
        const wllt = await loadWallet("PRIVATE_KEY","")
      
        setWallet(wllt);
    }

    const createWllt = async () => {
        const wllt = await createWallet()
      
        setWallet(wllt)
    }
    
    useEffect(()=>{
        getWallet()
    },[])
 

    const memoedValue = useMemo(()=>({
        wallet,
        loading,
        error,
        createWllt,
        loadWallet,
        sendAsset,
        getProvider,
        getWallet
        
    }),[wallet,loading,error,createWllt,sendAsset,loadWallet,getProvider,getWallet])

    return (
        <WalletContext.Provider value={memoedValue}>
            {!loading && children}
        </WalletContext.Provider>
    )
}

export const useWallet = () => {
    return useContext(WalletContext)
}