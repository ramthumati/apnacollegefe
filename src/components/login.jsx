import React, { useRef } from "react";
import configJson from "./config.json";

export default function Login(props) {
    const login = () => {
        const userId = document.getElementById("txtUserId").value;
        const password = document.getElementById("txtPassword").value;
        const apiUrl = configJson.apiBaseUrl + 'user/' + userId;
        fetch(apiUrl)
            .then((response) => {
                if (response.status != 200) {
                    throw new Error(response.status);
                }
                else {
                    return response.json();
                }
            })
            .then((userObject) => {
                if (password === userObject.password) {
                    props.setThisUserId(userId);
                }
                else {
                    alert("Login failure!.....");
                }
                //console.log(userObject);
            })
            .catch((error) => {
                console.log(error);
                alert(error + ', either the userid that you had entered is not found or an error occurred while processing your request!.....');
            })
    }
    return (
        <>
            <table width="80%" align="center">
                <tr>
                    <td align="center">
                        <h2>Please login by entering your userid and password</h2>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table width="80%" align="center">
                            <tr>
                                <td align="right">
                                    <h4>UserId: </h4>
                                </td>
                                <td align="left">
                                    <input type="text" id="txtUserId" size="15" />
                                </td>
                            </tr>
                            <tr>
                                <td align="right">
                                    <h4>Password: </h4>
                                </td>
                                <td align="left">
                                    <input type="text" id="txtPassword" size="15" />
                                </td>
                            </tr>
                            <tr>
                                <td align="center" colSpan={2}>
                                    <button onClick={login}>Submit</button>
                                </td>
                            </tr>
                        </table>   
                    </td>
                </tr>
            </table>
        </>
    )
}
