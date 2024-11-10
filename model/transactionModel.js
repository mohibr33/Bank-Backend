const connection = require("../config/db");

class Transaction {
    constructor(transactiontype, amount, source, status, reasoncode) {
        this.transactiontype = transactiontype;
        this.amount = amount;
        this.source = source;
        this.status = status;
        this.reasoncode = reasoncode;
    }

    check() {
        if (!this.transactiontype || !this.amount || !this.source || !this.status || !this.reasoncode) {
            throw new Error("Please fill all the fields");
        }
    }
}

const addTransaction = (transactionData, callback) => {
    const transaction = new Transaction(
        transactionData.transactiontype,
        transactionData.amount,
        transactionData.source,
        transactionData.status,
        transactionData.reasoncode
    );

    try {
        transaction.check();
    } catch (error) {
        return callback(error, null);
    }

    const query = `INSERT INTO transaction (transactiontype, amount, source, status, reasoncode) VALUES (?, ?, ?, ?, ?)`;
    connection.query(query, [
        transaction.transactiontype,
        transaction.amount,
        transaction.source,
        transaction.status,
        transaction.reasoncode
    ], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

const getTransaction = (transactionid, callback) => {
    const query = `SELECT * FROM transaction WHERE transactionid = ?`;
    connection.query(query, [transactionid], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

const getAllTransactions = (callback) => {
    const query = `SELECT * FROM transaction`;
    connection.query(query, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

const deleteTransaction = (transactionid, callback) => {
    const query = `DELETE FROM transaction WHERE transactionid = ?`;
    connection.query(query, [transactionid], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        if (result.affectedRows === 0) {
            return callback(new Error("Not Found"), null);
        }
        callback(null, result);
    });
}

module.exports = {
    addTransaction,
    getTransaction,
    getAllTransactions,
    deleteTransaction,
};
