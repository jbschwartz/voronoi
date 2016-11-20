import React from 'react';
import Circle from './Circle';
import {Point} from './Point';

describe('Circle', () => {
  const p1 = new Point(-3, 0);
  const p2 = new Point(1, 0);

  const circle = new Circle(0, 0, 2);

  it('contains a point inside of it', () => {
    expect(circle.contains(p2)).toBe(true);
  });

  it('does not contain a point outside of it', () => {
    expect(circle.contains(p1)).toBe(false);
  })
})
