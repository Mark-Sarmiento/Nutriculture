import React, { useEffect, useState } from 'react';
import { database } from '../firebase';
import { ref, child, onValue, off } from 'firebase/database';

const FirebaseRealtimeData = () => {
    const [data1, setData1] = useState(null);

    useEffect(() => {
        const path = '/Sensors/RH'; // Replace with the actual path

        const onDataChange = (snapshot) => {
            const fetchedData1 = snapshot.val();
            setData1(fetchedData1);
        };

        const dataRef1 = ref(database, path);
        onValue(dataRef1, onDataChange);

        // Cleanup the listener when the component unmounts
        return () => {
            // Unsubscribe from the listener
            off(dataRef1, onDataChange);
        };
    }, []);
    const [data2, setData2] = useState(null);

    useEffect(() => {
        const path = '/Sensors/heartrate'; // Replace with the actual path

        const onDataChange = (snapshot) => {
            const fetchedData2 = snapshot.val();
            setData2(fetchedData2);
        };

        const dataRef2 = ref(database, path);
        onValue(dataRef2, onDataChange);

        // Cleanup the listener when the component unmounts
        return () => {
            // Unsubscribe from the listener
            off(dataRef2, onDataChange);
        };
    }, []);

    return (
        <div>
            {data1 ? (
                <div>
                    <h2>Data from Firebase Realtime Database:</h2>
                    <p>{data1}</p>
                    <p>{data2}</p>


                </div>
            ) : (
                <p>Loading data...</p>
            )
            }
        </div >
    );
};

export default FirebaseRealtimeData;
