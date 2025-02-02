// src/services/faqService.js

import axios from "axios";

const API_URL = "http://localhost:3000/api/faqs";

export const getFAQs = async (lang = "en") => {
  const response = await axios.get(`${API_URL}?lang=${lang}`);
  return response.data;
};

export const createFAQ = async (question, answer) => {
  const response = await axios.post(API_URL, { question, answer });
  return response.data;
};

export const updateFAQ = async (id, question, answer) => {
  const response = await axios.put(`${API_URL}/${id}`, { question, answer });
  return response.data;
};

export const deleteFAQ = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/faqs/${id}`); // Ensure the URL is correct
    return response.data;
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    throw error;
  }
};
