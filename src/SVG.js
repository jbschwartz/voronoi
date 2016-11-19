import React, { Component } from 'react';

const svgNS = "http://www.w3.org/2000/svg";

export default class SVG extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <svg
        id="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000" />
    );
  }
}
