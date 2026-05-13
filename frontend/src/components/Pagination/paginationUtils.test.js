import * as fc from 'fast-check';
import { getPageItems, getTotalPages } from './paginationUtils';

// Feature: ptit-ui-pages, Property 5: Pagination slice correctness
describe('Property 5: Pagination slice correctness', () => {
  it('for any array and valid page, returns exactly the correct slice', () => {
    fc.assert(
      fc.property(
        fc.array(fc.anything(), { minLength: 1, maxLength: 100 }),
        fc.integer({ min: 1, max: 20 }),
        (items, page) => {
          const pageSize = 10;
          const totalPages = getTotalPages(items.length, pageSize);
          // Clamp page to valid range
          const validPage = Math.min(page, totalPages);

          const result = getPageItems(items, validPage, pageSize);
          const expectedStart = (validPage - 1) * pageSize;
          const expectedEnd = Math.min(validPage * pageSize, items.length);
          const expected = items.slice(expectedStart, expectedEnd);

          // Result should have correct length
          if (result.length !== expected.length) return false;

          // Result should contain the exact items
          for (let i = 0; i < result.length; i++) {
            if (result[i] !== expected[i]) return false;
          }
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('page items length is at most pageSize', () => {
    fc.assert(
      fc.property(
        fc.array(fc.anything(), { minLength: 0, maxLength: 100 }),
        fc.integer({ min: 1, max: 20 }),
        (items, page) => {
          const result = getPageItems(items, page, 10);
          return result.length <= 10;
        }
      ),
      { numRuns: 100 }
    );
  });
});
