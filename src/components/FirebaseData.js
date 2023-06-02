import React, { useEffect, useState } from 'react';
import { database } from '../firebase';
import { ref,  onValue, off, getDatabase, child, push, update} from 'firebase/database';
import { UserAuth } from '../context/AuthContext';

const FirebaseData = () => {
    const { user } = UserAuth();

    function writeNewPost() {
        const db = getDatabase();
      
        // A post entry.
        const postData = {
          Value: 123
        };
      
        // Get a key for a new Post.
        //const newPostKey = push(child(ref(db, 'Users'), 'RH')).key;
      
        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates['/Users/' + `${user?.uid}/` + 'ESP1/' + 'RH' ] = postData;
        updates['/Users/' + `${user?.uid}/` + 'ESP1/' + 'Temp' ] = postData;
      
        return update(ref(db), updates);
      }
    
// relative humidity
    const [data1, setData1] = useState(null);

    useEffect(() => {

        const RH = `/Users/${user?.uid}/ESP1/RH/Value`;
    
        const path = (RH) ; // Replace with the actual path

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
    }, [user?.uid]);

// Temperature
    const [data2, setData2] = useState(null);

    useEffect(() => {
        const Temp = `Users/${user?.uid}/ESP1/Temp/Value`;
        const path = (Temp); // Replace with the actual path

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
    }, [user?.uid]);

    return (
        <div>
            <button onClick={writeNewPost()}>Create</button>
            {data1 ? (
                <div>
                    <h2>Data from Firebase Realtime Database:</h2>
                    <p>Relative humidity : {data1}</p>
                    <p>Temperature: {data2}</p>
                    <p>{user?.uid}</p>

                </div>
            ) : (
                <p>Loading ...</p>
            )
            }
        </div >
    );
};

export default FirebaseData;
