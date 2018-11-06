import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { readEndpoint, hydrateStore } from "redux-json-api";
import { connect } from "react-redux";
import { DataSet } from ".";
import { selectApiIsReady } from "../selectors";

export class QueryPresentational extends PureComponent {
  static displayName = "Query";

  static propTypes = {
    children: PropTypes.func.isRequired,
    bundle: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    uuid: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    apiIsReady: PropTypes.bool,
    resourceData: PropTypes.object,
    skip: PropTypes.bool
  };

  static defaultProps = {
    uuid: null,
    apiIsReady: false,
    resourceData: null,
    skip: false
  };

  state = {
    loading: false,
    resourceIds: null
  };

  componentDidMount() {
    const { apiIsReady, resourceData } = this.props;
    if (resourceData) {
      return this.hydrateStore();
    }
    if (apiIsReady && !skip) {
      this.fetchData();
    }
  }

  componentDidUpdate({
    apiIsReady: apiWasReady,
    resourceData: prevResourceData
  }) {
    const { apiIsReady, resourceData, skip } = this.props;
    if (prevResourceData !== resourceData) {
      return this.hydrateStore();
    }
    if (
      !skip &&
      !prevResourceData &&
      !resourceData &&
      !apiWasReady &&
      apiIsReady
    ) {
      this.fetchData();
    }
  }

  hydrateStore = async () => {
    try {
      const { resourceData, dispatch } = this.props;
      await this._setState({
        loading: true
      });
      await dispatch(hydrateStore({ data: resourceData }));
      const resourceIds = Array.isArray(resourceData)
        ? resourceData.map(entity => ({
            type: entity.type,
            id: entity.id
          }))
        : { type: resourceData.type, id: resourceData.id };

      await this._setState({
        loading: false,
        resourceIds
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      await this._setState({ loading: false, error: e });
    }
  };

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
