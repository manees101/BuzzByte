import "./styles.scss"
import React,{useState} from 'react'
import {useEditor,EditorContent} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Underline from "@tiptap/extension-underline"
import parse from "html-react-parser"
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript'
import { MdOutlineFormatListBulleted,MdOutlineFormatUnderlined } from "react-icons/md"
import { FaListOl,FaCode,FaUndo,FaRedo } from "react-icons/fa"
import { BsBlockquoteLeft } from "react-icons/bs"
hljs.registerLanguage("javascript",javascript)
const extensions=[
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
   Underline
]
const btnStyles="border-gray-500 hover:bg-gray-800 hover:text-white cursor-pointer text-[15px] md:text-[20px] py-[4px] px-[10px] rounded-lg m-2 border-[2px]"
const Tiptap = ({content,setContentHtml}) => {
    const editor=useEditor({
        extensions,
        content
    })
    if(!editor)
    {
        return null;
    }
  return (
    <div className="w-[100%] flex flex-col gap-4 mb-4">
     <div className="bg-slate-800 rounded-lg p-4">
     <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={`${editor.isActive('bold') ? 'is-active bg-gray-800 text-white' : 'bg-white text-black'} ${btnStyles}`}
      >
        <strong>B</strong>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={`${editor.isActive('italic') ? 'is-active  bg-gray-800 text-white' : 'bg-white text-black'} ${btnStyles}`}
      >
        <em>I</em>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={`${editor.isActive('strike') ? 'is-active  bg-gray-800 text-white' : 'bg-white text-black'} ${btnStyles}`}
      >
        <s>S</s>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={`${editor.isActive('code') ? 'is-active  bg-gray-800 text-white' : 'bg-white text-black'} ${btnStyles}`}
      >
        code
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}
      className={`${btnStyles} text-black bg-white`}
      >
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}
      className={`${btnStyles} text-black bg-white`}
      >
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`${editor.isActive('paragraph') ? 'is-active  bg-gray-800 text-white' : 'bg-white text-black'} ${btnStyles}`}
      >
        p
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`${editor.isActive('heading', { level: 1 }) ? 'is-active  bg-gray-800 text-white' : 'bg-white text-black'} ${btnStyles}`}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${editor.isActive('heading', { level: 2 }) ? 'is-active  bg-gray-800 text-white' : 'bg-white text-black'} ${btnStyles}`}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${editor.isActive('heading', { level: 3 }) ? 'is-active  bg-gray-800 text-white' : 'bg-white text-black'} ${btnStyles}`}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`${editor.isActive('heading', { level: 4 }) ? 'is-active  bg-gray-800 text-white' : 'bg-white text-black'} ${btnStyles}`}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`${editor.isActive('heading', { level: 5 }) ? 'is-active  bg-gray-800 text-white' : 'bg-white text-black'} ${btnStyles}`}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`${editor.isActive('heading', { level: 6 }) ? 'is-active  bg-gray-800 text-white' : 'bg-white text-black'} ${btnStyles}`}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`${editor.isActive('underline') ? 'is-active  bg-gray-800 text-white' : 'bg-white text-black'} ${btnStyles}`}
      >
        <MdOutlineFormatUnderlined/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${editor.isActive('bulletList') ? 'is-active  bg-gray-800 text-white' : 'bg-white text-black'} ${btnStyles}`}
      >
        <MdOutlineFormatListBulleted/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${editor.isActive('orderedList') ? 'is-active bg-gray-800 text-white' : 'bg-white text-black'} ${btnStyles}`}
      >
        <FaListOl/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${editor.isActive('codeBlock') ? 'is-active bg-gray-800 text-white' : 'bg-white text-black'} ${btnStyles}`}
      >
        <FaCode/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`${editor.isActive('blockquote') ? 'is-active bg-gray-800 text-white' : 'bg-white text-black'} ${btnStyles}` }
      
      >
        <BsBlockquoteLeft/>
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
        className={`${btnStyles} text-black bg-white`}
      >
        <FaUndo/>
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
        className={`${btnStyles} text-black bg-white`}
      >
        <FaRedo/>
      </button>
     </div>
      <div className="rounded-lg w-full border-solid border-[2px] border-gray-800 ">
      <EditorContent editor={editor} onInput={()=>{setContentHtml(editor?.getHTML());console.log(editor?.getHTML())}}/>
      </div>
      
    </div>
  )
}

export default Tiptap