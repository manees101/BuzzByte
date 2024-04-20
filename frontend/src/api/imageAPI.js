import { Client, Storage } from "appwrite";
const client = new Client();

const storage = new Storage(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID) // Your project ID
;
export const uploadImage=async({id,image})=>{
    try
    {
        console.log(" bucket id ",import.meta.env.VITE_APPWRITE_BUCKET_ID)
        const promise =await storage.createFile(import.meta.env.VITE_APPWRITE_BUCKET_ID, id,image);
    console.log(promise) 
    }
    catch(err)
    {
      console.log(err)
    }
   
}

export const getImage=({id})=>{
    try
    {
        const imageData = storage.getFilePreview(import.meta.env.VITE_APPWRITE_BUCKET_ID, id);
        return imageData
    }
    catch(err)
    {
     console.log(err)
    }
}

export const deleteImage=async({id})=>{
    try
    {
       const result= await storage.deleteFile(import.meta.env.VITE_APPWRITE_BUCKET_ID, id);
       console.log(result) 
       return
    }
    catch(err)
    {
     console.log(err)
    }
}