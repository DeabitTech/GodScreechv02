import { collection, onSnapshot, query , where} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import ChatRow from './ChatRow'
import tw from 'tailwind-rn'
import { db } from '../../firebase'
import { useAuth } from '../../hooks/useAuth'
import useDataStorage from '../../hooks/useDataStorage'

const ChatList = () => {
    const {user} = useAuth()
   
    const {fetchSubscribersChats,subscriChats} = useDataStorage()
    useEffect(()=>{
        // onSnapshot(query(
        //     collection(db,"subscriptions"),
        //     where("usersInSubscription","array-contains",user.uid) 
        //     ), 
        //     (snapshot)=>
        //         setSubscriChats(
        //             snapshot.docs.map((doc)=>({
        //                 id:doc.id,
        //                 ...doc.data()
        //             }))
        //         )
        //     )
        let chats = fetchSubscribersChats(user.id);
        return chats;
    },[user])
    console.log(subscriChats)
   
    return subscriChats.length > 0 ? 
        (
            <FlatList
                data={subscriChats}
                keyExtractor={item=>item.id}
                renderItem={({item})=><ChatRow subscribedDetails={item}/>}
            />
        ) :
        (
         <View style={tw("p-5")}>
             <Text style={tw("text-center text-lg")}>Non hai subscription attive al momento</Text>
         </View>   
        )
    
}

export default ChatList
