import React, {useRef, useState} from "react";
import {ModalWindow} from "../ModalWindow";
import {FindCustomer} from "../FindCustomer";
import '../Operations.css'

export  function ChangeProduct(props) {
    const [modal, setModal] = useState(false);
    const [name, setName] = useState(props.product.name);
    const [price, setPrice] = useState(props.product.price);
    const [weight, setWeight] = useState(props.product.weight);
    const [createDate, setCreateDate] = useState(props.product.createDate);
    const [customer, setCustomer] = useState(props.product.customerUsername);

    const customerInputRef = useRef(null);

    const onSubmit = async (event) => {
        event.preventDefault();
        setModal(!modal);

        const url = 'api/products/' + props.product.id;
        const productToSend = {
            'id': props.product.id,
            'name': name,
            'price': price,
            'weight': weight,
            'createDate': createDate,
            'customerUsername': customer
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
            <ModalWindow show={modal} onHide={onSetShowModal} header={"Change product"}>
                <form name="product" autoComplete onSubmit={(event) => onSubmit(event)}>
                    <label>
                        Name
                        <input value={name} name="name" type="text" required minLength="1" placeholder="Apple" onChange={(e) => setName(e.target.value)}/>
                    </label>
                    <label>
                        Price
                        <input value={price} name="price" type="number" required min="0" step="0.01" placeholder="10.5" onChange={(e) => setPrice(e.target.value)}/>
                    </label>
                    <label>
                        Weight
                        <input value={weight} name="weight" type="number" required min="0" step="0.01" placeholder="0.35" onChange={(e) => setWeight(e.target.value)}/>
                    </label>
                    <label>
                        Production date
                        <input value={createDate} name="createDate" type="datetime-local" required onChange={(e) => setCreateDate(e.target.value)}/>
                    </label>
                    <label>
                        Customer
                        <input ref={customerInputRef} value={customer} name="customer" type="text" required onChange={(e) => setCustomer(e.target.value)}/>
                        <FindCustomer validOnTrue={true} username={customer} usernameInput={customerInputRef}>{}</FindCustomer>
                    </label>
                    <button type="submit">Change</button>
                </form>
            </ModalWindow>
        </>
    )
}