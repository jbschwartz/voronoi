import Point from './Point'

export default class DelaunayPoint extends Point {
  constructor(x, y, isSuper = false) {
    super(x, y)

    this.voronoiNodes = [];
    this.isSuper = isSuper;
  }
}
