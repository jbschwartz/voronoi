import React, { Component } from 'react';
import style from '../DefaultStyle'
import getRandomColor from '../Colors'

export default class Renderer extends Component {
  iterateTriangles() {
    const isActive = this.props.children;
    if(!isActive['circles'] && !isActive['triangles']) return null;

    this.props.delaunay.triangles.forEach((triangle, index) => {
      // Do not render anything associated with the super triangle
      if(triangle.a.isSuper || triangle.b.isSuper || triangle.c.isSuper) return;

      if(isActive['circles']) {
        this.geometry.circles.push(<circle key={"circumCircle_" + index} {... triangle.circumCircle.svg } {... style.circumCircles }/>);
      }

      if(isActive['triangles']) {
        this.geometry.triangles.push(<polygon key={"triangle_" + index} points={triangle.toString()} {... style.triangles }/>);
      }
    })
  }

  iteratePoints() {
    const isActive = this.props.children;

    if(!isActive['points'] && !isActive['nodes'] && !isActive['voronoi']) return;

    this.props.delaunay.points.forEach((point, index) => {
      if(!point.cellColor) { point.cellColor = getRandomColor(); }

      if(isActive['voronoi']) {
        this.geometry.voronoi.push(<polygon key={"cell_" + index} points={point.voronoiNodes.join(' ')} {... style.cells } fill={point.cellColor} />);
      }

      if(isActive['nodes']) {
        this.geometry.nodes.push(point.voronoiNodes.map((node, nodeIndex) => {
          return <circle key={"node_" + index + nodeIndex} cx={node.x} cy={node.y} {... style.nodes} />
        }));
      }

      if(isActive['points']) {
        this.geometry.points.push(
          <g key={"point_" + index}>
            <circle cx={point.x} cy={point.y} {... style.points } />
            <circle cx={point.x} cy={point.y} r={8} className="blocker" fill="black" fillOpacity={0} />
          </g>
        );
      }
    });
  }

  render() {
    this.geometry = {voronoi: [], circles: [], nodes: [], triangles: [], points: []}

    this.iterateTriangles();
    this.iteratePoints();

    const geometry = Object.keys(this.geometry).map((component, index) => {
      return <g key={"geometry_" + index}>{this.geometry[component]}</g>;
    });

    return (
      <g>{geometry}</g>
    );
  }
}
