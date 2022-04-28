import React,{ useContext, useEffect, useState } from 'react';
import { UserContext } from "./context/LoginContext";
import axios from "axios";

const TestCSRF = () => {
    const domainURL = "http://localhost:5000";
    const [text,setText] = useState('');
    const {csrfToken,setCsrfToken} = useContext(UserContext);

    const loadCsrfToken = async () => {
        const response = await fetch(`${domainURL}/form`,{
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            mode: "cors"
        });

        const parsedData = await response.json();
        console.log(parsedData.csrfToken);
        setCsrfToken(parsedData.csrfToken)
    }
    

    const submitForm = async () => {
        fetch(`${domainURL}/process`,{
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "xsrf-token": csrfToken
            },
            credentials: "include",
            mode: "cors"
        })
        .then(response => {
            if(response.status !== 200) {
                return "Not authorized to do this.";
            } else {
                return response.text();
            }
        })
        .then(data => setText(data))
        .catch(err => console.log(err));
    }

    useEffect(() => {
        loadCsrfToken();
    },[]);


    return (
        <div>
            <button onClick={() => submitForm()}>click me</button>
            <p>{text.length > 0 ? text : "nothing man"}</p>
        </div>
    )
}

export default TestCSRF;
