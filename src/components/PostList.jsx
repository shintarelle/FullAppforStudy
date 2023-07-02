import React from 'react';
import PostItem from './PostItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function PostList({ posts, title, removePost }) {

  if (!posts.length) {
    return (
      <h1 style={{ textAlign: 'center'}}>No posts</h1>
    )
  }
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>{title}</h1>
      <TransitionGroup>
        {posts.map((post, index) => (
        <CSSTransition
              key={post.id}
              // nodeRef={nodeRef}
              timeout={500}
              classNames="post"
        >
          <PostItem

            number={index + 1}
            post={post}
            removePost={removePost}
          />
        </CSSTransition>
        ))}
      </TransitionGroup>
    </div>

  )
}
