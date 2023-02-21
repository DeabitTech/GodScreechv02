import { View, Text, TextInput,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-rn'

const LoginForm = ({signIn,sheetRef}) => {
    const [password,setPassword] = useState();
    const [email,setEmail] = useState();
    const login = () => {
        signIn(email,password)
        sheetRef.current.close();
    }
  return (
    <View style={tw("items-center mt-5")}>
        <View style={tw("flex-col items-center pt-1 h-full py-16" )}>
            <View style={tw("flex-col items-center")}>
                <Text style={[tw("text-center p-4 text-3xl text-red-400"),{fontFamily:'Nunito_600SemiBold'}]}>Inserisci email</Text>
                <TextInput 
                    style={[tw("text-center text-lg pb-2 w-44 border-b-2"),{fontFamily:'Nunito_600SemiBold'}]} 
                    placeholder="email@address.com"
                    value={email}
                    textContentType={"emailAddress"}
                    onChangeText={text=>setEmail(text)}
                    />
            </View>
            <View style={tw("flex-col items-center mt-24")}>
                <Text style={[tw("text-center p-4 text-3xl text-red-400"),{fontFamily:'Nunito_600SemiBold'}]}>Inserisci password</Text>
                <TextInput 
                    style={[tw("text-center text-lg pb-2 w-44 border-b-2"),{fontFamily:'Nunito_600SemiBold'}]} 
                    placeholder="password"
                    value={password}
                    textContentType={"password"}
                    onChangeText={text=>setPassword(text)}
                    />
            </View>
            <TouchableOpacity onPress={login} style={tw("w-32 p-3 rounded-xl bg-yellow-300 items-center mt-16 w-56")}>
                    <Text style={tw("text-center text-white text-xl")}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={tw("w-32 p-3 rounded-xl  items-center mt-16 w-56")}>
                    <Text style={tw("text-center text-green-400 text-xl border-b-2 border-green-400 ")}>reset password</Text>
            </TouchableOpacity>
        </View>
        
    </View>
  )
}

export default LoginForm