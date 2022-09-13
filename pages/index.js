import Dashboard from './dashboard'
import React,{useState,useEffect} from "react"
const EdtechToken = 'credenc-edtech-authkey';

export default function Home(props) {
  const [mounted, setMounted] = useState(false);
  const [token,setToken] = useState('')

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(()=>{
    _getAuthKey()
  },[localStorage.getItem(EdtechToken)])

  const _getAuthKey=()=>{
    let authKey = localStorage.getItem(EdtechToken);
    setToken(authKey)
  }

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
      token={token}
      selectedSubject= {(item)=>props?.selectedSubject(item)}
      toggleSubjectDropdown={()=>props?.toggleSubjectDropdown()}
      toggleFilterVisible={()=>props?.toggleFilterVisible()}
      filterModalVisible={props?.filterModalVisible}
      showSearchBar={props?.showSearchBar}
      _showSearchBar={props?._showSearchBar}
      hideSearchBar={props?.hideSearchBar}
      searchValue={props?.searchValue}
      handleSearch={props?.handleSearch}
      closeFilterExpandedStage={()=>props?.closeFilterExpandedStage()}
      searchData={props?.searchData}
      handleLogout={()=>props?.handleLogout()}
      handleLogin={()=>props?.handleLogin()}
      openLoginModal={()=>props?.openLoginModal()}
      openFilterVisible={()=>props?.openFilterVisible()}
      handleOpenMobileSearch={()=>props?.handleOpenMobileSearch()}
      clearSearch={()=>props?.clearSearch()}
    />
    }
   </>
  )
}

