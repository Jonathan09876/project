import React, { useState,useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {FilelistAction, createFileAction} from "../../actions/FileAction";
import {addCompnayAction} from "../../actions/companyAction"
import * as XLSX from 'xlsx';
import axios  from "axios";
import DetailShow from "../map/DetailShow";
const File_list = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState('');
  const [filename,data,] = useState('',[{sheetname:'',exceldata:[]}]);
  const listFile=useSelector((state) => state.fileList);
  const Company=useSelector((state) => state.addCompany);
  const {companylist}=Company;
  const {filelist,loading, error }=listFile
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
   

  // const filede=(e)=>
  // {
  //     var file = e.target.files[0];
  //     setFile(file);

  //     if (file === '') {
  //       alert('Insert some file');
  //     } else {
  //     var f = file;
  //     const reader = new FileReader();
  //     reader.onload = (evt) => {
  //       /* Parse data */
  //       const bstr = evt.target.result;
  //       const wb = XLSX.read(bstr, { type: 'binary' });
      
  //       wb.SheetNames.forEach(function (sheetName) {
  //         var name = sheetName.toLowerCase();
  //         var XL_row_object = XLSX.utils.sheet_to_row_object_array(
  //           wb.Sheets[sheetName]
  //         );
  //         if(XL_row_object.length>1)
  //         {
  //           const payload = JSON.stringify(XL_row_object);
            
  //           //  dispatch(insertlistTemperAction(payload));
  //         }
        
          
  //       });
  //     };
  //     reader.readAsBinaryString(f);
  //     alert(`sheets Added Succesfully!`);
  //   }
  // }

  const filesubmit =(e)=>{
     e.preventDefault();
     const selectedFile=e.target.files[0]
    
     if (selectedFile === '') {
      alert('Insert some file');
    } else {
      var f = selectedFile;

      const reader = new FileReader();
      reader.onload = (evt) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
       
        
        wb.SheetNames.forEach(function (sheetName) {
          // console.log(sheetName);
          var name = sheetName.toLowerCase();
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(
            wb.Sheets[sheetName]
          );       
          if(XL_row_object.length!=0)
          {
            data.sheetname=name;
            data.exceldata=XL_row_object;
          }         
      });
      dispatch(addCompnayAction(data));
      };
      reader.readAsBinaryString(f);
    }
     const data = new FormData();
     data.append("file", selectedFile);
     const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { dataer } = axios.post(`http://localhost:5000/api/file/upload`, {body:data} ,config,)
    //  axios
    //  .post("https://localhost:5000/api/file/upload", data)
    //  .then(res => {
    //     console.log(res.statusText);
    //     alert("success");
    //  })
    //  .catch(err => {
    //     console.log(err);
    //  });

     const payload = {
      filename
    }
    payload.filename=e.target.value;
    dispatch(createFileAction(payload));
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      dispatch(FilelistAction());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <>
      
      <input
          element="input"
          id="name"
          type="file"
          label="File Upload"
          accept=".xls,xlsx"
          onChange={ (e) => filesubmit(e)} />
            <br />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>File Name</th>
              <th>Upload Date</th>
              <th>Status</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {filelist.map((list) => (
              <tr key={list._id}>
                <td>{list._id}</td>
                <td>{list.filename}</td>
                <td>{list.updatedAt}</td>
                <td> { list.status ? (<div className='badge rounded-pill bg-success'>read</div>) : (<div className='badge rounded-pill bg-danger'>unread</div>)}</td>
                <td> { list.status ? ("") : (<div className='btn btn-sm rounded-pill btn-info'>add</div>)}</td>
                <td>
                { list.status ? ( <LinkContainer to={`/project/${list._id}`}>
                    <Button variant="light" className="btn-sm">
                      Delete
                    </Button>
                  </LinkContainer>) : ("")}
                 
                </td>
              </tr>
            ))}
          </tbody>
        
        </Table>
      )}
    </>
     
  );
 
};
export default File_list;
