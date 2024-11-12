import axios from 'axios'

const instance = axios.create({
  // baseURL: 'https://laravel-api-food.herokuapp.com'
  //baseURL: 'http://api-food.com'
  //baseURL: 'http://localhost:3000', //spring-boot-api
  baseURL: '/', //spring-boot-api
})
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + localStorage.getItem('token')
}

export default instance
