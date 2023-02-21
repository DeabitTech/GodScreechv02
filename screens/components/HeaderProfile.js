import React from 'react'
import { View, Text,TouchableOpacity } from 'react-native'
import tw from 'tailwind-rn'
import { Ionicons, Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const HeaderProfile = ({title,logout}) => {
    const navigation = useNavigation()
    return (
        <View style={tw("p-2 flex-row items-center justify-between")}>
            <View style={tw("flex flex-row items-center")}>
            <TouchableOpacity onPress={()=> navigation.goBack()} style={tw("p-2")}>
                <Ionicons name="chevron-back-outline" size={34} color="#FF5864"/>
            </TouchableOpacity>
            <Text style={[tw("text-2xl pl-2"),{fontFamily:'Nunito_600SemiBold'}]}>{title}</Text>
            </View>
            {logout && (
                <TouchableOpacity style={tw("rounded-full mr-4 p-3 bg-red-200")} onPress={logout}>
                    <Feather name="log-out" size={20} color="red"/>
                </TouchableOpacity>
            )}
            
        </View>
    )
}

export default HeaderProfile
