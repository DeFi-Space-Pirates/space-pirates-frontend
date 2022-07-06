# Space Pirates Frontend

## Getting started

To run the development server: `yarn dev`.

## Git hooks

On every commit [Husky](https://github.com/typicode/husky) executes two Git hooks: 

- [commit-msg](/.husky/commit-msg): ensure that the commit message follows the [Convetional Commit Format](https://www.conventionalcommits.org/en/v1.0.0/)
- [pre-commit](.husky/pre-commit): run `yarn lint` and `yarn format:check`. In case some files aren't well-formatted, manually execute `yarn format:write`





