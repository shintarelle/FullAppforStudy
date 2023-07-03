import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import PostService from '../API/PostService'
import { useFetching } from '../hooks/useFetching'
import Loader from '../components/UI/loader/Loader'

export default function PostIdPage() {
  const params = useParams()
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [fetchPostsById, isLoading, error] = useFetching( async (id) => {
    const response = await PostService.getById(id)
    setPost(response.data)
  })
  const [fetchComments, isComLoading, comError] = useFetching( async (id) => {
    const response = await PostService.getCommentsByPostId(id)
    setComments(response.data)
  })

  useEffect(() => {
    fetchPostsById(params.id)
    fetchComments(params.id)
  }, [])

  return (
    <div>
      <h1>Post with ID {params.id}</h1>
      {isLoading
        ? <Loader />
        : <div>{post.id}. {post.title} </div>
      }
      <h1>Comments:</h1>
      {isComLoading
        ? <Loader />
        : <div>
          {comments.map(com =>
            (
            <div key={com.id}>
            <h5><span>{com.id}. </span><span>{com.name} </span><span>{com.email}</span></h5>
              <p>{com.body}</p>
              <br />
            </div>
            )
          )
          }
        </div>
      }
    </div>
  )
}
