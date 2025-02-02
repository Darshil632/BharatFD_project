import React, { useState, useEffect } from "react";
import {
  getFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} from "./services/faqService";
import "./App.css";

const App = () => {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      const data = await getFAQs("en");
      console.log(data); // Debug: Check if each FAQ includes the _id field
      setFaqs(data);
    };
    fetchFAQs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateFAQ(editing._id, question, answer);
      setFaqs(
        faqs.map((faq) =>
          faq._id === editing._id ? { ...faq, question, answer } : faq
        )
      );
    } else {
      const newFaq = await createFAQ(question, answer);
      setFaqs([...faqs, newFaq]);
    }
    setQuestion("");
    setAnswer("");
    setEditing(null);
  };

  const handleEdit = (faq) => {
    setEditing(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
  };

  const handleDelete = async (id) => {
    console.log("Deleting FAQ with ID:", id); // Debugging: Check the id
    try {
      await deleteFAQ(id);
      setFaqs(faqs.filter((faq) => faq._id !== id));
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  };
  return (
    <div className="container">
      <h1>FAQs</h1>
      <ul>
        {faqs.map((faq) => (
          <li key={faq._id}>
            {" "}
            {/* Ensure the key is _id */}
            <h2>
              {faq.question}
              {"?"}
            </h2>
            <p>
              {"👉  "}
              {faq.answer}
            </p>
            <button onClick={() => handleEdit(faq)}>Edit</button>
            <button onClick={() => handleDelete(faq._id)}>Delete</button>{" "}
            {/* Pass the _id */}
          </li>
        ))}
      </ul>
      <h2>{editing ? "Edit FAQ" : "Create a new FAQ"}</h2>
      <form onSubmit={handleSubmit} className="new-faq">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Question"
          required
        />
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Answer"
          required
        />
        <button type="submit">{editing ? "Update FAQ" : "Add FAQ"}</button>
      </form>
    </div>
  );
};

export default App;
