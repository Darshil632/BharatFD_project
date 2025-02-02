const express = require("express");
const {
  createFAQ,
  getFAQs,
  updateFAQ,
  deleteFAQ,
} = require("../controllers/faqController");

const router = express.Router();

router.post("/", createFAQ);
router.get("/", getFAQs);
router.put("/:id", updateFAQ); // Route for updating FAQ
router.delete("/api/faqs/:id", deleteFAQ); // Route for deleting FAQ

module.exports = router;
