import React, { Component } from 'react';
import SVG from './SVG'
import Delaunay from './Delaunay'
import ControlPanel from './components/ControlPanel'
import './index.css'

let i = 0;
const COLORS = ["red", "green", "blue", "yellow"];

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      delaunay: new Delaunay(),
      style: {
        point: {
          r: 5,
          fill: "magenta"
        },
        triangle: {
          fill: "none",
          stroke: "magenta",
          strokeWidth: 3
        },
        cell: {
          stroke: "blue",
          fill: "grey",
          fillOpacity: 0.2
        }
      }
    };
  }

  addPoint(point) {
    let delaunay = this.state.delaunay;
    delaunay.addPoint(point);

    this.setState({delaunay})
  }

  render() {
    const style = this.state.style;

    let geometry = {points: [], cells: [], triangles: []}

    this.state.delaunay.points.forEach((point, index) => {
      if(!point.cellColor) { point.cellColor = COLORS[++i % 4] }

      geometry.points.push(<circle key={"point_" + index} cx={point.x} cy={point.y} {... style.point } />);
      geometry.cells.push(<polygon key={"cell_" + index} points={point.voronoiNodes.join(' ')} {... style.cell } fill={point.cellColor} />);
    });

    this.state.delaunay.triangles.forEach((triangle, index) => {
      geometry.triangles.push(<polygon key={"triangle_" + index} points={triangle.toString()} {... style.triangle }/>);
    })

    return (
      <div>
        <SVG onClick={this.addPoint.bind(this)}>
          <g className="cells">{geometry.cells}</g>
          <g className="points">{geometry.points}</g>
          <g className="triangles">{geometry.triangles}</g>
        </SVG>
      </div>
    );
  }
}
