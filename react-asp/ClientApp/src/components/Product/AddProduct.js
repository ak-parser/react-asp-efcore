import React, {useRef, useState} from "react";
import {ModalWindow} from "../ModalWindow";
import '../Operations.css'
import {FindCustomer} from "../FindCustomer";

export  function AddProduct(props) {
    const [modal, setModal] = useState(false);
    const [customer, setCustomer] = useState("");

    const customerInputRef = useRef(null);

    const onSubmit = async (event) => {
        event.preventDefault();
        setModal(!modal);

        const url = 'api/products';
        const form = document.forms['product'];
        const productToSend = {
            name: form['name'].value,
            price: form['price'].value,
            weight: form['weight'].value,
            createDate: form['createDate'].value,
            customerUsername: customer
        };

        await fetch(url, {
            method: 'POST',
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
            <button className="modal-button-add" onClick={onSetShowModal}>{}</button>
            <ModalWindow show={modal} onHide={onSetShowModal} header={"Add product"}>
                <form name="product" autoComplete onSubmit={(event) => onSubmit(event)}>
                    <label>
                        Name
                        <input name="name" type="text" required minLength="1" placeholder="Apple"/>
                    </label>
                    <label>
                        Price
                        <input name="price" type="number" required min="0" step="0.01" placeholder="10.5"/>
                    </label>
                    <label>
                        Weight
                        <input name="weight" type="number" required min="0" step="0.01" placeholder="0.35"/>
                    </label>
                    <label>
                        Production date
                        <input name="createDate" type="datetime-local" required/>
                    </label>
                    <label>
                        Customer
                        <input ref={customerInputRef} value={customer} name="customer" type="text" required onChange={(e) => setCustomer(e.target.value)}/>
                        <FindCustomer validOnTrue={true} username={customer} usernameInput={customerInputRef}>{}</FindCustomer>
                    </label>
                    <button type="submit">Add</button>
                </form>
            </ModalWindow>
        </>
    )
}