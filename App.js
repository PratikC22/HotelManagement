const Utility = require("./src/utility/Utility.js");
const prompt = require("prompt-sync")();

const utility = new Utility();

const startMenu = () => {
  console.log("\nWelcome to the Hotel management program");
  let username;
  let password;
  let flag = true;
  do {
    console.log("\nPress 1 - User Registration");
    console.log("Press 2 - Check in");
    console.log("Press 3 - Admin login");
    console.log("Press 4 - Exit\n");
    let option = parseInt(prompt("Enter your choice : "));
    switch (option) {
      case 1:
        utility.registerUser();
        break;
      case 2:
        console.log();
        username = prompt("Enter your username : ");
        password = prompt("Enter password : ");
        utility.login(username, password, "D:/HotelManagement/json/data.json");
        break;
      case 3:
        console.log();
        username = prompt("Enter your username : ");
        password = prompt("Enter key : ");
        utility.adminPage(username, password);
        break;
      case 4:
        flag = false;
        break;
      default:
        console.log("Invalid input!");
        break;
    }
  } while (flag);
}

startMenu();
