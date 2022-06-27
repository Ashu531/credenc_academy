import Dashboard from './dashboard/index'
import React,{useEffect,useState} from "react"
import useLocalStorage from "use-local-storage";
import { useRouter } from 'next/router'
const theme = 'credenc-edtech-theme';

export default function Home() {
  const [theme,setTheme]= useLocalStorage("theme" ? "dark" : "light");

  const router = useRouter()

  let defaultRoute = "";
  if (typeof window !== "undefined") {
    if(localStorage.getItem("token")){
      // defaultRoute = <SignIn toggleTheme={toggleTheme} />
    }else{
      defaultRoute = <Dashboard toggleTheme={toggleTheme} />
    }
  }

  const toggleTheme=()=>{
    let newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme)
  }

  return (
    <div data-theme={theme}>
     <Dashboard toggleTheme={toggleTheme} />
     {/* {defaultRoute} */}
    </div>
  )
}
