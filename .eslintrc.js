module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'airbnb',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended'
    ],
    plugins: ['@typescript-eslint'],
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    rules: {
        // Special ESLint rules or overrides go here.
        'import/prefer-default-export': 0,
        'class-methods-use-this': 0
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        }
    }
};
