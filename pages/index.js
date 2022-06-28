import Dashboard from './dashboard'
import React from "react"
import useLocalStorage from "use-local-storage";
const theme = 'credenc-edtech-theme';

export default function Home() {
  const [theme,setTheme]= useLocalStorage("theme" ? "dark" : "light");

  const toggleTheme=()=>{
    let newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme)
  }

  return (
    <div data-theme={theme}>
     <Dashboard toggleTheme={toggleTheme} />
    </div>
  )
}

