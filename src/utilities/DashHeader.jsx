import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { BiLogOutCircle, BiSolidGrid } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/reducer/loginDetail';
import icon1 from '../assets/images/headerIcon1.svg';
import icon2 from '../assets/images/headerIcon2.svg';
import icon3 from '../assets/images/headerIcon3.svg';
import SearchBox from '../sharedComponents/SearchBox';

function DashHeader(props) {

  const dispatch = useDispatch();

  const data = useSelector((state) => state);

  let navigate = useNavigate();

  const [menuCollapse, menuCollapseSet] = useState(false);
  const [menuSearch, setmenuSearch] = useState();

  const menuCollapsed = () => {
    menuCollapseSet({ menuCollapse: !menuCollapse });
    props.sidebarCtrlFunc();
  }

  const userLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate('/');
  }

  const keyUp = (event) => {
    setmenuSearch(event.key)
  }

  useEffect(() => {
  }, []);

  return (
    <div className='dashHeader'>
      <a className="logo"><a onClick={() => menuCollapsed()}><BiSolidGrid size={30} color="#fff" /></a>Report Designer</a>
      <input type="search" className='headerSearch' placeholder='Search Reports, Folders, and more' name='' onKeyUp={keyUp} />
      {menuSearch && <SearchBox menuSearch={menuSearch} setmenuSearch={setmenuSearch} />}
      <ul>
        <li><a><img src={icon1} alt='' /></a></li>
        <li><a><img src={icon2} alt='' /></a></li>
        <li><a><img src={icon3} alt='' /></a></li>
        <li><a onClick={() => userLogout()}><BiLogOutCircle color='#c7c9da' size={20} /></a></li>
      </ul>
    </div>
  );
}

export default DashHeader;