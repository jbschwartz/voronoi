import Circle from './Circle'
import Edge from './Edge'
import {Point, distance} from './Point'

class Triangle {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;

    this.buildEdges();

    this.circumCircle = circumscribedCircle([this.a, this.b, this.c]);
  }

  get points() {
    return [this.a, this.b, this.c]
  }

  buildEdges() {
    this.edges = [
      new Edge(this.a, this.b),
      new Edge(this.b, this.c),
      new Edge(this.c, this.a)
    ]
  }

  toString() {
    return `${this.a.x},${this.a.y} ${this.b.x},${this.b.y} ${this.c.x},${this.c.y}`
  }
}

class Line {
  constructor(point, slope) {
    this.point = point;
    this.m = slope;
  }

  isVertical() {
    return !isFinite(this.m);
  }

  isHorizontal() {
    return this.m === 0;
  }

  isParallel(line) {
    return this.m === line.m;
  }

  intersect(line) {
    if(this.isParallel(line)) return null;

    let result = { x: null, y: null }

    if(this.isHorizontal()) {
      result.y = this.point.y;
      result.x = line.evaluate({y: result.y});
    } else {
      if(this.isVertical()) {
        result.x = this.point.x;
        result.y = line.evaluate({x: result.x});
      } else {
        if(line.isVertical()) {
          result.x = line.point.x;
          result.y = this.evaluate({x: result.x});
        } else {
          result.x = (line.point.y - this.point.y + this.m * this.point.x - line.m * line.point.x) / (this.m - line.m);
          result.y = line.evaluate({x: result.x});
        }
      }
    }

    return result;
  }

  evaluate(value) {
    if(value.y !== undefined) {
      if(this.isHorizontal()) return null;

      return ((value.y - this.point.y) / this.m) + this.point.x
    } else if(value.x !== undefined) {
      if(this.isVertical()) return null;
      return this.m * (value.x - this.point.x) + this.point.y;
    }
  }
}

function midpoint(a, b) {
  return new Point(
    (a.x + b.x) / 2,
    (a.y + b.y) / 2
  );
}

function slope(a, b) {
  return (b.y - a.y) / (b.x - a.x);
}

function circumscribedCircle(points) {
  const mA = slope(points[0], points[1]);
  const mB = slope(points[1], points[2]);

  const perpBisectorA = new Line(midpoint(points[0], points[1]), - 1 / mA);
  const perpBisectorB = new Line(midpoint(points[1], points[2]), - 1 / mB);

  const intersection = perpBisectorA.intersect(perpBisectorB);

  if(intersection) {
    return new Circle(intersection.x, intersection.y, distance(intersection, points[0]))
  } else {
    return new Circle(NaN, NaN, NaN);
  }
}

export { Triangle }
