import React, {useState} from "react";
import {ModalWindow} from "../ModalWindow";
import {Button} from "react-bootstrap";
import "../Operations.css";

export  function DeleteProduct(props) {
    const [modal, setModal] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setModal(!modal);

        const url = 'api/products/' + props.id;
        await fetch(url, {
            method: 'DELETE'
        });
        props.onUpdate();
    }

    const onSetShowModal = () => {
        setModal(!modal);
    }

    return (
        <>
            <img src="/delete-icon.png" onClick={onSetShowModal} alt="Delete"/>
            <ModalWindow show={modal} onHide={onSetShowModal} header={"Delete product"} footer={
                <>
                    <Button variant="secondary" onClick={onSetShowModal}>Close</Button>
                    <Button variant="primary" onClick={(event) => onSubmit(event)}>Ok</Button>
                </>
            }>
                Are you sure to delete product №{props.id}?
            </ModalWindow>
        </>
    )
}