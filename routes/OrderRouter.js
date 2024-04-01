const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    await data.splice(0,0,{Order_date:req.body.order_date})
    try {
        let emailID = await Order.findOne({ 'email': req.body.email });

        if (emailID === null) {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
            res.json({ success: true });
        } else {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } },
                { upsert: true }
            );
            res.json({ success: true });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});
router.post("/MyOrder", async (req, res) => {
    try {
      let myOrder = await Order.findOne({ email: req.body.email });
      res.json({ orderData: myOrder });
    } catch (error) {
      res.send("server error: ", error.message);
    }
  });
module.exports = router;

