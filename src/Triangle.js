import Circle from './Circle'

class Triangle {
  constructor(p1, p2, p3) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
  }

  get edges() {
    return [[this.p1, this.p2], [this.p2, this.p3], [this.p3, this.p1]];
  }
}

function circumscribedCircle(triangle) {
  const x1 = triangle.p1.x;
  const x2 = triangle.p2.x;
  const x3 = triangle.p3.x;

  const y1 = triangle.p1.y;
  const y2 = triangle.p2.y;
  const y3 = triangle.p3.y;

  var ma = (y2 - y1) / (x2 - x1);
  var mb = (y3 - y2) / (x3 - x2);

  var cx = (ma*mb*(y1-y3) + mb*(x1+x2) - ma*(x2+x3)) / (2 * (mb-ma));
  if(ma != 0) {
    var cy = -(1/ma)*(cx - (x1+x2)/2) + (y1+y2)/2
  } else {
    var cy = -(1/mb)*(cx - (x2+x3)/2) + (y2+y3)/2
  }

  var r = Math.sqrt(Math.pow((x1 - cx), 2) + Math.pow((y1 - cy), 2));

  return new Circle(cx, cy, r);
}

export { Triangle, circumscribedCircle }
