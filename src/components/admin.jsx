import { useEffect } from "react";
import configJson from "./config.json";

export default function Admin(props) {
    const checkIsAdmin = () => {
        const userId = props.userId;
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
                if (userObject.Role != "Admin") {
                    document.getElementById("h3Message").innerHTML = "You are not an admin. Only admins are allowed in this admin section!.....";
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
            <h3 id="h3Message" align="center"></h3>
        </>
    )
}
