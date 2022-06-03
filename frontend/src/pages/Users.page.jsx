import React, { useEffect, useState,useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useHttpClient } from '../hooks/http-hook';
import LoadingSpinner from '../components/Loading/Loading';
import BannerTwo from '../components/Banners/BannerTwo/BannerTwo';
import UsersTable from "../components/Assets/Humans/userTable";
import MoveTop from '../components/MoveTop/MoveTop';


const Users = () => {

  

  const [usersList, setUsers]= useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  
  //Use id client in Inettractive mode
  //const userId = useParams().userId;
  // ne pas oublier  de chabger les paramettres de useEffect [sendRequest, userId]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/assets/humans/all/`
        );
        console.log(responseData.assets);
         responseData.assets.map((user) => ( setUsers(U => [...U,
          {
          id: user.userId,
          name: user.name,
          lastname: user.lastname,
          numcin: user.numcin,
          email: user.email,
          isActive: user.isActive
          }])));
      } catch (err) {
        toast.error(`${error} ! please tray again`);
        clearError();
      }
    };
    fetchUsers();
  }, [sendRequest]);

  
  const showUsersItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">LastName</th>
          <th scope="col">NunCIN</th>
          <th scope="col">E-mail</th>
          <th scope="col">isActive</th>
          <th scope="col">Manage</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
        <UsersTable List={usersList}/>
    </table>
  );

  return (
    <>
        {isLoading && <LoadingSpinner/>}
        {/* Banner Section */}
        <ToastContainer/>
        {/* Page Banner section  */}
        <BannerTwo pageTitle="Humains" title="Assets" />
        {/* Content  */}
        <section >
          <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 mt-3">
                      {/* users Section  */}
                      {showUsersItems()}

                    </div>
                </div>
                                    {/* tenders area  */}
          </div>
            {/* Move to top Section  */}
            <MoveTop path="/" />

        </section>

    </>
  );


};




  export default Users;