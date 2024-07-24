# Pulsopus CLIENT
React + TypeScript + Vite + SWC

## Environment vars
This project uses the following environment variables:

| Name        | Description                 | Default Value |
|-------------|-----------------------------|---------------|
| APP_URL     | link to pulsopus app        | *             |
| API_URL     | link to pulsopus api        | *             |

#### Technologies
`react + typescript`, `material`, `redux`

```sh
pulsopus-app
├── dist/   # Output folder from build
├── node_modules/   # Library root
├── public/
├── src/
│   ├── api/        # API-related files
│   ├── assets/     # Static assets (images, fonts, etc.)
│   ├── components/ # React components
│   ├── constants/  # Application constants
│   ├── helpers/    # Utility functions and helpers
│   ├── hooks/      # Custom React hooks
│   ├── icons/      # Icon components
│   ├── interfaces/ # TypeScript interfaces
│   ├── modules/    # Application modules
│   ├── pages/      # Application pages
│   ├── root/       # Root components and application entry point
│   ├── routes/     # Route definitions
│   ├── stores/     # State management stores
│   ├── theme/      # Theme and styling
│   ├── config.ts   # Configuration files
│   ├── main.tsx    # Main application entry file
├── .env        # Environment variables
├── .eslintc.cjs    # ESLint configuration
├── .gitignore      # Git ignore file
├── docker-compose.yaml # Docker Compose configuration
├── Dockerfile      # Docker configuration file
├── index.html      # HTML entry point
├── nginx.conf      # Nginx configuration file
├── package.json    # NPM package configuration
├── README.md       # Project documentation
├── tsconfig.json   # TypeScript configuration
├── tsconfig.node.json # TypeScript node configuration
├── vite.config.ts  # Vite configuration
├── yarn.lock       # Yarn lock file
```

### Installation
```sh
$ yarn install
```

### Running the app
#### dev
```sh
$ yarn dev
```
#### Default dev port: 5172. Open [localhost](http://localhost:5172)

#### prod
```sh
$ docker-compose up -d --build
```