const sanitizeInput = require('../middlewares/sanitizeInput');
const validateAskOrder = require('../models/ask');

const  
     express = require('express') ,
     client = require("../database/db"),
     router =express.Router();


     router.post ("/ask",sanitizeInput,async(req,res)=> {
        try {
            const { error } = validateAskOrder(req.body);
            if (error) return res.status(404).json({ msg: error.details[0].message });

            await client.query("INSERT INTO askorders (name, phone) VALUES ($1, $2 )", [req.body.name, req.body.phone]);
            res.json({ msg: "ok" });

        } catch (error) {
            return  res.status(404).json({msg:error.message})
        }
     })

     router.post("/get", async (req, res) => {
        try {
          let sql = `SELECT * FROM askorders ORDER BY marked ASC; `;
          let result = await client.query(sql);
          res.json(result.rows);
        } catch (error) {
          return res.status(404).json({ msg: error.message });
        }
      });
      router.put("/mark/:id", async (req, res) => {
        try {
          console.log(req.params.id)
          await client.query("UPDATE askorders SET marked = $1 WHERE id = $2 ;", [req.body.marked, req.params.id]);
          res.json({ msg: "ok" });
        } catch (error) {
          return res.status(404).json({ msg: error.message });
        }
      });
      router.delete("/:id", async (req, res) => {
        try {
          await client.query("DELETE FROM askorders WHERE id = $1;", [req.params.id]);
          res.json({ msg: "ok" });
        } catch (error) {
          return res.status(404).json({ msg: error.message });
        }
      });

 module.exports = router ;