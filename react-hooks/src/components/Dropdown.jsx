import React, { useState, useEffect, useRef } from 'react'

const Dropdown = ({label = '', options = [], selected = {}, setSelected = () => {}}) => {

    const [open, setOpen] = useState(false)
    const ref = useRef()

    useEffect(() => {

        const onBodyClickedEvent = (event) => {
            if(ref.current.contains(event.target)) 
                return
            setOpen(false)
        }

        document.body.addEventListener('click', onBodyClickedEvent )

        // Even after unmounting the component, the refs will be destroyed but the onClickListener for 
        // body element will still persist. If we click then, value of ref.current will be null because the component
        // or its refs no longer exist, so any methods attached to it will return error. Returning a cleanup 
        // function from useEffect() will remove any persisting listeners attached to the DOM

        return () => {
            document.body.removeEventListener('click', onBodyClickedEvent)
        }

    }, [])  

    //    Note for event listeners : event listeners in a components do not necessarily get called 
    //    from child to parent(bubbling up). First, all listeners set up manually using 
    //    node.addEventListener() get called, followed by listeners set up inside React JSX, like 
    //    onClick={() => doSomething()}. If there are multiple listeners inside React, then they will be called 
    //    from chile to parent upwards. 
        

    const renderedItems = options
        .filter(option => option !== selected)
        .map(item => {
            return (
                <div 
                    className="item" 
                    key={item.value}
                    onClick={() => setSelected(item)}
                >
                    <div>{item.label}</div>
                </div>
            )
        })
        


    return (
        <div className="ui form" ref={ref}>
            <div className="field">
                <label className="label">{label}</label>
                <div 
                    className={`ui dropdown selection ${open ? 'visible active' : ''}`}
                    onClick={() => setOpen(!open)}
                >
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>
                        {renderedItems}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dropdown