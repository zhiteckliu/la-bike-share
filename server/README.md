
## Server - Express and GraphQL

Using GraphQL through Express to expose Melbourne Bike Share Data

Using NPM as the package manager

# Installation
`npm install`

# Development build and watch
`npm run dev`

Using Nodemon, this will monitor changes in `src` and automatically restart the server (port: 4000)

To hit the GraphQL's entry point - [http://localhost:4000/graphql](http://localhost:4000/graphql)

# Build
`npm run build`

This will compile the TypeScript files, and output the compiled files in the `dist` folder

# Serve and start server
`npm run start`

Once build from above is run, this script will start the server (port: 4000) based on the compiled files in `dist`

To hit the GraphQL's entry point - [http://localhost:4000/graphql](http://localhost:4000/graphql)

