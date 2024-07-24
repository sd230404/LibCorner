//This is a custom hook
import { useState,useEffect } from "react";
const useAppWrite = (fn) => {
    const [data,setData] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const fetchData = async() => {
      setIsLoading(true);
      try {
        const response = await fn();
        setData(response);
      } catch (error) {
        Alert.alert('Error',error.message)
      } finally{
        setIsLoading(false);
      }
    }
  
    useEffect(() => {
      fetchData();
    },[]) // dependency array is empty , that means only fetch it at the start
    
    const refetch = () => fetchData();
    return {data ,isLoading, refetch};
}
export default useAppWrite;