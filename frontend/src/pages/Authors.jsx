import React,{useEffect,useState} from 'react'
import userAPI from '../api/userAPI'
import { AuthorCard } from '../components'
import Loader from '../components/Loader'
const Authors = () => {
    const [userList, setUserList] = useState(null)
    useEffect(()=>{
       userAPI.getAllUsers().then((data)=>setUserList(data)) 
    },[])
  return !userList ? <div className='h-[80vh] w-full flex flex-col gap-2 items-center justify-center'>
    <Loader h={10} w={10} color={'text-blue-600'}/>
    Loading...
  </div>:(
    <div className='flex flex-col md:flex-row flex-wrap gap-8 w-[95%] mx-auto my-4 justify-center'>
     {  
     userList.map(({_id,name,Image,username})=>(
       <AuthorCard {...{id:_id,name,Image,username}} key={_id}/>
      ))
     }
    </div>
  )
}

export default Authors