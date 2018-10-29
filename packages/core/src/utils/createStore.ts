import {
  createStore as createReduxStore,
  applyMiddleware,
  combineReducers
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as api, setAxiosConfig } from "redux-json-api";

export const createStore = async ({
  reducers = {},
  middlewares = [],
  enhancers = [],
  csrfTokenEndpoint,
  apiEndpoint,
  loadCSRFToken = true
}) => {
  try {
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

    let token;
    if (loadCSRFToken) {
      token = await fetch(csrfTokenEndpoint).then(res => res.text());
    }

    store.dispatch(
      setAxiosConfig({
        baseURL: apiEndpoint,
        headers: {
          ...(token ? { "X-CSRF-Token": token } : {})
        }
      })
    );

    return store;
  } catch (e) {
    console.error("Error creating editable store!", e);
  }
};
