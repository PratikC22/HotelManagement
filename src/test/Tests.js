const assert = require('chai').assert;
const Utility = require('../utility/Utility');
const utility = new Utility();

describe('App', function () {
    describe('generateKey()', function () {
        it('generateKey should return valid key', function () {
            let result = utility.generateUniqueKey('Pratik', '9657586962');
            assert.equal(result, 'Prat9657');
        });

        it('generateKey should return a string', function () {
            let result = utility.generateUniqueKey('Pratik', '9657586962');
            assert.typeOf(result, 'string');
        });
    });

    describe('getUserObj', function () {
        it('getUserObj should return correct user object', function () {
            let result = utility.getUserObj('Pratik', 'pratik123', "D:/HotelManagement/json/data.json");
            assert.typeOf(result, 'object');
        });

        it('getUserObj should contain checkInDate', function () {
            let result = utility.getUserObj('Pratik', 'pratik123', "D:/HotelManagement/json/data.json");
            assert.property(result, 'checkInDate');
        });
    });

    describe('createBill()', function() {
        it('before 12 hours checkout, user should be billed 500 excluding purchases', function () {
            let checkInDate = new Date('04/10/2021 06:00:00');
            let checkOutDate = new Date('04/10/2021 12:00:00');
            let uniqueKey = 'Prat9657'
            let result = utility.createBill(uniqueKey, checkInDate, checkOutDate);
            assert.equal(result, '650');
        });

        it('for scheduled checkout, user should be billed 1000 per day excluding purchases', function () {
            let checkInDate = new Date('04/10/2021 06:00:00');
            let checkOutDate = new Date('04/10/2021 18:00:00');
            let uniqueKey = 'Prat9657'
            let result = utility.createBill(uniqueKey, checkInDate, checkOutDate);
            assert.equal(result, '2150');
        });
    });
});

