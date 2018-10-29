import * as React from "react";
import { connect } from "react-redux";
import debounce from "lodash.debounce";

export interface EditableEntityFormChildrenArg {
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => Promise<{}>;
  handleChangeAndSave: (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => Promise<{}>;
}

export interface EditableEntityFormProps {
  change: (propPath: string, propValue: any) => Promise<{}>;
  save: () => Promise<void>;
  children: (arg: EditableEntityFormChildrenArg) => React.ReactElement<any>;
}

export class EditableEntityFormPresentational extends React.PureComponent<
  EditableEntityFormProps,
  {}
> {
  /**
   * Cached version of a debounced save function
   *
   * @private
   */
  debouncedSave = null;

  constructor(props) {
    super(props);

    this.debouncedSave = debounce(this.props.save, 1000);
  }

  /**
   * Handle a change event from an input element
   *
   * @param {React.FormEvent<HTMLInputElement>} evt The change event
   * @return {Promise<{}>} Resolved when the entity was changed
   */
  handleChange = async (
    evt: any
  ): Promise<{}> => {
    const {
      currentTarget: {
        value: propValue,
        dataset: { propPath }
      }
    } = evt;
    if (!propPath) {
      throw new Error(
        "No data-prop-path was set on the input element! This change operation failed!"
      );
    }
    return this.props.change(propPath, propValue);
  };

  /**
   * Handle a change event from an input element and save eventually
   *
   * @param {React.FormEvent<HTMLInputElement>} evt The change event
   * @return {Promise<{}>} Resolved when the entity was saved
   */
  handleChangeAndSave = async (
    evt: React.FormEvent<HTMLInputElement>
  ): Promise<{}> => this.handleChange(evt).then(this.debouncedSave);

  render() {
    const { children } = this.props;

    return children({
      handleChange: this.handleChange,
      handleChangeAndSave: this.handleChangeAndSave
    });
  }
}

export const EditableEntityForm = connect()(EditableEntityFormPresentational);
