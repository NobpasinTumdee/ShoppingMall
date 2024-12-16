import {
  ParkingCardInterface,
  ParkingTransactionInterface,
  UsageCardInterface,
  ParkingZoneInterface,
} from "../../interfaces/Carpark";
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
/* async function GetListLastTransaction() {
  return await axios
    .get(`${apiUrl}/get-list-last-parkingtransaction`, requestOptions)
    .then((res) => res)
    .catch((e) => {
      console.error("Error fetching data:", e);
      return e.response;
    });
}		 */
async function CreateParkingCard(data: ParkingCardInterface) {
  return await axios
    .post(`${apiUrl}/create-parkingcard`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function CreateParkingTransaction(data: ParkingTransactionInterface) {
  return await axios
    .post(`${apiUrl}/create-parkingtransaction`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function UpdateParkingCard(id: string, data: ParkingCardInterface) {
  return await axios
    .put(`${apiUrl}/update-parkingcard/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function UpdateParkingZone(id: number, data: ParkingZoneInterface) {
  return await axios
    .put(`${apiUrl}/update-parkingzone/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function UpdateParkingCardAndZone(
  cid: string,
  zid: number,
  cardData: ParkingCardInterface,
  zoneData: ParkingZoneInterface
) {
  const payload = {
    parking_card: cardData,
    parking_zone: zoneData,
  };
  return await axios
    .put(
      `${apiUrl}/update-parkingcard-zone/${cid}/${zid}`,
      payload,
      requestOptions
    )
    .then((res) => res)
    .catch((e) => e.response);
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
  //GetListLastTransaction,
  CreateParkingCard,
  CreateParkingTransaction,
  UpdateParkingCard,
  UpdateParkingZone,
  UpdateParkingCardAndZone,
  GetIdCardZone,
};
