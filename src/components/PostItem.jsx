import React from 'react';
import MyButton from './UI/button/MyButton';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function PostItem({number, post, removePost }) {

  const router = useHistory()
  const handlerRemovePost = () => {
    removePost(post)
  }

  return (
    <div className="post">
        <div className="post-content">
          <strong>{post.id}. {post.title}</strong>
          <div>
            {post.body}
          </div>
        </div>
        <div className="post-btns">
        <MyButton onClick={() => router.push(`/posts/${post.id}`)} type="button">Open</MyButton>
        <MyButton onClick={handlerRemovePost}type="button">Delete</MyButton>
        </div>
      </div>
  )
}
