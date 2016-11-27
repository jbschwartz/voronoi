import { Point } from '../geometry/Geometry';

it('calculates distance correctly', () => {
  const p1 = new Point(0, 0);
  const p2 = new Point(2, 0);
  const p3 = new Point(1, 1);

  expect(p1.distanceTo(p2)).toBe(2);
  expect(p3.distanceTo(p1)).toBe(Math.sqrt(2));
  expect(p1.distanceTo(p3)).toBe(Math.sqrt(2));
});
