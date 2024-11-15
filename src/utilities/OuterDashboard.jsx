import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import { BiSolidGrid } from "react-icons/bi";

function OuterDashboard(props) {

  return (
    <div className='loginWrapper'>
      <header>
        <a className="logo"><BiSolidGrid size={30} color="#fff" />Report Designer</a>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© {(new Date().getFullYear())} Report Designer All rights reserved.</p>
      </footer>
    </div>
  );
}

export default OuterDashboard;