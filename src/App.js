import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Login from "./components/login";
import Logout from "./components/logout";
import Help from "./components/help";
import Admin from "./components/admin";
import DsaSheet from "./components/dsaSheet";

function App() {
    const [userId, setUserId] = useState("");
    const [loggedIn, setLoginId] = useState(false);

    const setTheUserId = (userId) => {
      localStorage["UserId"] = userId;
      setUserId(userId);
      setLoginId(true);
    }

    const setTheLoggedIn = () => {
      setLoginId(localStorage["UserId"] ? true : false);
    }

    const LogoutNow = () => {
      localStorage.clear();
      setLoginId(false);
    }

    useEffect(() => {
      setTheLoggedIn();
    }, []);

    return (
      <>
        <Router>
            <Navbar />
            <Routes>
              <Route path="dsasheet" element={<Help />} />
              <Route path="dsasheet/index.html" Component={loggedIn ? () => <Help /> : () => <Login setThisUserId={setTheUserId} />} />
              <Route path="dsasheet/help" Component={loggedIn ? () => <Help /> : () => <Login setThisUserId={setTheUserId} />} />
              <Route path="dsasheet/admin" Component={loggedIn ? () => <Admin userId={userId} /> : () => <Login setThisUserId={setTheUserId} />} />
              <Route path="dsasheet/dsa" Component={loggedIn ? () => <DsaSheet /> : () => <Login setThisUserId={setTheUserId} />} />
              <Route path="dsasheet/logout" Component={loggedIn ? () => <Logout LogoutNow={LogoutNow} /> : () => <Login setThisUserId={setTheUserId}/>} />
              {/* <Route path="dsasheet/logout" Component={<Logout LogoutNow={LogoutNow} />} /> */}
          </Routes>
        </Router>
      </>
    );
}

export default App;
