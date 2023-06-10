import React,{useState, useEffect} from "react";
import {database} from '../firebase';
//import {Firestore, collection, getDocs, onSnapshot} from 'firebase/firestore';
import FirebaseData from '../components/FirebaseData';
//import FirestoreData from '../components/FirestoreData';
import { UserAuth } from '../context/AuthContext';
import { ref, onValue, off } from "firebase/database";
import emailjs from "emailjs-com";


emailjs.init("nhsQxh2nrvjFQr_aT");




const Dashboard = () => {

  const { user } = UserAuth();
  const [ecdata, setecData] = useState([]);
  const [rhdata, setrhData] = useState([]);
  const [tempdata, settempData] = useState([]);
  const [phdata, setphData] = useState([]);
  const [wtdata, setwtData] = useState([]);
  const [phupdata, setphupData] = useState(null); 
  const [phdowndata, setphdownData] = useState(null); 
  const [fertilizerdata, setfertilizerData] = useState(null); 
  const [waterupdata, setwaterupData] = useState(null); 
  const [waterdata, setwaterData] = useState(null); 
  const [waterflow, setwaterflowData] = useState(); 
  const [eccolor, seteccolor] = useState();
  const [rhcolor, setrhcolor] = useState();
  const [tempcolor, settempcolor] = useState();
  const [phcolor, setphcolor] = useState();
  const [wtcolor, setwtcolor] = useState();
  const [phupcolor, setphupcolor] = useState();
  const [phdowncolor, setphdowncolor] = useState();
  const [nscolor, setnscolor] = useState();
  const [wrcolor, setwrcolor] = useState();
  const [reservoircolor, setreservoircolor] = useState();
  const [wfcolor, setwfcolor] = useState();

  const MAX_DATA_CHART = 20;

  //warning message
  const sendWarningEmail = async () => {
    const templateParams = {
      to_email: `${user?.email}`, // Replace with the recipient's email address
      from_name: "Nutriculture team", // Replace with your name or any desired sender name
      to_name: `${user?.displayName}`, // Replace with the recipient's name or any desired recipient name
      subject: "Warning: EC Level is Low",
      body: `The EC level is low for user with UID: ${user?.uid}`,
    };
  
    try {
      await emailjs.send("service_wa1nf7w", "template_y8heajh", templateParams);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };


  //EC current
  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/EC`);
      onValue(dbRef, (snapshot) => {
        const firebaseData = snapshot.val();
        const chartData = [];

        for (let key in firebaseData) {
          if (firebaseData.hasOwnProperty(key)) {
            chartData.push({
              value: firebaseData[key].Value
            });
          }
        }
        setecData(chartData);
        const currentValue = chartData[chartData.length - 1]?.value;
        if(currentValue > 50){
          seteccolor("bg-green-700");
        }else{
          seteccolor("bg-rose-700");
        }
      });
    };
  
    fetchData();
  }, [user?.uid]);

  // RH current
  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/RH`);
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
          }
        }
        setrhData(chartData);
        const currentValue = chartData[chartData.length - 1]?.value;
        if(currentValue > 50){
          setrhcolor("bg-green-700");
        }else{
          setrhcolor("bg-rose-700");
        }

      });
    };
  
    fetchData();
  }, [user?.uid]);

  // Temp current
  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/Temp`);
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
          }
        }
        settempData(chartData);
        const currentValue = chartData[chartData.length - 1]?.value;
        if(currentValue > 50){
          settempcolor("bg-green-700");
        }else{
          settempcolor("bg-rose-700");
        }
      });
    };
  
    fetchData();
  }, [user?.uid]);

  // PH current 
  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/PH`);
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
          }
        }
        setphData(chartData);
        const currentValue = chartData[chartData.length - 1]?.value;
        if(currentValue > 50){
          setphcolor("bg-green-700");
        }else{
          setphcolor("bg-rose-700");
        }
      });
    };
  
    fetchData();
  }, [user?.uid]);

  // Water Temperature
  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/WT`);
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
          }
        }
        setwtData(chartData);
        const currentValue = chartData[chartData.length - 1]?.value;
        if(currentValue > 50){
          setwtcolor("bg-green-700");
        }else{
          setwtcolor("bg-rose-700");
        }
      });
    };
  
    fetchData();
  }, [user?.uid]);

  // IRPHUP current
  useEffect(  () =>  {
  
      const path = `/Users/${user?.uid}/ESP1/data/IRPHUP/Value` ; // Replace with the actual path

      const onDataChange = (snapshot) => {
          const fetchedData1 = snapshot.val();
          setphupData(fetchedData1);
          if(fetchedData1 > 50){
            setphupcolor("bg-green-700");
          }else{
            setphupcolor("bg-rose-700");
          }
      };

      const dataRef1 = ref(database, path);
      onValue(dataRef1, onDataChange);

      // Cleanup the listener when the component unmounts
      return () => {
          // Unsubscribe from the listener
          off(dataRef1, onDataChange);
          sendWarningEmail();
          
      };
  }, [user?.uid]);
  
  // IRPHDOWN current
  useEffect(() => {

    const path = `/Users/${user?.uid}/ESP1/data/IRPHDOWN/Value`; // Replace with the actual path

    const onDataChange = (snapshot) => {
        const fetchedData1 = snapshot.val();
        setphdownData(fetchedData1);
        if(fetchedData1 > 50){
          setphdowncolor("bg-green-700");
        }else{
          setphdowncolor("bg-rose-700");
        }
    };

    const dataRef1 = ref(database, path);
    onValue(dataRef1, onDataChange);

    // Cleanup the listener when the component unmounts
    return () => {
        // Unsubscribe from the listener
        off(dataRef1, onDataChange);
        
    };
}, [user?.uid]);

// Fertilizer Current
useEffect(() => {

  const path = `/Users/${user?.uid}/ESP1/data/IRFERTILIZER/Value`; // Replace with the actual path

  const onDataChange = (snapshot) => {
      const fetchedData1 = snapshot.val();
      setfertilizerData(fetchedData1);
      if(fetchedData1 > 50){
        setnscolor("bg-green-700");
      }else{
        setnscolor("bg-rose-700");
      }
  };

  const dataRef1 = ref(database, path);
  onValue(dataRef1, onDataChange);

  // Cleanup the listener when the component unmounts
  return () => {
      // Unsubscribe from the listener
      off(dataRef1, onDataChange);
  };
}, [user?.uid]);

// WaterUP current
useEffect(() => {
  const path = `/Users/${user?.uid}/ESP1/data/IRWATERUP/Value`; // Replace with the actual path

  const onDataChange = (snapshot) => {
      const fetchedData1 = snapshot.val();
      setwaterupData(fetchedData1);
      if(fetchedData1 > 50){
        setwrcolor("bg-green-700");
      }else{
        setwrcolor("bg-rose-700");
      }
  };

  const dataRef1 = ref(database, path);
  onValue(dataRef1, onDataChange);

  // Cleanup the listener when the component unmounts
  return () => {
      // Unsubscribe from the listener
      off(dataRef1, onDataChange);
  };
}, [user?.uid]);

// WATER current
useEffect(() => {
  const path = `/Users/${user?.uid}/ESP1/data/IRWATER/Value` ; // Replace with the actual path

  const onDataChange = (snapshot) => {
      const fetchedData1 = snapshot.val();
      setwaterData(fetchedData1);
      if(fetchedData1 > 50){
        setreservoircolor("bg-green-700");
      }else{
        setreservoircolor("bg-rose-700");
      }
  };

  const dataRef1 = ref(database, path);
  onValue(dataRef1, onDataChange);

  // Cleanup the listener when the component unmounts
  return () => {
      // Unsubscribe from the listener
      off(dataRef1, onDataChange);
  };
}, [user?.uid]);

// Water Flow
useEffect(() => {

  const path = `/Users/${user?.uid}/ESP1/data/WF/Value` ; // Replace with the actual path

  const onDataChange = (snapshot) => {
      const fetchedData1 = snapshot.val();
      setwaterflowData(fetchedData1);
      if(fetchedData1 == "ACTIVE"){
        setwfcolor("bg-green-700");
      }else{
        setwfcolor("bg-rose-700");
      }
  };

  const dataRef1 = ref(database, path);
  onValue(dataRef1, onDataChange);

  // Cleanup the listener when the component unmounts
  return () => {
      // Unsubscribe from the listener
      off(dataRef1, onDataChange);
  };
}, [user?.uid]);

  const ECcurrent = ecdata.length > 0 ? ecdata[ecdata.length - 1].value : null;
  const RHcurrent = rhdata.length > 0 ? rhdata[rhdata.length - 1].value : null;
  const Tempcurrent = tempdata.length > 0 ? tempdata[tempdata.length - 1].value : null;
  const PHcurrent = phdata.length > 0 ? phdata[phdata.length - 1].value : null;
  const WTcurrent = wtdata.length > 0 ? wtdata[wtdata.length - 1].value : null;


  return (
    <>
        <h1>Dashboard</h1>
        
        {/*<FirebaseData/>
        <DashboardBox>
          <div>
            <p>Electric Conductivity: {ECcurrent}</p></div>
        </DashboardBox>
        <br></br>
        <DashboardBox>
          <div>
            <p>Relative Humidity: {RHcurrent}</p></div>
        </DashboardBox>
        <br></br>
        <DashboardBox>
          <div>
            <p>Temperature: {Tempcurrent}</p></div>
        </DashboardBox>
        <br></br>
        <DashboardBox>
          <div>
            <p>PH Level: {PHcurrent}</p></div>
        </DashboardBox>
        <br></br>
        <DashboardBox>
          <div>
            <p>Water Temperature: {WTcurrent}</p></div>
        </DashboardBox>
        <br></br>
        <DashboardBox>
          <div>
            <p>PH Up Level: {phupdata}</p></div>
        </DashboardBox>
        <br></br>
        <DashboardBox>
          <div>
            <p>PH Down Level: {phdowndata}</p></div>
        </DashboardBox>
        <br></br>
        <DashboardBox>
          <div>
            <p>Fertilizer Level: {fertilizerdata}</p></div>
        </DashboardBox>
        <br></br>
        <DashboardBox>
          <div>
            <p>Water Refill Level: {waterupdata}</p></div>
        </DashboardBox>
        <br></br>
        <DashboardBox>
          <div>
            <p>Reservoir Level: {waterdata}</p></div>
  </DashboardBox>*/}
        <div className="m-auto ">
          <div className="flex grid grid-cols-5 gap-4 mx-auto justify-content-center ">
            <div className={`${eccolor} text-white p-4 rounded-2xl flex-grow`}><p className="text-center px-4">Electric Conductivity: {ECcurrent}</p></div>
            <div className={`${rhcolor} text-white p-4 rounded-2xl  flex-grow`}><p className="text-center px-4">Relative Humidity: {RHcurrent}</p></div>
            <div className={`${tempcolor} text-white p-4 rounded-2xl  flex-grow`}><p className="text-center px-4">Temperature: {Tempcurrent}</p></div>
            <div className={`${phcolor} text-white p-4 rounded-2xl  flex-grow`}><p className="text-center px-4">PH Level: {PHcurrent}</p></div>
            <div className={`${wtcolor} text-white p-4 rounded-2xl  flex-grow`}><p className="text-center px-4">Water Temperature: {WTcurrent}</p></div>
            <div className={`${phupcolor} text-white p-4 rounded-2xl  flex-grow`}><p className="text-center px-4 py-2">PH Up Level: {phupdata}</p></div>
            <div className={`${phdowncolor} text-white p-4 rounded-2xl  flex-grow`}><p className="text-center px-4">PH Down Level: {phdowndata}</p></div>
            <div className={`${nscolor} text-white p-4 rounded-2xl  flex-grow`}><p className="text-center px-4">Fertilizer Level: {fertilizerdata}</p></div>
            <div className={`${wrcolor} text-white p-4 rounded-2xl  flex-grow`}><p className="text-center px-4">Water Refill Level: {waterupdata}</p></div>
            <div className={`${reservoircolor} text-white p-4 rounded-2xl  flex-grow`}><p className="text-center px-4">Reservoir Level: {waterdata}</p></div>
            <div className={`${wfcolor} text-white p-4 rounded-2xl  flex-grow`}><p className="text-center px-4">Water Flow: {waterflow}</p></div>
          </div>
        </div>
        <FirebaseData/>

        
        


 
    </>
    );
    };
 
export default Dashboard;
