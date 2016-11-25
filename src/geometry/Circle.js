import {Point, distance} from './Point'

export default class Circle {
  constructor(cx, cy, r) {
    this.center = new Point(cx, cy);
    this.r = r;
  }

  get svg() {
    return {
      cx: this.center.x,
      cy: this.center.y,
      r: this.r
    }
  }

  contains(point) {
    return distance(point, this.center) <= this.r;
  }
}
