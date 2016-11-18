import {Point, distance} from './Point'

export default class Circle {
  constructor(cx, cy, r) {
    this.cx = cx;
    this.cy = cy;
    this.r = r;
  }

  contains(point) {
    return distance(point, new Point(this.cx, this.cy)) <= this.r;
  }
}
