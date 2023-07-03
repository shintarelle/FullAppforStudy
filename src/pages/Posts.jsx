import React, { useState, useRef, useEffect } from 'react';
import '../styles/App.css';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/myModal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../hooks/usePosts';
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { getPageArray, getPageCount } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';


function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  const lastElement = useRef();
  // const observer = useRef();
  console.log('lastElement', lastElement)


  const [ fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data])
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit));
  })

//создание обсервера до вынесения его в хук
  // useEffect(() => {
  //   if (isPostLoading) return;
  //   if (observer.current) {
  //     observer.current.disconnect();
  //   }
  //   var options = {
  //     root: document,
  //   }
  //   var callback = function (entries, observer) {
  //     // console.log('entries', entries)
  //     if (entries[0].isIntersecting && page < totalPages) {
  //       // console.log('div in view area')
  //       console.log('page', page)
  //       setPage(page + 1)

  //     }
  //   };
  //   observer.current = new IntersectionObserver(callback, options);
  //   observer.current.observe(lastElement.current)
  // }, [isPostLoading])

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page)
  },[page, limit])

  // const bodyInputRef = useRef(); //для неуправляемого компонента

  const addNewPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => post.id !== p.id))
  }

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className="app">
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>Create post</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm addNewPost={addNewPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />

      <PostFilter filter={filter} setFilter={setFilter} />

      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue={"items on the page"}
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'all'},
        ]}
      />

      {postError &&
        <h1>!!!Error!!! ${postError}</h1>
      }
      <PostList posts={sortedAndSearchedPosts} title='List of posts' removePost={removePost} />
      <div ref={lastElement} style={{ height: '20px', background: 'red' }}></div>
      {isPostLoading &&
        <div  style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
          <Loader />
        </div>}

      <Pagination page={page} totalPages={totalPages} changePage={changePage} />
    </div>
  );
}

export default Posts;
