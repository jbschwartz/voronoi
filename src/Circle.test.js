import React from 'react';
import Circle from './Circle';
import {Point} from './Point';

it('calculates contains correctly', () => {
  const p1 = new Point(-3, 0);
  const p2 = new Point(1, 0);

  const circle = new Circle(0, 0, 2);

  expect(circle.contains(p1)).toBe(false);
  expect(circle.contains(p2)).toBe(true);
});
