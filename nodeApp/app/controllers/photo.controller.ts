
import { Router, Request, Response } from 'express';
import { PhotoDaoMongo, IPhotoInfo } from '../models/PhotoDaoMongo';
import { Config } from '../config';
import { MongoClient, Db } from 'mongodb';

const sharp = require('sharp');

// Connection URL
const client = new MongoClient(Config.url);
// Database Name
const dbName = Config.databaseId;   
let db : Db;
let photoProvider : PhotoDaoMongo;

client.connect(function(err : any) {
  console.log("Connected successfully to server");
  db = client.db(dbName);
  photoProvider = new PhotoDaoMongo(db, Config.photoCollection);  
});

var multer = require('multer')
var upload = multer({
  dest: 'uploads/'
});

const router: Router = Router();

var azStoreUpload = upload.single('image');

router.post('/',  async (req: Request, res: Response) => {
  
  let response = await azStoreUpload(req, res, function(err : any) {
    
    if (!err) {
      let objectJson : any = res.json();
      //console.log('completed from multer itself.')
      //console.log(objectJson.req.body);
      console.log(req.file);  
      let fname = req.file.filename; 
      let path = req.file.destination;
      
      //console.log(req.body);
      
      if (req.body.username && req.body.description)
      {      
        const photoInfo = { 
          username : req.body.username,
          description : req.body.description, 
          //url : objectJson.req.file.url
        }
        
        sharp(path + "/" + fname)
        .resize(320, 240)
        .toFile('images/' + fname);      
      }
      
    }
    else { 
      console.log(err);
    }
  });
  
  res.send("photo uploaded.");
})

// Get by user 
router.get('/user/:username', async (req: Request, res: Response) => {
  
  console.log('user id');
  let { username } = req.params;
  console.log('getuser ' + username);
  let result = await photoProvider.getUserPhoto(username);
  console.log('myresult', result);
  //Greet the given name
  res.send(result);
});

// Get by photoId 
router.get('/:photoId', async (req: Request, res: Response) => {  
  let { photoId } = req.params;
  console.log('getuser ' + photoId);  
  let result = await photoProvider.getPhoto(photoId);
  console.log(result);
  res.send(result);
  
});

export const PhotoController: Router = router;