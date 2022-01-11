import React from "react";

const ModalComponent = (props:any) => {
    return(
        <div className="main__modal">
           <div className="modal-window">
                <p>{props.message}</p>
           </div>
        </div>
    );
}

export default ModalComponent;