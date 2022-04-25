import { Alert } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ModalWindow } from "../components/ModalWindow";

export function ChangeSettings({ username }) {
  const [modal, setModal] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirm)
      return;

    const url = "api/customers/" + username;
    const productToSend = [
      {
        "op": "replace",
        "path": "/password",
        "value": password
      }
    ];

    await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(productToSend),
      headers: { "Content-type": "application/json" }
    });

    onHideModal();
  }

  const onHideModal = () => {
    setModal(false);
    navigate(-1);
  }

  return (
    <ModalWindow show={modal} onHide={onHideModal} header={"Change customer"}>
      <form name="product" autoComplete={true} onSubmit={(event) => onSubmit(event)}>
        <label>
          Username
          <input value={username} name="username" type="text" disabled />
        </label>
        <label>
          Password
          <input value={password} name="password" type="password" required minLength={6} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          Confirm
          <input value={passwordConfirm} type="password" required minLength={6} onChange={(e) => setPasswordConfirm(e.target.value)} />
        </label>
        {password !== passwordConfirm && <Alert style={{ padding: "0.3vw 1vw" }} variant="danger">
          Passwords must be equal
        </Alert>}
        <button type="submit">Change</button>
      </form>
    </ModalWindow>
  );
}