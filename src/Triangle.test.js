import {Point} from './Point';
import Edge from './Edge';
import {Triangle, circumscribedCircle} from './Triangle';

describe('Triangle', () => {
  const p1 = new Point(-1, 0);
  const p2 = new Point(1, 0);
  const p3 = new Point(0, 1);
  const triangle = new Triangle(p1, p2, p3);

  it('calculates circumscribed circle correctly', () => {
    const result = circumscribedCircle([p1, p2, p3])

    expect(result.cx).toBe(0);
    expect(result.cy).toBe(0);
    expect(result.r).toBe(1);
  });

  it('returns a list of Edges', () => {
    const edges = triangle.edges;
    for(let edge of edges) {
      expect(edge instanceof Edge).toBeTruthy();
    }
  });

  it('stores a copy of the circumCircle', () => {
    expect(triangle.circumCircle).toBeDefined();
  })
})
