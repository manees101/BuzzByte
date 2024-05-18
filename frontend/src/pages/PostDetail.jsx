import React,{useEffect, useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getImage,deleteImage } from '../api/imageAPI'
import { deletePost } from '../reducers/postReducer'
import parse from "html-react-parser"
import img1 from "../assets/1.jpg"
import postAPI from '../api/postAPI'
import {useParams,useNavigate} from "react-router-dom"
import Loader from '../components/Loader'
import DeleteModal from '../components/DeleteModal'
const DummyPost={
    id: 1,
    Image: "212121212",
    category: 'Education',
    authorId: 2,
    title: 'This is the title for Robot',
    desc: `
    
    <h1>10 Tips for Effective Time Management</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et luctus risus. Integer vel lorem ipsum. Fusce euismod nisi et ipsum posuere, vel sodales risus posuere. Ut rutrum nisi nisi, vel feugiat lacus rhoncus vel. Quisque mollis sit amet odio sed finibus. Donec suscipit sem vel nulla aliquam, ut rutrum nulla suscipit.</p>
    <p>Vivamus vitae nisi non nisi vehicula consectetur. Proin quis sapien at sem fermentum consectetur. Sed hendrerit justo ac fermentum faucibus. Praesent sit amet tempor orci. Morbi auctor lorem velit, ac elementum enim dapibus vel. Ut viverra nibh non tincidunt mollis. Sed rhoncus tristique odio, sed tincidunt elit rhoncus et.</p>
    <p>Donec sollicitudin nec dui ut congue. Duis eu nisi eros. Integer lacinia ex eu neque tempus laoreet. Ut eu nisi in nunc lobortis ullamcorper. Aliquam erat volutpat. Vivamus vitae odio eget quam scelerisque volutpat. Aliquam a vehicula magna.</p>
  
    <p> <!-- It is a Paragraph tag for creating the paragraph -->  
<b> HTML </b> stands for <i> <u> Hyper Text Markup Language. </u> </i> It is used to create a web pages and applications. This language   
is easily understandable by the user and also be modifiable. It is actually a Markup language, hence it provides a flexible way for designing the  
web pages along with the text.   
</p>  
HTML file is made up of different elements. <b> An element </b> is a collection of <i> start tag, end tag, attributes and the text between them</i>.   
</p> 
<p> <!-- It is a Paragraph tag for creating the paragraph -->  
<b> HTML </b> stands for <i> <u> Hyper Text Markup Language. </u> </i> It is used to create a web pages and applications. This language   
is easily understandable by the user and also be modifiable. It is actually a Markup language, hence it provides a flexible way for designing the  
web pages along with the text.   
</p>  
HTML file is made up of different elements. <b> An element </b> is a collection of <i> start tag, end tag, attributes and the text between them</i>.   
</p> 
<p> <!-- It is a Paragraph tag for creating the paragraph -->  
<b> HTML </b> stands for <i> <u> Hyper Text Markup Language. </u> </i> It is used to create a web pages and applications. This language   
is easily understandable by the user and also be modifiable. It is actually a Markup language, hence it provides a flexible way for designing the  
web pages along with the text.   
</p>  
HTML file is made up of different elements. <b> An element </b> is a collection of <i> start tag, end tag, attributes and the text between them</i>.   
</p>  
    `
}

const PostDetail = ({}) => {
  const [postImg, setPostImg] = useState(null)
  const {id}=useParams()
  const postList=useSelector(state=>state.post.postList)
  const post=postList?.filter((post)=>post?._id===id)
  const userData=useSelector(state=>state.user.userData)
  const token=useSelector(state=>state.user.token)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handleDelete=async()=>{
      await deleteImage({id:post[0].Image.split(".")[0]})
     const result= await postAPI.deletePost({id,token})
     if(result?.status===200)
     {
      dispatch(deletePost({postId:post[0]?._id}))
      navigate("/")
     }
  }
  useEffect(()=>{
    if(post)
    {
      const data=getImage({id:post[0]?.Image.split(".")[0]})
      setPostImg(data)
    }
  
  },[])

  return postList && (
    <div className='min-h-[80vh] w-[100%] flex flex-col justify-center items-center'>
      <div className=' md:w-[75%] w-[90%] bg-gray-800 my-4 rounded-lg '>
      { userData?._id === post[0]?.authorId ? <div className='h-[50px] w-full flex items-center justify-around mt-4'>
       <button className='h-[40px] w-[80px] text-white shadow-md shadow-gray-500 bg-green-600 rounded-lg text-[20px] font-semibold'
       onClick={()=>navigate(`/post/${post[0]._id}/edit`)}

       >
        Edit
       </button>
       <button className='h-[40px] w-[80px] text-white shadow-md shadow-gray-500
        bg-red-600 rounded-lg text-[20px] font-semibold
        '
        onClick={()=>setShowDeleteModal(true)}
        >
        Delete 
       </button>
      </div>:"" }
      <div className='flex flex-col p-4'>  
       <h1 className='text-white font-bold text-[30px] md:text-[40px] font-poppins my-0 md:my-4 text-center'>
          {post[0].title}
       </h1>
       <div className='h-[250px] md:h-[400px] w-[90%] mx-auto'>
        <img src={postImg?.href} alt="img1" className='h-[100%] w-[100%] object-contain'/>
       </div>
       <p className='text-white p-4 mt-4 tiptap font-poppins'>
{parse(post[0].desc)}
       </p>
      </div>
      <div>

      </div>
      </div>
      {showDeleteModal && (
       <DeleteModal handleDelete={handleDelete} setShowDeleteModal={setShowDeleteModal} alert={"Are you sure you want to delete this post?"} msg={"deleting the post..."}/>
      )}
    </div>
  )
}

export default PostDetail