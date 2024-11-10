const paymentModel=require("../model/paymentModel")

const addPayment=(req,res)=>{
    const {beneficiary,beneficiaryaccountnumber,amount,status,reference,reasoncode}=req.body;

    const paymentData={
        beneficiary:beneficiary,
        beneficiaryaccountnumber:beneficiaryaccountnumber,	
        amount:amount,
        status:status,
        reference:reference,
        reasoncode:reasoncode,	

    };
paymentModel.addPayment(paymentData,(err,result)=>{
    if(err){
        return res.status(500).json({error:err.message});
    }
    else {
        return res.status(201).json({
          message: "Payment has been added successfully",
        });
      }
    });
}

const getAllPayments = (req, res) => {
    paymentModel.getAllPayments((err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch payments", message: err.message });
        }
        return res.status(200).json(result);
    });
};

const getPaymentByRecord = (req, res) => {
    const { recordnumber } = req.params;

    paymentModel.getPaymentByRecord(recordnumber, (err, result) => {
        if (err) {
            return res.status(404).json({ error: "Payment not found", message: err.message });
        }
        return res.status(200).json(result);
    });
};

const deletePayment=(req,res)=>{
    const {recordnumber}=req.params;
    paymentModel.deletePayment(recordnumber,(err,result)=>{
        if (err) {
            return res.status(404).json({ message: "Payment not found", error: err.message });
        }
        return res.status(200).json({ message: "Payment record deleted successfully", result });
    })
}

module.exports={
    addPayment,
    getAllPayments,
    getPaymentByRecord,
    deletePayment,    
}