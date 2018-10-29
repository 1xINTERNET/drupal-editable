import * as React from "react";
import { connect } from "react-redux";
import { updateResource, createResource, deleteResource } from "redux-json-api";
import set from "immutable-set";
import get from "lodash.get";
import { ResourceIdentifierObject } from "jsonapi-typescript";
import { Dispatch } from "redux";

import { apiEndpointConstructor } from "../utils";

export interface EditableEntityChildrenArg {
  change: (propPath: string, propValue: any) => Promise<{}>;
  getData: (propPath: string, def: any) => any;
  getAllData: () => object;
  remove: () => Promise<void>;
  reset: (propPath?: string) => Promise<{}>;
  resetAll: () => Promise<{}>
  save: () => Promise<void>;
  creating: boolean;
  error: string;
  saving: string[];
  removing: boolean;
  working: boolean;
}

export interface EditableEntityProps {
  data: any;
  onCreate: (rio: ResourceIdentifierObject) => null;
  onSave: (rio: ResourceIdentifierObject) => null;
  onRemove: (rio: ResourceIdentifierObject) => null;
  children: (arg: EditableEntityChildrenArg) => React.ReactElement<any>;
  dispatch: Dispatch;
}

export interface EditableEntityState {
  changes: {
    [propPath: string]: any;
  };
  creating: boolean;
  deleting: boolean;
  error: string;
  removing: boolean;
  saving: string[];
  working: boolean;
}

export class EditableEntityPresentational extends React.PureComponent<
  EditableEntityProps,
  EditableEntityState
> {
  static displayName = "EditableEntity";

  static defaultProps = {
    data: null,
    onCreate: () => null,
    onSave: () => null,
    onRemove: () => null
  };

  state = {
    changes: null,
    creating: false,
    deleting: false,
    error: null,
    removing: false,
    saving: null,
    working: false
  };

  /**
   * Get the data at a specific path. This method tries to resolve the path to
   * any local changes that are applied, and if there are none it uses the
   * original entity data.
   *
   * @param {string} propPath The address of the property to access
   * @param {any} def The default value to return if nothing was found
   * @return {any} The value at that address or the default
   */
  getData = (propPath: string, def?: any): any => {
    const { changes } = this.state;
    const { data } = this.props;
    return get(changes, propPath) || get(data, propPath, def);
  };

  /**
   * Get the whole entity with changes applied
   *
   * @return {object} The entity with changes applied
   */
  getAllData = (): object => {
    const { data } = this.props;
    return this._applyChanges(data);
  };

  /**
   * Change the entity without saving it
   *
   * @param {string} propPath The dot path to the property to change
   * @param {any} propValue The value to set the field property to
   * @return {Promise<{}>} Promise resolved after the state is updated
   */
  change = async (propPath: string, propValue: any): Promise<{}> =>
    this._setState(({ changes }) => ({
      changes: { ...changes, [propPath]: propValue }
    }));

  /**
   * Actually the locally cached changes to the remote endpoint.
   *
   * @return {Promise<void>} Resolved when the entity was updated
   */
  save = async (): Promise<void> => {
    const { dispatch, data, onCreate, onSave } = this.props;
    const { changes } = this.state;
    const isNew = !data;

    try {
      if (changes) {
        await this._setState({
          creating: isNew,
          saving: Object.keys(changes),
          working: true
        });
        const baseData = isNew
          ? {}
          : {
              id: data.id,
              type: data.type
            };
        const entityWithChanges = this._applyChanges(baseData, true);
        const action = isNew ? createResource : updateResource;
        const result = await dispatch(
          action(entityWithChanges, apiEndpointConstructor)
        );
        if (result) {
          const {
            data: { id, type }
          } = result;
          onSave({ id, type });
          isNew && onCreate({ id, type });
        }
      }
      await this._setState({
        changes: null,
        creating: false,
        saving: false,
        working: false
      });
    } catch (e) {
      this._log(e);
      await this._setState({
        creating: false,
        error: "There was an error saving!",
        saving: false,
        working: false
      });
    }
  };

  remove = async () => {
    const { data, dispatch, onRemove } = this.props;
    try {
      if (!data) {
        throw new Error("No data available! Cannot remove resource.");
      }
      await this._setState({
        removing: true,
        working: true
      });
      await dispatch(deleteResource(data));
      onRemove({
        id: data.id,
        type: data.type
      });
      await this._setState({
        changes: null,
        removing: false,
        working: false
      });
    } catch (e) {
      this._log(e);
      await this._setState({
        removing: false,
        error: "There was an error removing the resource!",
        working: false
      });
    }
  };

  /**
   * Clear all local changes
   *
   * @return {Promise<{}>} Resolves when the state was updated
   */
  resetAll = async (): Promise<{}> => this._setState({ changes: null });

  /**
   * Clear the change for one field
   *
   * @param {string} propName The address of the field to reset
   * @return {Promise<{}>} Resolves when the state was updated
   */
  reset = async (propName: string): Promise<{}> => {
    const { changes } = this.state;
    const newChanges = { ...changes };
    delete newChanges[propName];
    return this._setState({ changes: newChanges });
  };

  /**
   * A utility function to print an error to console log.
   *
   * @private
   * @param {string} str The string to print
   */
  _log(str: string): void {
    // eslint-disable-next-line no-console-log
    console.error(str);
  }

  /**
   * setState but it's a promise
   *
   * @private
   * @param {any} state The parameter passed to setState
   * @return {Promise<{}>} Resolved when the state was updated
   */
  async _setState(state: any): Promise<{}> {
    return new Promise(res => this.setState(state, res));
  }

  /**
   * Apply the changes from the changes list to an object
   *
   * @private
   * @param {object} initialObject Object to merge the changes into
   * @param {boolean} completeComplexFields Fields which are themselves an
   * object should be added completely, this is required by Drupal JSON:API for
   * properties of complex fields to be updated.
   * @return {object} The changed object
   */
  _applyChanges(
    initialObject: object,
    completeComplexFields?: boolean
  ): object {
    const { changes } = this.state;
    const { data } = this.props;
    return !changes
      ? initialObject
      : Object.keys(changes).reduce((prev, curr) => {
          const pathArr = curr.split(".");
          let changeSet = prev;
          // The completeComplexFields flag was set, this is a complex field and
          // hasn't been already added to the object we're currently
          // constructing.
          if (
            completeComplexFields &&
            pathArr.length > 2 &&
            pathArr[0] === "attributes" &&
            !get(prev, [pathArr[0], pathArr[1]])
          ) {
            // Put the complete complex field into the changeSet.
            changeSet = set(
              changeSet,
              [pathArr[0], pathArr[1]],
              get(data, [pathArr[0], pathArr[1]])
            );
          }

          return set(changeSet, curr, changes[curr]);
        }, initialObject);
  }

  render() {
    const { children } = this.props;
    const { creating, error, saving, removing, working } = this.state;

    return children({
      change: this.change,
      getData: this.getData,
      getAllData: this.getAllData,
      remove: this.remove,
      reset: this.reset,
      resetAll: this.resetAll,
      save: this.save,
      creating,
      error,
      saving,
      removing,
      working
    });
  }
}

export const EditableEntity = connect()(EditableEntityPresentational);
