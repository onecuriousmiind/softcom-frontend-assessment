/**
 * This will serve as the base for all text fields used
 * app-wide. This can easily be customized or extended by
 * throwing in a custom Textfield component that wraps the
 * atlaskit Textfield.
 *
 * Also, at this point, only the needed Textfield component
 * from atlaskit is exported, leaving other pieces out;
 * this keeps the bundle small, thanks to Webpack's
 * tree shaking algorithm.
 *
 */

export { default } from '@atlaskit/textfield';
