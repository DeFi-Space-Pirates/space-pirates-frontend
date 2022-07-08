# Space Pirates Frontend

## Getting started

- Create a `.env.development.local` file with the following content:

    ```env
    NEXT_PUBLIC_TRON_GRID_KEY = <private_key>
    ```
    The private key is obtainable on the [TronGrid](https://www.trongrid.io/) website.

- Install the [TronLink](https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec) extension.

- Install dependencies with `yarn install` and run the development server with `yarn dev`.

## Git hooks

On every commit [Husky](https://github.com/typicode/husky) executes two Git hooks: 

- [commit-msg](/.husky/commit-msg): ensure that the commit message follows the [Convetional Commit Format](https://www.conventionalcommits.org/en/v1.0.0/)
- [pre-commit](.husky/pre-commit): run `yarn lint` and `yarn format:check`. In case some files aren't well-formatted, you can manually execute `yarn format:write` to format them.

## Contribution guidelines

Current development status can be consulted in the [Github Project section](https://github.com/orgs/DeFi-Space-Pirates/projects/1). Pick one of the open [issues](https://github.com/DeFi-Space-Pirates/space-pirates-frontend/issues) or tasks and follow the instructions below:

1. Fork the Project

2. Follow the instructions in [getting started](#getting-started)

3. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)

4. Commit your Changes (`git commit -m 'feat: AmazingFeature'`). Use the [Conventional Commits format](https://www.conventionalcommits.org/en/v1.0.0/).

5. Push to the Branch (`git push origin feature/AmazingFeature`)

6. Open a Pull Request