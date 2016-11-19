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
  const triangle = new Triangle(0, 1, 2);
  const edges = triangle.edges;

  expect(edges[0].includes(0)).toBeTruthy();
  expect(edges[0].includes(1)).toBeTruthy();

  expect(edges[1].includes(1)).toBeTruthy();
  expect(edges[1].includes(2)).toBeTruthy();

  expect(edges[2].includes(2)).toBeTruthy();
  expect(edges[2].includes(0)).toBeTruthy();
});
