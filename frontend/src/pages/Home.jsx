import React,{useEffect, useState} from 'react'
import { PostCard,HeadPost } from '../components'
import ReactPaginate from 'react-paginate';
import {BsChevronLeft,BsChevronRight} from "react-icons/bs"
import {motion} from "framer-motion"
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const postList=useSelector(state=>state.post.postList);
  const posts=postList?.filter((post)=>post.status!=false)
  const navigate=useNavigate()
  const paginateVariant={
    hidden:{
      opacity:0,
      y:100
    },
    visible:{
      opacity:1,
      y:0,
      transition:{
        type:"spring",
        stiffness:260,
        damping:20,
        duration:200
      }
    }
  }
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage=9;
  const idxOfLastPost = currentPage * itemsPerPage;
  const idxOfFirstPost = idxOfLastPost - itemsPerPage;
  const pageCount = Math.ceil(posts?.length / itemsPerPage);
    const currentPosts = posts?.slice(
    idxOfFirstPost,
    idxOfLastPost
  );
  const handlePageClick = (event) => {
    
    const newOffset = (event.selected + 1);
    setCurrentPage(newOffset)
  };

  return !posts ?  <div className='w-full h-[80vh] flex items-center justify-center'>
    <Loader h={10} w={10} color={'text-gray-800'}/>
  </div>:<>
      <div className='flex flex-col md:flex-row gap-4 w-[100%] p-10 flex-wrap md:justify-evenly'>
        {
          currentPosts?.length ? currentPosts?.map(({_id,category,Image,title,desc,authorId},index)=>{
            if(index==0)
            {
              return <HeadPost {...{id:_id,Image,title,desc,authorId,category}} key={_id}/>
            }
            else
            {
              return <PostCard {...{id:_id,Image,title,desc,authorId,category}}  key={_id}/>
            }
          }):<div className='w-full h-[80vh] flex flex-col gap-4 justify-center items-center text-[20px] font-bold'>
            <p>No Post Found !</p>
            <button className='bg-blue-500 h-[40px] w-[120px] text-white rounded-lg' onClick={()=>navigate('/post/create')}>Create One</button>
          </div>
        }
      </div>
     
      {currentPosts?.length && <motion.div variants={paginateVariant} initial="hidden" animate="visible">
        <ReactPaginate
        breakLabel="..."
        pageRangeDisplayed={5}
        pageCount={pageCount}
        nextLabel={
          <span className="flex justify-center items-center w-10 h-10 rounded-lg bg-gray-400">
            <BsChevronRight/>
          </span>
        }
        previousLabel={
          <span className=' flex justify-center items-center w-10 h-10 rounded-lg bg-gray-400'>
            <BsChevronLeft/>
          </span>
        }
        containerClassName='flex justify-center items-center my-8 gap-6'
        pageClassName='block border-solid border-gray-400 hover:bg-gray-400 w-8 h-8 flex cursor-pointer justify-center items-center rounded-lg'
        activeClassName='bg-gray-800 text-white hover:bg-gray-800'
        onPageChange={handlePageClick}
        />
      </motion.div>} 
      </>
}

export default Home