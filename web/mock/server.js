const fastify = require('fastify')({logger: false});
const fs = require('fs');
const path = require('path');
const pump = require('pump');
const uuidv4 = require('uuid').v4;
const {NotFound} = require('http-errors');
const {createImpacters, createPosts} = require('./generateData');

let impacters = [];
let posts = [];

const impacterResource = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    name: {type: 'string'},
    bio: {type: 'string'},
    profile_image: {type: 'string'},
  },
};

const postResource = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    type: {type: 'string'},
    description: {type: 'string'},
    impacter_id: {type: 'string'},
    data: {
      type: 'object',
      properties: {
        media: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              width: {type: 'number'},
              height: {type: 'number'},
              description: {type: 'string'},
              image: {type: 'string'},
              version: {type: 'string'},
            },
          },
        },
      },
    },
  },
};

const editPostResource = {
  type: 'object',
  properties: {
    type: {type: 'string'},
    description: {type: 'string'},
    impacter_id: {type: 'string'},
    data: {
      type: 'object',
      properties: {
        media: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              width: {type: 'number'},
              height: {type: 'number'},
              description: {type: 'string'},
              image: {type: 'string'},
              version: {type: 'string'},
            },
          },
        },
      },
    },
  },
};

async function createMockData() {
  try {
    impacters = await createImpacters(19);
    posts = await createPosts(impacters, 50);
    fs.writeFileSync(
      './mock/data.json',
      JSON.stringify({
        impacters,
        posts,
      }),
    );
  } catch (error) {
    console.log('Failed to create data', error);
  }
}

async function loadMockData() {
  try {
    const data = await require('./data.json');
    impacters = data.impacters;
    posts = data.posts;
  } catch (error) {
    await createMockData();
  }
}

fastify.register(require('fastify-cors'), {
  origin: '*',
});

fastify.register(require('fastify-swagger'), {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'API documentation',
      description: 'Mock api for the interview assignment',
      version: '0.1.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    host: 'localhost:3001',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      {name: 'impacter', description: 'Impacter related end-points'},
      {name: 'posts', description: 'Post related end-points'},
      {name: 'upload', description: 'Upload files to the server'},
    ],
  },
  exposeRoute: true,
});

fastify.register(require('fastify-multipart'));
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, '../uploads'),
  prefix: '/uploads/',
});

// Declare a route
fastify.get('/', async (request, reply) => {
  return 'Welcome! You can find the documentation for the API at http://localhost:3001/docs';
});

fastify.get(
  '/impacters',
  {
    schema: {
      description: 'List all impacters',
      tags: ['impacter'],
      response: {
        200: {
          type: 'array',
          items: impacterResource,
        },
      },
    },
  },
  async (request, reply) => impacters,
);

fastify.get(
  '/impacters/:id',
  {
    schema: {
      description: 'Get impacter with specified id',
      tags: ['impacter'],
      params: {
        id: {type: 'string'},
      },
      response: {200: impacterResource},
    },
  },
  async (request, reply) => {
    const {id} = request.params;
    const impacterIndex = impacters.findIndex(impacter => impacter.id === id);

    if (impacterIndex === -1) {
      throw new NotFound(`Could not find impacter with id: ${id}`);
    }

    return impacters[impacterIndex];
  },
);

fastify.get(
  '/impacters/:id/posts',
  {
    schema: {
      description: 'List all posts for impacter with specified id',
      tags: ['impacter'],
      params: {
        id: {type: 'string'},
      },
      response: {
        200: {
          type: 'array',
          items: postResource,
        },
      },
    },
  },
  async (request, reply) => {
    const {id} = request.params;
    return posts.filter(post => post.impacter_id === id);
  },
);

fastify.get(
  '/posts',
  {
    schema: {
      description: 'List all posts',
      tags: ['posts'],
      querystring: {
        limit: {type: 'number'},
        offset: {type: 'number'},
      },
      response: {
        200: {
          type: 'array',
          items: postResource,
        },
      },
    },
  },
  async (request, reply) => {
    const limit = request.query.limit
      ? Number.parseInt(request.query.limit)
      : posts.length;
    const offset = request.query.offset
      ? Number.parseInt(request.query.offset)
      : 0;

    return posts.slice(offset, offset + limit);
  },
);

fastify.post(
  '/posts',
  {
    schema: {
      description: 'Create a new post',
      tags: ['posts'],
      body: editPostResource,
      response: {200: postResource},
    },
  },
  async (request, reply) => {
    const post = request.body;
    post.id = uuidv4();
    posts.push(post);
    return post;
  },
);

fastify.get(
  '/posts/:id',
  {
    schema: {
      description: 'Get post with specified id',
      tags: ['posts'],
      params: {
        id: {type: 'string'},
      },
      response: {200: postResource},
    },
  },
  async (request, reply) => {
    const {id} = request.params;

    const postIndex = posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      throw new NotFound(`Could not find post with id: ${id}`);
    }

    return posts[postIndex];
  },
);

fastify.put(
  '/posts/:id',
  {
    schema: {
      description: 'Update post with specified id',
      tags: ['posts'],
      params: {
        id: {type: 'string'},
      },
      body: editPostResource,
      response: {200: postResource},
    },
  },
  async (request, reply) => {
    const {id} = request.params;
    const postIndex = posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      throw new NotFound(`Could not find post with id: ${id}`);
    }

    const post = posts[postIndex];
    const updatedPost = {
      ...post,
      ...request.body,
    };
    posts[postIndex] = updatedPost;
    return updatedPost;
  },
);

fastify.delete(
  '/posts/:id',
  {
    schema: {
      description: 'Delete post with specified id',
      tags: ['posts'],
      params: {
        id: {type: 'string'},
      },
      response: {
        204: {
          description: 'Successful response',
          type: 'null',
        },
      },
    },
  },
  async (request, reply) => {
    const {id} = request.params;
    const postIndex = posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      throw new NotFound(`Could not find post with id: ${id}`);
    }
    posts.splice(postIndex, 1);
    reply.status(204);
    return;
  },
);

fastify.post(
  '/upload',
  {
    schema: {
      tags: ['upload'],
      description:
        'Upload a new file to the server. This endpoint expects a multipart form with a `file` field containing the image file. It will return a url to the uploaded image.',
      response: {
        200: {
          type: 'object',
          properties: {
            url: {type: 'string'},
          },
        },
      },
    },
  },
  async function(request, reply) {
    const folderPath = `./uploads/${uuidv4()}`;
    await fs.promises.mkdir(folderPath, {recursive: true});

    let filePath;
    const mp = request.multipart(handler, function(error) {
      if (error) {
        return reply.code(500).send(error);
      }
      console.log('upload completed');
      reply.code(200).send({
        url: `http://localhost:3001/${filePath.replace('./', '')}`,
      });
    });

    mp.on('field', function(key, value) {
      console.log('form-data', key, value);
    });

    function handler(field, file, filename, encoding, mimetype) {
      filePath = `${folderPath}/${filename}`;
      pump(file, fs.createWriteStream(filePath));
    }
  },
);

// Run the server!
const start = async () => {
  try {
    await loadMockData();
    await fastify.listen(3001);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    console.log('error', err);
    process.exit(1);
  }
};
start();
