import { NEWS_API_KEY } from "./config";

export const getSportsArticles = async () => {
  const response = await fetch(
    `http://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${NEWS_API_KEY}`
  );
  const json = await response.json();
  return json;
};

export const getEnterArticles = async () => {
  const response = await fetch(
    `http://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=${NEWS_API_KEY}`
  );
  const json = await response.json();
  return json;
};

export const getTechArticles = async () => {
  const response = await fetch(
    `http://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${NEWS_API_KEY}`
  );
  const json = await response.json();
  return json;
};

export const doUserSearch= async(q) =>{
  const response = await fetch(
    `http://newsapi.org/v2/top-headlines?country=us&q=${q}&category=technology&category=entertainment&category=sports&apiKey=${NEWS_API_KEY}`
  );
  const json = await response.json();
  return json;
}

