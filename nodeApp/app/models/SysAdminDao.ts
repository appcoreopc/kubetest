// //import { CosmosClient } from "@azure/cosmos";

// interface IAdminUser {
//     username? : string, 
//     avatorUrl? : string, 
//     firstname? : string,
//     lastname? : string
// }

// export class SysAdminDao { 
    
//    a client : CosmosClient;
//     databaseId : string; 
//     collectionId : string;
//     database : any = null;
//     container : any = null;
    
//     constructor(cosmosClient : CosmosClient, databaseId : string, collectionId : string )
//     { 
//         this.client = cosmosClient;
//         this.databaseId = databaseId;
//         this.collectionId = collectionId;
        
//         this.init();
//     }    
    
//     async init() {
        
//         console.log("SysAdminDao : Setting up the SysAdminDao collection...");
//         const dbResponse = await this.client.databases.createIfNotExists({
//             id: this.databaseId
//         });
        
//         this.database = dbResponse.database;
//         console.log("SysAdminDao : Setting up the container...");
//         const coResponse = await this.database.containers.createIfNotExists({
//             id: this.collectionId
//         });        

//         this.container = coResponse.container;        
//     }
    
//     async executeQuery(querySpec : any) {                        
//         const { result: results } = await this.container.items.query(querySpec).toArray();        
//         return results;           
//     }
    
//     async addUser(adminUser : IAdminUser) { 
        
//         const { body : doc } = await this.container.items.create(
//         {
//             'username' : adminUser.username, 
//             'avatarUrl' : adminUser.avatorUrl,
//             'firstname' : adminUser.firstname, 
//             'lastbname' : adminUser.lastname
//         })          
//     }
    
//     async getUser(username: string) {  

//         const userQuerySpec = {            
//             query: "SELECT * FROM sysadmin u WHERE u.username=@username",
//             parameters: [
//                 {
//                     name: "@username",
//                     value: username
//                 }
//             ]
//         };

//         let queryResult =  await this.executeQuery(userQuerySpec);  
//         return queryResult; 
//     }

//     async getUserId(userid: string) {  
        
//         const userQuerySpec = {
//             query: "SELECT * FROM sysadmin u WHERE u.id=@userid",
//             parameters: [
//                 {
//                     name: "@userid",
//                     value: userid
//                 }
//             ]
//         };

//         let queryResult =  await this.executeQuery(userQuerySpec);  
//         return queryResult; 
//     }

//     async getAll() {  

//         const userQuerySpec = {
//             query: "SELECT * FROM sysadmin "
//         };
                
//         let queryResult =  await this.executeQuery(userQuerySpec);  
//         console.log(queryResult);
//         return queryResult; 
//     }
    
//     async removeUser(itemId: string) { 
        
//         await this.container.item(itemId).delete(itemId);
//         console.log('Deleted item:\n${itemBody.id}\n');
//     }
    
//     async authenticateUser(username : string, password : string): Promise<IAdminUser> {
             
//         const userQuerySpec = {
//             query: "SELECT * FROM sysadmin u WHERE u.username=@username AND u.password=@password",
//             parameters: [
//                 {
//                     name: "@username",
//                     value: username
//                 },
//                 {
//                     name: "@password",
//                     value: password
//                 }
//             ]
//         };        
        
//         let queryResult =  await this.executeQuery(userQuerySpec);          
        
//         if (queryResult && queryResult.length > 0) {

//            let result = { username : username, role : queryResult[0].role, status : 'true' }            
//            return new Promise(resolve => {
//                 resolve(result);
//              });                      
//         }

//         return new Promise(resolve => {
//             resolve({ username : username, role : -1, status : 'false' });
//         })
//     }
    
//     async updateUser(usersid : string[], role : number): Promise<Array<string>> {
           
//         let updatedUserList = [];

//          for (let index = 0; index < usersid.length; index++) {
//              let element = usersid[index];
//              console.log('gettting element id', element);

//              let userDataResult = await this.getUserId(element);

//              if (userDataResult)        
//              {                            
//                  userDataResult[0].role = role; 
//                  userDataResult[0].role = role;             
//                  console.log(userDataResult);
//                  const { body : userIdUpdated } = await this.container.item(userDataResult[0].id).replace(userDataResult[0]);
//                  console.log(userIdUpdated);
//                  updatedUserList.push(userIdUpdated);               
//              }   
//          }                         
//         return updatedUserList;        
//     }
// }