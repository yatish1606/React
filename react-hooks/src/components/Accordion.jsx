import React, {useState, useEffect} from 'react'

const Accordion = ({items}) => {

    const [activeIndex, setActiveIndex] = useState(null)

    const onTitleClicked = (index) => {
        setActiveIndex(index)
    }

    const renderItems = items.map( (item, index) => {

        const active = index === activeIndex ? 'active' : undefined

        return (
            <React.Fragment key={index}>
                <div 
                    className={`title ${active}`}
                    onClick={() => onTitleClicked(index)}
                >
                    <i className="dropdown icon"></i>
                    {item.title}
                </div>
                <div className={`content ${active}`}>
                    <p>{item.description}</p>
                </div>
            </React.Fragment>
        )
    })

    return (
        <div className="ui styled accordion">
            {renderItems}
        </div>
    )
}

export default Accordion