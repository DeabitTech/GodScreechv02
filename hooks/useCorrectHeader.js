import React, { useState,createContext,useContext, useEffect } from 'react';
import { StatusBar,Platform } from 'react-native';

const HeightContext = createContext({})

export const HeightProvider = ({children}) => {
    const [correctHeight,setCorrectHeight] = useState(0);
    const [correctBehavior,setCorrectBehavior] = useState("")
    useEffect(()=>{
        Platform.OS === "android" ? setCorrectHeight(StatusBar.currentHeight)  : setCorrectHeight(0);
        Platform.OS === "ios" ? setCorrectBehavior("padding") : setCorrectBehavior("height");

    },[])

    return (
        <HeightContext.Provider value={{
            height: correctHeight,
            behavior: correctBehavior
        }}>
            {children}
        </HeightContext.Provider>
    )


}

export const useCorrectHeight = () => {
    return useContext(HeightContext)
}
