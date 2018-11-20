
export class AzureStorageService { 
    
    blobService : any;     
    storageName : string; 
    
    constructor(name : string)
    { 
        this.storageName = name;        
        var azure = require('azure-storage'); 
        this.blobService = azure.createBlobService();

        this.createStorageName(this.storageName);  
    }    
    
    private async createStorageName(name : string) {     
        
        this.blobService.createContainerIfNotExists(name, {
            publicAccessLevel: 'blob'
        }, function(error:any, result:any, response:any) {
            if (!error) {
                
                if (result) { 
                    console.log('container ' + name + " storage created.")
                }
                else {
                    console.log('container ' + name);
                }                
            }
        });
    }
    
    async upload(sourceFileName : string, targetFileName : string) {        
        
        this.blobService.createBlockBlobFromLocalFile(this.storageName, targetFileName, sourceFileName, function(error : any,
            result: any, response : any) {
                if (!error) {               
                    console.log('file uploaded successfully.');
                }
                else 
                {
                    console.log(error);
                }                               
            });                
        }
        
        async removeFile(filename : string) {          
            
            this.blobService.deleteBlob(this.storageName, filename, function(error : any,
                result: any, response : any) {
                    if (!error) {               
                        console.log('file deleted successfully.');
                    }
                    else 
                    {
                        console.log(error);
                    }                               
                });                
            }
        }