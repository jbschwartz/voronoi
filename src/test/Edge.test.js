import { Edge, Point } from '../geometry/Geometry'

describe('Edge', () => {
  const start = new Point(0, 0);
  const end = new Point(2, 0);

  const edge = new Edge(start, end);

  it('stores verticies in start and end', () => {
    expect(edge.start.x).toEqual(start.x);
    expect(edge.start.y).toEqual(start.y);

    expect(edge.end.x).toEqual(end.x);
    expect(edge.end.y).toEqual(end.y);
  });
})
