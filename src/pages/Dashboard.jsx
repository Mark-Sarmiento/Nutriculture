import React, { useState, useEffect } from "react";
//import {db} from '../firebase';
//import {Firestore, collection, getDocs, onSnapshot} from 'firebase/firestore';
import FirebaseData from '../components/FirebaseData';
//import FirestoreData from '../components/FirestoreData';
import PlotRH from '../components/PlotRH'
//import { UserAuth } from '../context/AuthContext';


const Dashboard = () => {


  return (
    <>
    <h1>Dashboard</h1>
        <FirebaseData/>
        <PlotRH />
    </>
    );
    };
 
export default Dashboard;
