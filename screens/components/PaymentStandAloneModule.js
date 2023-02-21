import React from 'react'
import { View, Text,TouchableOpacity } from 'react-native'
import tw from 'tailwind-rn'

const PaymentStandAloneModule = ({isVisible,setIsVisible,amount,amountFee,totalAmount}) => {
    return (
        <View style={tw("mt-3")}>
            <View style={tw("flex-col justify-between py-3 px-5 bg-white mx-3 my-1 rounded-lg")}>
                <View style={tw("flex-row justify-between")}>
                <Text style={[tw("text-xl"),{fontFamily:'Nunito_600SemiBold'}]}>Amount</Text>
                <Text style={[tw("text-xl"),{fontFamily:'Nunito_600SemiBold'}]}>{amount} GOS</Text>
                </View>
                <View style={tw("flex-row justify-between")}>
                <Text style={[tw("text-xs"),{fontFamily:'Nunito_200ExtraLight'}]}>Network Fee</Text>
                <Text style={[tw("text-xs"),{fontFamily:'Nunito_200ExtraLight'}]}>{amountFee} BNB</Text>
                </View>
                <View style={tw("flex-row justify-between mt-5")}>
                <Text style={[tw("text-xl"),{fontFamily:'Nunito_700Bold'}]}>Total Amount</Text>
                <Text style={[tw("text-xl"),{fontFamily:'Nunito_700Bold'}]}>{totalAmount}</Text>
                </View>
                <View style={tw("flex-row justify-between")}>
                <Text></Text>
                <Text style={[tw("text-xs"),{fontFamily:'Nunito_200ExtraLight'}]}>$ {amountFee}</Text>
                </View>
            </View>
                <View style={tw("flex-row justify-between")}>
                    <TouchableOpacity style={tw("w-32 p-3 rounded-xl bg-green-400 items-center mt-5")}>
                        <Text style={[tw("text-center text-white text-xl"),{fontFamily:'Nunito_600SemiBold'}]}>Pay Clip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setIsVisible(!isVisible)} style={tw("w-32 p-3 bg-yellow-300 rounded-xl items-center mt-5")}>
                        <Text style={[tw("text-center text-white text-xl"),{fontFamily:'Nunito_600SemiBold'}]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
        </View>
    )
}

export default PaymentStandAloneModule
