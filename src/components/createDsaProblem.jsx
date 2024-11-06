
const { useState, useEffect } = require("react");
const configJson = require("./config.json");

export default function CreateDsaProblem() { 
    const [topics, setTopics] = useState([]);
    const addDsaProblem = () => {
        const topicName = document.getElementById("ddlTopics").options[document.getElementById("ddlTopics").selectedIndex].text;
        const problemName = document.getElementById("txtProblemName").value;
        var apiUrl = configJson.apiBaseUrl + 'dsaProblem/' + topicName + '/' + problemName;
        fetch(apiUrl)
            .then((response) => {
                if (response.status == 200) {
                    throw new Error("Dsa Problem Name already exists. Cannot add again!.....");
                }
            })
            .then(() => {
                apiUrl = configJson.apiBaseUrl + 'dsaProblem/';
                fetch(apiUrl, {
                    method: 'post',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                        "topicName": topicName, 
                        "problemName": problemName
                    })
                })
                    .then((response) => {
                        if (response.status == 200) {
                            alert("Successfully added the dsa problem name!.....");
                            document.getElementById("txtProblemName").value="";
                            document.getElementById("txtProblemName").focus();
                        }
                        else {
                            alert(response.status + ', an error occurred while processing your request!.....');
                        }
                    });
                })
                .catch((err) => alert(err));

    }

    const deleteDsaProblem = () => {
        const topicName = document.getElementById("ddlTopics").options[document.getElementById("ddlTopics").selectedIndex].text;
        const problemName = document.getElementById("txtProblemName").value;

        var apiUrl = configJson.apiBaseUrl + 'dsaProblem/' + topicName + '/' + problemName;
        fetch(apiUrl)
            .then((response) => {
                if (response.status != 200) {
                    throw new Error("Dsa Problem Name not found. Cannot delete!.....");
                }
            })
            .then(() => {
                apiUrl = configJson.apiBaseUrl + 'dsaProblem/';
                fetch(apiUrl, {
                    method: 'delete',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                        "topicName": topicName, 
                        "problemName": problemName
                    })
                })
                    .then((response) => {
                        if (response.status == 200) {
                            alert("Successfully deleted the dsa problem name!.....");
                            document.getElementById("txtProblemName").value="";
                            document.getElementById("txtProblemName").focus();
                        }
                        else {
                            alert(response.status + ', an error occurred while processing your request!.....');
                        }
                    });
                })
                .catch((err) => alert(err));

        }

        const fetchTopics = () => {
            var apiUrl = configJson.apiBaseUrl + 'dsaTopicAll';
            fetch(apiUrl)
                .then((response) => {
                    if (response.status != 200) {
                        //document.getElementById("txtTopicName").focus();
                        throw new Error("Dsa Topic Name not found. Cannot delete!.....");
                    }
                    else {
                        return response.json();
                    }
                })
                .then((response) => {
                    setTopics(response);
                })
        }

        useEffect(() => {
            fetchTopics();
        }, []);

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
                                    <select id="ddlTopics">
                                        {
                                            topics.map((oneTopic, topicIndex) => {
                                                return (
                                                <option key={topicIndex}>{oneTopic.topicName}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td align="right">
                                    <h4>Problem Name: </h4>
                                </td>
                                <td align="left">
                                    <input type="text" id="txtProblemName" size="15" />
                                </td>
                            </tr>
                            <tr>
                                <td align="center" colSpan={2}>
                                    <button id="btnAdd" onClick={addDsaProblem}>Add</button>&nbsp;
                                    <button id="btnDelete" onClick={deleteDsaProblem}>Delete</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </td>
                            </tr>
                        </table>   
                    </td>
                </tr>
            </table>
        </>
    )
}