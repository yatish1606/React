import React from 'react'

const Link = ({className, href, children}) => {

    const handleLinkClicked = event => {

        if(event.metaKey || event.ctrlKey) return

        event.preventDefault()
        window.history.pushState({}, '', href)

        const navEvent = new PopStateEvent('popstate')
        window.dispatchEvent(navEvent)
    }

    return (
        <a 
            className={className} 
            href={href}
            onClick={handleLinkClicked}
        >
            {children}
        </a>
    )
}

export default Link