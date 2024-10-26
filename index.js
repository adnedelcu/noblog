import express from 'express';
import cors from 'cors';
import posts from './routers/posts.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Hello, World!'));
app.use('/posts', posts);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
