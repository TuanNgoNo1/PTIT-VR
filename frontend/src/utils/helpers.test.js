import * as fc from 'fast-check';
import {
  encodeCategory,
  decodeCategory,
  parsePublishedDate,
  formatPublishedDate,
} from './helpers';

// Feature: ptit-ui-pages, Property 1: Category encode/decode round-trip
describe('Property 1: Category encode/decode round-trip', () => {
  it('decodeCategory(encodeCategory(name)) === name for Vietnamese strings', () => {
    const vietnameseString = fc.stringOf(
      fc.oneof(
        fc.char16bits().filter(c => /[\p{L}\p{N}\s]/u.test(c)),
        fc.constant(' ')
      ),
      { minLength: 1, maxLength: 50 }
    );

    fc.assert(
      fc.property(vietnameseString, (name) => {
        return decodeCategory(encodeCategory(name)) === name;
      }),
      { numRuns: 100 }
    );
  });
});

// Feature: ptit-ui-pages, Property 2: Date format round-trip (DD/MM/YYYY)
describe('Property 2: Date format round-trip (DD/MM/YYYY)', () => {
  it('formatPublishedDate(parsePublishedDate(s)) === s for valid DD/MM/YYYY dates', () => {
    const validDMY = fc
      .date({
        min: new Date('1900-01-01'),
        max: new Date('2099-12-31'),
      })
      .map((d) => {
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = String(d.getFullYear()).padStart(4, '0');
        return `${day}/${month}/${year}`;
      });

    fc.assert(
      fc.property(validDMY, (s) => {
        const parsed = parsePublishedDate(s);
        if (parsed === null) return false;
        return formatPublishedDate(parsed) === s;
      }),
      { numRuns: 100 }
    );
  });
});

// Feature: ptit-ui-pages, Property 3: parsePublishedDate handles YYYY-MM-DD format
describe('Property 3: parsePublishedDate handles YYYY-MM-DD format', () => {
  it('parsePublishedDate returns correct Date for valid YYYY-MM-DD strings', () => {
    const validYMD = fc
      .date({
        min: new Date('1900-01-01'),
        max: new Date('2099-12-31'),
      })
      .map((d) => {
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = String(d.getFullYear()).padStart(4, '0');
        return { str: `${year}-${month}-${day}`, year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
      });

    fc.assert(
      fc.property(validYMD, ({ str, year, month, day }) => {
        const result = parsePublishedDate(str);
        if (result === null) return false;
        return (
          result.getUTCFullYear() === year &&
          result.getUTCMonth() + 1 === month &&
          result.getUTCDate() === day
        );
      }),
      { numRuns: 100 }
    );
  });
});

// Feature: ptit-ui-pages, Property 4: parsePublishedDate rejects invalid formats
describe('Property 4: parsePublishedDate rejects invalid formats', () => {
  it('returns null for strings not matching DD/MM/YYYY or YYYY-MM-DD', () => {
    const invalidStrings = fc.oneof(
      // Random strings that don't match date patterns
      fc.string({ minLength: 0, maxLength: 20 }).filter((s) => {
        return !/^\d{2}\/\d{2}\/\d{4}$/.test(s) && !/^\d{4}-\d{2}-\d{2}$/.test(s);
      }),
      // Strings that match pattern but have invalid day/month
      fc.constant('32/01/2020'),
      fc.constant('01/13/2020'),
      fc.constant('29/02/2023'), // not a leap year
      fc.constant('2020-13-01'),
      fc.constant('2020-01-32')
    );

    fc.assert(
      fc.property(invalidStrings, (s) => {
        return parsePublishedDate(s) === null;
      }),
      { numRuns: 100 }
    );
  });
});
