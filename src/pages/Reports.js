import Navbar from '../components/Navbar'
import './Reports.css'
import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import Popup from "../components/Popup"
import { adminContext } from '../App'


const Reports = () => {

  const [reportDetail, setreportDetail] = useState([]);

  const [popupOpen, setpopupOpen] = useState(false);
  const [suspended, setsuspended] = useState([]);
  const { state, setState } = useContext(adminContext);

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = reportDetail.slice(firstIndex, lastIndex);
  const npage = Math.ceil(reportDetail.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API}/getreports`)
    .then(res => setreportDetail(res.data))
    .catch(err => console.log(err));
  },[])

  const handlesuspended = async req =>{
    window.location.reload(false)
      axios.post(`${process.env.REACT_APP_API}/getfnametobl`,{
          userID: req.userID,
          adminID: state[0].adminID
      })
    .then(res => setState(res.data))
    .catch(err => console.log(err));
  }

  return (
    <div className='reports'> 
        <Navbar/>
        <br></br>
        <br></br>
        <h1 className='titleRP'>Reports</h1>
        {/* <div className='text-endRP'><input className='input' type="text"/></div> */}
        
        <div className='tableRP d-flex bg-white rounded p-4'>
          <div className='table'>
            <table className='w-100'>
              <thead>
              <tr>
                <th scope="col" className="px-6 py-3">Nametour</th>
                <th>Name</th>
                <th>Report</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((d,i)=>(
                <tr key={i}>
                  <td className="px-6 py-4">{d.nametour}</td>
                  <td>{d.Fname} {d.Lname}</td>
                  <td>{d.report_detail}</td>
                  <td><button type="button" className='buttona' onClick={handlesuspended.bind(this,d)}>ระงับบัญชี</button></td>
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
        {popupOpen && <Popup setpopupOpen={setpopupOpen} />}
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

export default Reports