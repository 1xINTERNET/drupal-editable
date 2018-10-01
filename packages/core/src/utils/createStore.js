import {
  createStore as createReduxStore,
  applyMiddleware,
  combineReducers
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as api, setAxiosConfig } from "redux-json-api";

export const createStore = ({
  reducers = {},
  middlewares = [],
  enhancers = [],
  csrfTokenEndpoint,
  apiEndpoint,
  loadCSRFToken = true
}) => {
  if (!apiEndpoint) {
    throw new Error(
      "You will need to call createStore with an `apiEndpoint` pointing to the publicly accessible URL to your JSON:API!"
    );
  }
  if (loadCSRFToken && !csrfTokenEndpoint) {
    throw new Error(
      "Either call createStore with `loadCSRFToken: false ` or provide an `csrfTokenEndpoint`!"
    );
  }

  const reducer = combineReducers({
    api,
    ...reducers
  });

  const store = createReduxStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk, ...middlewares), ...enhancers)
  );

  const initialiseApi = token =>
    store.dispatch(
      setAxiosConfig({
        baseURL: apiEndpoint,
        ...(token
          ? {
              headers: {
                "X-CSRF-Token": token
              }
            }
          : {})
      })
    );

  // Initialize API with a token if we have the parameters for it.
  if (loadCSRFToken) {
    fetch(csrfTokenEndpoint)
      .then(res => res.text())
      .then(token => initialiseApi);
  } else {
    initialiseApi();
  }

  return store;
};
