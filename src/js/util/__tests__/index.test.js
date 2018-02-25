/* global describe, it, expect */

import { toggleItemInArray } from '../';

describe('toggleItemInArray()', () => {
    it('returns [1,3] when called with (2, [1,2,3])', () => {
        expect(toggleItemInArray(2, [1, 2, 3])).toEqual([1, 3]);
    });
});