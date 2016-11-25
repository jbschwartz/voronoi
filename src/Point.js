class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `${this.x},${this.y}`
  }
}

}

function distance(p1, p2) {
  return Math.sqrt(
    Math.pow((p1.x - p2.x), 2) +
    Math.pow((p1.y - p2.y), 2)
  );
}

export { Point, distance }
