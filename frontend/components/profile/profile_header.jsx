import React from "react"

class ProfileHeader extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            photoFile: null,
            photoUrl: null
        }
        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFile(e) {
        let file = e.currentTarget.files[0];
    
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({ photoFile: file, photoUrl: null });
        }
        if (file) {
            fileReader.readAsDataURL(file);
        }
        
        this.setState({ photoFile: null, photoUrl: null});
        document.getElementById('prof-up').value = "";
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('user[profilePicture]', this.state.photoFile);
        this.props.updateUser(formData);
        this.setState({ photoFile: null, photoUrl: null } )
    }




    render() {
        let coverPhoto = this.props.user.coverPhoto ? <img src={this.props.user.coverPhoto} className="cover-photo-img" /> : null;
        let profilePic = this.props.user.profilePicture ? <img src={this.props.user.profilePicture} className="prof-photo-profile" />
            : <img src="https://www.punchstick.com/wp-content/uploads/2017/12/default-user-image.png" className="prof-photo-profile" />;

        const preview = this.state.photoUrl ?
        (<div className="prev-cont" id="prev-cont">
            <a onClick={this.handlePreviewCancel} className="boxclose" id="boxclose"></a>
            <img className="img-preview-prof" src={this.state.photoUrl} />
        </div>) : null
        return (
            <div className="prof-header-main">
                {coverPhoto}
                {profilePic}
                <h3 className="prof-name">{this.props.user.firstName} {this.props.user.lastName}</h3>
                <button className="edit-prof-btn">Update Profile</button>
                <div className="prof-photo-update" id="update-prof-pic">
                    <form onSubmit={this.handleSubmit} >
                        <label className="prof-up-label">
                            <i className="fas fa-camera"></i>
                            <span>
                                Update
                                <input onChange={this.handleFile} type="file" className="prof-upload-input" id="prof-up"/>
                            </span>
                        </label>
                        <input type="submit" value="Update"/>
                   </form>
                   {preview}
                </div>
            </div>
        )
    }
}

export default ProfileHeader;