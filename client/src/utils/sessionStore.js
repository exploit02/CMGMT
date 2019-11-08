JSON.parse(localStorage.getItem('session')) ? global.session = JSON.parse(localStorage.getItem('session')) : global.session = { isLoggedIn:false}
export default global.session