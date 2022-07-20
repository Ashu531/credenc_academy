const constant= {
     ENV: 1, // DEV:1, STAGE:2, PROD:3 
    API_URL:{
      PROD: "https://edtechbackend.credenc.com",
      DEV: "http://localhost:1337"
    },
    COURSES:{
     SUB_CATEGORIES : [
       {
        id:1,
        title: "UI UX Design"
       },
       {
        id:1,
        title: "Marketing"
       },
       {
        id:1,
        title: "Ram"
       },
     ]
    }
}


export default constant;