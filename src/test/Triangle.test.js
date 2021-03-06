import {Circle, Edge, Triangle, Point} from '../geometry/Geometry';

function expectEqualCircles(a, b) {
  expect(a.center.x).toBeCloseTo(b.center.x, 8);
  expect(a.center.y).toBeCloseTo(b.center.y, 8);
  expect(a.r).toBeCloseTo(b.r, 8);
}

describe('Triangle', () => {
  const p1 = new Point(-1, 0);
  const p2 = new Point(1, 0);
  const p3 = new Point(0, 1);
  const triangle = new Triangle(p1, p2, p3);

  describe('circumCircle', () => {
    const circumCircle = triangle.circumCircle;

    it('is calculated correctly', () => {
      expect(circumCircle.center.x).toBe(0);
      expect(circumCircle.center.y).toBe(0);
      expect(circumCircle.r).toBe(1);
    });

    describe('handles edge cases', () => {
      const points = {
        vertical: [new Point(1, 1), new Point(1, 2), new Point(1.86602540, 2.5)],
        horizontal: [new Point(1, 1), new Point(2, 1), new Point(2.5, 0.13397460)],
        both: [new Point(1, 1), new Point(1, 2), new Point(2.73205081, 2)]
      }

      const expecteds = {
        vertical: new Circle(1.86602540, 1.5, 1),
        horizontal: new Circle(1.5, 0.13397460, 1),
        both: new Circle(1.86602540, 1.5, 1)
      }

      for(let orientation in points) {
        const p = points[orientation];
        const expected = expecteds[orientation];

        it(orientation + ' points first', () => {
          const actual = (new Triangle(p[0], p[1], p[2])).circumCircle;
          expectEqualCircles(actual, expected);
        });

        it(orientation + ' points second', () => {
          const actual = (new Triangle(p[2], p[0], p[1])).circumCircle;
          expectEqualCircles(actual, expected);
        });
      }

      it('degenerate triangles', () => {
        let points = {
          vertical: [new Point(1, 1), new Point(1, 2), new Point(1, 3)],
          horizontal: [new Point(1, 1), new Point(2, 1), new Point(3, 1)],
          angle: [new Point(1, 1), new Point(2, 2), new Point(3, 3)]
        }

        for(let orientation in points) {
          const p = points[orientation];
          const degenerate = new Triangle(p[0], p[1], p[2]);
          expect(isNaN(degenerate.circumCircle.center.x)).toBeTruthy();
          expect(isNaN(degenerate.circumCircle.center.y)).toBeTruthy();
          expect(isNaN(degenerate.circumCircle.center.x)).toBeTruthy();
        }
      });
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
