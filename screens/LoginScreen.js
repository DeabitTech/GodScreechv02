import React, { useState,useRef } from 'react'
import { SafeAreaView,View, Text,Button, ImageBackground, TouchableOpacity,Image } from 'react-native'
import { useAuth } from '../hooks/useAuth'
import { useCorrectHeight } from '../hooks/useCorrectHeader';
import tw from 'tailwind-rn'
import Streaming from '../assets/streaming.svg'
import ReusableBottomSheet from './components/ReusableBottomSheet';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import useDataStorage from '../hooks/useDataStorage';
const LoginScreen = () => {
    const {height,behavior} = useCorrectHeight()
    const {signIn,signUp} = useAuth()
    const {addNewUser} = useDataStorage();
    const [takeLogin,setTakeLogin] = useState(false)
    const [takeRegister,setTakeRegister] = useState(false)
    const sheetRef = useRef(null)
    const [isOpen,setIsOpen] = useState(false)
    const snapPoints = ["75%","90%"]
    const login = () => {
        setTakeLogin(true);
        sheetRef.current.snapToIndex(1);
    }
    const register = () => {
        setTakeRegister(true);
        sheetRef.current.snapToIndex(1);
    }
  
    return (
        <SafeAreaView style={[tw("flex-1 items-center mt-5"),{paddingTop:height}]}>
            <TouchableOpacity style={tw("flex-row")}>
                <Text style={[tw("text-3xl text-green-500"),{fontFamily:'Nunito_600SemiBold'}]}>God</Text>
                <Text style={[tw("text-3xl text-yellow-300"),{fontFamily:'Nunito_600SemiBold'}]}>Screech</Text>
            </TouchableOpacity>
            <View style={tw("items-center")}>
              <Streaming width="300px" height="600px"/>
            </View>
           
            <View style={tw("absolute bottom-20 items-center")}>
                <TouchableOpacity onPress={login} style={tw("w-32 p-3 rounded-xl bg-green-400 items-center mt-5")}>
                    <Text style={tw("text-center text-white text-xl")}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={register} style={tw("w-32 p-3 rounded-xl bg-yellow-300 items-center mt-5")}>
                    <Text style={tw("text-center text-white text-xl")}>Register</Text>
                </TouchableOpacity>
              
            </View>
            <ReusableBottomSheet
                 sheetRef={sheetRef}
                 snapPoints={snapPoints}
                 isOpen={isOpen}
                 setIsOpen={setIsOpen} 
                 onDismiss={()=>{setTakeLogin(false); setTakeRegister(false)}}  
            
            >
                {takeLogin ?
                    <LoginForm signIn={signIn} sheetRef={sheetRef} behavior={behavior}/>
                :takeRegister ?
                    <RegisterForm signUp={signUp} addNewUser={addNewUser} sheetRef={sheetRef} behavior={behavior}/>
                : null
            
                }
            </ReusableBottomSheet>
        </SafeAreaView>
    )
}

export default LoginScreen
