import { useState, useEffect } from 'react';
import axios from 'axios';

const Articles = () => {
    const [setUser] = useState(null);


useEffect(() => {
    const fetchUser = async () => {
      try {     
        const response = await axios.get('/api/auth/signin');     
        console.log(response.data); // Check what data is being returned
        setUser(response.data);   
      } catch (error) {   
        console.error('There was a problem with the fetch operation:', error);  
      }    
    };
    fetchUser();
  }, []);
} 
export default Articles;