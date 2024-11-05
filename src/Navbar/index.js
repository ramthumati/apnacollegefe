import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./navbarElements";
import { NavbarText } from "react-bootstrap";

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />

                <NavMenu>
                    <NavLink to={{pathname: "//www.apnacollege.in"}} target="_blank" >
                        <b>Apna College</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </NavLink>
                    <NavLink to="dsasheet/help" >
                        <b>Help</b>
                    </NavLink>
                    <NavLink to="dsasheet/admin" >
                        <b>Admin</b>
                    </NavLink>
                    <NavLink to="dsasheet/dsa" activeStyle>
                        <b>DSA Sheet</b>
                    </NavLink>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <NavLink to="dsasheet/logout">
                        <b>Logout</b>
                    </NavLink>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;
