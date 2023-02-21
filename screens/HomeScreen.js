import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Text,SafeAreaView, View, TouchableOpacity, Image,StyleSheet } from 'react-native'
import generateId from '../lib/generateIdSubscription'
import Ionicons from 'react-native-vector-icons/Ionicons'
import tw from 'tailwind-rn'
import Swiper from 'react-native-deck-swiper'
import { useNavigation } from '@react-navigation/core'
import { useAuth } from '../hooks/useAuth';
import { useCorrectHeight } from '../hooks/useCorrectHeader';
import ModalPayment from './components/ModalPayment'
import { useWallet } from '../hooks/useWallet';
import HomeClip from './components/HomeClip';
import {MaterialCommunityIcons} from 'react-native-vector-icons';
import useDataStorage from '../hooks/useDataStorage';
import Cassette from '../assets/Cassette.svg'




const HomeScreen = () => {
    const [isArtist,setIsArtist] = useState(false)
    const [isVisible,setIsVisible] = useState(false)
    const [payed,setPayed] = useState(false)
    const [cardIndex,setCardIndex] = useState()
    const [loggedInProfile,setLoggedInProfile] = useState({})
    const navigation = useNavigation();
    const {logout,user,session} = useAuth();
    const {contents,userSelected, fetchContents,fetchUser,addGodyBadyMatch,addNewSubscription} = useDataStorage()
    const {wallet} = useWallet()
    const {height} = useCorrectHeight()
    const swipeRef = useRef(null)
    const sheetRef = useRef(null)
    const [isOpen,setIsOpen] = useState(false)
    useLayoutEffect(()=>{
        // onSnapshot(doc(db,"users",user.id),snapshotUser=>{
        //   if(snapshotUser.exists() && !wallet){
        //     navigation.navigate("Register",{userFinded:snapshotUser.exists(),artistFinded:false,wallet:wallet})
        //     return;
        //   }
        //   else if(!snapshotUser.exists()){
        //     onSnapshot(doc(db,"artist",user.id),snapshotArtist=>{
        //       setIsArtist(!isArtist)
        //       if(!snapshotArtist.exists()){
                
        //         navigation.navigate("Register",{userFinded:snapshotUser.exists(),artistFinded:snapshotArtist.exists(),wallet:wallet})
        //       }
        //       else if(snapshotArtist.exists() && !wallet){
             
        //         navigation.navigate("Register",{userFinded:snapshotUser.exists(),artistFinded:snapshotArtist.exists(),wallet:wallet})
        //       }
        //     })
        //   }
        // })

        

      
    },[])
    
    useEffect(()=>{
      setLoggedInProfile(user);
      fetchContents(user.id);
      
    },[])
   
   
    const swipeRight = async (cardInd) => {
      if(!contents[cardInd]) return;
      setCardIndex(cardInd)
      sheetRef.current?.snapToIndex(0);
      
    }

    const buyClip = async () => {
      const contentSwiped = contents[cardIndex]
      //acquisto singolo content
      //addGodyBadyMatch(user.id,contentSwiped.id,contentSwiped,'gody')
      
      //acquisto subscription
      const artistSelected = await fetchUser(contentSwiped.authorId);
      addNewSubscription(loggedInProfile,artistSelected,generateId(user.id,contentSwiped.authorId));
      navigation.navigate("Subscribed",{loggedInProfile,artistSelected})
     
    }
    
    const swipeLeft = (cardIndex) => {
      if(!contents[cardIndex]) return;
      const contentSwiped = contents[cardIndex]
      addGodyBadyMatch(user.id,contentSwiped.id,contentSwiped,'bady');
    }

    
   
   
    return (
        <SafeAreaView style={[tw("flex-1"),{paddingTop:height}]}>

            <View style={tw("flex-row justify-between items-center px-5")}>
                <TouchableOpacity onPress={()=>navigation.navigate("Profile")}>
                    {user?.photoURL?

                      <Image style={tw("w-10 h-10 rounded-full")} source={{uri:user?.photoURL}}/>
                      :
                      <MaterialCommunityIcons name="apple-keyboard-command" size={24} color={tw("text-yellow-300")} />
                    }
                </TouchableOpacity>
                <TouchableOpacity style={tw("flex-row items-center")}>
                  <Text style={[tw("text-3xl text-green-500"),{fontFamily:'Nunito_600SemiBold'}]}>God</Text>
                  <Text style={[tw("text-3xl text-yellow-300"),{fontFamily:'Nunito_600SemiBold'}]}>Screech</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate("Chat")}>
                    <Ionicons name="chatbubble" size={30} color="#48bb78"/>
                </TouchableOpacity>
            </View>

            <View style={tw('flex-1 -mt-6')}>
            <Swiper cards={contents}
                ref={swipeRef}
                containerStyle={{backgroundColor:"transparent" }}
                cardIndex={0}
                animateCardOpacity
                verticalSwipe={false}
                onSwipedRight={(cardIndex)=>swipeRight(cardIndex)}
                onSwipedLeft={(cardIndex)=>swipeLeft(cardIndex)}
                overlayLabels={
                  {
                    left:{
                      title:"BADY",
                      style:{
                        label:{
                          zIndex:999999,
                          textAlign:"right",
                          color:"red"
                        }
                      }
                    },
                    right:{
                      title:"GODY",
                      style:{
                        label:{
                          zIndex:99999,
                          color:"green"
                        }
                      }
                    }

                  }
                }
                renderCard={card=> card ?(
                  <HomeClip key={card?.id} allContents={contents} video={card?.video} authorId={card?.authorId} authorName={card?.authorName} authorPhoto={card?.authorPhoto} style={styles.cardShadow} swipeRef={swipeRef}/>
                    
                ):(
                  <View style={[tw("relative bg-white h-full overflow-hidden"),styles.cardShadow]}>
                  <Cassette height="100%" width="100%" viewBox="0 50 230 148"
                    
                  />
                </View>
                )
                }
                
                />
            </View>
            
           <ModalPayment 
              buyClip={buyClip} 
              sheetRef={sheetRef}
              isOpen={isOpen} 
              setIsOpen={setIsOpen} 
              setPayed={setPayed} amount={contents[cardIndex]?.price}/>
          
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
 
  cardShadow:{
    borderRadius:30,
    shadowColor: "#000",
    shadowOffset:{
      width: 0,
      height: 1,
    },
    shadowOpacity:0.2,
    shadowRadius:1.41,
    elevation: 2,
  },

});
