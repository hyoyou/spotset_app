import axios from 'axios';

export default class HttpClient {
  get = (request) => {
    return axios.get(request.url, { headers: request.headers })
  }

  post = (request) => {
    return axios.post(request.url, request.data, { headers: request.headers })
  }
}