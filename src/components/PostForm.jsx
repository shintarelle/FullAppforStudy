import React from 'react'
import { useState } from 'react';
import MyInput from './UI/input/MyInput'
import MyButton from './UI/button/MyButton';

export default function PostForm({ addNewPost }) {

  const [post, setPost] = useState({ title: '', body: '' });

  const handlerNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      ...post, id: Date.now()
  }
    addNewPost(newPost);
    setPost({title: '', body: ''})
  }

  return (
            <form>
        <MyInput
          type="text"
          placeholder='title of post'
          value={post.title}
          onChange={(e) => setPost({...post,  title: e.target.value })}
        />
        <MyInput
          type="text"
          placeholder='body of post'
          value={post.body}
          onChange={(e) => setPost({ ...post, body: e.target.value })}
        />
        {/* неуправляемый компонент */}
        {/* <MyInput
          type="text"
          placeholder='body of post'
          ref={bodyInputRef}
        /> */}
        <MyButton type="submit" onClick={handlerNewPost}>Create post</MyButton>
      </form>
  )
}
