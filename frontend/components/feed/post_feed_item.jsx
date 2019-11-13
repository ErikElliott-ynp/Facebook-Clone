import React from "react";
import { Link } from "react-router-dom"
import Modal from "../modal/modal"
    
class PostFeedItem extends React.Component{
    constructor(props) {
        super(props)
        this.state = this.props.post
    }

    // shouldComponentUpdate (nextProps, nextState) {
    //     return this.props.post.body !== nextProps.post.body;
    // }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.post.body !== this.props.post.body) {
    //         this.render();
    //     }
    // }
   
    render() {

        const photo = this.props.post.photoUrl ? <img className="post-photo" src={this.props.post.photoUrl} alt="" /> : null
        let profilePic;
        let firstName;
        let lastName;
        if (this.props.user) {
            profilePic = this.props.user.profilePicture ? <img src={this.props.user.profilePicture} className="post-item-pic" />
                : <img src="https://www.punchstick.com/wp-content/uploads/2017/12/default-user-image.png" className="post-item-pic" />
            firstName = this.props.user.firstName;
            lastName = this.props.user.lastName;
        };
        return (
            <div className="post-item-wide">
                <li className="list-item-post"> 
                    <div className="post-item-img">
                        <Link to={`/users/${this.props.userId}`}>
                            <div className="full-name">
                                {profilePic}
                                <span className="item-username">{firstName}  {lastName}</span>
                            </div> 
                        </Link>
                    </div>

                    { this.props.post.authorId === this.props.currentUser.Id ? (
                        <div className="post-delete-button clearfix">
                            <button onClick={() => this.props.deletePost(this.props.post.id)}>
                                <i className="fa fa-trash" aria-hidden="true"></i>
                            </button>
                        </div>
                        
                        ) : ( <script></script>)
                    }
                    <p className="post-body">{this.props.post.body}</p>
                   {photo}

                    <button onClick={() => this.props.openModal("updatePost", this.props.post.id)} className="edit-post-btn">Update Post</button>
                
                    <p className="line"></p>
                    <div className="post-item-footer">
                        <div className="post-item-like">
                            <i className="fas fa-thumbs-up"><strong>Like</strong></i>
                        </div>
                        <div className="post-item-comment">
                            <i className="fas fa-comment-alt"> <strong>Comment</strong></i>
                        </div>
                    </div>
                </li>
            </div>
        )
    }
}


export default PostFeedItem;