import App from 'next/app';
import '../styles/globals.scss'
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from "redux-thunk";
import rootReducer from '../scripts/reducers/index'

class MyApp extends App {
static async getInitialProps({Component, ctx}) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    //Anything returned here can be access by the client
    return {pageProps: pageProps};
}


  render(){
    const {Component, pageProps} = this.props;
    let store = createStore(rootReducer, compose(applyMiddleware(ReduxThunk)))
    return <>
    <Provider store={store}>
     <Component {...pageProps} />
   </Provider>
   </>
  }
 
}

export default MyApp
