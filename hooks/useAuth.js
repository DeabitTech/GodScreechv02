import React, { createContext,useContext,useEffect,useLayoutEffect,useMemo,useState} from 'react';

//import * as Google from 'expo-google-app-auth';
//import {GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut} from '@firebase/auth'
//import {auth} from '../firebase'
import { useWallet } from './useWallet';
import { supabase } from '../supabase'; 


const AuthContext = createContext({

})

const config = {
    iosStandaloneAppClientId:"374895391001-ic26j2l7s483q6p0ars3ca1qsjaus1ig.apps.googleusercontent.com",
    //iosClientId:"374895391001-e84me6icrpl7o1rvd71j0997varlr634.apps.googleusercontent.com",
    androidClientId:"374895391001-mrrn9tralrgl7u3q4128c9erle3hdq7s.apps.googleusercontent.com", 
    //androidStandaloneAppClientId:"374895391001-l5mh0hviqoa7bmrsimn1eek7p2vvg52c.apps.googleusercontent.com",
    scopes: ["profile","email"],
    permissions: ["public_profile","email","gender","location"],
}

export const AuthProvider = ({children}) => {
    //{uid:"0QTKDsvy2CQziWotlFEg74vwv5B2",age:25,artistType:"ASMR",displayName:"Matteo Curatolo",photoURL:"https://www.hotblockradio.it/wp-content/uploads/2021/11/La-foto-profilo-di-Lil-Baby-vale-150mila-dollari-1024x1017.jpg"}
    const {getWallet,createWllt} = useWallet()
    const [error,setError] = useState(null)
    const [user,setUser] = useState()
    const [loadingInitial,setLoadingInitial] = useState(true)
    const [loading,setLoading] = useState(false)
    const [session, setSession] = useState(null);


    useLayoutEffect(()=>{
        supabase.auth.getSession().then((data, error)=>{
            
            if(data.data?.session?.access_token){
                let session = data.data?.session;
                let accessToken = data.data?.session.access_token;
                supabase.auth.getUser(accessToken).then((data,error)=>{
                    let usrDetails = Promise.all([getUserDetails(session.user.id)]);
                    
                    usrDetails.then(usr=>{
                       
                        usr[0] ? setUser(usr[0]) : setUser(session.user);
                    }) 
                })
            }
        })
       
    },[])

    useEffect(()=>{
        getWallet();
        setLoadingInitial(false)
        
        const {data } =supabase.auth.onAuthStateChange(
            async (_event,session)=>{
               
                console.log("esploriamo gli eventi",_event)
                if(_event==="SIGNED_IN"){

                    let usrDetails = Promise.all([getUserDetails(session.user.id)]);
                    
                    usrDetails.then(usr=>{
                        console.log('allorrrraa ', usr[0])
                        usr[0] ? setUser(usr[0]) : setUser(session.user);
                    })
                    .catch((e)=>console.log('vediamoooooo ', e)) 
                }
                else{
                    setUser(null)
                }

            }
        )
       
        
        
        return ()=>{
           data.subscription.unsubscribe();
            getWallet();
        } 
        
    },[])

    const getUserDetails =  (userId) => new Promise((resolve,reject)=>{
       
        supabase.from('users').select().eq('id', userId).then((data,error)=>{
            if(!error){
                
                resolve(data.data[0]);
            }
            else {
                reject(error);
            }
        })
        
    })
    
    
    const logout = async () => {
        setLoading(true)
        await supabase.auth.signOut();
        
    }
    
    const signInWithGoogle = async () => {
        setLoading(true)
        await Google.logInAsync(config).then(async (logInResult)=>{
            if(logInResult?.type === "success"){
                alert('sono qui')
                const { idToken, accessToken} = logInResult
                const credential = GoogleAuthProvider.credential(idToken,accessToken)
                await signInWithCredential(auth, credential)
            }
            else {
                alert(`allora ${JSON.stringify(logInResult)}`)
            }
            //return Promise.reject()
            
        }).catch((err)=>{alert(`eccociii ${err}`)})
        .finally(()=> setLoading(false))
    } 
    
    const signInWithGoogleSupabase = async () => {
        await supabase.auth.signInWithOAuth({provider:'google'}).then(async (res)=>{
        }).catch((e)=>console.log('errore ', e))
        let user = await supabase.auth.getSession();
        console.log('res ', user)
        
    }

    const signIn = async (email,password) => {
        const {data,error} =  await supabase.auth.signInWithPassword(
            {email:email, password:password});
       
        if(!error){
            alert("login effettuato con successo")

        }    
        else{
            alert(`errore: ${error}`)
        }
        return data;
    
    }

    const signUp = async (email,password, phone) => {
        const {data, error} = await supabase.auth.signUp({email:email, password:password, phone:phone});
        
        if(!error){
            //alert('registrazione effettuata con successo');
        }
        else{
            alert(`errore: ${error}`);
        }
        return data;
    }

    
    
    const memoedValue = useMemo(()=>({
        user,
        session,
        loading,
        error,
        logout,
        signInWithGoogle,
        signInWithGoogleSupabase,
        signIn,
        signUp
    }),[user,loading,error])

    return (
        <AuthContext.Provider value={memoedValue}>
          {!loadingInitial && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}


