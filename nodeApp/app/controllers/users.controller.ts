
import { Router, Request, Response } from 'express';
import { UserDaoMongo } from '../models/UsersDaoMongo'; 
import { Config } from '../config';
import { MongoClient, Db } from 'mongodb';

const client = new MongoClient(Config.url);

const dbName = Config.databaseId;   
let db : Db;
let userDao : UserDaoMongo; 

client.connect(function(err : any) { 
    db = client.db(dbName);   
    userDao = new UserDaoMongo(db, Config.userCollection);      
});

const router: Router = Router();

router.get('/all', async (req: Request, res: Response) => { 
    console.log('get all users');
    let userResult = await userDao.getAll();  
    res.send(userResult);
});

router.get('/:username', async (req: Request, res: Response) => {  

    let userResult = null; 
    let username = req.params.username;

    if (username) {
       userResult = await userDao.getUser(username);
    }    
    res.send(userResult);
});

router.put('/', async (req: Request, res: Response) => {  
    
    console.log(req.body);
    let { name, role, password } = req.body;  

    let result = userDao.updateUserData(name, role, password);
    res.send(result);
});

// delete user 
router.delete('/:userid', async (req: Request, res: Response) => {
    // Extract the name fromusresthe request parameters
    let { name } = req.params.userid;    
    // Greet the given name
    res.send(`delete, ${name}`);
});

// create user 
router.post('/create', async (req: Request, res: Response) => {

    console.log(req.body);
    let { name, role, password } = req.body;    
    let result = await userDao.addUser(name, password, role);
    res.send(result);
});

// Update role //
router.post('/setAdmin', async (req: Request, res: Response) => {
    // Extract the name from the request parameters
    let { usersId, role } = req.body;    
    let userList = await userDao.updateUser(usersId, role); 
    // Greet the given name   
    res.send({
       status : userList.length > 0 ? true : false
    });
});

router.post('/setNormalUser', async (req: Request, res: Response) => {
    // Extract the name from the request parameters
    let { username, role } = req.body;
    console.log(req.body);
    let status = await userDao.updateUser(username, 0);    
    // Greet the given name   
    res.send('set normal role');
});

// Export the express.Router() instance to be used by server.ts
export const UsersController: Router = router;