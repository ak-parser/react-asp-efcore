import React, {useEffect} from "react";

export function FindCustomer(props) {
    useEffect(() => {
        fetch("https://localhost:44415/api/customers/exists/" + props.username)
            .then(response => response.json())
            .then(data => {
                if (props.validOnTrue) {
                    data === true ?
                        props.usernameInput.current.setCustomValidity("") :
                        props.usernameInput.current.setCustomValidity("User does not exist");
                }
                else {
                    data === true ?
                        props.usernameInput.current.setCustomValidity("User already exists") :
                        props.usernameInput.current.setCustomValidity("");
                }
            });
    }, [props.username]);

    return null;
}