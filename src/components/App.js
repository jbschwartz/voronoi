import React, { Component } from 'react';
import {mouseTrap} from 'react-mousetrap';
import SVG from './SVG'
import Delaunay from '../Delaunay'
import DefaultStyle from '../DefaultStyle'
import { getRandomColor } from '../colors'
import '../index.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.geometry = {points: [], triangles: [],  circumCircles: [], cells: [], nodes: []}

    this.state = {
      delaunay: new Delaunay(),
      style: DefaultStyle
    };
  }

  componentWillMount() {
    let shortcut = 1;
    for(const component in this.geometry) {
      this.props.bindShortcut((shortcut++).toString(), () => this.toggle.bind(this)(component));
    }
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

  generateGeometry() {
    const style = this.state.style;
    this.geometry = {triangles: [],  circumCircles: [], cells: [], nodes: [], points: []}

    this.state.delaunay.points.forEach((point, index) => {
      if(!point.cellColor) { point.cellColor = getRandomColor(); }

      this.geometry.points.push(
        <g key={"point_" + index}>
          <circle cx={point.x} cy={point.y} {... style.points } />
          <circle cx={point.x} cy={point.y} r={8} className="blocker" fill="black" fillOpacity={0} />
        </g>
      );
      this.geometry.cells.push(<polygon key={"cell_" + index} points={point.voronoiNodes.join(' ')} {... style.cells } fill={point.cellColor} />);

      this.geometry.nodes.push(point.voronoiNodes.map((node, nodeIndex) => {
        return <circle key={"node_" + index + nodeIndex} cx={node.x} cy={node.y} {... style.nodes} />
      }));
    });

    this.state.delaunay.triangles.forEach((triangle, index) => {
      // Do not render anything associated with the super triangle
      if(triangle.a.isSuper || triangle.b.isSuper || triangle.c.isSuper) return null;

      this.geometry.triangles.push(<polygon key={"triangle_" + index} points={triangle.toString()} {... style.triangles }/>);

      this.geometry.circumCircles.push(<circle key={"circumCircle_" + index} {... triangle.circumCircle.svg } {... style.circumCircles }/>);
    })
  }

  renderGeometry() {
    let output = [];
    for(const geometry in this.geometry) {
      output.push(
        <g key={"geometry_" + output.length} className={geometry}>{this.geometry[geometry]}</g>
      )
    }
    return output;
  }

  render() {
    this.generateGeometry();

    return (
      <div>
        <SVG onClick={this.addPoint.bind(this)} filterClick={this.filterClick.bind(this)}>
          {this.renderGeometry()}
        </SVG>
      </div>
    );
  }
}

export default mouseTrap(App);
