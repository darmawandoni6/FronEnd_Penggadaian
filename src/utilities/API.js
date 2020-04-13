exports.FE = "http://localhost:3000";
// exports.FE = "https://penggadaian.netlify.com";
// exports.view = "http://localhost:5000";
// exports.API = "http://localhost:5000/api/v1";
exports.view = "https://penggadaian.herokuapp.com";
exports.API = "https://penggadaian.herokuapp.com/api/v1";
const token = window.localStorage.getItem("token");
exports.headerAutorization = { Authorization: `Bearer ${token}` };

//TEST
