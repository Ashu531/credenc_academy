const constant= {
     ENV: 1, // DEV:1, STAGE:2, PROD:3 
    API_URL:{
      PROD: "https://edtechbackend.credenc.com",
      DEV: "https://edtech.credenc.com"
    },
    BASE_URL:{
      PROD: "https://credencacademy.com/?",
      DEV: "http://localhost:3000/?"
    },
    COURSES:{
     SUB_CATEGORIES : [
       {
        id:1,
        title: "UI UX Design"
       },
       {
        id:2,
        title: "AI & Machine Learning"
       },
       {
        id:3,
        title: "Entrepreneurship"
       },
     ]
    },
    GOOGLE_CLIENT_ID: '164051831244-qe9r7cupd87rtg31quk7uf4dagtsmd7o.apps.googleusercontent.com',
    LINKEDIN_API: {
      clientId: '78exnrgmc9bd3d',
      redirectUrl: 'http://localhost:3000',
      authUrl: 'https://www.linkedin.com/oauth/v2/authorization?response_type=code',
      scope: 'r_liteprofile%20r_emailaddress',
      state: '123456'
    },
}


export default constant;