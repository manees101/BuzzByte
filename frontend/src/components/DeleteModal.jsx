import React,{useState} from 'react'
import Loader from './Loader'
const DeleteModal = ({handleDelete,setShowDeleteModal,alert,msg}) => {
  const [showLoader, setShowLoader] = useState(false)
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50'>
     {!showLoader &&
      <div className='bg-white p-8 rounded-lg'>
      <p className='text-black text-lg mb-4'>{alert}</p>
      <div className='flex justify-center'>
        <button
          className='bg-red-600 text-white px-4 py-2 rounded mr-4 flex gap-2'
          onClick={()=>{handleDelete();setShowLoader(true)}}
        >
          Yes  
        </button>
       
        <button
          className='bg-gray-400 text-black px-4 py-2 rounded'
          onClick={() => setShowDeleteModal(false)}
        >
          No
        </button>
      </div>
    </div>}
   
    {showLoader && 
    <div className='bg-white p-8 rounded-lg flex flex-col gap-2 justify-center items-center'>
      <p className='text-black text-lg mb-4'>{msg}</p>
      <Loader color={'text-red-800'} h={8} w={8}/>
      </div>
      }
  </div>
  )
}

export default DeleteModal