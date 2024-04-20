import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import { DummyPosts } from '../constants/data'
import { PostCard } from '../components'
import ReactPaginate from 'react-paginate';
import {BsChevronLeft,BsChevronRight} from "react-icons/bs"
import {motion} from "framer-motion"
import { useParams } from 'react-router-dom';
const AuthorPosts = () => {
  const postList=useSelector(state=>state.post.postList)
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
  const{id}=useParams()
  const posts=postList?.filter((post)=>post.authorId===id&&post.status===true)
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
  return currentPosts && (
    <>
    
    <div className='flex flex-col md:flex-row gap-4 h-[100%] w-[100%] p-10 flex-wrap md:justify-evenly'>
      {
        currentPosts.map(({_id,category,Image,title,desc,authorId},index)=>{
            return <PostCard id={_id} category={category} title={title} Image={Image} desc={desc} authorId={authorId}  key={_id}/>
        })
      }
    </div>
    <motion.div variants={paginateVariant} initial="hidden" animate="visible">
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
    </motion.div>
    </>
  )
}

export default AuthorPosts