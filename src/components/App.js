import React, { Component } from 'react';
import {mouseTrap} from 'react-mousetrap';
import SVG from './SVG'
import Delaunay from '../Delaunay'
import '../index.css'

let i = 0;
const COLORS = ["red", "green", "blue", "yellow"];

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      delaunay: new Delaunay(),
      style: {
        point: {
          r: 5,
          fill: "magenta",
          visibility: "visible"
        },
        triangle: {
          fill: "none",
          stroke: "magenta",
          strokeWidth: 3,
          visibility: "visible"
        },
        cell: {
          stroke: "blue",
          strokeDasharray: "10 5",
          fill: "grey",
          fillOpacity: 0.2,
          visibility: "hidden"
        },
        node: {
          fill: "blue",
          visibility: "hidden",
          r: 4
        },
        circumCircle: {
          fill: "none",
          stroke: "grey",
          visibility: "hidden"
        }
      }
    };
  }

  componentWillMount() {
    this.props.bindShortcut('1', () => this.toggle.bind(this)("point"));
    this.props.bindShortcut('2', () => this.toggle.bind(this)("triangle"));
    this.props.bindShortcut('3', () => this.toggle.bind(this)("circumCircle"));
    this.props.bindShortcut('4', () => this.toggle.bind(this)("cell"));
    this.props.bindShortcut('5', () => this.toggle.bind(this)("node"));
  }

  toggle(component) {
    let style = this.state.style;
    style[component].visibility = (style[component].visibility === 'visible') ? 'hidden' : 'visible';
    this.setState({ style });
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

    let geometry = {points: [], cells: [], triangles: [], nodes: [], circumCircles: []}

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

      const circumCircle = triangle.circumCircle;
      geometry.circumCircles.push(<circle key={"circumCircle_" + index} {... circumCircle.svg } {... style.circumCircle }/>);
    })

    return (
      <div>
        <SVG onClick={this.addPoint.bind(this)} onKeyDown={() => console.log("t")}filterClick={this.filterClick.bind(this)}>
          <g className="cells">{geometry.cells}</g>
          <g className="triangles">{geometry.triangles}</g>
          <g className="circumCircles">{geometry.circumCircles}</g>
          <g className="nodes">{geometry.nodes}</g>
          <g className="points">{geometry.points}</g>
        </SVG>
      </div>
    );
  }
}

export default mouseTrap(App);
