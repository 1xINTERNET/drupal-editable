import * as React from "react";
import { readEndpoint } from "redux-json-api";
import { Dispatch } from 'redux';
import { connect } from "react-redux";
import { DataSet } from ".";
import { selectApiIsReady } from "../selectors";
import { ResourceIdentifierObject } from 'jsonapi-typescript';

export interface QueryProps {
  children: any;
  bundle: string;
  type: string;
  dispatch: Dispatch;
  uuid: string;
  apiIsReady: boolean;
}

export interface QueryState {
  loading: boolean;
  error: string;
  resourceIds: ResourceIdentifierObject[];
}

export class QueryPresentational extends React.PureComponent<QueryProps, QueryState> {
  static displayName = "Query";

  static defaultProps = {
    uuid: null,
    apiIsReady: false
  };

  state = {
    loading: false,
    resourceIds: null,
    error: null
  };

  componentDidMount() {
    const { apiIsReady } = this.props;
    if (apiIsReady) {
      this.fetchData();
    }
  }

  componentDidUpdate({ apiIsReady: apiWasReady }) {
    const { apiIsReady } = this.props;
    if (!apiWasReady && apiIsReady) {
      this.fetchData();
    }
  }

  /**
   * Fetch the actual data from the API
   *
   * @return {Promise<void>} Resolved when the data was retrieved
   */
  fetchData = async () => {
    try {
      const { dispatch, bundle, type, uuid } = this.props;
      const endpoint = `${type}/${bundle}${uuid ? `/${uuid}` : ""}`;
      await this._setState({ loading: true });
      const {
        body: { data: resourceIds }
      } = await dispatch(readEndpoint(endpoint));

      await this._setState({ loading: false, resourceIds });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      await this._setState({ loading: false, error: e });
    }
  };

  /**
   * setState but it's a promise
   *
   * @param {any} state The parameter passed to setState
   * @return {Promise<void>} Resolved when the state was updated
   */
  async _setState(state) {
    return new Promise(res => this.setState(state, res));
  }

  render() {
    const { loading, resourceIds, error } = this.state;
    const { children } = this.props;

    return (
      <DataSet
        loading={loading}
        resourceIds={resourceIds}
        error={error && error.toString()}
        refetch={this.fetchData}
      >
        {children}
      </DataSet>
    );
  }
}

export const Query = connect(state => ({
  apiIsReady: selectApiIsReady(state)
}))(QueryPresentational);
