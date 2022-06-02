import React from "react";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useHttpClient } from '../../../hooks/http-hook';
import { useHistory } from "react-router-dom";


const Users = ({u}) => {

  let history = useHistory({forceRefresh:true});

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const handleRemove = async event => {
    try {
         await sendRequest(
        'http://localhost:5000/api/assets/humans/erase/',
        'POST',
        JSON.stringify({
          email: u.email,
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      history.push("/assets/users");
      history.go();
    } catch (err) {
      toast.error(`${err}`);
    }
    };

  const handleActivation = async event => {

      try {
           await sendRequest(
          'http://localhost:5000/api/assets/humans/activate/',
          'POST',
          JSON.stringify({
            email: u.email,
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        history.push("/assets/users");
        history.go();
      } catch (err) {
        toast.error(`${err}`);
      }
    };

  const handleRejection = async event => {
    try {
         await sendRequest(
        'http://localhost:5000/api/assets/humans/reject/',
        'POST',
        JSON.stringify({
          email: u.email,
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      history.push("/assets/users");
      history.go();
    } catch (err) {
      toast.error(`${err}`);
    }
    };

  return (
    <tbody>
      <tr>
        <td>{u.name}</td>
        <td>{u.lastname}</td>
        <td>{u.numcin}</td>
        <td>{u.email}</td>
        <td>{u.isActive ? 'Yes' : 'No'}</td>
        <td className="text-center">          
          {!u.isActive ? 
          (<> Activte <CheckCircleOutlined 
            className="text-success ml-3 pointer"
            onClick={handleActivation} /></>) : 
          (<> Reject <CloseCircleOutlined 
            className="text-danger ml-3 pointer" 
            onClick={handleRejection}/></>)
          }
          </td>
        <td className="text-center">          
          <CloseOutlined
            onClick={handleRemove}
            className="text-danger pointer"/>
          </td>
      </tr>
    </tbody>
  );
};

export default Users;
