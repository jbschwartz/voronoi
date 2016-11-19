import React from 'react';
import {Point} from './Point';
import {Triangle, circumscribedCircle} from './Triangle';

it('calculates circumscribed circle correctly', () => {
  const p1 = new Point(-1, 0);
  const p2 = new Point(1, 0);
  const p3 = new Point(0, 1);

  const triangle = new Triangle(p1, p2, p3);
  const result = circumscribedCircle(triangle)

  expect(result.cx).toBe(0);
  expect(result.cy).toBe(0);
  expect(result.r).toBe(1);
});

it('returns a list of edges', () => {
  const p1 = new Point(-1, 0);
  const p2 = new Point(1, 0);
  const p3 = new Point(0, 1);

  const triangle = new Triangle(p1, p2, p3);
  const result = triangle.edges;

  // TODO: Does order matter?
  expect(result.includes([p1, p2])).toBeTruthy();
  expect(result.includes([p2, p3])).toBeTruthy();
  expect(result.includes([p3, p1])).toBeTruthy();
});
