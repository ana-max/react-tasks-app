import path from 'path';

import express, {
    NextFunction as Next,
    Request,
    Response,
}  from 'express';
import cors from "cors";
import connectDB from './database';
import routes from './routes';


const publicDir = path.join(__dirname, 'public');

const app = express();

app.use(express.static(publicDir));
app.use(cors());
app.use(express.json());
routes(app);

app.use((err: Error, _req: Request, res: Response, _next: Next) => {
    console.error(err.stack);

    res.sendStatus(500);
});

connectDB().then(() => {
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.info(`Server started on ${port}`);
        console.info(`Open http://localhost:${port}/`);
    });
});