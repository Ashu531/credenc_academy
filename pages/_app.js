import App from 'next/app';
import '../styles/globals.scss'
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from "redux-thunk";
import rootReducer from '../scripts/reducers/index'
import 'react-sliding-side-panel/lib/index.css';
import HeaderContainer from '../components/header/HeaderContainer';
// import HomeHeader from '../components/homeHeader/NavbarContainer'
import HeaderMobile from '../components/headerMobile/HeaderMobile';
import Footer from '../components/footer/Footer';
import FooterModal from '../components/footerModal/FooterModal';
import SlidingPanel from 'react-sliding-side-panel';
import FooterMobile from '../components/footerMobile/FooterMobile'
import Header from '../components/header/Header';
const EdtechTheme = 'credenc-edtech-theme';
const EdtechToken = 'credenc-edtech-authkey';

class MyApp extends App {

  constructor(props) {
    super(props);
    this.state = {
     theme: "",
     footerModal: false,
     mounted: false,
     filterExpandedStage: false,
     subjectDropdownMobile: false,
     subjectName: 'All Subjects',
     loggedIn: false,
     loginModal: false,
     forgotPasswordModal:false,
     navigation: false,
    };
   
  }

  componentDidMount() {
    this._retrieveData();
    this._mountComponent();
  }

  _mountComponent=()=>{
    this.setState({
      mounted: true
    })
  }

  _retrieveData=()=>{
  let localTheme = localStorage.getItem("EdtechTheme");
   if(localTheme && localTheme.length > 0){
    this.setState({
     theme: localTheme
    })
   }else{
    this.setState({
      theme: "light"
    })
   }

   let token = localStorage.getItem(EdtechToken)
   if(token && token.length > 0){
     this.setState({
       loggedIn: true
     })
   }

  }


  toggleTheme=()=>{
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !this.state.theme) {
      // dark mode
      this.setState({
        theme: "dark"
      },()=>{
        localStorage.setItem("EdtechTheme",this.state.theme)
      })
     
  }else{
    let newTheme = this.state.theme === "light" ? "dark" : "light";
    this.setState({
      theme: newTheme
    },()=>{
      localStorage.setItem("EdtechTheme",newTheme)
    })
   }
  }

  toggleFooterModal = ()=>{
    this.setState({
      footerModal: !this.state.footerModal
    })
  }

  toggleFilterExpandedStage=()=>{
    this.setState({
      filterExpandedStage: !this.state.filterExpandedStage
    })
  }

  openFilterExpandedStage=()=>{
    this.setState({
      filterExpandedStage: true
    })
  }

  toggleSubjectDropdown=()=>{
    this.setState({
      subjectDropdownMobile: !this.state.subjectDropdownMobile
    })
  }

  openLoginModal=()=>{
    this.setState({
      loginModal: true
    })
  }

  closeLoginModal=()=>{
    this.setState({
      loginModal: false
    })
  }

  openForgotPasswordModal=()=>{
    this.setState({
      loginModal: false,
      forgotPasswordModal: true
    })
  }

  handleForgotPasswordEnd=()=>{
    this.setState({
      forgotPasswordModal: false,
      loginModal: true,
    })
  }

  closeForgotPasswordModal=()=>{
    this.setState({
      forgotPasswordModal: false,
    })
  }

  setMobileLoginNaviagtion=()=>{
    this.setState({
      navigation: !this.state.navigation
    })
  }

  openMobileLoginNaviagtion=()=>{
    this.setState({
      navigation: true
    })
  }

 

  render(){
    const {Component, pageProps} = this.props;
    let store = createStore(rootReducer, compose(applyMiddleware(ReduxThunk)))
    return <>
    <Provider store={store} >
      {
        this.state.mounted && <div data-theme={this.state.theme} style={{height: 'calc(var(--vh, 1vh) * 100)'}}>
          {
            window.innerWidth > 500 ? 
            <HeaderContainer 
            toggleTheme={this.toggleTheme} 
            theme={this.state.theme} 
            toggleFilterExpandedStage={()=>this.toggleFilterExpandedStage()} 
            openFilterExpandedStage={()=>this.openFilterExpandedStage()}
            loggedIn={this.state.loggedIn}
            openLoginModal={()=>this.openLoginModal()}
            
        /> : 
            <HeaderMobile
            // toggleTheme={this.toggleTheme} 
            // theme={this.state.theme} 
            openFilterExpandedStage={()=>this.toggleFilterExpandedStage()} 
            toggleSubjectDropdown={()=>this.toggleSubjectDropdown()}
            />
          }
        
         <Component 
         {...pageProps} 
         theme={this.state.theme} 
         filterExpandedStage={this.state.filterExpandedStage} 
         openFilterExpandedStage={()=>this.toggleFilterExpandedStage()} 
         subjectDropdownMobile={this.state.subjectDropdownMobile}
         loginModal={this.state.loginModal}
         closeLoginModal={()=>this.closeLoginModal()}
         openForgotPasswordModal={()=>this.openForgotPasswordModal()}
         forgotPasswordModal={this.state.forgotPasswordModal}
         handleForgotPasswordEnd={()=>this.handleForgotPasswordEnd()}
         mobileLoginNavigation={this.state.navigation}
         setMobileLoginNaviagtion={()=>this.setMobileLoginNaviagtion()}
         />
         {
            window.innerWidth > 500 ? 
            <Footer 
            toggleFooterModal={this.toggleFooterModal} 
            title="©Credenc2022"/> : 
            <FooterMobile
            openLoginModal={()=>this.openLoginModal()}
            setMobileLoginNaviagtion={()=>this.openMobileLoginNaviagtion()}
            />
         }
        <SlidingPanel
             type={'bottom'}
             isOpen={this.state.footerModal}
             backdropClicked={() => this.setState({
              footerModal:false
             })}
             size={30}
           >
            <FooterModal toggleFooterModal={this.toggleFooterModal}/> 
           </SlidingPanel>
         </div>
      }
    
   </Provider>
   </>
  }
 
}

export default MyApp
