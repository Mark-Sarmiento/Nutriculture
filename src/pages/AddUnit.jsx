import React from 'react'
import { database } from '../firebase';
import { ref,  onValue, off, getDatabase, child, push, update} from 'firebase/database';
import { UserAuth } from '../context/AuthContext';

const AddUnit = () => {
  const {user} = UserAuth();

  function btnPetchay () {
    const slctPetchay = {
      userSelect: "Petchay"
    }
    const updates = {};
    updates['/Users/' + `${user?.uid}` + '/ESP1/Params/userSelect/selected'] = slctPetchay;
    return update(ref(database), updates);
  };

  function btnSpinach () {
    const slctSpinach = {
      userSelect: "Spinach"
    }
    const updates = {};
    updates['/Users/' + `${user?.uid}` + '/ESP1/Params/userSelect/selected'] = slctSpinach;
    return update(ref(database), updates);
  };



  return (
    <div>
      <h1> Add Unit </h1>
      <div className='pl-12 pt-4'>
      <button onClick={btnPetchay}> Petchay </button>
      <br></br>
      <button onClick={btnSpinach}> Spinach </button>
      </div>
    </div>
  );
};

export default AddUnit;


