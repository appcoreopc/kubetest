
import { Router, Request, Response } from 'express';
//import { PhotoDao } from '../models/PhotoDao'; 
import { UserDaoMongo } from '../models/UsersDaoMongo'; 
import { Config } from '../config';
import { MongoClient, Db } from 'mongodb';

const client = new MongoClient(Config.url);
// Database Name
const dbName = Config.databaseId;   
let db : Db;
let photoProvider : UserDaoMongo;
let userDao : UserDaoMongo; 

client.connect(function(err : any) {
    console.log("Connected successfully to server");
    db = client.db(dbName);   
    userDao = new UserDaoMongo(db, Config.userCollection);      
});

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {

    console.log('authenticating body');
    console.log(req.body);  
    let { username, password } = req.body;
  
    if (username) {   
        let authenticateResult = await userDao.authenticateUser(username, password);   
        if (authenticateResult && authenticateResult.status && authenticateResult.status == "true")
        {                    
            res.send(authenticateResult);
        }       
        else {
            res.send(false);
        }
    }        
});

export const AuthenticationController: Router = router;