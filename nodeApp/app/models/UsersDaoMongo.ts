import { Db, MongoError } from 'mongodb';

interface ILoginResult { 
    username? : string, 
    role? : string, 
    status? : string
};

interface IUserResult { 
    username? : string, 
    role? : string, 
    status? : string,
    id : string
};

export class UserDaoMongo {     
    client : Db; 
    collectionId : string;
    database : any = null;
    container : any = null;
    
    constructor(db : Db, collectionId : string )
    { 
        this.client = db;        
        this.collectionId = collectionId;      
    }   
    
    async addUser(username : string, password : string, role : number) { 
        
        const collection = this.client.collection(this.collectionId); 
        let result = await collection.insertMany([
            {
                id : username,
                username : username, 
                password : password,
                role : role
            }
        ]);
        
        return result;
    }
    
    async getUser(username: string) {  
        
        let self = this;   
        const collection = self.client.collection(self.collectionId); 
        let result = await collection.find({username: username}).toArray();
        return result; 
    }
    
    async getUserId(userid: string) {  
        
        const collection = this.client.collection(this.collectionId); 
        let result = await collection.find({id: userid}).toArray();
        console.log(result);
        return result;
    }
    
    async getAll() {  
        
        const collection = this.client.collection(this.collectionId); 
        let result = await collection.find({}).toArray();       
        return result;        
    }
    
    async removeUser(userId: string) { 
        
        let self = this;   
        let result = await this.client.collection(self.collectionId).findOneAndDelete({id : userId});      
        console.log(result);      
    }
    
    async authenticateUser(username : string, password : string): Promise<ILoginResult> {
        
        const collection = this.client.collection(this.collectionId); 
        let docs: any = await collection.find({
            username : username,
            password : password
        }).toArray();
        
        let result = { username : docs.username, role : docs.role, status : 'true' };
        return result;             
    }
    
    async updateUserData(userid : string, password : string, role : number) //: Promise<Array<string>> 
    {                
        let result = await this.client.collection(this.collectionId)
        .findOneAndUpdate({userid : userid}, 
        {
                $set: {id: userid, role : role, password : password}
        });      
            
        return result;        
    }
        
        
    async updateUser(usersid : string[], role : number) //: Promise<Array<string>> 
        {        
            let updatedUserList = [];
            
            for (let index = 0; index < usersid.length; index++) {
                let element = usersid[index];
                console.log('gettting element id', element);  
                
                let result = await this.client.collection(this.collectionId)
                .findOneAndUpdate({id : element}, 
                    {
                        $set: {id: element, role : role}
                    });      
                    
                    console.log(result);  
                    updatedUserList.push(element);  
                }   
                
                return updatedUserList;        
            }
    }