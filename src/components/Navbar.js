import React,{useState} from 'react'
import {IoMdBookmark,IoMdClipboard, IoMdClose,IoMdMenu, IoMdPerson,IoMdLogOut} from 'react-icons/io'
import { Link } from 'react-router-dom'
import './Navbar.css'



const Navbar = () => {

    

    const [active,setActive] = useState(false)

    const activateNav = () => {
        setActive(!active)
    } 

  return (
    <div className={active ? 'header' : 'header-mobile'}>

               <div className='menu-icon' onClick={activateNav}>

                    {!active ? <IoMdMenu className='menu'/> : <IoMdClose className='menu'/>}

               </div>

        <nav>
            <ul className={active ? 'ul-item' : 'ul-item oicon'}>

                <li>
                    <IoMdPerson className='icon'/>
                    <Link to='/approve'>Approve</Link>
                </li>


                <li>
                    <IoMdClipboard className='icon'/>
                    <Link to='/reports'>Reports</Link>
                </li>


                <li>
                    <IoMdBookmark className='icon'/>
                    <Link to='/blacklist'>Blacklist</Link>
                </li>


                <li>
                    <IoMdLogOut className='icon'/>
                    <Link to='/'>Logout</Link>
                </li>

                


                

            </ul>
        </nav>

    </div>
  )
}

export default Navbar