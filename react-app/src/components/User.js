import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink, Link } from 'react-router-dom';
import { createPostThunk, getAllPostsThunk, deletePostThunk } from '../store/post';
import { Modal } from './context/Modal';
import { createComment, getAllCommentsOfPost, getEveryComment, removeComment, updateComment } from '../store/comment'
import { createLatte, getEveryLatte, getCurrentLattes, getAllLattes } from '../store/latte';
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
import rec from "../assets/singlelate.png"
import defaultpfp from "../assets/pfp/nopicpfp.png"
import defaultpost from "../assets/onerrorimg/postimg.jpg"
import defaultcover from "../assets/onerrorimg/coverimg.jpeg"
import firstpostimg from "../assets/firstpost.png"

function User() {
  const [user, setUser] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [postImage, setPostImage] = useState('');
  const [postText, setPostText] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [comment, setComment] = useState('');
  const [someThang, setSomeThang] = useState(undefined)
  const [counter, setCounter] = useState(1);
  const [latteComment, setLatteComment] = useState('');
  const [latte, setLatte] = useState(1);
  const [editCommentText, setEditCommentText] = useState(0);
  const [thanks, setThanks] = useState(false);
  const [editCommentModalText, setEditCommentModalText] = useState('')
  const history = useHistory();
  const { userId } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user)
  const sessionUser = useSelector(state => state.session.user)
  const currUserLattes = useSelector(state => state.latteReducer.user)
  const lattes = useSelector(state => state.latteReducer.allLattes);
  const comments = useSelector(state => state.commentReducer)
  const commentsUsers = useSelector(state => state.commentReducer.post)
  const posts = useSelector(state => state.postReducer.allPosts)
  const singlePost = useSelector(state => state.postReducer.singlePost)
  const allComments = useSelector(state => state.commentReducer.allComments)

  const userPosts = Object.values(posts).filter(post => post.user_id === +userId)

  let deletePostHandler;
  let deleteCommentHandler;
  let editCommentHandler;
  let postIdHolder;
  let postComments;


  postComments = Object.values(comments).filter(comment => comment.post_id === +postIdHolder)

  const imageOnErrorHandler = (event) => {
    event.currentTarget.src = defaultpfp;
  };

  const postImageOnErrorHandler = (event) => {
    event.currentTarget.src = defaultpost;
  };

  const coverImageOnErrorHandler = (event) => {
    event.currentTarget.src = defaultcover;
  };

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
      setPostText('')
      setPostImage('')
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
    setComment('')
    // let createdComment =  dispatch(createComment(newComment, postIdHolder))
    // if (createdComment) {
    //   history.push(`/users/${userId}`)
    // }
  }



  const handleLatteSubmit = async (e) => {
    e.preventDefault()

    const newLatte = {
      latte: counter,
      comment: latteComment
    }

    if (newLatte) {
      setThanks(true)
      setTimeout(() => {
        setThanks(false)
      }, 5000)
    }

    await dispatch(createLatte(newLatte, userId))
    history.push(`/users/${userId}`)
    setLatteComment('')
    setCounter(1)
  }

  // console.log('try', Object.values(lattes)?.filter(latte =>
  //   latte?.donatee_id === +userId)?.length)

  useEffect(() => {
    dispatch(getAllLattes(sessionUser.id))

  }, [commentsUsers])


  useEffect(() => {
    if (!userId) {
      return;
    }

    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();

    dispatch(getEveryLatte())
    dispatch(getEveryComment())
    dispatch(getAllPostsThunk())
      .then(() => { setIsLoaded(true) })



    for (let i = 1; i < userPosts.length; i++) {
      dispatch(getAllCommentsOfPost(i))
    }


  }, [dispatch, userPosts.length, currentUser, singlePost, allComments, currUserLattes]);


  const otherThang = (
    <div id="comment-fixed-container">

      {useEffect(async () => {
        for (let i = 1; i < userPosts.length; i++) {
          dispatch(getAllCommentsOfPost(i))
        }
        // await dispatch(getEveryComment())

      }, [singlePost])}

      <div id="dont-look-at-this">

        {someThang ? postIdHolder = someThang.id : null}
        {/* {someThang ? postComments = Object.values(comments).filter(comment => comment.post_id === someThang.id) : null} */}

      </div>
      <div id="comment-fixed-upper-div">
        <div>
          <div className="close-comment-container">
            <img id="close-comment" onClick={(() => setShowMenu(false))} src={x} />
          </div>
          <img
            id="comment-post-img-id"
            src={someThang ? someThang.post_img : null}
            onError={postImageOnErrorHandler}
          />
        </div>
        <div className="whereisthis">
          <div id="comment-fixed-sections">
            <div className="dropdown-top-sections" id="profile-username">
              {() => {
                dispatch(getAllCommentsOfPost(someThang?.id))
              }}

              {Object.values(comments?.user)?.map(comment => {
                return (
                  <>
      {showCommentModal && (
        <Modal id='photo-modal' onClose={() => setShowCommentModal(false)}>
          <div id="close-modal" onClick={() => setShowCommentModal(false)}><img id="close-modal-icon" src={x} alt='close icon' />
          </div>
          <div className="post-modal-wrapper">
            {/* {function handleEditComment(e) {
              e.preventDefault()

              const newComment = {
                comment: editCommentModalText,
              }

              dispatch(updateComment(newComment, comment?.id))
              setEditCommentModalText('')
            }} */}


            <form id="post-modal-form" onSubmit={
              async (e) => {
                e.preventDefault()

                const newComment = {
                  comment: editCommentModalText
                }

                console.log('comment', comment?.id, 'content', comment, 'modaltxt', editCommentModalText)

                let updatedComment = await dispatch(updateComment(newComment, comment?.id))

                if (updatedComment) {
                  setEditCommentModalText('')
                  setShowCommentModal(false)
                }
              }}>
              <div className="post-modal-ava-post-container">
                <img
                  id="modal-avatar"
                  src={user.avatar}
                  onError={imageOnErrorHandler}
                />
                <textarea
                  id="post-text-input"
                  type='text'
                  name='post'
                  placeholder='Edit your comment'
                  onChange={((e) => setEditCommentModalText(e.target.value))}
                  value={editCommentModalText}
                ></textarea>
              </div>
              <div className="whitespace"></div>
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


                    {comment?.post_id === someThang?.id &&
                      <div className="comment-content-username-wrapper">
                        <img
                          id="comment-content-user-avatar"
                          src={comment?.post_id === someThang?.id ? comment?.owner?.avatar : null}
                          onError={imageOnErrorHandler}
                        />

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

                              {/* {editCommentHandler = () => {
                                history.push(`/comments/${comment?.id}/`)
                              }} */}

                              <img id="edit-icons" src={edit} onClick={() => setShowCommentModal(true)} />

                            </div>
                          )}
                        </div>

                      </div>

                    }

                    <div className="comment-content-createdat">
                      {comment?.post_id === someThang?.id ? comment?.created_at : null}
                    </div>
                    {editCommentText ?
                      (<div className="comment-content-comment">
                        {comment?.post_id === someThang?.id ? comment?.comment : null}
                      </div>)
                      :
                      (<div className="comment-content-comment">
                        {comment?.post_id === someThang?.id ? comment?.comment : null}
                      </div>)
                    }
                  </>
                )
              })}
            </div>
          </div>
        </div>
        <div id="dropdown-links-container">

          <div className="dropdown-links" id="comment-business-navbar">
            <img
              id="leave-comment-session-user-ava"
              src={sessionUser.avatar}
              onError={imageOnErrorHandler}
            />
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

  // let latteLength = Object.values(lattes)

  // useEffect(() => {

  // }, [latteLength.length])


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
                <img
                  id="modal-avatar"
                  src={user.avatar}
                  onError={imageOnErrorHandler}
                />
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
              <img
                id="user-page-cover-img"
                src={user.cover_img}
                onError={coverImageOnErrorHandler}
              />
            </div>
            <div className="avatar-wrapper">
              <img
                id="user-page-avatar"
                src={user.avatar}
                onError={imageOnErrorHandler}
              />
              <div className="user-page-top-name-container">
                <div className="user-page-top-name">{user.first_name} {user.last_name}</div>
                <div>la-te.com/{user.username}</div>
                <div className="user-page-top-city-state">{user.city}, {user.state}</div>
              </div>
            </div>

            <div className="top-bottom-portion-profile">
              <div className="top-bottom-portion-about">
                About
              </div>
              <div className="top-bottom-portion-received">
                <img id="received-lattes" src={rec} /> x
                <div className="rec-div">
                  {lattes && <b>{Object.values(lattes)?.filter(latte =>
                    latte?.donatee_id === +userId)?.length}</b>}
                </div>
                <div className="rec-div">
                  Received
                </div>
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
                        <img
                          id="post-user-ava-icon"
                          src={user.avatar}
                          onError={imageOnErrorHandler}
                        />
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
                  <form onSubmit={handleLatteSubmit}>
                    <div className="submit-latte-container">
                      <div className="submit-latte-content">
                        <div className="submit-latte-top">
                          <div className="buy-latte-for-wrapper">
                            Buy a latte for {user.first_name}
                          </div>
                        </div>
                        <div className="buy-latte-counter">
                          <div className="lattes-cost-center">
                            <img id="buy-latte-ava-icon" src={lateimg} />
                            $4 each
                          </div>

                          <div className="counter">
                            <div className="btn__container">
                              {counter > 1 ? (
                                <div className="control__btn-sub" onClick={() => setCounter(counter - 1)}>-</div>
                              ) : (
                                <div className="control__btn-sub">-</div>
                              )}
                              <span className="counter__output">{counter}</span>
                              <div className="control__btn-add" onClick={() => setCounter(counter + 1)}>+</div>
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
                        <button className="leave-latte-submit-wrapper"
                          type='submit'
                        >
                          Donate ${+counter * 4}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
                {thanks && (
                  <>
                    <div className="thank-you-submit-latte-container">
                      <img id="your-donation-cup" src={rec} />
                      <div className="your-donation-sent">Your donation has been sent to {user.first_name}!</div>
                      <div className="your-donation-thanks">Thanks a latte!</div>
                    </div>
                  </>
                )}
                <>
                  {Object.values(userPosts).reverse().map((post, i) => {
                    return (
                      <div className="post-wrapper">
                        <div className="post-ava-username">
                          <img
                            id="post-user-pfp"
                            src={user.avatar}
                            onError={imageOnErrorHandler}
                          />
                          <div className="post-user-username">{user.username}</div>
                        </div>
                        <div className="post-container">
                          <div className="post-content-wrapper">
                            <img
                              className="post-image"
                              src={post.post_img}
                              onError={postImageOnErrorHandler}
                            />
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
                    <img
                      id="post-user-pfp"
                      src={user.avatar}
                      onError={imageOnErrorHandler}
                    />
                    <div className="post-user-username">{user.username}</div>
                  </div>
                  <div className="post-container">

                    <div className="post-content-wrapper">
                      <img className="post-image" src={firstpostimg} />
                      <div className="post-text">
                        Welcome to La-Té! This is the first post on everyone's feed! Explore other profiles, comment on posts, and buy someone a latte!

                        <br></br><br></br>
                        <i>-La-Té Team</i>


                      </div>
                      <div className="post-comment-count">comments disabled for this post</div>
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
