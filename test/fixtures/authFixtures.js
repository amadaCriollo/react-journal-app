export const initialState = {
    status:'checking',
    uid:null,
    email:null,
    displayName: null,
    photoURL: null,
    errorMessage: null
  }

  export const authenticatedState = {
    status:'authenticated',
    uid:'1234eeee',
    email:'demo@gmail.com',
    displayName: 'Demo User',
    photoURL: 'http://demo.jpg',
    errorMessage: null
  }

  export const notAuthenticatedState = {
    status:'not-authenticated',
    uid:null,
    email:null,
    displayName: null,
    photoURL: null,
    errorMessage: null
  }

  export const demoUser = {
    uid: '1234567',
    email: 'amadeus@google.com',
    displayName: 'Name user',
    photoURL: 'https://oso.jpg',
    
  }