const connection = require("../config/db");

class Payment {
    constructor(beneficiary, beneficiaryaccountnumber, amount, status, reference, reasoncode) {
        this.beneficiary = beneficiary;
        this.beneficiaryaccountnumber = beneficiaryaccountnumber;
        this.amount = amount;
        this.status = status;
        this.reference = reference;
        this.reasoncode = reasoncode;
    }

    check() {
        if (!this.beneficiary || !this.amount || !this.beneficiaryaccountnumber || !this.reasoncode || !this.reference || !this.status) {
            throw new Error("Please fill all the fields");
        }
    }
}

const addPayment = (paymentData, callback) => {
    const payment = new Payment(
        paymentData.beneficiary,
        paymentData.beneficiaryaccountnumber,
        paymentData.amount,
        paymentData.status,
        paymentData.reference,
        paymentData.reasoncode
    );

    try {
        payment.check();
    } catch (error) {
        return callback(error, null);
    }

    const query = `INSERT INTO paymenthistory(beneficiary, beneficiaryaccountnumber, amount, status, reference, reasoncode) VALUES (?, ?, ?, ?, ?, ?)`;
    connection.query(
        query,
        [payment.beneficiary, payment.beneficiaryaccountnumber, payment.amount, payment.status, payment.reference, payment.reasoncode],
        (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        }
    );
};

const getAllPayments = (callback) => {
    const query = `SELECT * FROM paymenthistory`;

    connection.query(query, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

const getPaymentByRecord = (recordnumber, callback) => {
    const query = `SELECT * FROM paymenthistory WHERE recordnumber = ?`;
    
    connection.query(query, [recordnumber], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        if (result.length === 0) {
            return callback(new Error("Payment not found"), null);
        }
        callback(null, result);
    });
};

const deletePayment = (recordnumber, callback) => {
    const query = `DELETE FROM paymenthistory WHERE recordnumber = ?`;
    connection.query(query, [recordnumber], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        if (result.affectedRows === 0) {
            return callback(new Error("Not Found"), null);
        }
        return callback(null, result);
    });
};

module.exports = {
    addPayment,
    getAllPayments,
    getPaymentByRecord,
    deletePayment
};
