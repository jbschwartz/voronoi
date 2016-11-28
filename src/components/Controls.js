import React, { Component } from 'react';
import ActiveButton from './ActiveButton'

export default class Controls extends Component {
  renderControls() {
    const Components = this.props.children;

    return Object.keys(Components).map((component, index) => {
      return (
        <ActiveButton
          key={"Control" + index}
          shortcut={index + 1}
          onClick={() => this.props.toggle(component)}
          isActive={Components[component]}>
          {component.toLowerCase()}
        </ActiveButton>
      )
    });
  }

  render() {
    return (
      <div className="controls">
        {this.renderControls()}
      </div>
    )
  }
}
