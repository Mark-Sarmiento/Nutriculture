import React,{useState, useEffect} from "react";
import {database} from '../firebase';
//import {Firestore, collection, getDocs, onSnapshot} from 'firebase/firestore';
import FirebaseData from '../components/FirebaseData';
//import FirestoreData from '../components/FirestoreData';
import RHplot from "../components/content/RHplot.js";
import Tempplot from "../components/content/Tempplot";
import ECplot from "../components/content/ECplot";
import DashboardBox from "../components/content/DashboardBox";
import { UserAuth } from '../context/AuthContext';
import { ref, onValue } from "firebase/database";




const Dashboard = () => {

  const { user } = UserAuth();
  const [data, setData] = useState([]);
  
  const MAX_DATA_CHART = 20;
  
  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/EC`);
      onValue(dbRef, (snapshot) => {
        const firebaseData = snapshot.val();
        const chartData = [];
  
        let counter = 0;
        for (let key in firebaseData) {
          if (firebaseData.hasOwnProperty(key)) {
            chartData.push({
              name: key,
              value: firebaseData[key].Value,
              time: firebaseData[key].Time,
            });
            counter++;
  
            // Limit the number of data points to display
            if (counter >= MAX_DATA_CHART) {
              chartData.shift();
            }
          }
        }
  
        setData(chartData);
      });
    };
  
    fetchData();
  }, [user?.uid]);
  
  const currentValue = data.length > 0 ? data[data.length - 1].value : null;

  return (
    <>
        <h1>Dashboard</h1>
        <FirebaseData/>
        <DashboardBox>
          <div>
            <p>Electric Conductivity: {currentValue}</p></div>
        </DashboardBox>

        
    </>
    );
    };
 
export default Dashboard;
