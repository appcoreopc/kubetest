
// import { Router, Request, Response } from 'express';
// import { SysAdminDao } from '../models/sysAdminDao'; 
// import { Config } from '../config';
// import { UserDaoMongo } from '../models/UsersDaoMongo';

// // const endpoint = Config.endpoint;  
// // const masterKey = Config.masterKey;

// const endpoint = "https://localhost:8081";   // Add your endpoint
// const masterKey = "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";

// const userDao = new SysAdminDao(client, Config.databaseId, Config.sysadminCollection);

// const router: Router = Router();

// router.get('/all', async (req: Request, res: Response) => { 
//     console.log('get all sysadmin');
//     let userResult = await userDao.getAll();  
//     res.send(userResult);
// });

// router.get('/:username', async (req: Request, res: Response) => {  
   
//     let userResult = null; 
//     let username = req.params.username;

//     if (username) {
//        userResult = await userDao.getUser(username);
//     }    
//     res.send(userResult);
// });

// router.put('/', async (req: Request, res: Response) => {
//     // Reply with a hello world when no name param is provided
//     res.send('update, World!');
// });

// // delete user 
// router.delete('/:userid', async (req: Request, res: Response) => {
//     // Extract the name fromusresthe request parameters
//     let { name } = req.params.userid;
    
//     // Greet the given name
//     res.send(`delete, ${name}`);
// });

// // create user 
// router.post('/create', async (req: Request, res: Response) => {
//     // Extract the name from the request parameters
//     //let { name } = req.params;    
//     console.log(req.body);
//     // Greet the given name
//     res.send(`create`);
// });

// // Update role //
// router.post('/setAdmin', async (req: Request, res: Response) => {
//     // Extract the name from the request parameters
//     let { usersId, role } = req.body;    
//     let userList = await userDao.updateUser(usersId, role); 
//     // Greet the given name   
//     res.send({
//        status : userList.length > 0 ? true : false
//     });
// });

// router.post('/setNormalUser', async (req: Request, res: Response) => {
//     // Extract the name from the request parameters
//     let { username, role } = req.body;
//     console.log(req.body);
//     let status = await userDao.updateUser(username, 0);    
//     // Greet the given name   
//     res.send('set normal role');
// });

// // Export the express.Router() instance to be used by server.ts
// export const SysAdminController: Router = router;