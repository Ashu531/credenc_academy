import App from 'next/app';
import '../styles/globals.scss'
import { useRouter } from "next/router";
import React from 'react';
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
import constant from '../config/constant';
import axios from "axios";
import ApiStatus from "../config/apiStatus";
const EdtechTheme = 'credenc-edtech-theme';
const EdtechToken = 'credenc-edtech-authkey';
const UpvoteKey = 'credenc-edtech-upvote'
const bookmarkKey = 'credenc-marketplace-bookmarks';

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
     bookmarkCount: 0
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
    setTimeout(() => location.reload(), 100)
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

  _handleSearch=(e)=>{
    this.setState({
      search: e
    },()=>{
      // if(e && e.length < 3){
      //   this._getSmallQueryResult()
      // }else{
      //   this._getQueryResult()
      // }
      // this._getCardData(e)
    })
  }

  _clearSearch=()=>{
    this.setState({
      search: ''
    })
  }

  _getSmallQueryResult=async(e)=>{
    let res = await axios.get(`${constant.API_URL.DEV}/course/search/?query=${e}`)
    .then(res => {
      // this.coursesApiStatus.current.success();
      console.log(res.data)
      this.setState({
        searchData: res.data
      })
      return res.data;
    })
    .catch(err => {
      // this.coursesApiStatus.current.failed();
      console.log(err);
    });
  }

  _getQueryResult=async(e)=>{
    let res = await axios.get(`${constant.API_URL.DEV}/course/search/?search=${e}`)
    .then(res => {
      // this.coursesApiStatus.current.success();
      console.log(res.data)
      this.setState({
        searchData: res.data
      })
      return res.data;
    })
    .catch(err => {
      // this.coursesApiStatus.current.failed();
      console.log(err);
    });
  }

  _getCardData = async(value)=>{

    // this.coursesApiStatus.current.makeApiCall();
    let pageNumber=0

    let res = await axios.get(`${constant.API_URL.DEV}/search/?search=${value}/${pageNumber > 0 ? `&page_no=${pageNumber}` : ''}`)
    .then(res => {
      // this.coursesApiStatus.current.success();
      this.setState({
        searchData: res.data
      })
      return res.data;
    })
    .catch(err => {
      // this.coursesApiStatus.current.failed();
      console.log(err);
    });
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
 

  render(){
    const {Component, pageProps} = this.props;
    let store = createStore(rootReducer, compose(applyMiddleware(ReduxThunk)))
    return <>
    <Provider store={store} >
      {
        this.state.mounted && <div data-theme={this.state.theme} style={this.state.loginModal || this.state.forgotPasswordModal || this.state.footerModal || this.state.coursePrevieModal ? {height: 'calc(var(--vh, 1vh) * 100)',overflow: 'hidden'} : {height: '100%'}}>
          {
            window.innerWidth > 500 ? 
            <HeaderContainer 
            toggleTheme={this.toggleTheme} 
            theme={this.state.theme} 
            toggleFilterExpandedStage={()=>this.toggleFilterExpandedStage()} 
            openFilterExpandedStage={()=>this.openFilterExpandedStage()}
            loggedIn={this.state.loggedIn}
            openLoginModal={()=>this.openLoginModal()}
            logoutUser={()=>this.logoutUser()}
            showSearchBar={this.state.showSearchBar}
            _showSearchBar={this._showSearchBar}
            searchValue={this.state.search}
            handleSearch={this._handleSearch}
            closeFilterExpandedStage={()=>this.closeFilterExpandedStage()}
            // openFilterExpandedStage={()=>this.toggleFilterExpandedStage()} 
            hideSearchBar={this.hideSearchBar}
            bookmarkCount={this.state.bookmarkCount}
           /> : 
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
            logoutUser={()=>this.logoutUser()}
            selectedSubject= {(item)=>this.selectedSubject(item)}
            toggleSubjectDropdown={()=>this.toggleSubjectDropdown()}
            filterModalVisible={this.state.filterModalVisible}
            toggleFilterVisible={()=>this.toggleFilterVisible()}
            showSearchBar={this.state.showSearchBar}
            _showSearchBar={this._showSearchBar}
            hideSearchBar={this.hideSearchBar}
            searchValue={this.state.search}
            handleSearch={this._handleSearch}
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
         />
         {
            window.innerWidth > 500 ? 
            <Footer 
            toggleFooterModal={this.toggleFooterModal} 
            filterExpandedStage={this.state.filterExpandedStage}
            closeFooterModal={this.closeFooterModal}
            title="©Credenc2022"/> : 
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
