import { DelaunayPoint, Triangle } from './geometry/Geometry'

export default class Delaunay {
  constructor() {
    // TODO: Accept initial point set
    this.points = [];
    this.triangles = [];
    this.buildSuperTriangle();
  }

  buildSuperTriangle() {
    this.points = [
      new DelaunayPoint(-600, 1000, true),
      new DelaunayPoint(500, -905, true),
      new DelaunayPoint(1600, 1000, true)
    ]

    this.triangles.push(
      new Triangle(this.points[0], this.points[1], this.points[2])
    );
  }

  updatePolygon(triangle, polygon) {
    for(const edge of triangle.edges) {
      if(polygon.hasOwnProperty(edge)) {
        // Remove internal edges from enclosing polygon
        delete polygon[edge];
      } else {
        polygon[edge] = edge;
      }
    }

    return polygon;
  }

  pruneObsoleteTriangles(point, onPrune) {
    this.triangles = this.triangles.filter(triangle => {
      // If the point is in the circum circle, prune triangle
      return !triangle.circumCircle.contains(point) || onPrune(triangle);
    });
  }

  generateNewTriangles(point, polygon) {
    let dirtyPoints = [point];

    for(const edge of polygon) {
      const newTriangle = new Triangle(edge.start, edge.end, point)

      newTriangle.points.forEach(point => {
        point.voronoiNodes.push(newTriangle.circumCircle.center);
      })

      this.triangles.push(newTriangle)

      dirtyPoints = dirtyPoints.concat([edge.start, edge.end]);
    }

    this.sortVoronoiNodes(dirtyPoints);
  }

  removeVoronoiNode(triangle) {
    const oldNode = triangle.circumCircle.center;
    triangle.points.forEach(point => {
      const index = point.voronoiNodes.indexOf(oldNode);
      if(index > -1) {
        point.voronoiNodes.splice(index, 1);
      }
    })

  }

  updateTriangles(point) {
    // Prune triangles made obsolete by new point
    // For each obsolete triangle, build up enclosing polygon around new point
    let polygon = {};
    this.pruneObsoleteTriangles(point, (triangle) => {
      this.removeVoronoiNode(triangle)
      polygon = this.updatePolygon(triangle, polygon);
      return false;
    })
    // Generate new triangles from the enclosing polygon
    this.generateNewTriangles(point, Object.values(polygon));
  }

  sortVoronoiNodes(dirtyPoints) {
    for(const point of dirtyPoints) {
      point.voronoiNodes.sort((a, b) => {
        return Math.atan2(a.y - point.y, a.x - point.x) - Math.atan2(b.y - point.y, b.x - point.x)
      })
    }
  }

  addPoint(point) {
    point = new DelaunayPoint(point.x, point.y);

    this.points.push(point);
    this.updateTriangles(point);
  }
}
