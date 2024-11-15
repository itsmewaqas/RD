import React, { useState, useEffect, useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import arrow1 from '../assets/images/arrow1.svg';

function SearchBox({ menuSearch, setmenuSearch }) {

  const searchMenuHide = useRef(null)
  const closeOpenMenus = (e) => {
    if (searchMenuHide.current && menuSearch && !searchMenuHide.current.contains(e.target)) {
      setmenuSearch(false)
    }
  }
  document.addEventListener('mousedown', closeOpenMenus);

  const menuData = [
    {
      id: 0,
      title: 'Files',
      searchList: [
        {
          id: 0,
          title: 'MDU Attendance',
          sub1: 'My Space',
          sub2: 'Monthly Sheet',
        },
        {
          id: 1,
          title: 'EFT Attendance',
          sub1: 'Private Reports',
          sub2: 'Monthly Sheet',
        },
        {
          id: 2,
          title: 'BSD Attendance',
          sub1: 'Public Reports',
          sub2: 'Monthly Sheet',
        },
        {
          id: 3,
          title: 'Unison Attendance',
          sub1: 'Organizations',
          sub2: 'Monthly Sheet',
        },
      ]
    },
    {
      id: 1,
      title: 'Folder',
      searchList: [
        {
          id: 0,
          title: 'MDU Attendance',
          sub1: 'My Space',
          sub2: 'Monthly Sheet',
        },
      ]
    },
    {
      id: 2,
      title: 'Organization',
      searchList: [
        {
          id: 0,
          title: 'MDU Attendance',
          sub1: 'My Space',
          sub2: 'Monthly Sheet',
        },
        {
          id: 1,
          title: 'EFT Attendance',
          sub1: 'Private Reports',
          sub2: 'Monthly Sheet',
        },
        {
          id: 2,
          title: 'BSD Attendance',
          sub1: 'Public Reports',
          sub2: 'Monthly Sheet',
        },
      ]
    },
    {
      id: 3,
      title: 'Favourites',
      searchList: [
        {
          id: 0,
          title: 'MDU Attendance',
          sub1: 'My Space',
          sub2: 'Monthly Sheet',
        },
        {
          id: 1,
          title: 'EFT Attendance',
          sub1: 'Private Reports',
          sub2: 'Monthly Sheet',
        },
      ]
    }
  ];

  const [activeTab, setActiveTab] = useState(0);

  const [detailList, setDetailList] = useState([menuData[0]]);

  const selectItem = (item) => {
    setActiveTab(item.id);
    const filterData = menuData.filter((x) => {
      return x.id == item.id;
    })
    setDetailList(filterData);
  }

  useEffect(() => {
  }, []);

  return (
    <div>
      {menuSearch && <div ref={searchMenuHide} className='searchMenu'>
        <ul className='list1'>
          {menuData?.map((item, index) => {
            return (
              <li key={index.toString()}>
                <a className={activeTab === item.id ? 'active' : null}
                  onClick={() => selectItem(item)}>{item.title}</a>
              </li>)
          })}
        </ul>
        <h1>Recent Search</h1>
        <Scrollbars style={{ height: 270 }}>
          {detailList?.map((item, index) => {
            return (
              <ul className='list2' key={index.toString()}>
                {item.searchList.map((subItem, index) => {
                  return (
                    <li>
                      <a href="javascript:;" key={index.toString()}>
                        <p>{subItem.title}</p>
                        <dd><span>{subItem.sub1}</span> <img src={arrow1} alt="" /> <span>{subItem.sub1}</span></dd>
                      </a>
                    </li>
                  )
                })}
              </ul>
            )
          })}
        </Scrollbars>
        {/*{menuSearch}*/}
      </div>}
    </div>
  );
}

export default SearchBox;