class User {
  uniqueKey;
  firstName;
  lastName;
  gender;
  mobileNumber;
  durationOfStay;
  checkInDate;
  checkOutDate;
  password;
  totalBill;

  constructor(...params) {
    this.uniqueKey = params[0];
    this.firstName = params[1];
    this.lastName = params[2];
    this.gender = params[3];
    this.mobileNumber = params[4];
    this.durationOfStay = params[5];
    this.checkInDate = params[6];
    this.checkOutDate = params[7];
    this.password = params[8];
    this.totalBill = params[9];
  }

  set fName(firstName) {
    let nameRegex = RegExp("^[A-Z]{1}[a-z]{2,}$");
    if (nameRegex.test(firstName)) {
      this.firstName = firstName;
    } else {
      throw console.error("Invalid entry!");
    }
  }

  get fName() {
    return this.firstName;
  }

  set lName(lastName) {
    let nameRegex = RegExp("^[A-Z]{1}[a-z]{2,}$");
    if (nameRegex.test(lastName)) {
      this.lastName = lastName;
    } else {
      throw console.error("Invalid entry!");
    }
  }

  get lName() {
    return this.lastName;
  }

  set customerGender(gender) {
    this.gender = gender;
  }

  get customerGender() {
    return this.gender;
  }

  set mNumber(mobileNumber) {
    let nameRegex = RegExp("^[7-9]{1}[0-9]{9}$");
    if (nameRegex.test(mobileNumber)) {
      this.mobileNumber = mobileNumber;
    } else {
      throw console.error("Invalid entry!");
    }
  }

  get mNumber() {
    return this.mobileNumber;
  }

  set duration(durationOfStay) {
    this.durationOfStay = durationOfStay;
  }

  get duration() {
    return this.durationOfStay;
  }

  set unique(uniqueKey) {
    this.uniqueKey = uniqueKey;
  }

  get unique() {
    return this.uniqueKey;
  }

  set checkIn(checkInDate) {
    this.checkInDate = checkInDate;
  }

  get checkIn() {
    return this.checkInDate;
  }

  set pass(password) {
    this.password = password;
  }

  get pass() {
    return this.password;
  }

  set checkOutDate(checkOutDate) {
    this.checkOutDate = checkOutDate;
  }

  get checkOutDate() {
    return this.checkOutDate;
  }

  set bill(totalBill) {
    this.totalBill = totalBill;
  }

  get bill() {
    return this.totalBill;
  }
}

module.exports = User;
