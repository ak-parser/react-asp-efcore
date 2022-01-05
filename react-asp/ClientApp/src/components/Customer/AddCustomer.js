import React, {useRef, useState} from "react";
import {ModalWindow} from "../ModalWindow";
import {FindCustomer} from "../FindCustomer";
import '../Operations.css';

export  function AddCustomer(props) {
    const [modal, setModal] = useState(false);
    const [username, setUsername] = useState("");

    const usernameInputRef = useRef(null);

    const onSubmit = async (event) => {
        event.preventDefault();
        setModal(!modal);

        const url = 'https://localhost:44415/api/customers';
        const form = document.forms['customer'];
        const customerToSend = {
            "username": username,
            password: form['password'].value
        };

        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(customerToSend),
            headers: {'Content-type': 'application/json'}
        });
        props.onUpdate();
    }

    const onSetShowModal = () => {
        setModal(!modal);
    }

    return (
        <>
            <button className="modal-button-add" onClick={onSetShowModal}>{}</button>
            <ModalWindow show={modal} onHide={onSetShowModal} header={"Add customer"}>
                <form name="customer" autoComplete onSubmit={(event) => onSubmit(event)}>
                    <label>
                        Username
                        <input ref={usernameInputRef} value={username} name="username" type="text" required minLength="1" placeholder="user"
                               onChange={(e) => setUsername(e.target.value)}/>
                        <FindCustomer validOnTrue={false} username={username} usernameInput={usernameInputRef}>{}</FindCustomer>
                    </label>
                    <label>
                        Password
                        <input name="password" type="password" required minLength={6}/>
                    </label>
                    <button type="submit">Add</button>
                </form>
            </ModalWindow>
        </>
    )
}