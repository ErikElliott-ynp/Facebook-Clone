import React from "react";


class PostForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            profileId: this.props.profile,
            body: "",
            photoFile: null,
            photoUrl: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handlePreviewCancel = this.handlePreviewCancel.bind(this);
    }

    handleChange(field) {
        return (e) => this.setState( { [field]: e.target.value } );
    }

    handleFile(e) {
        let file = e.currentTarget.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState( {photoFile: file, photoUrl: fileReader.result} );
        }
        if (file) {
            fileReader.readAsDataURL(file);
        }
        this.setState( { photoFile: e.currentTarget.files[0]} )
        let photoInput = document.getElementById("file-upload");
        photoInput.value = ""
    }

    handleSubmit(e) {
        e.preventDefault;
       
        const formData = new FormData();
        formData.append('post[profileId]', this.state.profileId)
        formData.append('post[body]', this.state.body);
        if (this.state.photoFile) {
            formData.append('post[photo]', this.state.photoFile);
        }

        this.props.createPost(formData);
        this.setState( { body: "", photoFile: null, photoUrl: null } );
    } 

    componentWillUnmount() {
        this.setState({
            authorId: this.props.user.id,
            profileId: this.props.profile,
            body: "",
            photoFile: null,
            photoUrl: null
        })
    }

    handlePreviewCancel () {
        this.setState( { photoFile: null, photoUrl: null } );
    }






    render () {
        const preview = this.state.photoUrl ?
        (<div className="prev-cont" id="prev-cont">
            <a onClick={this.handlePreviewCancel} className="boxclose" id="boxclose"></a>
            <img className="img-preview" src={this.state.photoUrl} /> 
        </div> ) : null

        let btn = document.getElementsByClassName("post-submit-btn")[0];
        if (this.state.body || this.state.photoFile) {
            btn.removeAttribute("disabled");
        } else if (!(this.state.body || this.state.photoFile)) {
            if (btn) btn.setAttribute("disabled", "disabled")
            
        }
        return (
            <div className="post-form-wide">
                <form className="post-form-21" onSubmit={this.handleSubmit}>
                    <div className="post-form-header">
                        <i className="fas fa-pencil-alt"></i>
                        <span>Create Post</span>
                    </div>
                    <div className="form-body">
                        <div className="post-prof-img">
                            <img src={this.props.user.profilePicture} className="post-prof-pic"/>
                        </div>

                        <textarea onKeyPress={(e) => {e.target.keyCode === 13  && e.preventDefault()}}
                            placeholder={`What's on your mind, ${this.props.user.firstName}`}
                            id="post-ta" value={this.state.body} className="text-a-post"
                            onChange={this.handleChange('body')}>
                        </textarea>
                    </div>

                <div id="prev-cont-wide">
                    
                    {preview}

                </div>
                    
                    
                    <div className="post-form-footer">
                        <label>
                            <i className="fas fa-photo-video">
                                <span> 
                                    Upload Photo
                                    <input onChange={this.handleFile} className="file-btn" type="file" id="file-upload"/>
                                </span>
                            </i>

                        </label>
                        <input type="submit" value="Post" className="post-submit-btn" disabled="disabled"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default PostForm;