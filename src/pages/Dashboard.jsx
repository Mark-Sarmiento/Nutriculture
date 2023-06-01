import React, { useState, useEffect } from "react";
import {db} from '../firebase';
import {collection, getDocs} from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';
import FirebaseData from '../components/FirebaseData';

const Dashboard = () => {
  return(
    <div>
      <h1>HELLO</h1>
      <FirebaseData/>
    </div>
  );
};
  {/*const [users, setUsers] =  useState([]);
  const usersCollectionRef = collection(db,'users');
  
  useEffect(() =>{

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };
    getUsers();
  },[]
  )

  return (
    <>
      <div>Dashboard</div>
      <div>{users.map((user)=>{
        return (
          <div>
           <h1> Sensor: {user.Temp} </h1>
           <h1> RH: {user.RH} </h1>
          </div>

          );
        
      })}</div>
    </>
    );*/}

 
export default Dashboard;
