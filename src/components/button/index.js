/**
 * This will serve as the base for all buttons used
 * app-wide. This can easily be customized or extended by
 * throwing in a custom Button component that wraps the
 * atlaskit Button.
 *
 * Also, at this point, only the needed Button component
 * from atlaskit is exported leaving other pieces out;
 * this keeps the bundle small, thanks to Webpack's
 * tree shaking algorithm.
 *
 */

export { default } from '@atlaskit/button';
