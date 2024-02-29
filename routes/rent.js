const sanitizeInput = require('../middlewares/sanitizeInput');
const validateSellOrder = require('../models/sell');

const  
     express = require('express') ,
     client = require("../database/db"),
     router =express.Router();


     router.post ("/owner",sanitizeInput,async(req,res)=> {
        try {
            const { error } = validateSellOrder(req.body);
            if (error) return res.status(404).json({ msg: error.details[0].message });

            await client.query("INSERT INTO rentorderso (name, phone,house_details,address_details,expected_price) VALUES ($1, $2 ,$3 ,$4 ,$5)", [req.body.name, req.body.phone,req.body.house_details,req.body.address_details,req.body.expected_price]);
            res.json({ msg: "ok" });

        } catch (error) {
            return  res.status(404).json({msg:error.message})
        }
     })

     router.post ("/renter",sanitizeInput,async(req,res)=> {
        try {
            const { error } = validateSellOrder(req.body);
            if (error) return res.status(404).json({ msg: error.details[0].message });

            await client.query("INSERT INTO rentordersr (name, phone,house_details,address_details,expected_price) VALUES ($1, $2 ,$3 ,$4 ,$5)", [req.body.name, req.body.phone,req.body.house_details,req.body.address_details,req.body.expected_price]);
            res.json({ msg: "ok" });

        } catch (error) {
            return  res.status(404).json({msg:error.message})
        }
     })








     router.post("/owner/get", async (req, res) => {
        try {
          let conditions = [];
          
          if (req.body.address) {
            conditions.push(`address_details LIKE '%${req.body.address}%'`);
          }
      
          if (req.body.startPrice && req.body.endPrice) {
            conditions.push(`expected_price BETWEEN ${req.body.startPrice} AND ${req.body.endPrice} `);
          }
      
          let conditionStr = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
          let sql = `SELECT * FROM rentorderso ${conditionStr} ORDER BY marked ASC;`;
          let result = await client.query(sql);
      
          res.json(result.rows);
        } catch (error) {
          return res.status(404).json({ msg: error.message });
        }
      });

      

     router.post("/renter/get", async (req, res) => {
        try {
          let conditions = [];
          
          if (req.body.address) {
            conditions.push(`address_details LIKE '%${req.body.address}%'`);
          }
      
          if (req.body.startPrice && req.body.endPrice) {
            conditions.push(`expected_price BETWEEN ${req.body.startPrice} AND ${req.body.endPrice} `);
          }
      
          let conditionStr = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
          let sql = `SELECT * FROM rentordersr ${conditionStr} ORDER BY marked ASC;`;
          let result = await client.query(sql);
      
          res.json(result.rows);
        } catch (error) {
          return res.status(404).json({ msg: error.message });
        }
      });


      router.put("/owner/mark/:id", async (req, res) => {
        try {
          console.log(req.params.id)
          await client.query("UPDATE rentorderso SET marked = $1 WHERE id = $2;", [req.body.marked, req.params.id]);
          res.json({ msg: "ok" });
        } catch (error) {
          return res.status(404).json({ msg: error.message });
        }
      });


      router.put("/renter/mark/:id", async (req, res) => {
        try {
          console.log(req.params.id)
          await client.query("UPDATE rentordersr SET marked = $1 WHERE id = $2;", [req.body.marked, req.params.id]);
          res.json({ msg: "ok" });
        } catch (error) {
          return res.status(404).json({ msg: error.message });
        }
      });

      router.delete("owner/:id", async (req, res) => {
        try {
          await client.query("DELETE FROM buyorders WHERE id = $1;", [req.params.id]);
          res.json({ msg: "ok" });
        } catch (error) {
          return res.status(404).json({ msg: error.message });
        }
      });

      router.delete("renter/:id", async (req, res) => {
        try {
          await client.query("DELETE FROM buyorders WHERE id = $1;", [req.params.id]);
          res.json({ msg: "ok" });
        } catch (error) {
          return res.status(404).json({ msg: error.message });
        }
      });

 module.exports = router ;