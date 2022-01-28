const express = require("express");
const { DateTime } = require("luxon");
const router = express.Router();

router.get("/", (req, res) => {
   const datetime = DateTime.fromJSDate(new Date()).toUTC();
   res.json({
      unix: datetime.toMillis(),
      utc: datetime.toHTTP()
   });
});

router.get("/:date", (req, res) => {
   const isInt = /^\d+$/.test(req.params.date);

   const datetime = isInt
      ? DateTime.fromMillis(+req.params.date).toUTC()
      : DateTime.fromJSDate(new Date(req.params.date)).toUTC();

   if (datetime.invalid) {
      res.json({ error: "Invalid Date" });
   } else {
      res.json({ unix: datetime.toMillis(), utc: datetime.toHTTP() });
   }
});

module.exports = router;
