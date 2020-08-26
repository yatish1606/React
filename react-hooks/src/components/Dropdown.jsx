import React, { useState } from 'react'

const Dropdown = ({options = [], selectedColor, setSelectedColor}) => {

    const [open, setOpen] = useState(false)

    const renderedItems = options
        .filter(option => option !== selectedColor)
        .map(item => {
            return (
                <div 
                    className="item" 
                    key={item.value}
                    onClick={() => setSelectedColor(item)}
                >
                    <div>{item.label}</div>
                </div>
            )
        })

    return (
        <div className="ui form">
            <div className="field">
                <label className="label">Select color</label>
                <div 
                    className={`ui dropdown selection ${open ? 'visible active' : ''}`}
                    onClick={() => setOpen(!open)}
                >
                    <i className="dropdown icon"></i>
                    <div className="text">{selectedColor.label}</div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>
                        {renderedItems}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dropdown