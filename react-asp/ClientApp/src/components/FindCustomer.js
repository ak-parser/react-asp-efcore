import { useEffect } from "react";

export function FindCustomer({ validOnTrue, username, usernameInput }) {
  useEffect(() => {
    fetch("api/customers/exists/" + username)
      .then(response => response.json())
      .then(data => {
        if (validOnTrue) {
          data ?
            usernameInput.current.setCustomValidity("") :
            usernameInput.current.setCustomValidity("User does not exist");
        }
        else {
          data ?
            usernameInput.current.setCustomValidity("User already exists") :
            usernameInput.current.setCustomValidity("");
        }
      });
  }, [username, validOnTrue, usernameInput]);

  return null;
}