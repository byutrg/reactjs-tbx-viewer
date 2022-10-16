This is a ReactJS app which allows the user to load a TBX file in their browser and see its contents without needing to know anything about the TBX file beforehand and without a knowledge of XML.

# Prerequisites

You must have [npm](https://www.npmjs.com/) or [yarn](https://classic.yarnpkg.com/lang/en/docs/install) installed.

# Building

Install dependencies first by running `npm install` or `yarn install` in the repository after downloading.

You may debug the project by running either: `npm run start` or `yarn start`.

Build the project with command `npm run build` or `yarn build`. To deploy see the next section.

## Deploying

This app may be deployed simply by placing the contents of the build folder onto the intended deployment server.  The app relies on being at the root of the URL, so accessing the site via sub-directories on a domain is not recommended and would require changes to the URL references.  It is therefore recommended to install this app as a sub-domain.
