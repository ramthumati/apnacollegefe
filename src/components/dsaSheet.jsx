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
                console.log(response);
                setProblems(response);
            })
    }

    useEffect(() => {
        fetchProblems();
    }, []);
    return (
        <>
            <h2 align="center">DSA Sheet</h2>
            <table width="80%" align="center">
                {problems.map((oneProblem, problemIndex) => {
                    return(
                        <tr>
                    
                    <td>
                        <table border="1" width="90%" align="center">
                            <tr>
                                <td>
                                    <table>
                                        <tr>
                                            <td width="20%" align="right"><b>Topic Name:</b></td>
                                            <td width="30%" align="left">{oneProblem.topicName}</td>
                                            <td width="20%" align="right"><b>Problem Name:</b></td>
                                            <td width="30%" align="left">{oneProblem.problemName}</td>
                                        </tr>
                                        <tr>
                                            <td width="20%" align="right"><b>YouTube Link:</b></td>
                                            <td width="30%" align="left">{oneProblem.youTubeLink.toString().substr(0, 25)}</td>
                                            <td width="20%" align="right"><b>Leetcode Link:</b></td>
                                            <td width="30%" align="left">{oneProblem.leetCodeLink.toString().substr(0, 25)}</td>
                                        </tr>
                                        <tr>
                                            <td width="20%" align="right"><b>Article Link:</b></td>
                                            <td width="30%" align="left">{oneProblem.articleLink.toString().substr(0, 25)}</td>
                                            <td width="20%" align="right"><b>Level:</b></td>
                                            <td width="30%" align="left">{oneProblem.level}</td>
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