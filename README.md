# myteam

## Development

If you are using Gitpod, the app will automatically start in development mode when the workspace is ready.

If you are not using Gitpod, go to the section below labeled Prerequisites to set up your development environment.

### Run the app in development mode

Development mode runs the app on port 5173 and the app will automatically update as you make changes to the code.

```sh
yarn dev
```

### Run unit tests

Unit tests help you catch bugs early and ensure that your code is working as expected.

These unit tests also run on your pull request, which can help catch bugs before they are merged.

```sh
yarn test
```

### Run end-to-end tests

End-to-end tests help automate realistic scenarios in the app, which is sometimes better for testing the user interface.

These end-to-end tests also run on your pull request. Currently, they just capture a screenshot of the home page of the app, but even that can be helpful sometimes.

```sh
yarn e2e
```

If you want to see what the end-to-end tests are doing, you can run them in headed mode, which will open a browser to show you the tests while they run.

```sh
yarn e2e:headed
```

### Generate database types from Supabase

Supabase is our database. Running this command whenever you change the schema of your database tables and it will generate the TypeScript types for all the tables in the database, which can help with app development.

Running this command will update the `src/supabase.d.ts` file. If you make changes to the database schema and forget to run this command, the checks on your pull request will catch it and remind you to run this command.

```sh
yarn dbtypes
```

## Prerequisites

If you are using Gitpod, the prerequisites are already installed.

Otherwise:

Install nvm, the [Node Version Manager](https://github.com/nvm-sh/nvm).

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

Install and activate Node.js version 20, using nvm.

```sh
nvm install 20
nvm use 20
```

Installing Node.js also installs npm, the Node Package Manager. Use npm to install yarn, another package manager which we will use for our project.

```sh
npm install --global yarn
```

Install the project dependencies using yarn.

```sh
yarn install
```
