import '../styles/globals.scss'
import { useRouter } from "next/router";
import App, { Container } from 'next/app'
import React from 'react';
import 'react-sliding-side-panel/lib/index.css';
// import HomeHeader from '../components/homeHeader/NavbarContainer'
import HeaderMobile from '../components/headerMobile/HeaderMobile';
import Footer from '../components/footer/Footer';
import FooterModal from '../components/footerModal/FooterModal';
import SlidingPanel from 'react-sliding-side-panel';
import FooterMobile from '../components/footerMobile/FooterMobile'
import Header from '../components/header/Header';
import constant from '../config/constant';
import axios from "axios";
import ApiStatus from "../config/apiStatus";
import ReactGA from 'react-ga';
const EdtechTheme = 'credenc-edtech-theme';
const EdtechToken = 'credenc-edtech-authkey';
const UpvoteKey = 'credenc-edtech-upvote'
const bookmarkKey = 'credenc-edtech-bookmarks';
const EdtechPartnerKey = 'credenc-edtech-partner-key';

const TRACKING_ID = "UA-260405117-1"
ReactGA.initialize(TRACKING_ID);

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
     filterModalVisible: false,
     showSearchBar: false,
     search: '',
     searchData: [],
     openMobileSearch: false,
     goingUp: false,
     coursePrevieModal: false,
     bookmarkCount: 0,
     subjectData: {},
    };
    this.coursesApiStatus = React.createRef(new ApiStatus());
  }

  componentDidMount() {
    this._clearUpvoteData()
    this._retrieveData();
    this._mountComponent();
    this._handleBookmarkCount();
  }

  _mountComponent=()=>{
    this.setState({
      mounted: true
    })
  }

  _setScrollUp=()=>{
    this.setState({
      goingUp: true
    })
  }

  _setScrollDown=()=>{
    this.setState({
      goingUp: false
    })
  }

  _clearUpvoteData=()=>{
    let upvoteData = localStorage.getItem(UpvoteKey);
    if(upvoteData && upvoteData.length > 0){
      upvoteData = []
      localStorage.setItem(UpvoteKey,JSON.stringify(upvoteData))
    }
  }

   _clearBookmarkData=()=>{
    let bookmarkData = localStorage.getItem(UpvoteKey);
    if(bookmarkData && bookmarkData.length > 0){
      bookmarkData = []
      localStorage.setItem(UpvoteKey,JSON.stringify(bookmarkData))
    }
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

  _handleLogout=()=>{
    this.setState({
      loggedIn: false
    })
    localStorage.removeItem(bookmarkKey)
    localStorage.removeItem(UpvoteKey)
  }

  _handleLogin=()=>{
    this.setState({
      loggedIn: true
    })
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

  closeFooterModal = ()=>{
    this.setState({
      footerModal: false
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

  closeFilterExpandedStage=()=>{
    this.setState({
      filterExpandedStage: false
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

  logoutUser=()=>{
    localStorage.removeItem(EdtechToken);
    this._clearUpvoteData()
    this._clearBookmarkData()
    localStorage.removeItem(EdtechPartnerKey)
    // setTimeout(() => location.reload(), 100)
  }

  selectedSubject=(item)=>{
    this.setState({
      subjectName: item.name
    })
  }

  toggleFilterVisible=()=>{
    this.setState({
      filterModalVisible: !this.state.filterModalVisible
    })
  }

  openFilterVisible=()=>{
    this.setState({
      filterModalVisible: true
    })
  }

  closeFilterVisible=()=>{
    this.setState({
      filterModalVisible: false
    })
  }

  _showSearchBar=()=>{
    this.setState({
     showSearchBar: true
    })
  }

  hideSearchBar=()=>{
    this.setState({
     showSearchBar: false
    })
  }

  _handleSubjectTab=(e)=>{
    let data = {
      searchValue: e,
      search: true
    }
    this.setState({
      subjectData: data
    })
  }

  _handleSearch=(e)=>{
    this.setState({
      search: e,
    })
  }

  _clearSearch=()=>{
    this.setState({
      search: ''
    })
  }

  _openMobileSearch=()=>{
     this.setState({
       openMobileSearch: true
     })
  }

  _openCoursePreviewModal=()=>{
    this.setState({
      coursePrevieModal: true
    })
  }

  _closeCoursePreviewModal=()=>{
    this.setState({
      coursePrevieModal: false
    })
  }

  _handleBookmarkCount=async()=>{
    let token = localStorage.getItem(EdtechToken)
     if(token && token.length > 0){
      let res = await axios.get(`${constant.API_URL.DEV}/bookmark/list/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        // this.coursesApiStatus.current.success();
        this.setState({
          bookmarkCount: res.data.count
        })
        return res.data;
      })
      .catch(err => {
        // this.coursesApiStatus.current.failed();
        console.log(err);
      });
     }else{
        this._fetchLocalBookmarks()
     }
  }

  _fetchLocalBookmarks=()=>{
    let bookmarkArray = [];
    let bookmarkItem = JSON.parse(localStorage.getItem(bookmarkKey)) 
   
    if(bookmarkItem && bookmarkItem.length > 0){
      this.setState({
        bookmarkCount: bookmarkItem.length
      })
    }

   
  }

  _addLocalBookmarks=(count)=>{
    let token = localStorage.getItem(EdtechToken)
    if(token && token.length > 0){
      this.setState({
        bookmarkCount: this.state.bookmarkCount+1
      })
    }else{
      this.setState({
        bookmarkCount: count
      })
    }
   
  }

  _removeLocalBookmarks=(count)=>{
    let token = localStorage.getItem(EdtechToken)
    if(token && token.length > 0){
      this.setState({
        bookmarkCount: this.state.bookmarkCount-1
      })
    }else{
      this.setState({
        bookmarkCount: count
      })
    }
    
  }

   _selectSearch=(e)=>{
    if(e && e.length > 0){
      this.openFilterExpandedStage()
      this._showSearchBar()
      this._handleSearch(e)
    }
  }
 
  render(){
    const {Component, pageProps} = this.props;
    return (
    <>
      {
       <div data-theme={this.state.theme} style={this.state.loginModal || this.state.forgotPasswordModal || this.state.footerModal || this.state.coursePrevieModal ? {height: 'calc(var(--vh, 1vh) * 100)',overflow: 'hidden'} : {height: '100%'}}>
          {/* {
            isDesktopOrLaptop ?  */}
            
            <Header 
            toggleTheme={this.toggleTheme} 
            theme={this.state.theme} 
            toggleFilterExpandedStage={()=>this.toggleFilterExpandedStage()} 
            openFilterExpandedStage={()=>this.openFilterExpandedStage()}
            loggedIn={this.state.loggedIn}
            openLoginModal={()=>this.openLoginModal()}
            logoutUser={()=>this.logoutUser()}
            showSearchBar={this.state.showSearchBar}
            searchValue={this.state.search}
            handleSearch={(e)=>this._handleSearch(e)}
            closeFilterExpandedStage={()=>this.closeFilterExpandedStage()}
            // openFilterExpandedStage={()=>this.toggleFilterExpandedStage()} 
            hideSearchBar={this.hideSearchBar}
            bookmarkCount={this.state.bookmarkCount}
            selectSearch={(e)=>this._selectSearch(e)}
            handleSubjectTab={this._handleSubjectTab}
           /> 
            
           {/* : 
            <HeaderMobile
            // toggleTheme={this.toggleTheme} 
            theme={this.state.theme} 
            openFilterExpandedStage={()=>this.toggleFilterExpandedStage()} 
            toggleSubjectDropdown={()=>this.toggleSubjectDropdown()}
            subjectName={this.state.subjectName}
            toggleFilterVisible={()=>this.toggleFilterVisible()}
            searchValue={this.state.search}
            closeFilterVisible={()=>this.closeFilterVisible()}
            filterModalVisible={this.state.filterModalVisible}
            goingUp={this.state.goingUp}
            />
          } */}
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
            logoutUser={()=>this.logoutUser()}
            selectedSubject= {(item)=>this.selectedSubject(item)}
            toggleSubjectDropdown={()=>this.toggleSubjectDropdown()}
            filterModalVisible={this.state.filterModalVisible}
            toggleFilterVisible={()=>this.toggleFilterVisible()}
            showSearchBar={this.state.showSearchBar}
            _showSearchBar={this._showSearchBar}
            hideSearchBar={this.hideSearchBar}
            searchValue={this.state.search}
            handleSearch={(e)=>this._handleSearch(e)}
            closeFilterExpandedStage={()=>this.closeFilterExpandedStage()}
            searchData={this.state.searchData}
            handleLogout={()=>this._handleLogout()}
            handleLogin={()=>this._handleLogin()}
            openLoginModal={()=>this.openLoginModal()}
            openFilterVisible={()=>this.openFilterVisible()}
            handleOpenMobileSearch = {() => this._openMobileSearch()}
            openMobileSearch={this.state.openMobileSearch}
            clearSearch={()=>this._clearSearch()}
            closeFilterVisible={()=>this.closeFilterVisible()}
            setScrollUp={()=>this._setScrollUp()}
            setScrollDown={()=>this._setScrollDown()}
            goingUp={this.state.goingUp}
            openCoursePreviewModal={()=>this._openCoursePreviewModal()}
            closeCoursePreviewModal={()=>this._closeCoursePreviewModal()}
            addLocalBookmarks={(count)=>this._addLocalBookmarks(count)}
            removeLocalBookmarks={(count)=>this._removeLocalBookmarks(count)}
            closeForgotPasswordModal={()=>this.closeForgotPasswordModal()}
            selectSearch={(e)=>this._selectSearch(e)}
            subjectData={this.state.subjectData}
            searchPageQuery={this.state.searchPageQuery}
         />
         {/* {
            isDesktopOrLaptop ?  */}
            <div className='hideOnMobile'>
              <Footer 
              toggleFooterModal={this.toggleFooterModal} 
              filterExpandedStage={this.state.filterExpandedStage}
              closeFooterModal={this.closeFooterModal}
              title="©Credenc2022"/>
            </div>

            <div className='hideOnDesktop'>
              <FooterMobile
              openLoginModal={()=>this.openLoginModal()}
              setMobileLoginNaviagtion={()=>this.openMobileLoginNaviagtion()}
              theme={this.state.theme} 
              filterModalVisible={this.state.filterModalVisible}
              loggedIn={this.state.loggedIn}
              goingUp={this.state.goingUp}
              closeLoginModal={()=>this.closeLoginModal()}
              loginModal={this.state.loginModal}
              bookmarkCount={this.state.bookmarkCount}
              closeFilterVisible={()=>this.closeFilterVisible()}
              />
            </div>
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
      </>
   )
  }
 
}

export default MyApp
