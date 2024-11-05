
const configJson = require("./config.json");

export default function CreateUser() { 
    const fetchUser = () => {
        const userId = document.getElementById("txtUserId").value;
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
                setUserDetails(userObject);
            })
            .catch((error) => {
                console.log(error);
                alert(error + ', details about this userid is not found!.....');
                clearUserDetails();
            })
    }

    const addUser = () => {
        const userId = document.getElementById("txtUserId").value;
        if (userId == "") {
            return;
        }
        var apiUrl = configJson.apiBaseUrl + 'user/' + userId;
        fetch(apiUrl)
            .then((response) => {
                if (response.status == 200) {
                    document.getElementById("txtUserId").focus();
                    throw new Error("User already exists. Cannot add again!.....");
                }
            })
            .then(() => {
                apiUrl = configJson.apiBaseUrl + 'user/';
                fetch(apiUrl, {
                    method: 'post',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                        "userId": document.getElementById("txtUserId").value,
                        "password": document.getElementById("txtPassword").value,
                        "firstName": document.getElementById("txtFirstName").value,
                        "lastName": document.getElementById("txtLastName").value,
                        "role": document.getElementById("txtRole").value,
                        "active": document.getElementById("txtActive").value
                    })
                })
                    .then((response) => {
                        if (response.status == 200) {
                            alert("Successfully added the user!.....");
                            clearUserDetails();
                        }
                        else {
                            alert(response.status + ', an error occurred while processing your request!.....');
                            document.getElementById("txtUserId").focus();
                        }
                    });
                })
                .catch((err) => alert(err));

    }

    const updateUser = () => {
        const userId = document.getElementById("txtUserId").value;
        if (userId == "") {
            return;
        }
        var apiUrl = configJson.apiBaseUrl + 'user/' + userId;
        fetch(apiUrl)
            .then((response) => {
                if (response.status != 200) {
                    document.getElementById("txtUserId").focus();
                    throw new Error("User not found. Cannot update!.....");
                }
            })
            .then(() => {
                apiUrl = configJson.apiBaseUrl + 'user/';
                fetch(apiUrl, {
                    method: 'put',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                        "userId": document.getElementById("txtUserId").value,
                        "password": document.getElementById("txtPassword").value,
                        "firstName": document.getElementById("txtFirstName").value,
                        "lastName": document.getElementById("txtLastName").value,
                        "role": document.getElementById("txtRole").value,
                        "active": document.getElementById("txtActive").value
                    })
                })
                    .then((response) => {
                        if (response.status == 200) {
                            alert("Successfully updated the user!.....");
                            clearUserDetails();
                        }
                        else {
                            alert(response.status + ', an error occurred while processing your request!.....');
                            document.getElementById("txtUserId").focus();
                        }
                    });
                })
                .catch((err) => alert(err));

    }

    const deleteUser = () => {
        const userId = document.getElementById("txtUserId").value;
        if (userId == "") {
            return;
        }
        var apiUrl = configJson.apiBaseUrl + 'user/' + userId;
        fetch(apiUrl)
            .then((response) => {
                if (response.status != 200) {
                    document.getElementById("txtUserId").focus();
                    throw new Error("User not found. Cannot delete!.....");
                }
            })
            .then(() => {
                apiUrl = configJson.apiBaseUrl + 'user/';
                fetch(apiUrl, {
                    method: 'delete',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                        "userId": document.getElementById("txtUserId").value
                    })
                })
                    .then((response) => {
                        if (response.status == 200) {
                            alert("Successfully deleted the user!.....");
                            clearUserDetails();
                        }
                        else {
                            alert(response.status + ', an error occurred while processing your request!.....');
                            document.getElementById("txtUserId").focus();
                        }
                    });
                })
                .catch((err) => alert(err));

    }

    const setUserDetails = (userObject) => {
        document.getElementById("txtPassword").value = userObject.password;
        document.getElementById("txtFirstName").value = userObject.firstName;
        document.getElementById("txtLastName").value = userObject.lastName;
        document.getElementById("txtRole").value = userObject.role;
        document.getElementById("txtActive").value = userObject.active;
        document.getElementById("btnAdd").disabled = true;
    }

    const clearUserDetails = () => {
        document.getElementById("txtUserId").value = "";
        document.getElementById("txtPassword").value = "";
        document.getElementById("txtFirstName").value = "";
        document.getElementById("txtLastName").value = "";
        document.getElementById("txtRole").value = "";
        document.getElementById("txtActive").value = "";
        document.getElementById("btnAdd").disabled = false;
        document.getElementById("txtUserId").focus();
    }

    return (
        <>
            <table width="80%" align="center">
                <tr>
                    <td align="center">
                        <h2>Add/Update/Delete User</h2>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table width="80%" align="center" border={0}>
                            <tr>
                                <td align="right">
                                    <h4>UserId: </h4>
                                </td>
                                <td align="left">
                                    <input type="text" id="txtUserId" size="15" />&nbsp;<button onClick={fetchUser}>Fetch</button>
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
                                <td align="right">
                                    <h4>First Name: </h4>
                                </td>
                                <td align="left">
                                    <input type="text" id="txtFirstName" size="15" />
                                </td>
                            </tr>
                            <tr>
                                <td align="right">
                                    <h4>Last Name: </h4>
                                </td>
                                <td align="left">
                                    <input type="text" id="txtLastName" size="15" />
                                </td>
                            </tr>
                            <tr>
                                <td align="right">
                                    <h4>Role: </h4>
                                </td>
                                <td align="left">
                                    <input type="text" id="txtRole" size="15" />
                                </td>
                            </tr>
                            <tr>
                                <td align="right">
                                    <h4>Active: </h4>
                                </td>
                                <td align="left">
                                    <input type="text" id="txtActive" size="15" />
                                </td>
                            </tr>
                            <tr>
                                <td align="center" colSpan={2}>
                                    <button id="btnAdd" onClick={addUser}>Add</button>&nbsp;
                                    <button id="btnUpdate" onClick={updateUser}>Update</button>&nbsp;
                                    <button id="btnDelete" onClick={deleteUser}>Delete</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button id="btnReset" onClick={clearUserDetails}>Reset</button>
                                </td>
                            </tr>
                        </table>   
                    </td>
                </tr>
            </table>
        </>
    )
}