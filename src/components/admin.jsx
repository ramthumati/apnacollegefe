import { useEffect, useRef, useState } from "react";
import configJson from "./config.json";

export default function Admin() {
    const [ isAdmin, setIsAdmin ] = useState(false);
    const checkIsAdmin = () => {
        const userId = localStorage["UserId"];
        if (userId == "") {
            return;
        }
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
                if (userObject.role != "Admin") {
                    setIsAdmin(false);
                    document.getElementById("h3Message").innerHTML = "You are not an admin. Only admins are allowed in this admin section!.....";
                }
                else {
                    setIsAdmin(true);
                }
            })
            .catch((error) => {
                console.log(error);
                alert(error + ', an error occurred while processing your request!.....');
            })
    }

    useEffect(() => {
        checkIsAdmin();
    }, []);

    return(
        <>
            <h3 id="h3Message" align="center">Welcome to the Admin section</h3>
            <h3>{isAdmin && <button>Create Users</button>}</h3>
            <h3>{isAdmin && <button>Create DSA Master</button>}</h3>
        </>
    )
}
