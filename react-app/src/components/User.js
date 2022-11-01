import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink, Link } from 'react-router-dom';
import './User.css'
import website from "../assets/icons/website-icon.svg"
import audio from "../assets/icons/audio-icon.svg"
import blog from "../assets/icons/blog-icon.svg"
import video from "../assets/icons/video-icon.svg"
import photo from "../assets/icons/photo-icon.svg"
import deleted from "../assets/icons/trash-icon.svg"
import edit from "../assets/icons/edit-icon.svg"
import x from "../assets/icons/x-icon.svg"
import lateimg from "../assets/la-te-cup.png"
import { createPostThunk, getAllPostsThunk, deletePostThunk } from '../store/post';
import { createComment, getAllCommentsOfPost, getEveryComment, removeComment } from '../store/comment'
import { Modal } from './context/Modal';

function User() {
  const [user, setUser] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [postImage, setPostImage] = useState('');
  const [postText, setPostText] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [comment, setComment] = useState('');
  const [someThang, setSomeThang] = useState(undefined)
  const [counter, setCounter] = useState(1);
  const [latteComment, setLatteComment] = useState('');
  const history = useHistory();
  const { userId } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user)
  const sessionUser = useSelector(state => state.session.user)

  const comments = useSelector(state => state.commentReducer)
  const posts = useSelector(state => state.postReducer.allPosts)
  const singlePost = useSelector(state => state.postReducer.singlePost)
  const allComments = useSelector(state => state.commentReducer.allComments)

  const userPosts = Object.values(posts).filter(post => post.user_id === +userId)

  let deletePostHandler;
  let deleteCommentHandler;
  let postIdHolder;
  let postComments;

  postComments = Object.values(comments).filter(comment => comment.post_id === +postIdHolder)


  console.log('comments', comments)
  console.log('user posts', userPosts)
  console.log('all posts', posts)

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true)
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    const post = {
      post: postText,
      post_img: postImage
    }

    let createdPost = dispatch(createPostThunk(post))

    if (createdPost) {
      setShowModal(false)
      history.push(`/users/${userId}`)
    }

  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()

    const newComment = {
      comment: comment
    }

    console.log('new c', newComment, 'postholder', +postIdHolder, 'all comments', comments)
    // createComment(newComment, +postIdHolder)
    dispatch(createComment(newComment, +postIdHolder))
    // let createdComment =  dispatch(createComment(newComment, postIdHolder))
    // if (createdComment) {
    //   history.push(`/users/${userId}`)
    // }
  }

  useEffect(() => {
    if (!userId) {
      return;
    }

    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();

    dispatch(getAllPostsThunk())
      .then(() => { setIsLoaded(true) })

    dispatch(getEveryComment())

    for (let i = 1; i < userPosts.length; i++) {

      dispatch(getAllCommentsOfPost(i))
    }

  }, [dispatch, userPosts.length, currentUser, singlePost, allComments]);


  const otherThang = (
    <div id="comment-fixed-container">
      <div id="dont-look-at-this">

        {someThang ? postIdHolder = someThang.id : null}
        {/* {someThang ? postComments = Object.values(comments).filter(comment => comment.post_id === someThang.id) : null} */}

      </div>
      <div id="comment-fixed-upper-div">
        <div className="close-comment-container">
        <img id="close-comment" onClick={(()=>setShowMenu(false))} src={x} />
        </div>
        <img id="comment-post-img-id" src={someThang ? someThang.post_img : null} />
        <div className="whereisthis">
          <div id="comment-fixed-sections">
            <div className="dropdown-top-sections" id="profile-username">
              {() => {
                console.log('get comment of this post', someThang?.id)
                dispatch(getAllCommentsOfPost(someThang?.id))
              }}
              {console.log('postcomments console', postComments)}
              {console.log('somethang', someThang?.id)}
              {console.log('comments console', comments.user)}
              {Object.values(comments.user).map(comment => {
                return (
                  <>
                    {comment?.post_id === someThang?.id &&
                      <div className="comment-content-username-wrapper">
                        <img id="comment-content-user-avatar" src={comment?.post_id === someThang?.id ? comment?.owner?.avatar : null} />

                        <div className="comment-content-username">
                          {comment?.post_id === someThang?.id ? comment?.owner?.username : null}
                          {comment?.user_id === currentUser.id && (
                            <div className="d-e-align">

                              {deleteCommentHandler = () => {
                                if (window.confirm('Are you sure you want to delete your comment?')) {
                                  dispatch(removeComment(comment?.id))
                                }
                              }}

                              <img id="delete-icons" onClick={deleteCommentHandler} src={deleted} />
                              <NavLink to={`/users/posts/1`}>
                                <img id="edit-icons" src={edit} />
                              </NavLink>
                            </div>
                          )}
                        </div>

                      </div>

                    }
                    <div className="comment-content-createdat">
                      {comment?.post_id === someThang?.id ? comment?.created_at : null}
                    </div>

                    <div className="comment-content-comment">
                      {comment?.post_id === someThang?.id ? comment?.comment : null}
                    </div>
                  </>
                )
              })}
            </div>
          </div>
        </div>
        <div id="dropdown-links-container">

          <div className="dropdown-links" id="comment-business-navbar">
            <img id="leave-comment-session-user-ava" src={sessionUser.avatar} />
            <form id="comment-side-form" onSubmit={handleCommentSubmit}>
              <textarea
                id="comment-text-input"
                type='text'
                name='comment'
                placeholder='Leave a comment'
                onChange={((e) => setComment(e.target.value))}
                value={comment}
              ></textarea>
              <button type='submit'>submit</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )

  //increase counter
  const increase = () => {
    setCounter(count => count + 1);
  };

  //decrease counter
  const decrease = () => {
    setCounter(count => count - 1);
  };

  //reset counter
  const reset = () => {
    setCounter(0)
  }

  // useEffect(() => {

  // }, [])


  if (!user) {
    return null;
  }

  return isLoaded && (
    <>

      {showModal && (
        <Modal id='photo-modal' onClose={() => setShowModal(false)}>
          <div id="close-modal" onClick={() => setShowModal(false)}><img id="close-modal-icon" src={x} alt='close icon' />
          </div>
          <div className="post-modal-wrapper">
            <form id="post-modal-form" onSubmit={handleSubmit}>
              <div className="post-modal-ava-post-container">
                <img id="modal-avatar" src={user.avatar} />
                <textarea
                  id="post-text-input"
                  type='text'
                  name='post'
                  placeholder='Keep us posted'
                  onChange={((e) => setPostText(e.target.value))}
                  value={postText}
                ></textarea>
              </div>
              <div className="post-modal-img-url-container">
                <input
                  id="post-img-input"
                  name='post-img'
                  type='text'
                  placeholder='Image URL'
                  value={postImage}
                  onChange={((e) => setPostImage(e.target.value))}
                />
              </div>
              <div className="post-modal-submit-container">
                <button className="post-modal-submit-button"
                  type='submit'>
                  Post
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      <div className="user-page-wrapper">
        <div className="gradient-top-user-page"></div>
        <div className="user-page-top-wrapper">
          <div className="user-page-container">
            <div className="cover-img-wrapper">
              <img id="user-page-cover-img" src={user.cover_img} />
            </div>
            <div className="avatar-wrapper">
              <img id="user-page-avatar" src={user.avatar} />
              <div className="user-page-top-name-container">
                <div className="user-page-top-name">{user.first_name} {user.last_name}</div>
                <div>la-te.com/{user.username}</div>
              </div>
            </div>

            <div className="user-page-mid-wrapper">
              <div className="user-page-mid-left-container">
                <div className="user-page-mid-left">
                  <div className="user-page-mid-about">
                    <div>
                      <div className="support-title">About {user.first_name} {user.last_name}</div>
                      <div>{user.bio}</div>
                    </div>
                    <div className="user-page-website-sticky">
                      <img id="website-icon" src={website} />
                      <a id="website-url" href={user.website} target="_blank">
                        <div className="website-url">{user.website}</div>
                      </a>
                    </div>
                  </div>
                </div>
                <br></br>
              </div>

              <div className="user-page-mid-right">
                {sessionUser.id === +userId ? (
                  <div className="submit-post-container">
                    <div className="submit-post-content">
                      <div className="submit-post-top">
                        <img id="post-user-ava-icon" src={user.avatar} />
                        <div className="write-a-post-container" onClick={() => setShowModal(true)}>
                          Write a Post
                        </div>
                      </div>
                      <div className="submit-post-bottom">
                        <div id="submit-post-action-suggestions"><img id="submit-post-icon" src={photo} /> Images</div>
                        <div id="submit-post-action-suggestions"><img id="submit-post-icon" src={blog} /> Blog Posts</div>
                        <div id="submit-post-action-suggestions"><img id="submit-post-icon" src={audio} /> Audio Links</div>
                        <div id="submit-post-action-suggestions"><img id="submit-post-icon" src={video} /> Video Links</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="submit-latte-container">
                    <div className="submit-latte-content">
                      <div className="submit-latte-top">
                        <div className="buy-latte-for-wrapper">
                          Buy a latte for {user.first_name}
                        </div>
                      </div>
                      <div className="buy-latte-counter">
                        <div>
                          <img id="buy-latte-ava-icon" src={lateimg} />
                          Lattes cost $4
                        </div>

                        <div className="counter">
                          <div className="btn__container">
                            {counter > 1 ? (
                              <button className="control__btn-sub" onClick={decrease}>-</button>
                            ) : (
                              <button className="control__btn-sub">-</button>
                            )}
                            <span className="counter__output">{counter}</span>
                            <button className="control__btn-add" onClick={increase}>+</button>
                            {/* <button className="reset" onClick={reset}>Reset</button> */}
                          </div>
                        </div>
                      </div>
                      <div className="leave-comment-with-latte-wrapper">
                        <div>
                          <input
                            id="latte-comment-input"
                            name='latte-comment'
                            type='text'
                            placeholder='Leave a Comment'
                            value={latteComment}
                            onChange={(e => setLatteComment(e.target.value))}
                          />
                        </div>
                      </div>
                      <div className="leave-latte-submit-wrapper">
                        Donate ${+counter * 4}
                      </div>
                    </div>
                  </div>
                )}
                <>
                  {Object.values(userPosts).map((post, i) => {
                    return (
                      <div className="post-wrapper">
                        <div className="post-ava-username">
                          <img id="post-user-pfp" src={user.avatar} />
                          <div className="post-user-username">{user.username}</div>
                        </div>
                        <div className="post-container">
                          <div className="post-content-wrapper">
                            <img className="post-image" src={post.post_img} />
                            <div className="post-text">
                              {post.post}
                            </div>
                            <div className="post-comment-count">
                              <div className="comment-counter" onClick={() => { setSomeThang(post); openMenu() }}>leave a comment</div>

                              {showMenu &&
                                otherThang
                              }

                              {+userId === currentUser.id && (
                                <div className="d-e-align">

                                  {deletePostHandler = () => {
                                    console.log('del post hand post id', post.id)
                                    if (window.confirm('Are you sure you want to delete your post?')) {
                                      dispatch(deletePostThunk(post.id))
                                      history.push(`/users/${userId}`)
                                    } else {
                                      history.push(`/users/${userId}`)
                                    }
                                  }}

                                  <img id="delete-icons" onClick={deletePostHandler} src={deleted} />
                                  <NavLink to={`/users/posts/${post.id}`}>
                                    <img id="edit-icons" src={edit} />
                                  </NavLink>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </>
                <div className="post-wrapper">
                  <div className="post-ava-username">
                    <img id="post-user-pfp" src={user.avatar} />
                    <div className="post-user-username">{user.username}</div>
                  </div>
                  <div className="post-container">

                    <div className="post-content-wrapper">
                      <img className="post-image" src="https://i.imgur.com/LKgVkZr.gif" />
                      <div className="post-text">
                        This is an example of what post text will look like and display on the post card. After I am done with my capstone project I will be going to hot pot immediately. I really probably should have generated some lorem ipsum here but now that I've typed all of this out I've realized it's too late. On second thought there seems to be a lot of space left. Nah it's okay I'll just cut it here.
                      </div>
                      <div className="post-comment-count">leave a comment</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default User;
