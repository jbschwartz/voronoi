import React, { Component } from 'react';
import {mouseTrap} from 'react-mousetrap';
import SVG from './SVG'
import Controls from './Controls'
import Delaunay from '../Delaunay'
import style from '../DefaultStyle'
import getRandomColor from '../Colors'
import '../index.css'

const Components = {
  'POINTS': 'points',
  'TRIANGLES': 'triangles',
  'CIRCLES': 'circumCircles',
  'VORONOI': 'cells',
  'NODES': 'nodes'
}

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      delaunay: new Delaunay(),
      isActive: {
        points: true,
        triangles: true,
        circumCircles: false,
        cells: false,
        nodes: false
      }
    };
  }

  toggle(component) {
    let isActive = this.state.isActive;
    isActive[component] = !isActive[component];
    this.setState({ isActive });
  }

  addPoint(point) {
    let delaunay = this.state.delaunay;
    delaunay.addPoint(point);

    this.setState({ delaunay })
  }

  filterClick(e) {
    return e.target.getAttribute("class") === "blocker"
  }

  generateGeometry() {
    this.geometry = {cells: [], circumCircles: [], nodes: [], triangles: [], points: []}

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
    return Object.keys(this.geometry).map((component, index) => {
      if(this.state.isActive[component]) {
        return <g key={"geometry_" + index} className={component}>{this.geometry[component]}</g>;
      }
    });
  }

  render() {
    this.generateGeometry();

    return (
      <div>
        <SVG onClick={this.addPoint.bind(this)} filterClick={this.filterClick.bind(this)}>
          {this.renderGeometry()}
        </SVG>
        <Controls toggle={this.toggle.bind(this)} isActive={this.state.isActive}>
          {Components}
        </Controls>
      </div>
    );
  }
}
