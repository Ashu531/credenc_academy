import Dashboard from './dashboard'
import React,{useState,useEffect} from "react"
import useLocalStorage from "use-local-storage";
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer';
import FooterModal from '../components/footerModal/FooterModal' 
import SlidingPanel from 'react-sliding-side-panel';
const theme = 'credenc-edtech-theme';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [theme,setTheme]= useLocalStorage("theme" ? "dark" : "light");
  const [footerModal,setFooterModal] = useState(false)

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

  const toggleFooterModal = ()=>{
    setFooterModal(!footerModal)
  }

  return (
    <>
    {
    mounted &&  
    <React.StrictMode>
    <div data-theme={theme} >
    <Header toggleTheme={toggleTheme} />
    <Dashboard />
    <Footer toggleFooterModal={toggleFooterModal} title="©Credenc2022"/>
    <SlidingPanel
         type={'bottom'}
         isOpen={footerModal}
         backdropClicked={() => setFooterModal(false)}
         size={30}
       >
        <FooterModal toggleFooterModal={toggleFooterModal}/> 
       </SlidingPanel>
   </div>
   </React.StrictMode>

    }
   </>
  )
}

