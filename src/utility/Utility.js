const User = require("./User");
const JsonToXlsx = require("xlsx");
const Orders = require("./Orders");
const prompt = require("prompt-sync")();
const fs = require("fs");

class Utility {
    #loggedUser = '';

    /**
     * Take input from user and save to device
     */
    registerUser = () => {
        let user = new User();
        console.log("");
        user.fName = prompt("Enter first name : ");
        user.lName = prompt("Enter last name : ");
        user.gender = prompt("Enter gender : ");
        user.mNumber = prompt("Enter mobile number : ");
        user.durationOfStay = prompt("Enter duration of stay (in days) : ");
        user.uniqueKey = this.generateUniqueKey(user.fName, user.mNumber);
        user.checkIn = new Date();
        user.pass = prompt("Choose a password : ");
        this.writeJSON(user, "D:/HotelManagement/json/data.json");
        console.log();
        console.log(user.fName, user.lName, "registered successfully");
    };

    /**
     * Return unique key which is generated from first four characters of name and number
     * @param {string} name 
     * @param {number} number 
     * @returns uniqueKey
     */
    generateUniqueKey = (name, number) => {
        return name.substring(0, 4) + number.substring(0, 4);
    };

    /**
     * Writes json objects to file
     * @param {object} user 
     * @param {path} filepath 
     */
    writeJSON = (user, filepath) => {
        try {
            const docObj = JSON.parse(fs.readFileSync(filepath));
            docObj.push(user);
            fs.writeFileSync(filepath, JSON.stringify(docObj));
        } catch {
            let docArray = new Array();
            docArray.push(user);
            fs.writeFileSync(filepath, JSON.stringify(docArray));
        }
    }

