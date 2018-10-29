import * as React from 'react';
import { connect } from "react-redux";
import { ResourceObject, ResourceIdentifierObject } from 'jsonapi-typescript';
import { selectResources } from "../selectors";


export interface DataSetChildrenArg {
    loading: boolean;
    data: ResourceObject|ResourceObject[];
    error: string;
    refetch: () => void;
};

export interface DataSetProps {
  children: (args: DataSetChildrenArg) => React.ReactElement<any>;
  loading: boolean;
  data: ResourceIdentifierObject|ResourceIdentifierObject[],
  error: string;
  refetch: () => void;
};

export const DataSetPresentational: React.SFC<DataSetProps> = ({
  children,
  loading,
  data,
  error,
  refetch
}) => children({ loading, data, error, refetch });

export const DataSet = connect((state, props) => ({
  data: selectResources(state, props)
}))(DataSetPresentational);
