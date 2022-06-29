import Dashboard from './dashboard'
import React,{useState,useEffect} from "react"
import useLocalStorage from "use-local-storage";
const theme = 'credenc-edtech-theme';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [theme,setTheme]= useLocalStorage("theme" ? "dark" : "light");

  useEffect(() => {
    setMounted(true);
}, []);

  const toggleTheme=()=>{
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // dark mode
      setTheme("dark")
  }else{
    let newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme)
  }
  }

  return (
    <>
    {
    mounted &&  
    <React.StrictMode>
    <div data-theme={theme} >
    <Dashboard toggleTheme={toggleTheme} />
   </div>
   </React.StrictMode>

  }
   </>
  )
}

