import {Point, distance} from './Point';

it('calculates distance correctly', () => {
  const p1 = new Point(0, 0);
  const p2 = new Point(2, 0);
  const p3 = new Point(1, 1);

  expect(distance(p1, p2)).toBe(2);
  expect(distance(p3, p1)).toBe(Math.sqrt(2));
  expect(distance(p1, p3)).toBe(Math.sqrt(2));
});
