import { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import debounce from "lodash.debounce";

export class EditableEntityFormPresentational extends PureComponent {
  static propTypes = {
    change: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired
  };

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
   * @param {SyntheticEvent} evt The change event
   * @return {Promise<void>} Resolved when the entity was changed
   */
  handleChange = async ({
    target: {
      value: propValue,
      dataset: { propPath }
    }
  }) => {
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
   * @param {SyntheticEvent} evt The change event
   * @return {Promise<void>} Resolved when the entity was saved
   */
  handleChangeAndSave = async evt =>
    this.handleChange(evt).then(this.debouncedSave);

  render() {
    const { children } = this.props;

    return children({
      handleChange: this.handleChange,
      handleChangeAndSave: this.handleChangeAndSave
    });
  }
}

export const EditableEntityForm = connect()(EditableEntityFormPresentational);
