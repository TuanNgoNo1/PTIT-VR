import * as fc from 'fast-check';
import { processSearchInput } from './headerUtils';

// Feature: ptit-ui-pages, Property 9: Header search rejects whitespace-only input
describe('Property 9: Header search rejects whitespace-only input', () => {
  it('whitespace-only strings should not trigger navigation', () => {
    const whitespaceOnly = fc.stringOf(
      fc.constantFrom(' ', '\t', '\n', '\r', '\u00A0'),
      { minLength: 0, maxLength: 20 }
    );

    fc.assert(
      fc.property(whitespaceOnly, (keyword) => {
        const result = processSearchInput(keyword);
        return result.shouldNavigate === false && result.encodedUrl === null;
      }),
      { numRuns: 100 }
    );
  });

  it('non-empty trimmed strings should trigger navigation', () => {
    const nonEmptyString = fc.string({ minLength: 1, maxLength: 50 }).filter(
      (s) => s.trim().length > 0
    );

    fc.assert(
      fc.property(nonEmptyString, (keyword) => {
        const result = processSearchInput(keyword);
        return (
          result.shouldNavigate === true &&
          result.encodedUrl === `/search?q=${encodeURIComponent(keyword.trim())}`
        );
      }),
      { numRuns: 100 }
    );
  });
});
