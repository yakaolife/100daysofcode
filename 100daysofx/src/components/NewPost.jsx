import React from "react";
import EntryForm from "./EntryForm";
import "../styles/css/NewPost.css";

const NewPost = ({onSubmit, onClose}) => {
    return (
        <div className="new-post">
            <EntryForm onSubmit={onSubmit} onClose={onClose}/>
        </div> 
    );
}

export default NewPost;