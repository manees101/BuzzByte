import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import { DummyPosts } from '../constants/data'
import { PostCard } from '../components'
import ReactPaginate from 'react-paginate';
import {BsChevronLeft,BsChevronRight} from "react-icons/bs"
import {motion} from "framer-motion"
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
const CategoryPosts = () => {
  const postList=useSelector(state=>state.post.postList)
  const {id}=useParams()
  const posts=postList?.filter((post)=>post.category===id)
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


  return !postList ? <div className='h-[80vh] w-full flex flex-col gap-2 items-center justify-center'>
  <Loader h={10} w={10} color={'text-blue-600'}/>
  Loading...
</div> : !currentPosts?.length ? <div
  className='w-full h-[80vh] flex items-center justify-center'
  >
    <h1 className='font-semibold text-[40px] md:text-[50px]'>No posts found!</h1>
  </div>:<>
      <h1 className='text-[20px] md:text-[25px] font-bold m-4'>
      {id.toUpperCase()} Posts
      </h1>
      <div className='flex flex-col md:flex-row gap-4 h-[100%] w-[100%] p-10 flex-wrap md:justify-evenly'>
        {
          currentPosts.map(({_id,category,Image,title,desc,authorId})=>{
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
}

export default CategoryPosts