/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  '**/*.ts?(x)': filenames =>
    filenames.length > 0
      ? 'eslint src/ --ext ts,.tsx --fix'
      : `eslint --format stylish ${filenames.join(' ')} --fix`,
  '**.{html,md,json,yml,js,css,scss}': filenames =>
    `prettier --write -- ${filenames.join(' ')}`
};
