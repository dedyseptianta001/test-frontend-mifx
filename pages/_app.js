import '../styles/globals.css';
import React from 'react';
import { Provider } from 'react-redux';
import Cookies from "js-cookie";
import { useRouter } from 'next/router';

//redux-persist
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from "redux-persist";

//import service
import services from "@config/services";

//import actions
import { setIsLogin } from "@actions/authSlice";
import { useStore } from "../src/redux/store";

function MyApp({ Component, pageProps }) {

  const router = useRouter();
  // initialize store	
	const store = useStore(pageProps.initialReduxState);

  // initialize persistor
	const persistor = persistStore(store, {}, function () 
	{
		persistor.persist();
	});

  React.useEffect(() => 
	{
		// dispatch login or not
		const token = Cookies.get("token");
    
		store.dispatch(setIsLogin(token));
		if (token) {
      services.setToken(token);
		}
	}, []);

  return (
    <React.Fragment>
      <Provider store={store}>
        <PersistGate 
          loading={"Loading..."}
          persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </React.Fragment>
  )
}

export default MyApp
