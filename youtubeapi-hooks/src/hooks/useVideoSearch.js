import {useState, useEffect} from 'react'
import YoutubeAPI from '../api/youtube'

const useVideoSearch = searchQueryDefault => {

    const [videos, setVideos] = useState([])

    const handleYoutubeSearch = async (searchQuery) => {
        
        const response = await YoutubeAPI.get(
            '/search',
            {params : { q : searchQuery}}
        )
        setVideos(response.data.items.slice(1,10))
    }
 
    useEffect(() => {
        handleYoutubeSearch(searchQueryDefault)
    }, [searchQueryDefault])

    return [videos, handleYoutubeSearch]
}

export default useVideoSearch