    /**
     * After checking name and password in filepath, allows user to access menu
     */
    login = () => {
        let username = prompt("Enter your username : ");
        let password = prompt("Enter password : ");
        const doc = fs.readFileSync("D:/HotelManagement/json/data.json");
        const docObj = JSON.parse(doc);
        for (let user in docObj) {
            if ((docObj[user].firstName === username && docObj[user].password) === password) {
                this.#loggedUser = docObj[user];
                this.orderMenu();
            }
        }
        if (this.#loggedUser === '')
            console.log("Invalid input");
    }

    /**
     * Call functions based on user input
     */
    orderMenu = () => {
        let option = 0;
        do {
            console.log("\nPress 1 - Order food");
            console.log("Press 2 - Order services");
            console.log("Press 3 - Check out\n");
            option = parseInt(prompt("Enter your choice : "));

            switch (option) {
                case 1:
                    this.orderFood();
                    break;
                case 2:
                    this.orderServices();
                    break;
                case 3:
                    this.checkOut();
                    option = 4;
                    break;
                default:
                    console.log();
                    break;
            }
        } while (option != 4);
    };

    /**
     * Add order object to orders.json based on user input
     */
    orderFood = () => {
        let option = 0;
        do {
            console.log("\nPress 1 - Order Tea (50rs)");
            console.log("Press 2 - Order Breakfast (100rs)");
            console.log("Press 3 - Order Lunch (250rs)");
            console.log("Press 4 - Order Dinner (350rs)");
            console.log("Press 5 - Back\n");
            option = parseInt(prompt("Enter your choice : "));

            switch (option) {
                case 1:
                    this.writeJSON(new Orders(this.#loggedUser.uniqueKey, "Tea", 1, 50),
                        "D:/HotelManagement/json/orders.json");
                    console.log("\nOrder placed successfully");
                    break;
                case 2:
                    this.writeJSON(new Orders(this.#loggedUser.uniqueKey, "Breakfast", 1, 100),
                        "D:/HotelManagement/json/orders.json");
                    console.log("\nOrder placed successfully");
                    break;
                case 3:
                    this.writeJSON(new Orders(this.#loggedUser.uniqueKey, "Lunch", 1, 250),
                        "D:/HotelManagement/json/orders.json");
                    console.log("\nOrder placed successfully");
                    break;
                case 4:
                    this.writeJSON(new Orders(this.#loggedUser.uniqueKey, "Dinner", 1, 350),
                        "D:/HotelManagement/json/orders.json");
                    console.log("\nOrder placed successfully");
                    break;
                default:
                    console.log();
                    break;
            }
        } while (option != 5);
    };

    /**
     * Add order object to orders.json based on user input
     */
    orderServices = () => {
        let option = 0;
        do {
            console.log("\nPress 1 - Laundry Service (200rs)");
            console.log("Press 2 - Guided Tour (500rs)");
            console.log("Press 3 - Rent car (3500rs)");
            console.log("Press 4 - Back\n");
            option = parseInt(prompt("Enter your choice : "));

            switch (option) {
                case 1:
                    this.writeJSON(new Orders(this.#loggedUser.uniqueKey, "Laundry", 1, 200),
                        "D:/HotelManagement/json/orders.json");
                    console.log("\nOrder placed successfully");
                    break;
                case 2:
                    this.writeJSON(new Orders(this.#loggedUser.uniqueKey, "Tour", 1, 500),
                        "D:/HotelManagement/json/orders.json");
                    console.log("\nOrder placed successfully");
                    break;
                case 3:
                    this.writeJSON(new Orders(this.#loggedUser.uniqueKey, "Car", 1, 3500),
                        "D:/HotelManagement/json/orders.json");
                    console.log("\nOrder placed successfully");
                    break;
                default:
                    console.log();
                    break;
            }
        } while (option != 4);
    };

    /**
     * Calculates bill, also charges 500rs if user checkouts before 12 hours
     * @param {date} checkInDate 
     * @param {date} checkOutDate 
     * @returns bill amount
     */
    createBill = (uniqueKey, checkInDate, checkOutDate) => {
        const docObj = this.getJsonObj("D:/HotelManagement/json/orders.json");
        const docObj2 = this.getJsonObj("D:/HotelManagement/json/data.json");
        let sum = 0; let stay = 0;
        let diff = checkOutDate.getHours() - checkInDate.getHours();
        docObj.forEach(element => {
            if (element.uniqueKey === uniqueKey) {
                sum += element.price;
            }
        });
        docObj2.forEach(element => {
            if (element.uniqueKey === uniqueKey) {
                stay = element.durationOfStay;
            }
        });
        if (diff < 12) {
            return sum += 500;
        } else {
            return sum += stay * 1000;
        }
    }

    /**
     * Updates user information and stores it in json file
     * @param {object} obj 
     * @param {date} checkOutDate 
     * @param {number} sum
     */
    updateObj = (obj, checkOutDate, sum) => {
        const docObj = this.getJsonObj("D:/HotelManagement/json/data.json");
        for (let user in docObj) {
            if (docObj[user].uniqueKey === obj.uniqueKey) {
                docObj[user].firstName = obj.firstName;
                docObj[user].lastName = obj.lastName;
                docObj[user].gender = obj.gender;
                docObj[user].mobileNumber = obj.mobileNumber;
                docObj[user].durationOfStay = obj.durationOfStay;
                docObj[user].checkInDate = obj.checkInDate;
                docObj[user].checkOutDate = checkOutDate;
                docObj[user].password = obj.password;
                docObj[user].totalBill = sum;
                this.writeJSON(docObj[user], "D:/HotelManagement/json/updatedUserInfo.json");
            }
        }
    }

    /**
     * Prints bill and makes user object null
     */
    checkOut = () => {
        let uniqueKey = this.#loggedUser.uniqueKey;
        let checkOutDate = new Date();
        let checkInDate = new Date(this.#loggedUser.checkInDate);
        let sum = this.createBill(uniqueKey, checkInDate, checkOutDate);
        sum += sum * 0.18;
        console.log("\nThank you for using our service.");
        console.log(this.#loggedUser.firstName, this.#loggedUser.lastName);
        console.log("Amount payable is", 'Rs.' + sum);
        this.updateObj(this.#loggedUser, checkOutDate, sum);
        this.#loggedUser = null;
    }

    /**
     * After checking credentials, grants user access to admin menu
     * @param {string} username 
     * @param {string} password 
     */
    adminPage = () => {
        let username = prompt("Enter your username : ");
        let password = prompt("Enter key : ");
        let flag = true;
        if (username === "Admin" && password === "admin123") {
            console.log("\nWelcome Admin");
            do {
                console.log("\nPress 1 - Create report");
                console.log("Press 2 - Log out\n");
                let option = parseInt(prompt("Enter your choice : "));
                if (option === 1) {
                    this.jsonToXlsx("D:/HotelManagement/json/updatedUserInfo.json", "./reports/CustomerData.xlsx", 'CustomerData');
                    this.jsonToXlsx("D:/HotelManagement/json/orders.json", "./reports/OrderHistory.xlsx", 'OrderHistory');
                } else if (option == 2) flag = false;
            } while (flag)
        } else console.log("Invalid entry");
    }

    /**
     * Returns user object for unit tests
     * @param {string} name 
     * @param {string} password 
     * @param {path} filepath 
     * @returns user object
     */
    getUserObj = (name, password, filepath) => {
        const doc = fs.readFileSync(filepath);
        const docObj = JSON.parse(doc);
        for (let user in docObj) {
            if ((docObj[user].firstName === name && docObj[user].password) === password) {
                return docObj[user];
            }
        }
    }

    /**
     * 
     * @param {path} inputFile 
     * @returns json object
     */
    getJsonObj = (inputFile) => {
        let stringJson = fs.readFileSync(inputFile);
        let jsonObj = JSON.parse(stringJson);
        return jsonObj;
    };

    /**
     * Writes json file to excel
     * @param {path} jsonFile 
     * @param {path} xlsxFile 
     * @param {string} sheetName 
     */
    jsonToXlsx = (jsonFile, xlsxFile, sheetName) => {
        let jsonObj = this.getJsonObj(jsonFile);
        let workBook = JsonToXlsx.utils.book_new();
        let workSheet = JsonToXlsx.utils.json_to_sheet(jsonObj);
        JsonToXlsx.utils.book_append_sheet(workBook, workSheet, sheetName);
        JsonToXlsx.writeFile(workBook, xlsxFile);
    };
}

module.exports = Utility;