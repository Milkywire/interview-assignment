This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## API
We provided a small api for you to use during the development. The api runs on [http://localhost:3001](http://localhost:3001).


`GET /impacters` - List all impacters
`GET /impacters/:id` - Get a impacter

`GET /posts` - List all posts
`POST /posts` - Create a new post
`GET /posts/:id` - Get a post
`PUT /posts/:id` - Update a post
`DELETE /posts/:id` - Delete a post

`POST /upload` - Upload a new image and get a url back

If you want the api to generate new data remove the `./mock/data.json` file. Please be aware that this will take some time and will be done by the server on the next start. The server will not start until it's done generating data.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app and the api in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
