import express from 'express';
import cors from 'cors';
import errorHandler from './middleware/error-handler.js';
import users from './routers/users.js';
import posts from './routers/posts.js';
import comments from './routers/comments.js';
import dependencyInjection from './middleware/dependency-injection.js';
import asyncHandler from './middleware/async-handler.js';
import { index as getPosts, show as getPost } from './controllers/posts.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Hello, World!'));
app.use('/users', users);
app.use('/posts', dependencyInjection, posts);
app.use('/users/:user/posts', dependencyInjection, posts);
app.use('/posts/:post/comments', dependencyInjection, comments);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
