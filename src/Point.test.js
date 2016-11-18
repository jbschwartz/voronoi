import React from 'react';
import ReactDOM from 'react-dom';
import {Point, distance} from './Point';

it('calculates distance correctly', () => {
  const p1 = new Point(0, 0);
  const p2 = new Point(2, 0);
  expect(distance(p1, p2)).toBe(2);
});
