/**
 * This will serve as the base for all things "form" used
 * app-wide. These can easily be customized or extended by
 * wrapping the form components with custom ones.
 *
 * Also, at this point, only the needed form components
 * from atlaskit are exported, leaving other pieces out;
 * this keeps the bundle small, thanks to Webpack's
 * tree shaking algorithm.
 *
 */

export { default } from './Form';
export { FormHeader, FormSection, FormFooter } from '@atlaskit/form';
export { default as FormField } from './FormField';
export { default as EmailFormField } from './EmailFormField';
export { default as FullNameFormField } from './FullNameFormField';
export { default as PhoneNumberFormField } from './PhoneNumberFormField';
export { default as PasswordFormField } from './PasswordFormField';
export { default as FormContext } from './FormContext';
