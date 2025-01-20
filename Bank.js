// 🏦 Bank and Account System 
// Bank Class: Manages multiple accounts
class Bank {
    constructor() {
        this.accounts = []; // Stores all accounts in the bank
    }

    // Add methods here:
    createAccount(name, initialDeposit){
        const newAccount = new Account(name, initialDeposit);
        this.accounts.push(newAccount);
        return newAccount;
    }
}

// Account Class: Represents a single user's account
class Account {
    constructor(name, balance = 0) {
        this.name = name; // Account holder's name
        this.balance = balance; // Initial balance (default is 0)
        this.transactionHistory = []; // Keeps a record of all transactions
    }

    // Add methods here:
    deposit(amount){
        if(amount > 0) {
            this.balance += amount;
            this.transactionHistory.push({transactionType: 'Deposit', amount});
        } else{
            console.log("Check the deposit amount! It must be positive");
        }
    }
    // example data to be stored in transactionHistory { transactionType: 'Deposit', amount: 500 }

    withdraw(amount) {
        if (amount > 0 && this.balance >= amount) {
            this.balance -= amount;
            this.transactionHistory.push({transactionType: 'Withdrawal', amount});
        } else {
            console.log("You don't have enough money to do this transaction");
        }
    }
    // example data to be stored in transactionHistory { transactionType: 'Withdrawal', amount: 200 }

     transfer(amount, recipientAccount){
        if(amount > 0 && this.balance >= amount){
            this.transactionHistory.push({ transactionType: 'Transfer', amount, to: recipientAccount.name })
            this.balance -= amount;

            recipientAccount.transactionHistory.push({ transactionType: 'Received', amount, from: this.name })
            recipientAccount.balance += amount;
        } else {
            console.log("You don't have enough money to do this transaction");
        }

     }
    // example data to be stored in transactionHistory:
    // for account sending { transactionType: 'Transfer', amount: 300, to: recipientName }
    // for account recieving { transactionType: 'Received', amount: 300, from: senderName }
    
    checkBalance(){
        return this.balance;
    }
}

//<-------------------------------DO NOT WRITE BELOW THIS LINE------------------------------>

// Function to test bank operations
function testBankOperations() {
    const bank = new Bank();

    // Create new accounts
    const johnAccount = bank.createAccount('John Doe', 1000);
    const janeAccount = bank.createAccount('Jane Doe', 500);
    console.log('Accounts created:', johnAccount, janeAccount);

    // Perform some operations on John's account
    johnAccount.deposit(500);
    johnAccount.withdraw(200);

    // Perform a transfer from John to Jane
    johnAccount.transfer(300, janeAccount);

    // Check balances
    const johnFinalBalance = johnAccount.checkBalance();
    const janeFinalBalance = janeAccount.checkBalance();
    console.log('John\'s balance:', johnFinalBalance);
    console.log('Jane\'s balance:', janeFinalBalance);

    // Return balances for testing
    return { 
        johnFinalBalance, 
        janeFinalBalance, 
        johnTransactionHistory: johnAccount.transactionHistory, 
        janeTransactionHistory: janeAccount.transactionHistory 
    };
}

module.exports = testBankOperations;

//<-------------------------------DO NOT WRITE ABOVE THIS LINE------------------------------>


console.log(testBankOperations());
