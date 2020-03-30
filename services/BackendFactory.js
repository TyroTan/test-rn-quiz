import { apiURL } from "../config/constants";
const axios = require("axios");

const API_URL = apiURL;

const TOKEN_AUTH_PREFIX = '';
export default class BackendFactory {
  constructor(opts = {}) {
    const { csrf = "", timeout = 5000 } = opts;
    this.req = {
      timeout,
      headers: { _csrf: csrf }
    };
  }

  getRequest(options = {}) {
    const { resource = "", data = {} } = options;
    this.req.baseUrl = `${apiURL}/${resource}`;


    // console.log('this.req', resource, data, this.req)

    return axios.create(this.req).get(this.req.baseUrl).then(res => res.data)
  }

  
  postRequest(options = {}) {
    const { resource = '', data, Authorization = '' } = options;
    this.req.baseUrl = `${API_URL}/${resource}`;
    this.req.headers['Content-Type'] = 'application/json';
    // this.req.headers.accept = 'application/json';

    if (Authorization) {
      this.req.headers.Authorization = `${TOKEN_AUTH_PREFIX}${Authorization}`;
    }

    console.log('postRequest this.req', this.req.baseUrl, data);

    return axios
      .create(this.req)
      .post(this.req.baseUrl, data)
      .then(res => {
        return res.data;
      });
  }

  deleteRequest(options = {}) {}

  putRequest(options = {}) {}
  optionRequest(options = {}) {}
}

const bf = new BackendFactory();

export function sendGet(Obj) {
  return bf.getRequest(Obj);
}

export function sendPost(Obj) {
  return bf.postRequest(Obj);
}

export function sendDelete(Obj) {
  return bf.deleteRequest(Obj);
}

export function sendPut(Obj) {
  return bf.putRequest(Obj);
}

export function sendOption(Obj) {
  return bf.optionRequest(Obj);
}
