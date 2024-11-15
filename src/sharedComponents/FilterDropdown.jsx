import React, { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import menucheck from '../assets/images/menucheck.svg';

function OutlineDropdown({ listData, filterLabel }) {
    const [isVisible, setIsVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItems, setSelectedItems] = useState(listData[0]);
    const [active, setactive] = useState(0);

    const handleFocus = () => {
        setIsVisible(true);
    };

    const handleBlur = () => {
        setTimeout(() => setIsVisible(false), 100);
    };

    const filteredItems = listData.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getValue = (item) => {
        if (active === item) {
            setactive(null);
        } else {
            setactive(item);
        }
        console.log(item, '...');
        //setSearchTerm(item);
        setIsVisible(false);
        setSelectedItems(item);
    };

    return (
        <div className='filterDropMenuMain2'>
            <input
                className='filterDropMenu2'
                type="text"
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder={filterLabel}
            />
            <dd>{selectedItems}</dd>
            {isVisible && (
                <div className='filterDropMenuOption2'>
                    <Scrollbars style={{ height: 100 }}>
                        {filteredItems.map((item, index) => {
                            return (
                                <a key={index.toString()} onClick={() => getValue(item)}>
                                    <img src={active === item ? menucheck : null} alt="" /> {item}
                                </a>
                            );
                        })}
                    </Scrollbars>
                </div>
            )}
        </div>
    );
}

export default OutlineDropdown;
