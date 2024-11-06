
const configJson = require("./config.json");

export default function CreateDsaTopic() { 
    const addDsaTopic = () => {
        const topicName = document.getElementById("txtTopicName").value;
        if (topicName == "") {
            return;
        }
        var apiUrl = configJson.apiBaseUrl + 'dsaTopic/' + topicName;
        fetch(apiUrl)
            .then((response) => {
                if (response.status == 200) {
                    document.getElementById("txtTopicName").focus();
                    throw new Error("Dsa Topic Name already exists. Cannot add again!.....");
                }
            })
            .then(() => {
                apiUrl = configJson.apiBaseUrl + 'dsaTopic/';
                fetch(apiUrl, {
                    method: 'post',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                        "topicName": document.getElementById("txtTopicName").value
                    })
                })
                    .then((response) => {
                        if (response.status == 200) {
                            alert("Successfully added the dsa topic name!.....");
                            //clearUserDetails();
                        }
                        else {
                            alert(response.status + ', an error occurred while processing your request!.....');
                            document.getElementById("txtTopicName").focus();
                        }
                    });
                })
                .catch((err) => alert(err));

    }

    const deleteDsaTopic = () => {
        const dsaTopicName = document.getElementById("txtTopicName").value;
        if (dsaTopicName == "") {
            return;
        }
        var apiUrl = configJson.apiBaseUrl + 'dsaTopic/' + dsaTopicName;
        fetch(apiUrl)
            .then((response) => {
                if (response.status != 200) {
                    document.getElementById("txtTopicName").focus();
                    throw new Error("Dsa Topic Name not found. Cannot delete!.....");
                }
            })
            .then(() => {
                apiUrl = configJson.apiBaseUrl + 'dsaTopic/';
                fetch(apiUrl, {
                    method: 'delete',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                        "topicName": document.getElementById("txtTopicName").value
                    })
                })
                    .then((response) => {
                        if (response.status == 200) {
                            alert("Successfully deleted the dsa topic name!.....");
                            //clearUserDetails();
                        }
                        else {
                            alert(response.status + ', an error occurred while processing your request!.....');
                            document.getElementById("txtTopicName").focus();
                        }
                    });
                })
                .catch((err) => alert(err));

    }

    return (
        <>
            <table width="80%" align="center">
                <tr>
                    <td align="center">
                        <h2>Add/Delete Dsa Topic Name</h2>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table width="80%" align="center" border={0}>
                            <tr>
                                <td align="right">
                                    <h4>Topic Name: </h4>
                                </td>
                                <td align="left">
                                    <input type="text" id="txtTopicName" size="15" />
                                </td>
                            </tr>
                            <tr>
                                <td align="center" colSpan={2}>
                                    <button id="btnAdd" onClick={addDsaTopic}>Add</button>&nbsp;
                                    <button id="btnDelete" onClick={deleteDsaTopic}>Delete</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </td>
                            </tr>
                        </table>   
                    </td>
                </tr>
            </table>
        </>
    )
}