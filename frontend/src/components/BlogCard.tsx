import React from 'react'
import { Link } from 'react-router-dom'

interface BlogProps{
    title:string,
    content:string,
    publishedOn:string,
    author: string
    id:string
}

export const BlogCard = ({author,title, content,publishedOn,id}:BlogProps) => {
  return (
    <div className='border-b-1 w-[500px] mt-7 border-slate-400 pb-4'>
        <div className='flex'>
        <div>
            <Avatar initials={author}/>
        </div>
        <div className='font-extralight text-sm pl-2 flex justify-center flex-col'>
            {author} . 
        </div>
        <div className='pl-2 font-thin text-sm text-slate-500 flex justify-center flex-col'>
            {publishedOn}
        </div>
        </div>
        <div className='text-xl font-semibold hover:text-orange-400 pt-2'>
           <Link to={`/blogs/${id}`}> {title} </Link>
        </div>
        <div className='text-md font-thin'>
            {content.length>100?`${content.slice(0,100)}...`:content}
        </div>
        <div className='text-slate-400 w-full text-sm font-thin pt-4'>
            {Math.ceil(content.length/100)} min read
        </div>
    </div>
  )
}

export function Avatar({initials}:{initials:string}){
    return(
        
<div className="relative inline-flex items-center text-white justify-center w-7 h-7 overflow-hidden bg-gray-500 rounded-full dark:bg-gray-600">
    <span className="font-medium text-gray-200 dark:text-gray-300">{initials[0]}</span>
</div>

    )
}