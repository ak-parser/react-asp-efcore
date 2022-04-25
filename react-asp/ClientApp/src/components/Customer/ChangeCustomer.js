import React, { useState } from "react";
import { ModalWindow } from "../ModalWindow";
import '../Operations.css'

export function ChangeCustomer(props) {
  const [modal, setModal] = useState(false);
  const [role, setRole] = useState(props.customer.role);

  const onSubmit = async (event) => {
    event.preventDefault();
    setModal(!modal);

    const url = "api/customers/" + props.customer.username;
    const productToSend = [
      {
        "op": "replace",
        "path": "/role",
        "value": parseInt(role),
      }
    ];

    await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(productToSend),
      headers: { "Content-type": "application/json" }
    });
    props.onUpdate();
  }

  const onSetShowModal = () => {
    setModal(!modal);
  }

  return (
    <>
      <img src="/change-icon.png" onClick={onSetShowModal} alt="Change" />
      <ModalWindow show={modal} onHide={onSetShowModal} header={"Change customer"}>
        <form name="product" autoComplete={true} onSubmit={(event) => onSubmit(event)}>
          <label>
            Username
            <input value={props.customer.username} name="username" type="text" disabled />
          </label>
          <label>
            Role
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="0">User</option>
              <option value="1">Admin</option>
              <option value="2">Manager</option>
            </select>
          </label>
          <button type="submit">Change</button>
        </form>
      </ModalWindow>
    </>
  )
}