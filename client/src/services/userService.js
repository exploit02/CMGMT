var axios = require('axios')
var ES6Promise = require('es6-promise')
const headers = {
  'Content-Type': 'application/json',
  'Authorization': localStorage.getItem("token")
};
ES6Promise.polyfill()
const ApiService = {
    get( apiurl) {
      return axios.get(apiurl)
      .then(response => {
          return response.data
        })
        .catch(response => {
            return response.data
        })
    },

    post( apiurl,bodyFormData) {
        return axios.post(apiurl,bodyFormData, {headers: headers})
        .then(response => {
            return response
          })
        .catch(err => {
          const res = {
              message : err.response.data.message,
              status : err.response.status
          }
          return res;
        
        })
    },

    patch( apiurl,bodyFormData) {
      return axios.patch(apiurl,bodyFormData)
      .then(response => {
          return response
        })
      .catch(err => console.log(err))
    }
    
}
  export default ApiService



export const UserService = {
  checkLogin() {
    return ApiService.get( 'http://localhost:3001/users/checklogin' )
  },

  login(userCredentials) {
    return ApiService.post( 'http://localhost:3001/users/login', userCredentials)
  },

  logout(token) {
      console.log(token)
        return ApiService.post( 'http://localhost:3001/users/logout', token)
  }
}