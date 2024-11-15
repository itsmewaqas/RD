import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPermission } from '../redux/reducer/menuSlice';
import icon1 from '../assets/images/menuIcon1.svg';
import icon2 from '../assets/images/menuIcon2.svg';
import icon3 from '../assets/images/menuIcon3.svg';
import menuData from '../redux/reducer/menuData';

function TopMenu(props) {

    const dispatch = useDispatch();

    const [selectTitle, setSelectTitle] = useState("Home");

    const renderMenuIcon = (icon) => {
        switch (icon) {
            case "Home":
                return icon1;
            case "Visualization":
                return icon2;
            case "Organization":
                return icon3;
            default:
                return null
        }
    }

    const getPermission = (item) => {
        setSelectTitle(item.title);
        dispatch(selectPermission(item.menuID));
    }

    return (
        <ul>
            {menuData?.map((item, index) => (
                <li key={index.toString()}>
                    <a onClick={() => getPermission(item)}
                        className={selectTitle === item.title ? 'active' : ''}>
                        <img src={renderMenuIcon(item.title)} alt="" /> {item.title}</a>
                </li>
            ))}
        </ul>
    );
}

export default TopMenu;