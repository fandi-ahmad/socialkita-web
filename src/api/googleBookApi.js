import axios from "axios";
const apiGoogleBook = 'https://www.googleapis.com/books/v1/volumes'
const key = 'AIzaSyBLASFJ8lflYhx1CPDhTqb6FARJlyoIS9o'

// https://www.googleapis.com/books/v1/volumes?q=psychology&key=AIzaSyBLASFJ8lflYhx1CPDhTqb6FARJlyoIS9o

export const GetListBook = (q) => {
  return axios.get(`${apiGoogleBook}/?q=${q}&key=${key}&startIndex=0&maxResults=10`)
  .then(response => response.data)
  .catch(error => error.response)
}