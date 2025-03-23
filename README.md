# Using vitest to run the tests:

Install vitest as dev dependecy only
`npm i vitest -D`

Change node config to use vitest (package.json):
```
"scripts": {
    "test": "vitest"
  },
```

Run test:
`npm test`

Use `describe()` for several related tests