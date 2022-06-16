import '../styles/globals.scss'
import { useRouter } from "next/router";
import { wrapper, store } from "../scripts/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return <>
   <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
  </>
}

export default MyApp
