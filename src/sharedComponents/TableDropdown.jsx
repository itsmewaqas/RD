import React, { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import arrowDown from '../assets/images/down-arrow.png';
import arrowUp from '../assets/images/down-up.png';

function TableDropdown({ columnData, tableName, isVisible, toggleDropdown, setDraggedItem }) {

    const filteredItems = columnData.filter(item =>
        item.toLowerCase().includes(item.toLowerCase())
    )

    const handleDragStart = (event, item) => {
        setDraggedItem(item);
        event.dataTransfer.setData('text', item);  // Store the item in the dataTransfer object
    };

    return (
        <div className='tableDropdownMain'>
            <button className='tableDropdown' onClick={toggleDropdown}>
                {tableName}<img src={isVisible ? arrowDown : arrowUp} alt="" />
            </button>
            {isVisible && (
                <div className='tableDropdownOption'>
                    {filteredItems.map((item, index) => {
                        return (
                            <div>
                                <a key={index.toString()}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, item)}
                                    style={{cursor: 'move',}}
                                >{item}</a>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default TableDropdown;
