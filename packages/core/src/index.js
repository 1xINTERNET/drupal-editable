import "./polyfills";

// Utilities:
import get from "lodash.get";
import set from "immutable-set";
import debounce from "lodash.debounce";
import cx from "classnames";
import { connect, Provider } from "react-redux";
import { css, keyframes } from "emotion";
import { createSelector } from "reselect";

// API actions:
import {
  createResource,
  readEndpoint,
  updateResource,
  deleteResource,
  hydrateStore
} from "redux-json-api";

// Editable core functionality:
import { createStore } from "./utils";
import {
  DataSet,
  Query,
  EditableEntity,
  EditableEntityForm
} from "./components";
import { getQueryFromEntityReference, getQueryFromRIO } from "./normalizers";

export {
  get,
  set,
  debounce,
  cx,
  connect,
  Provider,
  css,
  keyframes,
  createSelector,
  createResource,
  readEndpoint,
  updateResource,
  deleteResource,
  hydrateStore,
  createStore,
  DataSet,
  Query,
  EditableEntity,
  EditableEntityForm,
  getQueryFromEntityReference,
  getQueryFromRIO
};
