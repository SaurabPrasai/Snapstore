import React, { useEffect, useState } from 'react'
import { FocusCards } from '../components/FocusCards'; 
import { collection, getDocs } from 'firebase/firestore';
import { storage } from '../firebaseConfig';

const Home = () => {

  const [status, setStatus] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let arr = [];
      const docRef = await getDocs(collection(storage, "status"));
      docRef.forEach((doc) => {
        const item = doc.data();
        item.id = doc.id;
        arr.push(item);
      });
      return arr;
    };
    fetchData()
      .then((data) => {
        setStatus(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(status);
 
 
  return <FocusCards cards={status} />;
}

export default Home

