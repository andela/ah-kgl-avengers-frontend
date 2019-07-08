import React, { Component } from 'react';
import propTypes from 'prop-types';
import './chips.scss';

class Chips extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  removeChip = (chip) => {
    const { value, onChange } = this.props;
    const currentValue = value.filter(item => item !== chip);
    onChange(currentValue);
  };

  addChip = (chip) => {
    const { value, onChange } = this.props;
    const currentValue = value;
    if (currentValue.includes(chip)) {
      return;
    }
    currentValue.push(chip);
    onChange(currentValue);
  };

  shouldAddChip = (evt) => {
    evt.preventDefault();
    if (evt.key === 'Enter') {
      this.addChip(evt.target.value);
      evt.target.value = '';
    }
  };

  renderChips = (chips) => {
    if (chips.length > 0) {
      return chips.map(chip => (
        <div className="chip" key={chip}>
          <span>{`${chip}`}</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              this.removeChip(chip);
            }}
          >
            <i className="zmdi zmdi-close-circle" />
          </button>
        </div>
      ));
    }
    return (
      <div className="chip" key="default">
        <span>none</span>
        <button type="button">
          <i className="zmdi zmdi-edit" />
        </button>
      </div>
    );
  };

  render() {
    const { label, value } = this.props;
    return (
      <div className="chips-container">
        <div className="chips-label">{`${label}:`}</div>
        <input type="text" id="chip" onKeyUp={this.shouldAddChip} placeholder="Add tags on your story"/>
        <div className="chips-group">{this.renderChips(value)}</div>
      </div>
    );
  }
}

Chips.propTypes = {
  label: propTypes.string.isRequired,
  value: propTypes.arrayOf(propTypes.string).isRequired,
  onChange: propTypes.func.isRequired,
};

export default Chips;
