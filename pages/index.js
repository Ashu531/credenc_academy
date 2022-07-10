import Dashboard from './dashboard'
import React,{useState,useEffect} from "react"


export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
}, []);



  return (
    <>
    {
    mounted &&  
    <Dashboard />
    }
   </>
  )
}

