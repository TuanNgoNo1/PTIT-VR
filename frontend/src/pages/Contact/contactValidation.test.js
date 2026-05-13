import * as fc from 'fast-check';
import { validateContactForm } from './contactValidation';

// Feature: ptit-ui-pages, Property 8: Contact form validation
describe('Property 8: Contact form validation', () => {
  it('all non-empty trimmed fields produce valid result', () => {
    const nonEmptyStr = fc.string({ minLength: 1, maxLength: 30 }).filter(s => s.trim().length > 0);

    fc.assert(
      fc.property(nonEmptyStr, nonEmptyStr, nonEmptyStr, nonEmptyStr, (name, email, subject, content) => {
        const result = validateContactForm({ name, email, subject, content });
        return result.valid === true && Object.keys(result.errors).length === 0;
      }),
      { numRuns: 100 }
    );
  });

  it('any field that is empty/whitespace produces errors for that field', () => {
    const whitespaceStr = fc.stringOf(fc.constantFrom(' ', '\t', '\n'), { minLength: 0, maxLength: 10 });
    const nonEmptyStr = fc.string({ minLength: 1, maxLength: 30 }).filter(s => s.trim().length > 0);

    fc.assert(
      fc.property(
        fc.oneof(whitespaceStr, fc.constant('')),
        nonEmptyStr,
        nonEmptyStr,
        nonEmptyStr,
        (name, email, subject, content) => {
          const result = validateContactForm({ name, email, subject, content });
          return result.valid === false && result.errors.name === 'Trường này không được để trống.';
        }
      ),
      { numRuns: 100 }
    );
  });
});
