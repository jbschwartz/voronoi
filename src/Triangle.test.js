import {Point} from './Point';
import Edge from './Edge';
import Circle from './Circle';
import {Triangle} from './Triangle';

describe('Triangle', () => {
  const p1 = new Point(-1, 0);
  const p2 = new Point(1, 0);
  const p3 = new Point(0, 1);
  const triangle = new Triangle(p1, p2, p3);

  describe('circumCircle', () => {
    const circumCircle = triangle.circumCircle;

    it('is calculated correctly', () => {
      expect(circumCircle.cx).toBe(0);
      expect(circumCircle.cy).toBe(0);
      expect(circumCircle.r).toBe(1);
    });

    it('is a Circle', () => {
      expect(circumCircle instanceof Circle).toBeTruthy();
    })
  });

  it('returns a list of Edges', () => {
    const edges = triangle.edges;
    for(let edge of edges) {
      expect(edge instanceof Edge).toBeTruthy();
    }
  });

  it('stores a copy of the circumCircle', () => {
    expect(triangle.circumCircle).toBeDefined();
  });
})
