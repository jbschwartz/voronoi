export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceTo(p2) {
    return Math.sqrt(
      Math.pow((this.x - p2.x), 2) +
      Math.pow((this.y - p2.y), 2)
    );
  }

  toString() {
    return `${this.x},${this.y}`;
  }
}
