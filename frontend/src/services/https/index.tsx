import {SignInInterface} from "../../interfaces/SignIn";
import {StoreInterface,BackupStoreInterface} from "../../interfaces/StoreInterface";
import { InfoUserStoreInterface } from "../../interfaces/StoreInterface";
import { UsersInterface } from "../../interfaces/UsersInterface";

import axios from 'axios';
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
// update User
async function UpdateUserByid(id: string, data: UsersInterface) {

  return await axios

    .put(`${apiUrl}/user/${id}`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
//Add Store
async function AddStore(data: InfoUserStoreInterface) {

  return await axios

    .post(`${apiUrl}/addStore`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
// get UserStore by id
async function UserStoreByid(id: string) {

  return await axios

    .get(`${apiUrl}/userstore/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
//Delete userstore
async function DeleteUserStoreByID(id: string) {
  return await axios
    .delete(`${apiUrl}/DeleteUserStore/${id}`, requestOptions)
    .then((res) => {
      // if (res) {
      //   window.location.reload(); // reload หลังจากลบเสร็จ
      // }
      return res;
    })
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
//============================Admin========================================
// get Store WaitingForApproval
async function GetStoreWaiting(status: string) {

  return await axios

    .get(`${apiUrl}/storeWaiting/${status}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


export {
    SignIn,
    GetUserById,
    UpdateUserByid,
    AddStore,
    UserStoreByid,
    DeleteUserStoreByID,

    GetStoreWaiting,

    GetStoreByFloor,
    UpdateStoreByid,
    BackUpStore,
}