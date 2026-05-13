import * as fc from 'fast-check';
import { filterPosts, sortByDate } from './searchUtils';

// Feature: ptit-ui-pages, Property 6: Search filter correctness
describe('Property 6: Search filter correctness', () => {
  it('every filtered result contains the query in title (case-insensitive), and no excluded item does', () => {
    const postArb = fc.record({
      id: fc.integer(),
      title: fc.string({ minLength: 1, maxLength: 50 }),
      published_at: fc.constant('01/01/2024'),
    });

    fc.assert(
      fc.property(
        fc.array(postArb, { minLength: 0, maxLength: 30 }),
        fc.string({ minLength: 1, maxLength: 10 }).filter(s => s.trim().length > 0),
        (posts, query) => {
          const trimmed = query.trim();
          const result = filterPosts(posts, trimmed);
          const lower = trimmed.toLowerCase();

          // All results contain query
          for (const post of result) {
            if (!post.title.toLowerCase().includes(lower)) return false;
          }

          // No excluded item contains query
          const resultIds = new Set(result.map(p => p.id));
          for (const post of posts) {
            if (!resultIds.has(post.id) && post.title.toLowerCase().includes(lower)) {
              return false;
            }
          }
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: ptit-ui-pages, Property 7: Search results sort order
describe('Property 7: Search results sort order', () => {
  it('results are sorted from newest to oldest by parsed date', () => {
    const dateStr = fc.date({
      min: new Date('2020-01-01'),
      max: new Date('2026-12-31'),
    }).map(d => {
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    });

    const postArb = fc.record({
      id: fc.integer(),
      title: fc.string({ minLength: 1, maxLength: 20 }),
      published_at: dateStr,
    });

    fc.assert(
      fc.property(fc.array(postArb, { minLength: 0, maxLength: 30 }), (posts) => {
        const sorted = sortByDate(posts);

        for (let i = 1; i < sorted.length; i++) {
          const prev = new Date(sorted[i - 1].published_at.split('/').reverse().join('-'));
          const curr = new Date(sorted[i].published_at.split('/').reverse().join('-'));
          if (prev < curr) return false;
        }
        return true;
      }),
      { numRuns: 100 }
    );
  });
});
