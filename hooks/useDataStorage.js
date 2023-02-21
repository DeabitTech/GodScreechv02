
import { useState } from 'react'
//import { collection, doc, getDoc, onSnapshot, serverTimestamp, setDoc } from '@firebase/firestore';
//import { db } from '../firebase';
import { supabase } from '../supabase';
import { saveMediaToStorage } from '../lib/storageHelpers';
import { uidClip } from '../lib/generateIdClip';
const useDataStorage = () => {
    const [contents,setContents] = useState([]);
    const [filteredContents,setFilteredContents] = useState([]);
    const [userSelected,setUserSelected] = useState({})
    const [subscribedUsers,setSubscribedUsers] = useState([])
    const [subscriChats,setSubscriChats] = useState([])
    const [messages,setMessages] = useState([])
    const fetchContents = async (userId) =>{

        const {data, error} = await supabase.from("contents").select();
        console.log('sti cazzo di dati ', data, error)
        if(!error){
            setContents(
                data?.filter(doc=>doc.authorId !==userId)
                .map(doc=>({...doc}))
            )
        }
        else{
            alert(JSON.stringify(error))
        }



    }

    const fetchContentsByUser = (userId) => {
       
        if(contents.length>0){
            setFilteredContents(contents.filter(content=>content.authorId === userId));
        }
        else {
            supabase.from("contents").select().then((data,error)=>{
                if(!error){
                    setFilteredContents(
                        data.data?.filter(doc=>doc.authorId ===userId)
                        .map(doc=>({...doc}))
                    )
                }
                else{
                    alert(JSON.stringify(error))
                }

            });


        }
        
    }

    const fetchContentsByArtist = (artistId) => {
      
        if(contents.length>0){
            setFilteredContents( contents.filter(content=>content.authorId === artistId));
        }
        else {
            supabase.from("contents").select().then((data,error)=>{
                if(!error){
                    setFilteredContents(
                        data.data?.filter(doc=>doc.authorId ===artistId)
                        .map(doc=>({...doc}))
                    )
                }
                else{
                    alert(JSON.stringify(error))
                }    
            
            
            })
               
                
            
            
            
        }
        
        
    }
    
    const fetchUser = async (userId) =>{
        const {data} = await supabase.from('users').select().eq('id',userId).single()
        console.log(userId,data)
        return data;
    }

    const fetchSubscribers = (userId) => {
        let subs = []
        supabase.from('subscriptions').select().like('id',`%${userId}%`)
        .then((data,error)=>{
            data.data?.map((sub)=>{
                subs.push(sub.users[sub.usersInSubscription[1]]); 
            })
            setSubscribedUsers(subs); 
        })
    }

    const fetchMessages = (subscriptionId) =>{
        let msgs = []
        let bigObj = {}
        supabase.from('subscriptions').select('messages').eq('id',subscriptionId)
        .then((data)=>{
            let msgs = Object.values(data.data[0].messages).sort((a,b)=>new Date(b.timestamp).getTime()- new Date(a.timestamp).getTime())
            
            setMessages(msgs);
        })
    }

    const fetchSubscribersChats = (userId) =>{
        supabase.from('subscriptions').select().like('id',`%${userId}%`)
        .then((data,error)=>{
            setSubscriChats(data.data);
        })
    }

    const fetchInsertMsgEvent = () => {
        let msgs = []
        return supabase.channel('public:subscriptions').on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'subscriptions' },(payload)=>{
            msgs = Object.values(payload.new.messages).sort((a,b)=>new Date(b.timestamp).getTime()- new Date(a.timestamp).getTime())
            setMessages(msgs)
        }).subscribe()
    }

    const addNewUser = (avatarUrl, name, age, isArtist, id) => {
        const previewForm = {
            uri: avatarUrl,
            type: "image/jpg",
            name: id
        }
        const preview = new FormData();
        preview.append('image', previewForm);
        let savedPropicPromise = Promise.all([saveMediaToStorage(preview,`${id}/Propic`,false,true)]);

        savedPropicPromise.then((propicUrl)=>{
            console.log('vediamo url propic ', propicUrl)
            supabase.from('users').insert({
                id:id,
                displayName:name,
                photoURL:propicUrl[0],
                artistType:"ASMR",
                isArtist:isArtist,
                age:age,
                timestamp: new Date()
            }).then((data,error)=>{
                console.log('ora vediamo insert in table', data);
            })
        });
    }

    const addNewContent = (id,created_at,authorId,authorName,authorPhoto,description,price,preview,video) =>{
        supabase.from('contents').insert({
            created_at,
            authorId,
            authorPhoto,
            authorName,
            description,
            price:Number(price),
            preview,
            video
        })
        .then((data,error)=>{
            console.log('insert content ', data);
        })
    }

    const addGodyBadyMatch = (userId,id,contentSwiped,swipeType) =>{
        if(swipeType ==='bady'){
            let pastBady;
           supabase.from('users').select('bady').eq('id',userId).single().then((data,error)=>{
                
                pastBady = data.data?.bady
                console.log('i pastbady', pastBady)
                supabase.from('users').update({bady:pastBady? {...pastBady,[id]:contentSwiped}:{[id]:contentSwiped}})
                .eq('id',userId)
                .then((data,error)=>{
                    console.log('vediamo qua ', data)
                })
           })

        }
        else if(swipeType ==='gody'){
            let pastGody;
            supabase.from('users').select('gody').eq('id',userId).single().then((data,error)=>{
                //fare alert se un content c'e gia 
                pastGody = data.data?.gody
                 console.log('i pastgody', pastGody)
                 supabase.from('users').update({gody:pastGody ?{...pastGody,[id]:contentSwiped}:{[id]:contentSwiped}})
                 .eq('id',userId)
                 .then((data,error)=>{
                     console.log('vediamo qua ', data)
                 })
            })
        }
    }

    const addNewSubscription = (user,artistSelected, subscriptionId) => {
        supabase.from('subscriptions').insert({
            id:subscriptionId,
            created_at:new Date(),
            users:{
                [user.id]:{
                            id:user.id,
                            displayName:user.displayName,
                            age:user.age,
                            displayType:user.displayType,
                            photoURL:user.photoURL,
                            created_at:user.created_at
                        },
                [artistSelected.id]:{
                            id:artistSelected.id,
                            displayName:artistSelected.displayName,
                            age:artistSelected.age,
                            displayType:artistSelected.displayType,
                            photoURL:artistSelected.photoURL,
                            created_at:artistSelected.created_at
                        }
            },
            usersInSubscription:[user.id,artistSelected.id]
        })
        .then((data,error)=>{
            if(!error){
                console.log(data);
            }
        })
    }

    const addNewMessage = (subscriptionId,message) => {
        let uid = uidClip();
        message.id = uid;
        let pastMessages;
        supabase.from('subscriptions').select('messages').eq('id',subscriptionId).single().then((data,error)=>{
            //console.log('questo vaso ad inserire ', {...pastMessages,[uid]:message})
            pastMessages = data.data?.messages === null ? null : data.data;
            //console.log('questi i past messages', pastMessages)
           
            supabase.from('subscriptions').update({messages:pastMessages ?{...pastMessages.messages,[uid]:message}:{[uid]:message}})
                 .eq('id',subscriptionId)
                 .then((data,error)=>{
                     
            })

        })
    }


    

  return {
            contents,
            filteredContents,
            userSelected,
            subscribedUsers,
            subscriChats,
            messages,
            fetchContents,
            fetchContentsByArtist,
            fetchContentsByUser,
            fetchUser,
            fetchSubscribers,
            fetchSubscribersChats,
            fetchMessages,
            fetchInsertMsgEvent,
            addNewUser,
            addNewContent,
            addGodyBadyMatch,
            addNewSubscription,
            addNewMessage,
            
        }
}

export default useDataStorage