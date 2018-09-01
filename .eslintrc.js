module.exports = {
    "env": {
        "browser": true
    },
    "extends": "airbnb",
    "rules": {
        "comma-dangle": ["error", {
            "functions": "ignore",
            "objects": "always-multiline",
            "imports": "always-multiline",
            "arrays": "always-multiline",
        }],
        "indent": ["error", "tab"],
        "no-param-reassign": [2, {"props": false}],
        "no-tabs": 0,
        "react/forbid-prop-types": 0,
        "react/jsx-filename-extension": 0,
        "react/jsx-indent": [2, 'tab'],
        "react/jsx-indent-props": [2, 'tab'],
        "react/jsx-one-expression-per-line": 0
    }
};