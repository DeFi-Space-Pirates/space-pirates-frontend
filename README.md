# Space Pirates Frontend

## Getting started

To run the development server: `yarn dev`.

Create a `.env.development.local` file with the following content:

```env
NEXT_PUBLIC_TRON_GRID_KEY = <private_key>
```

The private key is obtainable on the [TronGrid](https://www.trongrid.io/) website.

Install the [TronLink](https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec) extension.

## Git hooks

On every commit [Husky](https://github.com/typicode/husky) executes two Git hooks: 

- [commit-msg](/.husky/commit-msg): ensure that the commit message follows the [Convetional Commit Format](https://www.conventionalcommits.org/en/v1.0.0/)
- [pre-commit](.husky/pre-commit): run `yarn lint` and `yarn format:check`. In case some files aren't well-formatted, manually execute `yarn format:write`





