import React, { Component } from 'react';
import {mouseTrap} from 'react-mousetrap';

class ActiveButton extends Component {
  componentWillMount() {
    this.props.bindShortcut(this.props.shortcut.toString(), this.props.onClick);
  }

  render() {
    const className = (this.props.isActive) ? 'btn btn-success' : 'btn btn-default';

    return (
      <button onClick={this.props.onClick} className={className}>
        {this.props.children}
      </button>
    )
  }
}

export default mouseTrap(ActiveButton);
