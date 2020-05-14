import React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Note from './Note'
import notes from './notes'

function App () {
    return (
        <div>
            <Header/>
                <div>
                    {
                        notes.map( (item) => {
                            return (
                            <Note title={item.title} content={item.content} je={item.key}/>
                            )
                        })
                    }
                </div>
            <Footer/>
        </div>
    )
}

export default App