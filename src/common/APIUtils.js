import { API_BASE_URL, ACCESS_TOKEN } from "./constants";

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

// export function createCollection(collectionData) {
//   return request({
//     url: API_BASE_URL + "/collections",
//     method: "POST",
//     body: JSON.stringify(collectionData),
//   });
// }

// export function createCollection(formData) {
//   // headers.append("Content-Type": "multipart/form-data" )
//   const headers = new Headers({
//     "Content-Type": "multipart/form-data",
//   });
//   let h = "";
//   if (sessionStorage.getItem(ACCESS_TOKEN)) {
//     h = `"Authorization","Bearer " ${sessionStorage.getItem(ACCESS_TOKEN)}`;
//   }
//   const headers = {
//     'Content-Type': 'multipart/form-data',
//     'Authorization': 'here you can set your headers',
//     ...data.getHeaders() // this line is the key, you need to mix your headers with those generated by the form data
// }
//   console.log(h);
//   return request({
//     url: API_BASE_URL + "/collections",
//     method: "POST",
//     body: formData,
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
// }

// upload(file) {
//   const formData = new FormData();
//   formData.append(
//     "file",
//     this.state.selectedFile,
//     "collectionName",
//     this.state.collectionName
//   );

//   console.log(formData);
//   fetch("http://localhost:8080/api/collections", {
//     method: "post",
//     body: formData,
//   }).then((res) => {
//     if (res.ok) {
//       console.log(res.data);
//       alert("File uploaded successfully.");
//     }
//   });
// }
