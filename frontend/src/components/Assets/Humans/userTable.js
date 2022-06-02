import React, { useState, useEffect } from "react";
import UsersComponent from "../../../components/Assets/Humans/users";



const UsersTable = ({List}) => {


  return (
    List.map((u) => (
      <UsersComponent key={u.userId} u={u}/>
    ))
  );
};

export default UsersTable;
