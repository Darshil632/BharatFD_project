const FAQ = require("../models/faqModel");
const client = require("../config/redis");
const translate = require("google-translate-api-x");
const translateText = async (text, lang) => {
  const result = await translate(text, { to: lang });
  return result.text;
};
const getTranslatedFAQ = async (faq, lang) => {
  const cacheKey = `faq_${faq._id}_${lang}`;
  const cachedData = await client.get(cacheKey);
  if (cachedData) return JSON.parse(cachedData);
  const translated = {
    question: faq.translations[lang]?.question || faq.question,
    answer: faq.translations[lang]?.answer || faq.answer,
  };
  await client.setEx(cacheKey, 3600, JSON.stringify(translated));
};
exports.createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const translated_hi = {
      question: await translateText(question, "hi"),
      answer: await translateText(answer, "hi"),
    };
    const translated_bn = {
      question: await translateText(question, "bn"),
      answer: await translateText(answer, "bn"),
    };
    const faq = new FAQ({
      question,
      answer,
      translations: { hi: translated_hi, bn: translated_bn },
    });
    await faq.save();
    res.status(201).json({ message: "FAQ Created", faq });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getFAQs = async (req, res) => {
  try {
    const lang = req.query.lang || "en";
    const faqs = await FAQ.find();
    const translatedFAQs = await Promise.all(
      faqs.map((faq) => getTranslatedFAQ(faq, lang))
    );
    res.json(translatedFAQs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;

    const faq = await FAQ.findByIdAndUpdate(
      id,
      { question, answer },
      { new: true }
    );
    console.log("Updating FAQ with ID:", id);
    console.log("FAQ found:", faq);
    if (!faq) return res.status(404).json({ message: "FAQ not found" });

    const translated_hi = {
      question: await translateText(question, "hi"),
      answer: await translateText(answer, "hi"),
    };

    const translated_bn = {
      question: await translateText(question, "bn"),
      answer: await translateText(answer, "bn"),
    };

    faq.translations = { hi: translated_hi, bn: translated_bn };
    await faq.save();

    const cacheKey = `faq_${faq._id}_*`; // Clear all language caches for the updated FAQ
    await client.del(cacheKey);

    res.json({ message: "FAQ Updated", faq });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const faq = await FAQ.findByIdAndDelete(id);

    if (!faq) return res.status(404).json({ message: "FAQ not found" });
    console.log("Deleting FAQ with ID:", id);
    console.log("FAQ found:", faq);
    const cacheKey = `faq_${faq._id}_*`; // Clear all language caches for the deleted FAQ
    await client.del(cacheKey);

    res.json({ message: "FAQ Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
