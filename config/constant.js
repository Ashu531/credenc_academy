const constant= {
     ENV: 1, // DEV:1, STAGE:2, PROD:3 
    API_URL:{
      PROD: "https://edtechbackend.credenc.com",
      DEV: "https://edtech.credenc.com"
    },
    BASE_URL:{
      PROD: "https://dxnku1c3h7tf2.cloudfront.net/?",
      DEV: "https://dxnku1c3h7tf2.cloudfront.net/?"
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
    GOOGLE_CLIENT_ID: '285634072201-v2q013h1k89t67i0auhjmj4lr3rn0jur.apps.googleusercontent.com',
    LINKEDIN_API: {
      clientId: '78exnrgmc9bd3d',
      redirectUrl: 'http://localhost:3000',
      authUrl: 'https://www.linkedin.com/oauth/v2/authorization?response_type=code',
      scope: 'r_liteprofile%20r_emailaddress',
      state: '123456'
    },
}


export default constant;