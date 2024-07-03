import React, { useState, useRef, useEffect } from 'react';
import arrow from './arrow.png';

const Dropdown = ({ items }) => {
  const [text, setText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const ref = useRef(null);

  const clickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false)
    }
  };

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchText.toLowerCase())
  );

  const selectItem = (item) => {
    setText(item);
    setIsOpen(false);
    setSearchText('')
  }

  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);

    return () => {
      document.removeEventListener('mousedown', clickOutside)
    }
  }, []);

  useEffect(() => {
    const handleDropdownOpen = (event) => {
      if (ref.current && ref.current.contains(event.target)) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleDropdownOpen)
    } else {
      document.removeEventListener('mousedown', handleDropdownOpen)
    };

    return () => {
      document.removeEventListener('mousedown', handleDropdownOpen)
    }
  }, [isOpen]);

  return (
    <div ref={ref} className="dropdown">
      <button
        onFocus={() => setIsOpen(true)}
        onMouseDown={() => setIsOpen(!isOpen)}
        className="dropdownButton"
        style={{
          borderRadius: isOpen && '8px 8px 0 0',
          color: !!text && '#333333',
          border: isOpen && '1px solid #666666'
        }}
      >
        {!!text ? text : 'Оберіть ваше місто'}
        <img src={arrow}/>                                    
      </button>
      {isOpen && (
        <div className="menuContainer">
          <span className="inputContainer">
            <input
              type="text"
              placeholder="Пошук..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              className="input"
            />
          </span>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) =>
            <div
              className="itemContainer"
              key={index}
              onClick={() => selectItem(item)}
            >
              {item}
            </div>)
          ) : (
            <div>Порожньо...</div>
          )}
        </div>
      )}
    </div>
  )
};

export default Dropdown
