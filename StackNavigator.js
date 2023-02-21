import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
// import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
// import RegisterScreen from './screens/RegisterScreen'
// import SubscribedScreen from './screens/SubscribedScreen';
import { useAuth } from './hooks/useAuth';
//import ArtistScreen from './screens/ArtistScreen';
// import MessageScreen from './screens/MessageScreen';
// import ProfileScreen from './screens/ProfileScreen';
// import UploadClipScreen from './screens/UploadClipScreen';
// import WalletScreen from './screens/WalletScreen';
// import SubscribedListScreen from './screens/SubscribedListScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const {user} = useAuth()
    const userLogged = user 
    
    return (
        

        <Stack.Navigator
            screenOptions={{
                headerShown:false
            }}>
            {userLogged ?
            (<>
            <Stack.Group>

            <Stack.Screen name="Home" component={HomeScreen}/>
            {/*<Stack.Screen name="Chat" component={ChatScreen}/>
            <Stack.Screen name="Message" component={MessageScreen}/>
            <Stack.Screen name="ArtistContents" component={ArtistScreen}/>
            <Stack.Screen name="Profile" component={ProfileScreen}/>
            <Stack.Screen name="UploadClip" component={UploadClipScreen}/>
            <Stack.Screen name="Wallet" component={WalletScreen}/>
            <Stack.Screen name="SubscribedList" component={SubscribedListScreen}/>
            </Stack.Group>
            <Stack.Group screenOptions={{presentation:"modal"}}>
                <Stack.Screen name="Register" component={RegisterScreen}/> 
            </Stack.Group>
            <Stack.Group screenOptions={{presentation:"transparentModal"}}>
            <Stack.Screen name="Subscribed" component={SubscribedScreen}/> 
           */}
            </Stack.Group>
            
            </>):
            (
            <Stack.Screen name="Login" component={LoginScreen}/>
            )
            }
        </Stack.Navigator>
      
    )
}

export default StackNavigator
