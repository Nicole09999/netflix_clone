// import axios from 'axios';
import axiosClient from "../axios/axios.client.js";

const sentimentAnalysisApi = {
  analyzeSentiment: async (text) => {
    const apiKey = '2400d0247a83c877f91226e0547d381a461dec5bdfea08be08afcbdb';
    const apiUrl = 'http://api.textrazor.com'; // Replace with the URL of the sentiment analysis API

    try {
      const response = await axios.post(apiUrl, { text }, { headers: { 'X-API-Key': apiKey } });
      return response.data; // Handle the response data as needed
    } catch (error) {
      console.error('Error performing sentiment analysis:', error);
      throw error; // Rethrow the error or handle it appropriately
    }
  }
};

export default sentimentAnalysisApi;
