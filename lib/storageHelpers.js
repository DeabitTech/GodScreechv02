// import { ref,uploadBytes,getDownloadURL, } from "firebase/storage"
// import { storage } from "../firebase"

import { supabase } from "../supabase";


export const saveMediaToStorage = async (media,path,type, isAvatar) =>  new Promise((resolve,reject)=> {
    console.log("cazzo succede qua ", media, path, type)
    //const fileRef = ref(storage,path)
    
    if(isAvatar){
        supabase.storage.from('avatars').upload(path,media,{cacheControl:3600, upsert:true,contentType:type?'video/mp4':'image/jpg'}).then((dataUpload,error,status)=>{
            console.log('upload succefull: ' ,dataUpload);
            let { data } = supabase.storage.from('avatars').getPublicUrl(path)
            console.log('url quaa', data.publicUrl)    
            resolve(data.publicUrl)
            
        }).catch((e)=>console.log(e));
    
      

    }
    else{
        supabase.storage.from('clips').upload(path,media,{cacheControl:3600, upsert:true,contentType:type?'video/mp4':'image/jpg'}).then((dataUpload,error,status)=>{
            console.log('upload succefull: ' ,dataUpload);
            let { data } = supabase.storage.from('clips').getPublicUrl(path)
            console.log('url quaa', data.publicUrl)    
            resolve(data.publicUrl)
            
        }).catch((e)=>console.log(e));
    
    }
    


    
    
    //firebase
    // fetch(media)
    //     .then(resp => resp.arrayBuffer())
    //     .then(blob=> {
    //         console.log('ooooooo', decode(blob))
    //})
    //.then(blob => uploadBytes(fileRef,blob,{contentType:type?'video/mp4':'image/jpg'}))
    //.then(task => getDownloadURL(task.ref))
    //.then(downloadURL => resolve(downloadURL))
    //.catch(e=>console.log("me?? ", e))
})