import React, { Component } from 'react';
import propTypes from 'prop-types';

class Messenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  componentWillMount() {
    this.setState({ isActive: true });
  }

  componentDidMount() {
    const { duration = 5000 } = this.props;
    setTimeout(() => this.setState({ isActive: false }), duration);
  }

  render() {
    const { messages, type = 'error' } = this.props;
    const { isActive } = this.state;
    return (
      <div className={`status-errors ${isActive ? 'active' : ''} ${type}`}>
        <i className="zmdi zmdi-info-outline" />
        &nbsp;
        {messages.toString()}
      </div>
    );
  }
}

Messenger.propTypes = {
  messages: propTypes.arrayOf(propTypes.string).isRequired,
  type: propTypes.string.isRequired,
  duration: propTypes.number,
};

Messenger.defaultProps = {
  duration: 5000,
};

export default Messenger;
