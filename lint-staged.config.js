module.exports = {
  '**/*.ts?(x)': filenames =>
    filenames.length > 0
      ? 'eslint src/ --ext ts,.tsx --fix'
      : `eslint --format stylish ${filenames.join(' ')} --fix`,
  '**.{html,nd,json,yml,js,css,scss}': filenames =>
    `prettier --write -- ${filenames.join(' ')}`
}
