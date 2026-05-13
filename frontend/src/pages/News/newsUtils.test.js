import * as fc from 'fast-check';
import { getDistinctCategories } from './newsUtils';

// Feature: ptit-ui-pages, Property 10: Distinct categories extraction
describe('Property 10: Distinct categories extraction', () => {
  it('returns exactly the unique non-null categories with no duplicates', () => {
    const postArb = fc.record({
      id: fc.integer(),
      title: fc.string(),
      category: fc.oneof(fc.string({ minLength: 1, maxLength: 20 }), fc.constant(null)),
    });

    fc.assert(
      fc.property(fc.array(postArb, { minLength: 0, maxLength: 50 }), (posts) => {
        const result = getDistinctCategories(posts);

        // No duplicates
        const unique = new Set(result);
        if (unique.size !== result.length) return false;

        // All results are non-null categories present in posts
        const expectedSet = new Set();
        posts.forEach(p => { if (p.category) expectedSet.add(p.category); });

        if (result.length !== expectedSet.size) return false;
        for (const cat of result) {
          if (!expectedSet.has(cat)) return false;
        }
        return true;
      }),
      { numRuns: 100 }
    );
  });
});
