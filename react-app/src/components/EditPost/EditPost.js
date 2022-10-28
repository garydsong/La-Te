import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { updatePostThunk, getAllPostsThunk, deletePostThunk } from '../../store/post';
import './EditPost.css'

function EditPost() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [postImage, setPostImage] = useState('');
    const [postText, setPostText] = useState('');
    const { postId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => state.postReducer.allPosts)
    const currentPost = Object.values(posts).filter(post => post.id === +postId)

    console.log('c', currentPost)

    const handleSubmit = (e) => {
        e.preventDefault()

        const post = {
            post: postText,
            post_img: postImage
        }

        let createdPost = dispatch(updatePostThunk(post, postId))

        if (createdPost) {
            history.push(`/users/${user.id}`)
        }

    }

    console.log(postId)
    return (
        <>
            <div className="gradient-top-edit-post"></div>
            <div className="edit-whitespace"></div>
            <div className="edit-post-container-page">
                <div className="your-current-post-wrapper">
                    <img id="current-picture-edit" src={currentPost[0]?.post_img} />
                    <div id="current-post-edit">{currentPost[0]?.post}</div>

                </div>
                <div className="post-edit-wrapper">
                    <form id="post-modal-form" onSubmit={handleSubmit}>
                        <div className="post-modal-ava-post-container">
                            <img id="modal-avatar" src={user.avatar} />
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
                </div>
            </div>
        </>
    )
}

export default EditPost
