import React, { useState, useEffect, useRef } from 'react'

const Dropdown = ({options = [], selectedColor, setSelectedColor}) => {

    const [open, setOpen] = useState(false)
    const ref = useRef()

    useEffect(() => {
        document.body.addEventListener('click', (event) => {
            if(ref.current.contains(event.target)) 
                return
            setOpen(false)
        })
    }, []) 

    //    Note for event listeners : event listeners in a components do not necessarily get called 
    //    from child to parent(bubbling up). First, all listeners set up manually using 
    //    node.addEventListener() get called, followed by listeners set up inside React JSX, like 
    //    onClick={() => doSomething()}. If there are multiple listeners inside React, then they will be called 
    //    from chile to parent upwards. 
        

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
        <div className="ui form" ref={ref}>
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