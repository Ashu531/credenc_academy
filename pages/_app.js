import App from 'next/app';
import '../styles/globals.scss'
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from "redux-thunk";
import rootReducer from '../scripts/reducers/index'
import 'react-sliding-side-panel/lib/index.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import FooterModal from '../components/footerModal/FooterModal';
import SlidingPanel from 'react-sliding-side-panel';
const EdtechTheme = 'credenc-edtech-theme';

class MyApp extends App {

  constructor(props) {
    super(props);
    this.state = {
     theme: "",
     footerModal: false,
     mounted: false,
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

  

  render(){
    const {Component, pageProps} = this.props;
    let store = createStore(rootReducer, compose(applyMiddleware(ReduxThunk)))
    return <>
    <Provider store={store}>
      {
        this.state.mounted && <div data-theme={this.state.theme} >
        <Header toggleTheme={this.toggleTheme} theme={this.state.theme}/>
         <Component {...pageProps} theme={this.state.theme} />
         {
            window.innerWidth > 500 ? 
            <Footer 
            toggleFooterModal={this.toggleFooterModal} 
            title="©Credenc2022"/> : null
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
