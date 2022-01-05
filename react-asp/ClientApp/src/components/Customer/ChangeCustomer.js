import React, {useState} from "react";
import {ModalWindow} from "../ModalWindow";
import '../Operations.css'

export  function ChangeCustomer(props) {
    const [modal, setModal] = useState(false);
    const [password, setPassword] = useState(props.customer.password);

    const onSubmit = async (event) => {
        event.preventDefault();
        setModal(!modal);

        const url = 'https://localhost:44415/api/customers/' + props.customer.username;
        const productToSend = {
            'username': props.customer.username,
            'password': password
        };

        await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(productToSend),
            headers: {'Content-type': 'application/json'}
        });
        props.onUpdate();
    }

    const onSetShowModal = () => {
        setModal(!modal);
    }

    return (
        <>
            <img src="/change-icon.png" onClick={onSetShowModal} alt="Change"/>
            <ModalWindow show={modal} onHide={onSetShowModal} header={"Change customer"}>
                <form name="product" autoComplete onSubmit={(event) => onSubmit(event)}>
                    <label>
                        Username
                        <input value={props.customer.username} name="username" type="text" disabled/>
                    </label>
                    <label>
                        Password
                        <input value={password} name="password" type="password" required minLength={6} onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                    <button type="submit">Change</button>
                </form>
            </ModalWindow>
        </>
    )
}