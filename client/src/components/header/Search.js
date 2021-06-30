import React, {useState} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { getDataAPI } from '../../utils/fetchData'
import LoadIcon from '../../images/loading.gif'
// import UserCard from '../UserCard'

const Search = () => {
    const [search, setSearch]= useState('')
    const [users, setUsers]= useState({})
    const {auth}= useSelector(state=>state)
    const dispatch = useDispatch()
    const [load, setLoad]= useState(false)

    const handleSearch=e=>{

    }
    const handleClose=()=>{

    }
    return (
        <form className='searhc_form' onSubmit={handleSearch}>
            <input type='text' name='search' value= {search} title="Enter to search"
            onChange={e=>setSearch(e.target.value.toLowerCase().replace(/ /g, ''))}
            />
            <div className='search_icon' style={{opacity: search?0: 0.3}}>
                <span className='material-icons'>search</span>
                <span> Enter to Search</span>
            </div>
            <div className= 'close_search' onClick={handleClose}
            style={{opacity: users.length===0?0:1}}>
                &times;
            </div>
            <button type='submit'style={{display: 'none'}}>
                Search
            </button>
            {/* loading
            show card user */}
        </form>
    )
}

export default Search


