import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { updatePostThunk, getAllPostsThunk, deletePostThunk } from '../../store/post';
import defaultpfp from "../../assets/pfp/nopicpfp.png"
import defaultpost from "../../assets/onerrorimg/postimg.jpg"
import './EditPost.css'

function EditPost() {
    const [isLoaded, setIsLoaded] = useState(false);


    const { postId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => state.postReducer.allPosts)
    const currentPost = Object.values(posts).filter(post => post.id === +postId)

    const existingPost = useSelector(state => state.postReducer.allPosts[postId])

    const [postImage, setPostImage] = useState(existingPost?.post_img ?? '');
    const [postText, setPostText] = useState(existingPost?.post ?? '');
    const [validationErrors, setValidationErrors] = useState([])
    const [showErrors, setShowErrors] = useState(false)

    console.log('c', currentPost)

    const imageOnErrorHandler = (event) => {
        event.currentTarget.src = defaultpfp;
    };

    const postImageOnErrorHandler = (event) => {
        event.currentTarget.src = defaultpost;
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setShowErrors(true)

        if (!validationErrors.length) {
            const post = {
                post: postText,
                post_img: postImage
            }

            let createdPost = dispatch(updatePostThunk(post, postId))

            if (createdPost) {
                setShowErrors(false)
                history.push(`/users/${user.id}`)
            }
        }

    }

    useEffect(() => {
        const errors = []
        if (postText?.length < 1 || postText?.length > 3000) errors.push("Post must be between 1 and 3000 characters")
        if (!postImage?.match(/\.(jpg|jpeg|png|gif)$/)) errors.push('Please enter a valid image(jpg/jpeg/png).')
        setValidationErrors(errors)

    }, [postText, postImage])

    console.log(postId)
    return (
        <>
            <div className="gradient-top-edit-post"></div>
            <div className="edit-whitespace"></div>
            <div className="edit-post-container-page">
                <div className="your-current-post-wrapper">
                    <img
                    id="current-picture-edit"
                    src={currentPost[0]?.post_img}
                    onError={postImageOnErrorHandler}
                    />
                    <div id="current-post-edit">{currentPost[0]?.post}</div>

                </div>
                <div className="post-edit-wrapper">
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
                                placeholder='Edit your current post'
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
                    {showErrors &&
                        <div id="error-holder">
                            {validationErrors.map((e, i) => {
                                return <div id="post-edit-error" key={i}>{e}</div>
                            })}
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default EditPost
