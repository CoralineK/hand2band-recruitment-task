This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

Create a `secrets/secret.json` file with accessKey and secretKey

```json
{
  "accessKey": "ACCESS_KEY",
  "secretKey": "SECRET_KEY"
}
```

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `yarn build`

Builds the app for production to the `build` folder.\

Used libs:

- React
- Styled Components - CSS-in-JS library used to style React apps.
- Material-UI - Material Design components for React. Used them to prototype the app quickly.
- React Router - Used to route between multiple pages in the app. Routing logic can be found in the `Router.js` file.

### State management

A simple state management solution for this app was implemented using React Context API. You can find more about my implementation in the `App.js` file. It is not ideal by any means, could be refactored to `useReducer` hook.
