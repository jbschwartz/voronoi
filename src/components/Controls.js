import React, { Component } from 'react';
import ActiveButton from './ActiveButton'

export default class Controls extends Component {
  renderControls() {
    const Components = this.props.children;

    return Object.keys(Components).map((component, index) => {
      const componentName = Components[component];
      return (
        <ActiveButton
          key={"Control" + index}
          shortcut={index + 1}
          onClick={() => this.props.toggle(componentName)}
          isActive={this.props.isActive[componentName]}>
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
