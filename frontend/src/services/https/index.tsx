import { SignInInterface } from "../../interfaces/SignIn";
import {
  StoreInterface,
  BackupStoreInterface,
} from "../../interfaces/StoreInterface";

import axios from "axios";
const apiUrl = "http://localhost:8000";
const Authorization = localStorage.getItem("token");

const Bearer = localStorage.getItem("token_type");

const requestOptions = {
  headers: {
    "Content-Type": "application/json",

    Authorization: `${Bearer} ${Authorization}`,
  },
};

//============================User========================================
//login
async function SignIn(data: SignInInterface) {
  return await axios

    .post(`${apiUrl}/signin`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);
}
// get user by id
async function GetUserById(id: string) {
  return await axios

    .get(`${apiUrl}/user/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);
}
//============================Store========================================
// get Store by Floor
async function GetStoreByFloor(id: string) {
  return await axios

    .get(`${apiUrl}/store/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);
}
// update Store
async function UpdateStoreByid(id: string, data: StoreInterface) {
  return await axios

    .put(`${apiUrl}/store/${id}`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);
}
// backUp
async function BackUpStore(data: BackupStoreInterface) {
  return await axios

    .post(`${apiUrl}/backup`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);
}

// Car Parking
async function GetListCard() {
  return await axios
    .get(`${apiUrl}/get-list-parking-card`, requestOptions)
    .then((res) => res)
    .catch((e) => {
      console.error("Error fetching data:", e);
      return e.response;
    });
}
async function GetIdCardZone(id: string) {
  return await axios
    .get(`${apiUrl}/get-card-zone/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

export {
  SignIn,
  GetUserById,
  GetStoreByFloor,
  UpdateStoreByid,
  BackUpStore,

  // Car Parking
  GetListCard,
  GetIdCardZone,
};
