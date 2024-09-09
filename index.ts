#! /usr/bin/env node

import inquirer from "inquirer";

// Bank Account interface

interface BankAccount {
    accountNumber:number;
    balance:number;
    withdraw(amount:number):void
    deposit(amount:number):void
    checkBalance():void
}

// Bank Account Class

class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number){
      this.accountNumber = accountNumber;
      this.balance = balance
    }

// Debit Money
    withdraw(amount: number): void {
    if (this.balance >= amount) {
        this.balance -= amount;
        console.log(`Withdrawal of $${amount}, Successful!`);
        console.log(`Remaining Balance is $${this.balance}.`)
    }else{
        console.log("Insufficient Balance!");
    }
}

// Credit Money
    deposit(amount: number): void {  
        this.balance += amount;
        console.log(`Deposit of $${amount}, Successful!`);
        console.log(`Now Your Balance is $${this.balance}.`)
    }

//  Check Balance
    checkBalance(): void {
       console.log(`Current Balance is $${this.balance}.`);
    }
}
// Costumer Class

class Customer {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor( firstName: string,lastName: string,gender: string,age: number,mobileNumber: number,account: BankAccount){
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}

//  Create bank accounts

const accounts : BankAccount[] = [
    new BankAccount(1001,1000),
    new BankAccount(1002,2000),
    new BankAccount(1003,3000),
];

// Create Customers

const customers: Customer[] = [
    new Customer("Ubaid","Raza", "Male", 17 , 3126547845 , accounts[0]),
    new Customer("Canon","Yousuf", "Male", 19 , 3434567847 , accounts[1]),
    new Customer("Mirza","Maaz", "Male", 21 , 3726547342 , accounts[2]),
] 

// Function to interact with bank account

async function service(){
    do {
        const accountNumberInput = await inquirer.prompt([{
           name:"accountNumber",
           type:"number",
           message:"Enter Your Account Number:"
        }])

        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if (customer) {
            console.log(`\tWelcome ${customer.firstName} ${customer.lastName}!\t\n`);
            const ans = await inquirer.prompt([{
                name:"select",
                type:"list",
                message:"Select one Option!",
                choices:["Deosit","Withdraw","Check Balance","Exit"]
            }]);

            switch (ans.select) {
                case "Deosit":
                    const deositAmount =  await inquirer.prompt([{
                        name:"amount",
                        type:"number",
                        message:"Enter the Amount to Deposit:"
                    }]);

                    customer.account.deposit(deositAmount.amount);

                    break;
                    case "Withdraw":
                    const withdrawAmount =  await inquirer.prompt([{
                        name:"amount",
                        type:"number",
                        message:"Enter the Amount to Withdraw:"
                    }]);

                    customer.account.withdraw(withdrawAmount.amount);
                    
                    break;
                    case "Check Balance":
                    customer.account.checkBalance();
                    break;

                    case "Exit":
                    console.log("\t.. Exiting Bank Program ..\t");
                    console.log("\n Thank you for using our Bank Services!\n");
                    return ;
            }
        }else{
            console.log("Invalid Account Number, Please Try Again.");
            
        }
    
    } while (true);
}

service();