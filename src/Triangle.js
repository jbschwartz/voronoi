import Circle from './Circle'

class Triangle {
  constructor(i, j, k) {
    this.i = i;
    this.j = j;
    this.k = k;
  }

  get edges() {
    return [
      [this.i, this.j],
      [this.j, this.k],
      [this.k, this.i]
    ];
  }
}

function circumscribedCircle(points) {
  const x1 = points[0].x;
  const x2 = points[1].x;
  const x3 = points[2].x;

  const y1 = points[0].y;
  const y2 = points[1].y;
  const y3 = points[2].y;

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
