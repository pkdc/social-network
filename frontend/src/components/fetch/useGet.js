import { useState, useEffect } from "react";
import axios from "axios";

// function useGet(url) {

//     const [isLoading, setIsLoading] = useState(true);
//     const [data, setData] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         setIsLoading(true)
//         fetch(
//             `http://localhost:8080${url}`
//         )
//         .then(response => response.json())
//         .then((data) => {
//             const dataArr = [];

//             for (const key in data) {
//                 const value = {
//                     id: key,
//                     ...data[key]
//                 };

//                 dataArr.push(value);
//             }
//             setIsLoading(false);
//             setData(dataArr);
//         })
//     }, [url]);


//     return { error, isLoading, data };
// }

// export default useGet;



//Use this instead? Yes i think so

// const useGet = (url) => {
//     const [status, setStatus] = useState('idle');
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         if (!url) return;
//         const fetchData = async () => {
//             setStatus('fetching');
//             const response = await fetch(`http://localhost:8080${url}`);
//             const data = await response.json();
//             setData(data);
//             setStatus('fetched');
//         };

//         fetchData();
//     }, [url]);

//     return { status, data };
// };

// export default useGet;


//OR
//Using axios 
const useGet = url => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get( `http://localhost:8080${url}`, { withCredentials: true })
        .then(response => {
          setIsLoaded(true);
          setData(response.data);
        })
        .catch(error => {
          setError(error);
        });
    };
    fetchData();
  }, [url]);

  return { error, isLoaded, data };
};

export default useGet;
  
