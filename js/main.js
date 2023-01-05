//task 1 :
const user = {
    name: 'Volodymyr',
    surName: 'Zelenskiy',
    quotes: {
        firstQuote: 'Про російську армію: "Не курите там, где попало, курите там, где ещё не попало".',
    },
    disadvantages: {}
};

function isEmpty(object) {
    let message;

    if(Object.keys(object).length > 1) {
        message = 'object is full of properties';
        return message;
    } else if(Object.keys(object).length == 1) { 
        message = 'object is not empty';
        return message;
    } else {
        message = 'object is empty';
        return message;
    }
}

console.log(isEmpty(user));
console.log(isEmpty(user.quotes));
console.log(isEmpty(user.disadvantages));

// *************************************************************************************************************************************************

//task 2 :
"use strict";
let employee = {};

Object.defineProperty(employee, "age", {value: 24, writable: false, enumerable: true, configurable: true});
Object.defineProperty(employee, "education", {value: 'low', writable: false, enumerable: true, configurable: true});
Object.defineProperty(employee, "experience", {value: 0, writable: false, enumerable: true, configurable: true});
Object.defineProperty(employee, "lieToEmployer", {
    get: function () {   
        return this;   
    },
    set: function (value) {
        let split = value.split(', ');
        let count = -1;
        const errorMsg = 'You can not change the value';
        const descript = Object.getOwnPropertyDescriptors(this);

        for(let key in this) {
            count++;
            if(descript[key].writable === false) {
                console.assert(descript[key].writable === true, { key, errorMsg });
            } else {
                this[key] = split[count];        
                console.log('You changed the value.');
            }
        }
    }
});
Object.defineProperty(employee, "toLie", {
    get: function () {
        for(let key in this) {
            Object.defineProperty(this, key, {
                writable: true
            });
        }
        return this;
    },
});

function hireNewEmployee(object) {
    object.lieToEmployer = '30, higher, 2';
    const reason = verification(object);
    let answer = '';
    
    function verification(object) {
        let causes = [];

        if(object.age < 25) {
            causes += 'Your age is under 25 years old. ';
        }
        if(object.education !== 'higher') {
            causes += 'Your education is not higher. ';
        }
        if(object.experience < 1) {
            causes += "You don't have enough experience.";
        }

        return causes;
    }

    if(reason.length == 0) {
        answer = "You're Hired! Congrats!";
    } else {
        answer = `Not hired: sorry we cannot hire you. Here is why: ${reason}`;
    }

    return answer;
}

console.log(hireNewEmployee(employee)); 
console.log(hireNewEmployee(employee.toLie)); 