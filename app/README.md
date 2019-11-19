# Getting started
This project is generated with `react-native init` for more information about this setup, pleas have look at the [official docs](https://facebook.github.io/react-native/docs/getting-started) 

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