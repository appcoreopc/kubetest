import express, { Request, Response }  from 'express';
import { AuthenticationController } from './controllers/authentication.controller';
import { UsersController } from './controllers/users.controller';
import { PhotoController } from './controllers/photo.controller';

import * as bodyParser from "body-parser";
// Create a new express application instance
const app: express.Application = express();
// The port the express app will listen on
const port: number = 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.use(express.json());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({     
    extended: true
  })); 
 
app.get('/', async (req: Request, res: Response) => { 
    let current = new Date();
    res.send("hello...." + current.getTime());
});

app.use('/users', UsersController);

app.use('/photo', PhotoController);

const PORT = 8080;
const HOST = '0.0.0.0';

// Serve the application at the given port
app.listen(process.env.PORT||PORT, () => {
    // Success callback
    console.log(`Listening at http://localhost:${PORT}/`);
});
