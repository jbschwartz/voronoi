export default class Edge {
  constructor(start, end) {
    [this.start, this.end] = [start, end];
  }

  toString() {
    if(this.start.x < this.end.x ||
        (this.start.x === this.end.x &&
          this.start.y < this.end.y)) {
      return `E(${this.start.x},${this.start.y})-(${this.end.x},${this.end.y})`;
    }
    return `E(${this.end.x},${this.end.y})-(${this.start.x},${this.start.y})`;
  }
}
