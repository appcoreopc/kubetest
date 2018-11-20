export const Config = {
    url  : 'mongodb://192.168.99.100:27017',
    //endpoint : process.env.HOST || "https://meetroomdatabase.documents.azure.com:443/",
    endpoint : process.env.HOST || "https://meetroomdatabase.documents.azure.com:443/",
    //masterKey : process.env.AUTH_KEY || "BkMkhVWr1gUOOvrXcTN50mnB4wmSEEJd1I4hqqyctL9pMXpMgZDqH87aRjlJsBjVRXOr3KQlzTfqCBe77ftnRA==",
    masterKey : process.env.AUTH_KEY || "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==",
    databaseId : "meetroomdb",
    containerId : "Items",
    userCollection : 'users',
    photoCollection : 'photos',
    sysadminCollection : 'sysadmin',
    azureStoreConnectionString : 'DefaultEndpointsProtocol=https;AccountName=meetroomstorage;AccountKey=1pbeX5cw5UWRCd5WtH24wgyioeIAGCibJenDkx06hmcbAMHzE9nPR/iLOv8Acf3M055d6vlLB+GeK5ZprgpfNQ==;EndpointSuffix=core.windows.net'
    //azureStoreConnectionString : 'AccountEndpoint=https://localhost:8081/;AccountKey=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw=='
}
