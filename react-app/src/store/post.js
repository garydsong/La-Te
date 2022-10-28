const LOAD_ALL = "posts/LOAD_ALL";
const LOAD_CURRENT = "posts/LOAD_CURRENT";
const LOAD_ONE = "posts/LOAD_ONE";
const CREATE = "posts/CREATE";
const UPDATE = "posts/UPDATE";
const REMOVE = "posts/DELETE";
const RESET = "posts/RESET";


//Action Creators
const loadAll = (posts) => ({
    type: LOAD_ALL,
    posts
  });

  const loadCurrent = (posts) => ({
    type: LOAD_CURRENT,
    posts
  });

  const loadOne = (post) => ({
    type: LOAD_ONE,
    post
  });

  const create = (post) => ({
    type: CREATE,
    post
  });

  const update = (post) => ({
    type: UPDATE,
    post
  });

  const remove = postId => ({
    type: REMOVE,
    postId
  });

  export const resetPost = () => ({
    type: RESET,
  })

  // THUNK action creators
export const getAllPostsThunk = () => async (dispatch) => {
    const response = await fetch("/api/posts/");

    if (response.ok) {
      const postData = await response.json();
      await dispatch(loadAll(postData));
      return postData
    }
    return;
  };

  export const getCurrentUserPostsThunk = () => async (dispatch) => {
    const response = await fetch("/api/posts/current");

    if (response.ok) {
      const postData = await response.json();
      dispatch(loadAll(postData));
      return postData
    }
    return;
  };

  export const getSinglePostThunk = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`);

    if (response.ok) {
      const singlePostData = await response.json();
      dispatch(loadOne(singlePostData));
      return
    }
    return
  }

  export const createPostThunk = (post) => async (dispatch) => {
    const response = await fetch("/api/posts/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    });

    if (response.ok) {
      const createdPostData = await response.json();
      dispatch(create(createdPostData));
      return createdPostData;
    }
    return
  }

  export const updatePostThunk = (post, postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    });

    if (response.ok) {
      const updatedPostData = await response.json();
      dispatch(update(updatedPostData));
      return updatedPostData;
    }
    return
  }

  export const deletePostThunk = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE"
    });

    if (response.ok) {
      const deletedPostData = await response.json();
      dispatch(remove(deletedPostData));
      return
    }
    return;
  }


  let initialState = {
    allPosts: {},
    singlePost: {}
  }

  const postReducer = (state = initialState, action) => {
    let newState;
    const allPosts = {}
    switch (action.type) {
      case LOAD_ALL:
        console.log('posts', action.posts)
        Object.values(action.posts).forEach(post => {
          allPosts[post.id] = post;
          console.log("post", post)
        })
        return {
          ...state,
          allPosts
        }

      case LOAD_CURRENT:
        action.bussinesses.forEach(post => {
          allPosts[post.id] = post;
        })
        return {
          ...state,
          allPosts
        }

      case LOAD_ONE:
        newState = { ...state, allPosts: { ...state.allPosts }, singlePost: { ...state.singlePost } }
        newState.singlePost = action.post
        return { ...newState }

      case CREATE:
        newState = { allPosts: { ...state.allPosts } }
        newState.singlePost = action.post

        return newState

      case UPDATE:
        newState = { allPosts: { ...state.allPosts } }
        newState.singlePost = action.post

        return newState

      case REMOVE:
        newState = {
          allPosts: { ...state.allPosts },
          singlePost: { ...state.singlePost }
        }
        delete newState.allPosts[action.postId]
        if (newState.singlePost.id === action.postId) {
          newState.singlePost = {}
        }
        return newState

      case RESET:
        return initialState
      default:
        return state
    }
  }



  export default postReducer
