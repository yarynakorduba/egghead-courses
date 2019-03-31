const user = require("./user");
const vasyl = new user.User("Vasyl");
const petro = new user.User("Petro");

vasyl.hello(petro);
