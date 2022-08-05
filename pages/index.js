import Dashboard from './dashboard'
import React,{useState,useEffect} from "react"


export default function Home(props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
}, []);

  return (
    <>
    {
    mounted &&  
    <Dashboard 
      theme={props?.theme} 
      filterExpandedStage={props?.filterExpandedStage} 
      openFilterExpandedStage={props?.openFilterExpandedStage} 
      subjectDropdownMobile={props?.subjectDropdownMobile}
      loginModal={props?.loginModal}
      closeLoginModal={()=>props?.closeLoginModal()}
      openForgotPasswordModal={()=>props?.openForgotPasswordModal()}
      forgotPasswordModal={props?.forgotPasswordModal}
      handleForgotPasswordEnd={()=>props?.handleForgotPasswordEnd()}
    />
    }
   </>
  )
}

