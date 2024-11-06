import { useEffect, useRef, useState } from "react";
import configJson from "./config.json";
import Help from "./help";
import Login from "./login";
import CreateUser from "./createUser";
import CreateDsaTopic from "./createDsaTopic";
import CreateDsaProblem from "./createDsaProblem";

export default function Admin() {
    const [ isAdmin, setIsAdmin ] = useState(false);
    const [ createUsersToDisplay, setCreateUsersToDisplay ] = useState(false);
    const [ createDSAMasterToDisplay, setCreateDSAMasterToDisplay ] = useState(false);
    const [ createDSAProblemToDisplay, setCreateDSAProblemToDisplay ] = useState(false);

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

    const renderCreateUsers = () => {
        setCreateUsersToDisplay(true);
        setCreateDSAMasterToDisplay(false);
        setCreateDSAProblemToDisplay(false);
    }

    const renderDSAMaster = () => {
        setCreateUsersToDisplay(false);
        setCreateDSAMasterToDisplay(true);
        setCreateDSAProblemToDisplay(false);
    }

    const renderDSAProblem = () => {
        setCreateUsersToDisplay(false);
        setCreateDSAMasterToDisplay(false);
        setCreateDSAProblemToDisplay(true);
    }

    useEffect(() => {
        checkIsAdmin();
    }, []);

    return(
        <>
            <h3 id="h3Message" align="center">Welcome to the Admin section</h3>
            <h3>{isAdmin && <button onClick={renderCreateUsers}>Manage Users</button>}&nbsp;&nbsp;&nbsp;
            {isAdmin && <button onClick={renderDSAMaster}>Manage DSA Topics</button>}&nbsp;&nbsp;&nbsp;
            {isAdmin && <button onClick={renderDSAProblem}>Manage DSA Problems</button>}</h3>
            <div id="divAdmin">
                {createUsersToDisplay && <CreateUser />} 
                {createDSAMasterToDisplay && <CreateDsaTopic />} 
                {createDSAProblemToDisplay && <CreateDsaProblem />} 
            </div>
        </>
    )
}
