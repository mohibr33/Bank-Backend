const transactionModel = require("../model/transactionModel");

const addTransaction = (req, res) => {
    const { transactionid, transactiontype, amount, source, status, reasoncode } = req.body;

    const transactionData = {
        transactionid: transactionid,
        transactiontype: transactiontype,
        amount: amount,
        source: source,
        status: status,
        reasoncode: reasoncode,
    };

    transactionModel.addTransaction(transactionData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            return res.status(201).json({
                message: "Transaction has been added successfully",
            });
        }
    });
}

const getTransaction = (req, res) => {
    const { transactionid } = req.params;
    transactionModel.getTransaction(transactionid, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Failed to fetch transaction", error: err.message });
        }
        return res.status(200).json(result);
    });
}

const getAllTransactions = (req, res) => {
    transactionModel.getAllTransactions((err, result) => {
        if (err) {
            return res.status(500).json({ message: "Failed to fetch transactions", error: err.message });
        }
        return res.status(200).json(result);
    });
}

const deleteTransaction = (req, res) => {
    const { transactionid } = req.params;
    transactionModel.deleteTransaction(transactionid, (err, result) => {
        if (err) {
            return res.status(404).json({ message: "Transaction not found", error: err.message });
        }
        return res.status(200).json({ message: "Transaction record deleted successfully", result });
    });
}

module.exports = {
    addTransaction,
    getTransaction,
    getAllTransactions,
    deleteTransaction,
};
