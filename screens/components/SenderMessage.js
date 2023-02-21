import { Video } from 'expo-av'
import React from 'react'
import { View, Text,Image } from 'react-native'
import tw from 'tailwind-rn'
const SenderMessage = ({msg}) => {
    return (
        <View
            style={[tw("bg-yellow-300 rounded-lg rounded-tr-none px-4 py-3 mx-3 my-2"),{alignSelf:"flex-start",marginLeft:"auto"}]}
        >
            {msg.type && msg.type.includes('img')
                ?
                <Image source={{uri:msg.message}} style={[tw("w-44 h-52  rounded-lg"),{resizeMode: 'cover'}]}/>
                :msg.type && msg.type.includes('video') ?
                <Video source={{uri:msg.message, overrideFileExtensionAndroid:".mp4"}}
                    resizeMode="cover"
                    useNativeControls={true}
                    volume={5.0} 
                    style={tw("w-44 h-60 rounded-lg")}/>
                
                :
                <Text style={tw("text-white")}>{msg.message}</Text>
            }
        </View>
    )
}

export default SenderMessage
