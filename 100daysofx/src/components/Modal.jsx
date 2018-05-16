import React from "react";
import "../styles/css/Modal.css";

const Modal = ({ children }) => {

    return (
        <div className="modal-wrapper">
            <div className="modal-children">
                {children}
            </div>
            <div className="modal-overlay" />
        </div>
    )
}

export default Modal;