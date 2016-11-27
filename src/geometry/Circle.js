import Point from './Point'

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
    return this.center.distanceTo(point) <= this.r;
  }
}
