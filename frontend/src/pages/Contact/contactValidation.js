/**
 * Validate contact form fields.
 * @param {{ name: string, email: string, subject: string, content: string }} fields
 * @returns {{ valid: boolean, errors: { name?: string, email?: string, subject?: string, content?: string } }}
 */
export function validateContactForm(fields) {
  const errors = {};
  const fieldNames = ['name', 'email', 'subject', 'content'];

  fieldNames.forEach(key => {
    if (!fields[key] || fields[key].trim().length === 0) {
      errors[key] = 'Trường này không được để trống.';
    }
  });

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
