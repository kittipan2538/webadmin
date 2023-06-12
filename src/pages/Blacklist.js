import Navbar from '../components/Navbar'
import './Blacklist.css'
import React,{useState,useEffect, useContext} from 'react'
import axios from 'axios'
import { adminContext } from "../App";


const Blacklist = () => {

  const [blName, setrblName] = useState([]);
  const { state, setState } = useContext(adminContext);

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = blName.slice(firstIndex, lastIndex);
  const npage = Math.ceil(blName.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)
  

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API}/blacklistname`)
    .then(res => setrblName(res.data))
    .catch(err => console.log(err));
  },[])

  const handledelete = async req =>{
    window.location.reload(false)
    axios.delete(`${process.env.REACT_APP_API}/blacklists`,{
      data:{userID: req.userID,}
    })
    .then(res => setrblName(res.data))
    .catch(err => console.log(err));
  }

  
  return (
    <div className='blacklist'>
        <Navbar/>
        <br></br>
        <br></br>
        <h1 className='titleBL'>Blacklist</h1>
        {/* <div className='text-endBL'><input className='input' type="text" onChange={handleFilter}/></div> */}
        <div className='tableBL d-flex bg-white rounded p-4'>
            <div className='table'>
              <table className='w-100 text-center'>
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3">Blacklist Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((d,i)=>(
                <tr key={i}>
                  <td className="px-6 py-4">{d.userID}</td>
                  <td><button onClick={handledelete.bind(this,d)} type="button" className='buttona'>ปลดแบน</button></td>
                </tr>
              ))}
            </tbody>
            </table>
            <nav>
              <ul className='pagination'>
                <li className='page-item'>
                  <a href='#' className='page-link'
                  onClick={prePage}>Prev</a>
                </li>
                {
                  numbers.map((n, i)=>(
                    <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                      <a href='#' className='page-link'
                      onClick={()=>changeCPage(n)}>{n}</a>
                    </li>
                  ))
                }
                <li className='page-item'>
                  <a href='#' className='page-link'
                  onClick={nextPage}>Next</a>
                </li>
              </ul>
            </nav>
            </div>
            
            
          </div>
    </div>
  )
  function prePage(){
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1)
    }
  }

  function changeCPage(id){
    setCurrentPage(id)
  }

  function nextPage(){
    if(currentPage !== npage){
      setCurrentPage(currentPage + 1)
    }
  }
}

export default Blacklist