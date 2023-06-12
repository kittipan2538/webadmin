import React,{useState,useEffect,useContext} from 'react'
import Navbar from '../components/Navbar'
import './Approve.css'
import axios from 'axios'
import { adminContext } from '../App'

const Approve = () => {
 
  const [approveddetail, setapprovedDetail] = useState([]);
  const [status, setstatus] = useState([]);
  const [approved,setApproved] = useState('Approved');
  const { state, setState } = useContext(adminContext);
  const [adminID ,setadminID] = useState('');

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = approveddetail.slice(firstIndex, lastIndex);
  const npage = Math.ceil(approveddetail.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API}/getapproveddetail`)
    .then(res => setapprovedDetail(res.data))
    .catch(err => console.log(err));
  },[])
 
  const handleapproved = async req =>{
    window.location.reload(false)
    axios.post(`${process.env.REACT_APP_API}/postapproved`,{
        approved: approved,
        userID: req.userID,
        adminID: state[0].adminID
    })
    .then(res => setState(res.data))
    .catch(err => console.log(err));
    axios.get(`${process.env.REACT_APP_API}/getapproved`)
    .then(res => setstatus(res.data))
    .catch(err => console.log(err));
  }

  return (
    <div className='approve'>
        <Navbar/>
        <br></br>
        <br></br>
        <h1 className='titleAP'>Approve</h1>
        {/* <div className='text-endAP'><input className='input' type="text"/></div> */}
        
          <div className='tableAP d-flex bg-white rounded p-4'>
            <div className='table'>
              <table className='w-100 text-sm text-gray-500 dark:text-gray-400'>
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3">Certificate</th>
                <th>Name</th>
                <th>Status</th>
                <th className=''>Action</th>
              </tr>
            </thead>
            <tbody>
            {records.map((student, index)=>{
              return <tr key={index}>
                <td className="px-6 py-4"><img src={student.certificate} width={250} height={150}/></td>
                <td>{student.Fname} {student.Lname}</td>
                <td>{student.approved}</td>
                <td><button type="button" className='buttona' onClick={handleapproved.bind(this, student)}>อนุมัติ</button></td>
              </tr>
              
            })}
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

export default Approve


