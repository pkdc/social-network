import { useRef, useState } from "react";
import Card from "../UI/Card";
import CreatePostTextarea from "../UI/CreatePostTextarea";
import SmallButton from "../UI/SmallButton";
import FormPostSelect from "../UI/FormPostSelect";
import ImgUpload from "../UI/ImgUpload";
import classes from './CreatePost.module.css';

function CreatePost(props) {
    const defaultImagePath = "default_avatar.jpg";
    const userId = +localStorage.getItem("user_id");
    const first = localStorage.getItem("fname");
    const last = localStorage.getItem("lname");
    const nickname = localStorage.getItem("nname");
    const avatar = localStorage.getItem("avatar");

    const [uploadedImg, setUploadedImg] = useState("");
    // const titleInput = useRef();
    const contentInput = useRef();
    const privacyInputRef = useRef();

    function SubmitHandler(event) {
        event.preventDefault();
        // console.log(contentInput.current.value);
        // console.log(privacyInputRef.current.value);

        const enteredContent = contentInput.current.value
        const chosenPrivacy = privacyInputRef.current.value;

        const postData = {
            user_id: userId,
            content: enteredContent,
            image: uploadedImg,
            privacy: chosenPrivacy
        };

        console.log("create post data", postData)

        props.onCreatePost(postData)

        contentInput.current.value = "";
        privacyInputRef.current.value = 0;
        setUploadedImg("");
    }
    const imgUploadHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", () => {
            console.log(reader.result);
            setUploadedImg(reader.result);
        })
    };
    const privacyOptions = [
        {value: 0, text: "Public"},
        {value: 1, text: "Private"},
        {value: 2, text: "Almost Private"}
    ];

    return <form onSubmit={SubmitHandler}>
        {/* <div>
            <label htmlFor="title">Title</label>
            <input type='text' required id="title" ref={titleInput}/>
        </div> */}
        <Card className={classes.card}>
            <div className={classes["author"]}>
                {!avatar && <img className={classes["avatar"]} src={require("../../images/"+`${defaultImagePath}`)} alt="" width={"50px"}/>}
                {avatar && <img className={classes["avatar"]} src={avatar} alt="" width={"50px"}/>}
                <div><p className={classes["details"]}>{`${first} ${last} (${nickname})`}</p></div>
            </div>
            <div className={classes["content-container"]}>
                <div>
                    <CreatePostTextarea className={classes.content} placeholder="What's on your mind?" reference={contentInput} rows="3"/>
                </div>
                <div>
                <figure>
                    {uploadedImg && <img src={uploadedImg} className={classes["img-preview"]} width={"80px"}/>}
                </figure>
                    <ImgUpload className={classes["attach"]} name="image" id="image" accept=".jpg, .jpeg, .png, .gif" text="Attach" onChange={imgUploadHandler}/>
                </div>
                <div>
                    <FormPostSelect options={privacyOptions} className={classes["privacy"]} reference={privacyInputRef}/>
                </div>
            </div>
        
        <div className={classes.btn}>
            <SmallButton>Post</SmallButton>
        </div>
        </Card>
      
         
    </form>
}

export default CreatePost;