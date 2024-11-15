import React, { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

function OutlineDropdown({ columnData,addLabel }) {
    const [isVisible, setIsVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);

    const handleFocus = () => {
        setIsVisible(true);
    };

    const handleBlur = () => {
        setTimeout(() => setIsVisible(false), 100);
    };

    const filteredItems = columnData.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getValue = (item) => {
        console.log(item, '...');
        if (selectedItems.includes(item)) {
            alert('Item already exists!');
            return;
        }
        //  setSearchTerm(item);
        setIsVisible(false);
        setSelectedItems(prevItems => [...prevItems, item]);
    };

    const removeItem = (index) => {
        setSelectedItems([
            ...selectedItems.slice(0, index),
            ...selectedItems.slice(index + 1)
        ]);
    }

    return (
        <div className='filterDropMenuMain'>
            <input
                className='filterDropMenu'
                type="text"
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder={addLabel}
            />
            {isVisible && (
                <div className='filterDropMenuOption'>
                    <Scrollbars style={{ height: 100 }}>
                        {filteredItems.map((item, index) => {
                            return (
                                <a key={index.toString()} onClick={() => getValue(item)}>
                                    {item}
                                </a>
                            );
                        })}
                    </Scrollbars>
                </div>
            )}
            {selectedItems.length == 0 ? null : selectedItems.map((item, index) => {
                return (
                    <div className='filterDropMenuFetchItem' key={item.toString()}>{item}
                        <a onClick={() => removeItem(index)}>X</a></div>
                )
            })}
        </div>
    );
}

export default OutlineDropdown;
