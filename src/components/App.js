import React, { Component } from 'react';
import SVG from './SVG'
import Controls from './Controls'
import Delaunay from '../Delaunay'
import Renderer from './Renderer'
import '../index.css'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      delaunay: new Delaunay(),
      components: {
        points: true,
        triangles: true,
        circles: false,
        voronoi: false,
        nodes: false
      }
    };
  }

  toggle(component) {
    let isActive = this.state.components;
    isActive[component] = !isActive[component];
    this.setState({ components: isActive });
  }

  addPoint(point) {
    let delaunay = this.state.delaunay;
    delaunay.addPoint(point);

    this.setState({ delaunay })
  }

  filterClick(e) {
    return e.target.getAttribute("class") === "blocker"
  }

  render() {
    return (
      <div>
        <SVG onClick={this.addPoint.bind(this)} filterClick={this.filterClick.bind(this)}>
          <Renderer delaunay={this.state.delaunay}>
            {this.state.components}
          </Renderer>
        </SVG>
        <Controls toggle={this.toggle.bind(this)}>
          {this.state.components}
        </Controls>
      </div>
    );
  }
}
