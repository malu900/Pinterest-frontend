import { API_BASE_URL, ACCESS_TOKEN } from "./constants";
import axios from "axios";

const request = (options) => {
  // set header
  const headers = new Headers({
    "Content-type": "application/json",
    Accept: "application/json",
  });
  // add authorization to header if loggedin
  if (sessionStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + sessionStorage.getItem(ACCESS_TOKEN)
    );
  }

  const defaults = { headers: headers };
  // javascript method
  // assign header to options props + options props
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
  options = Object.assign({}, defaults, options);

  // any url
  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function signup(signupRequest) {
  console.log(signupRequest);
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: "POST",
    body: JSON.stringify(signupRequest),
  });
}

export function login(loginrequest) {
  console.log(loginrequest);
  return request({
    url: API_BASE_URL + "/auth/signin",
    method: "POST",
    body: JSON.stringify(loginrequest),
  });
}

export function getcurrentuser() {
  if (!sessionStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token");
  }
  return request({
    url: API_BASE_URL + "/user/me",
    method: "GET",
  });
}

export function getUserProfile(username) {
  return request({
    url: API_BASE_URL + "/user/" + username,
    method: "GET",
  });
}

export function getAllCollectionsFromUser() {
  return request({
    url: API_BASE_URL + "/collections/getAll",
    method: "GET",
  });
}

export function getUserCollectionByCollectionId(collectionId) {
  return request({
    url: API_BASE_URL + "/collections/" + collectionId,
    method: "GET",
  });
}

export function sessionStorageUser() {
  if (sessionStorage.getItem(ACCESS_TOKEN)) {
    return "Bearer " + sessionStorage.getItem(ACCESS_TOKEN);
  }
}

export function createCollection(formData) {
  return axios({
    method: "post",
    headers: {
      Authorization: sessionStorageUser(),
    },
    url: "http://localhost:8080/api/collections",
    data: formData,
  });
}
