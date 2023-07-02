import React from 'react';
import MyButton from './UI/button/MyButton';

export default function PostItem({number, post, removePost }) {


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
        <div className="post-btn">
        <MyButton onClick={handlerRemovePost}type="button">Delete</MyButton>
        </div>
      </div>
  )
}
