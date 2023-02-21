import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import tw from 'tailwind-rn'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useAuth } from '../../hooks/useAuth'
import getSubscribedUserInfo from '../../lib/getSubscribedUserInfo'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase'
import { supabase } from '../../supabase'

const ChatRow = ({subscribedDetails}) => {
    const [subscribedUserInfo,setSubscribedUserInfo] = useState();
    const [lastMessage,setLastMessage] = useState("")
    const navigation = useNavigation()
    const {user} = useAuth()

    useEffect(()=>{
        setSubscribedUserInfo(getSubscribedUserInfo(subscribedDetails?.users,user.id))
    },
    [subscribedDetails,user])

    useEffect(()=>{
        // onSnapshot(query(collection(db,"subscriptions",subscribedDetails.id,"messages"),
        // orderBy("timestamp","desc")),
        // snapshot=>setLastMessage(snapshot.docs[0]?.data()?.message) )
        let lst = supabase.from('subscriptions').select('messages').single()
        .then((data)=>{
            let lastMsg = Object.values(data.data?.messages).sort((a,b)=>new Date(b.timestamp).getTime()- new Date(a.timestamp).getTime())[0].message
            setLastMessage(lastMsg);
        })

        return lst;

    },[subscribedDetails,db])

    return (
        <TouchableOpacity
            style={tw("flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg")}
            onPress={()=>navigation.navigate("Message",{
                subscribedDetails
            })}
        >
            <Image
                style={tw("rounded-full h-16 w-16 mr-4")}
                source={{uri:subscribedUserInfo?.photoURL}}
            />
            <View>
                <Text style={[tw("text-lg font-semibold"),{fontFamily:'Nunito_600SemiBold'}]}>
                    {subscribedUserInfo?.displayName}
                </Text>
                <Text style={[tw("text-lg"),{fontFamily:'Nunito_600SemiBold'}]}>{lastMessage?.includes("http")?'media':lastMessage}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ChatRow
