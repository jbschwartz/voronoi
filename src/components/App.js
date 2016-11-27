import React, { Component } from 'react';
import SVG from './SVG'
import Delaunay from '../Delaunay'
import '../index.css'

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
        },
        node: {
          fill: "blue",
          r: 4
        }
      }
    };
  }

  addPoint(point) {
    let delaunay = this.state.delaunay;
    delaunay.addPoint(point);

    this.setState({delaunay})
  }

  filterClick(e) {
    return e.target.getAttribute("class") === "blocker"
  }

  render() {
    const style = this.state.style;

    let geometry = {points: [], cells: [], triangles: [], nodes: []}

    this.state.delaunay.points.forEach((point, index) => {
      if(!point.cellColor) { point.cellColor = COLORS[++i % 4] }

      geometry.points.push(
        <g key={"point_" + index}>
          <circle cx={point.x} cy={point.y} {... style.point } />
          <circle cx={point.x} cy={point.y} r={8} className="blocker" fill="black" fillOpacity={0} />
        </g>
      );
      geometry.cells.push(<polygon key={"cell_" + index} points={point.voronoiNodes.join(' ')} {... style.cell } fill={point.cellColor} />);

      geometry.nodes.push(point.voronoiNodes.map((node, nodeIndex) => {
        return <circle key={"node_" + index + nodeIndex} cx={node.x} cy={node.y} {... style.node} />
      }));
    });

    this.state.delaunay.triangles.forEach((triangle, index) => {
      // Do not render anything associated with the super triangle
      if(triangle.a.isSuper || triangle.b.isSuper || triangle.c.isSuper) return null;

      geometry.triangles.push(<polygon key={"triangle_" + index} points={triangle.toString()} {... style.triangle }/>);
    })

    return (
      <div>
        <SVG onClick={this.addPoint.bind(this)} onKeyDown={() => console.log("t")}filterClick={this.filterClick.bind(this)}>
          <g className="cells">{geometry.cells}</g>
          <g className="triangles">{geometry.triangles}</g>
          <g className="nodes">{geometry.nodes}</g>
          <g className="points">{geometry.points}</g>
        </SVG>
      </div>
    );
  }
}