import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView } from 'react-native'
import React,{useState, useLayoutEffect} from 'react'
import tw from 'tailwind-rn'
import BouncyCheckbox from "react-native-bouncy-checkbox"
import {MaterialCommunityIcons} from 'react-native-vector-icons';
import * as ImagePicker from 'react-native-image-picker';
import { useWallet } from '../../hooks/useWallet';
const RegisterForm = ({signUp,addNewUser, sheetRef,behavior}) => {
    const [isArtist,setIsArtist] = useState(false);
    const [imageProfile,setImage] = useState();
    const [password,setPassword] = useState();
    const [email,setEmail] = useState();
    const [hasGalleryPerimissions,setHasGalleryPermissions] = useState(false);
    const [galleryItems,setGalleryItems] = useState([]);
    const [age,setAge] = useState(0);
    const [name,setName] = useState();
    const {createWllt} = useWallet()
    let incompleteForm = !imageProfile || !password || !name || !email || !age;
    const setPermissions = async() =>{
        

        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
        setHasGalleryPermissions(galleryStatus.status == 'granted');
    
    
        // if(galleryStatus.status == 'granted'){
        //     const userGalleryMedia = await MediaLibrary.getAssetsAsync({sortBy:['creationTime'],mediaType:['photo']})
        //     setGalleryItems(userGalleryMedia.assets);
        // }
    }
    
    useLayoutEffect(()=>{
        setPermissions()
    },[])

    const pickFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
        })
        if(!result.cancelled){
            console.log('vediamo  ', result)
            setImage(result?.uri) 
            
        }
    }

    const register = async () => {
        let data = await signUp(email,password);
        console.log('questo ritorna dalla registrazione user', data.user.id);
        addNewUser(imageProfile,name,age,isArtist,data.user.id);
        await createWllt();
        setTimeout(()=>sheetRef?.current?.close(),15000);
    }

   

    return (
        <View style={tw("items-center mt-5")}>

            <View style={tw("flex-col items-center pt-5")}>

                <TouchableOpacity style={tw("bg-gray-300 rounded-full")} onPress={pickFromGallery}>
                    {imageProfile ?
                        <Image style={tw("w-28 h-28 rounded-full")} source={{uri:imageProfile}}/>
                        :
                        <MaterialCommunityIcons name="apple-keyboard-command" size={84} />
                    } 
                </TouchableOpacity>
                <Text style={[tw("text-center p-4 text-xl text-red-400"),{fontFamily:'Nunito_600SemiBold'}]}>Inserisci una foto profilo</Text>
            </View>
            <View style={tw("flex-row items-center pt-1")}>
                <Text style={[tw("text-xl text-gray-500 p-2"),{fontFamily:'Nunito_600SemiBold'}]}>Sei un artista?</Text>
                <BouncyCheckbox isChecked={isArtist}  size={25}
                                fillColor="red"
                                unfillColor="#FFFFFF"
                                text="Custom Checkbox"
                                iconStyle={{ borderColor: "red" }}
                                innerIconStyle={{ borderWidth: 2 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                onPress={(isChecked) => {setIsArtist(isChecked)}} />
            </View>
                <KeyboardAvoidingView
                     behavior={behavior}
                     style={tw("flex-1 pb-10")}
                     keyboardVerticalOffset={-800}
                >

                    <View style={tw("flex-col items-center")}>
                        <Text style={[tw("text-center p-4 text-xl text-red-400"),{fontFamily:'Nunito_600SemiBold'}]}>Inserisci nome</Text>
                        <TextInput 
                            style={[tw("text-center text-lg pb-2 w-44 border-b-2"),{fontFamily:'Nunito_600SemiBold'}]} 
                            placeholder="nome"
                            value={name}
                            textContentType={"emailAddress"}
                            onChangeText={text=>setName(text)}
                            />
                    </View>    
                    <View style={tw("flex-col items-center")}>
                        <Text style={[tw("text-center p-4 text-xl text-red-400"),{fontFamily:'Nunito_600SemiBold'}]}>Inserisci email</Text>
                        <TextInput 
                            style={[tw("text-center text-lg pb-2 w-44 border-b-2"),{fontFamily:'Nunito_600SemiBold'}]} 
                            placeholder="email@address.com"
                            value={email}
                            textContentType={"emailAddress"}
                            onChangeText={text=>setEmail(text)}
                            />
                    </View>
                    <View style={tw("flex-col items-center pt-4")}>
                        <Text style={[tw("text-center p-4 text-xl text-red-400"),{fontFamily:'Nunito_600SemiBold'}]}>Inserisci password</Text>
                        <TextInput 
                            style={[tw("text-center text-lg pb-2 w-44 border-b-2"),{fontFamily:'Nunito_600SemiBold'}]} 
                            placeholder="password"
                            value={password}
                            textContentType={"password"}
                            keyboardType={"visible-password"}
                            onChangeText={text=>setPassword(text)}
                            />
                    </View>
                    <View style={tw("flex-col items-center pt-4")}>
                        <Text style={[tw("text-center p-4 text-xl text-red-400"),{fontFamily:'Nunito_600SemiBold'}]}>Quanti anni hai?</Text>
                        <TextInput 
                            style={[tw("text-center text-lg pb-2 w-44 border-b-2"),{fontFamily:'Nunito_600SemiBold'}]} 
                            placeholder="Inserisci la tua età" 
                            keyboardType='numeric'
                            maxLength={2}
                            onChangeText={text=>setAge(text)}
                            />
                    </View>
                    <TouchableOpacity onPress={register} style={[tw("w-64 p-3 rounded-xl items-center mt-5 "),incompleteForm ? tw("bg-gray-400"): tw("bg-green-400")]} disabled={incompleteForm}>
                        <Text style={tw("text-center text-white text-xl")}>Register now</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
                
                
           
        </View>
    )
}

export default RegisterForm