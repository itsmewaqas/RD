import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { BiUserPin, BiMoneyWithdraw, BiCompass, BiChevronLeft, BiChevronDown } from "react-icons/bi";
import icon1 from '../assets/images/sidebarIcon1.svg';
import icon2 from '../assets/images/sidebarIcon2.svg';
import icon3 from '../assets/images/sidebarIcon3.svg';
import icon4 from '../assets/images/sidebarIcon4.svg';
import icon5 from '../assets/images/sidebarIcon5.svg';
import { useSelector } from 'react-redux';

function DashSidebar(props) {

  const menuSlice = useSelector((state) => state.menuSlice);

  const [selectedMenu, selectedMenuSet] = useState("My Space");

  const renderIcon = (icon) => {
    switch (icon) {
      case "MySpace":
        return icon1;
      case "Private Reports":
        return icon2;
      case "Public Reports":
        return icon3;
      case "Organizations":
        return icon4;
      case "Favourites":
        return icon5;
      default:
        return icon5
    }
  }

  const menClick = (index) => {
    if (selectedMenu === index) {
      selectedMenuSet(null);
    } else {
      selectedMenuSet(index);
    }
  }

  return (
    <div className={props.sidebarCtrl} style={props.topCtrl}>
      <ul className='sidebar' id='scrollable'>
        {menuSlice.menuList?.map((item, index) => (
          <dd key={index.toString()}>
            {item.menuDataParent?.map((pItem, index) => (
              <li key={index.toString()}>
                <Link to={pItem.menuLink}
                className={selectedMenu === pItem.menuTitle ? 'active' : ''}
                  onClick={() => menClick(pItem.menuTitle)}>
                  <img src={renderIcon(pItem.menuTitle)} alt="" />
                  <title className={props.titleCtrl}>{pItem.menuTitle}</title>
                  {pItem.menuTitle && pItem.menuDataChild &&
                    <dd>{selectedMenu === pItem.menuTitle ? <BiChevronDown size={24} /> : <BiChevronLeft size={24} />}</dd>}
                </Link>
                {selectedMenu === pItem.menuTitle &&
                  <ul>
                    {pItem.menuDataChild?.map((cItem, index) => (
                      <li key={index.toString()}>
                        <Link to={cItem.cMenuItem}>{cItem.cMenuItem}</Link>
                      </li>
                    ))}
                  </ul>
                }
              </li>
            ))}
          </dd>
        ))}
      </ul>
    </div>
  );
}

export default DashSidebar;


