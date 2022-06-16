import '../styles/globals.scss'
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { useStore } from '../scripts/store';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const store = useStore()
  return <>
   <Provider store={store}>
    <Component {...pageProps} />
    {console.log(store,"store++++")}
  </Provider>
  </>
}

export default MyApp
