import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout(props) {
    const navigate = useNavigate();
    
    useEffect(() => {
        props.LogoutNow();
        navigate("/dsasheet/help");
    }, []);

    return (
            <>
                <h1>Logged Out Now</h1>
            </>
    )
}