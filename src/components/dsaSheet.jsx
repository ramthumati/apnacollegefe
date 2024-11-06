import { useEffect, useState } from "react";
import configJson from "./config.json";

export default function DsaSheet(props) {
    const [problems, setProblems] = useState([]);

    const fetchProblems = () => {
        var apiUrl = configJson.apiBaseUrl + 'dsaProblems';
        fetch(apiUrl)
            .then((response) => {
                if (response.status != 200) {
                    throw new Error("Dsa problems not found!.....");
                }
                else {
                    return response.json();
                }
            })
            .then((response) => {
                //console.log(response);
                setProblems(response);
            })
    }

    const ThisProblemIsCompleted =(oneProblem, problemIndex) => {
        const userId = document.getElementById("checkCompleted_" + problemIndex).checked ? localStorage["UserId"] : "";
        var apiUrl = configJson.apiBaseUrl + 'dsaProblem';
        fetch(apiUrl, {
            method: "put",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "topicName": oneProblem.topicName, 
                "problemName": oneProblem.problemName,
                "youTubeLink": oneProblem.youTubeLink, 
                "leetCodeLink": oneProblem.leetCodeLink, 
                "articleLink": oneProblem.articleLink, 
                "level": oneProblem.level,
                "users": userId
            })
        })
            .then((response) => {
                if (response.status != 200) {
                    throw new Error("Error while updating!.....");
                }
                else {
                    return response.json();
                }
            })
    }

    useEffect(() => {
        fetchProblems();
    }, []);
    return (
        <>
            <table width="80%" align="center">
                <tr>
                    <td align="center">
                        <h2 align="center">DSA Sheet</h2>
                        <input type="radio" name="radioStatus" /> All&nbsp;
                        <input type="radio" name="radioStatus" /> Completed&nbsp;
                        <input type="radio" name="radioStatus" /> Pending&nbsp;
                    </td>
                </tr>
                {problems.map((oneProblem, problemIndex) => {
                    var checkBoxId = "checkCompleted_" + problemIndex;
                    return(
                        <tr>
                    
                    <td>
                        <table border="1" width="90%" align="center">
                            <tr>
                                <td>
                                    <table>
                                        <tr>
                                            <td width="20%" align="right"><b>Topic Name:</b></td>
                                            <td width="25%" align="left">{oneProblem.topicName}</td>
                                            <td width="20%" align="right"><b>Problem Name:</b></td>
                                            <td width="25%" align="left">{oneProblem.problemName}</td>
                                            <td width="10%" align="right">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td width="20%" align="right"><b>YouTube Link:</b></td>
                                            <td width="25%" align="left">{oneProblem.youTubeLink.toString().substr(0, 25)}</td>
                                            <td width="20%" align="right"><b>Leetcode Link:</b></td>
                                            <td width="25%" align="left">{oneProblem.leetCodeLink.toString().substr(0, 25)}</td>
                                            <td width="10%" align="right">
                                                <input type="checkbox" id={checkBoxId} onClick={() => ThisProblemIsCompleted(oneProblem, problemIndex)} /> Completed
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="20%" align="right"><b>Article Link:</b></td>
                                            <td width="25%" align="left">{oneProblem.articleLink.toString().substr(0, 25)}</td>
                                            <td width="20%" align="right"><b>Level:</b></td>
                                            <td width="25%" align="left">{oneProblem.level}</td>
                                            <td width="10%" align="right">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                    </tr>
                    
                    );
                 })}
            </table>
        </>
    )
}
