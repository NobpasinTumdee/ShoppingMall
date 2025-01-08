import {SignInInterface} from "../../interfaces/SignIn";
import {StoreInterface,BackupStoreInterface,PaymentInterface,ReceiptInterface,TaxUserInterface} from "../../interfaces/StoreInterface";
import { InfoUserStoreInterface , RatingInterface } from "../../interfaces/StoreInterface";
import { UsersInterface , MessageBoardInterface, EventInterface } from "../../interfaces/UsersInterface";
import { CleaningRecordInterface } from "../../interfaces/CleaningInterface";
import {
  ParkingCardInterface,
  ParkingPaymentInterface,
  ParkingTransactionInterface,
  ParkingZoneDailyInterface,
  ParkingZoneInterface,
  VehicleInterface,
} from "../../interfaces/Carpark";

import axios from 'axios';
import { EquipmentInterface, ServiceInterface } from "../../interfaces/ServiceInterface";
import { InventoryInterface } from "../../interfaces/InventoryInterface";
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
//signup
async function CreateUser(data: UsersInterface) {
  return await axios
    .post(`${apiUrl}/signup`, data, requestOptions)
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
// get user all
async function GetUserAll() {

  return await axios

    .get(`${apiUrl}/user`, requestOptions)

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
// get Message by id
async function GetMessageById(id: string) {

  return await axios

    .get(`${apiUrl}/Message/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
// Create message
async function AddMessage(data: MessageBoardInterface) {

  return await axios

    .post(`${apiUrl}/Message`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
// get Tax by id
async function GetTaxById(id: string) {

  return await axios

    .get(`${apiUrl}/Tax/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
// Create Tax
async function AddTax(data: TaxUserInterface) {

  return await axios

    .post(`${apiUrl}/CreateTax`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
// update Tax
async function UpdateTaxByid(id: string, data: TaxUserInterface) {

  return await axios

    .put(`${apiUrl}/Tax/${id}`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
// get User by status
async function GetUserByStatus(Status: string) {

  return await axios

    .get(`${apiUrl}/job/${Status}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
// get Users
async function ListUser() {

  return await axios

    .get(`${apiUrl}/users`, requestOptions)

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
// get Store by Floor-preload
async function GetStoreByFloorPreload(id: string) {

  return await axios

    .get(`${apiUrl}/store-preload/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
// get Membership
async function GetMembership() {

  return await axios

    .get(`${apiUrl}/Membership`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
// get Store by id
async function GetStoreById(id: string) {

  return await axios

    .get(`${apiUrl}/storeid/${id}`, requestOptions)

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
// get backUp by id
async function GetBackUpByid(id: string) {

  return await axios

    .get(`${apiUrl}/backupstore/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
// get Membership by id
async function GetMembershipByid(id: string) {

  return await axios

    .get(`${apiUrl}/Membership/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
//============================store rating ========================================
// get comment by id store
async function GetCommentByStore(id: string) {

  return await axios

    .get(`${apiUrl}/commentbystore/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
// get comment by id User
async function GetCommentByUser(id: string) {

  return await axios

    .get(`${apiUrl}/commentbyuser/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
// create comment
async function CreateComment(data: RatingInterface) {

  return await axios

    .post(`${apiUrl}/comment`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
//Delete comment
async function DeleteCommentFromStore(id: string) {
  return await axios
    .delete(`${apiUrl}/comment/${id}`, requestOptions)
    .then((res) => {
      // if (res) {
      //   window.location.reload(); // reload หลังจากลบเสร็จ
      // }
      return res;
    })
    .catch((e) => e.response);
}
// get Avg by id store
async function GetAvgCommentByStore(id: string) {

  return await axios

    .get(`${apiUrl}/average-rating/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
//============================payment store========================================
// get payment by userid Preload
async function GetPaymentByuseridPreload(id: string) {

  return await axios

    .get(`${apiUrl}/Payment/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
// get payment by userid ไม่ใช้เด้อจ้าา
async function GetPaymentByuserid(id: string) {

  return await axios

    .get(`${apiUrl}/PaymentStore/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
// get payment by id payment
async function GetPaymentid(id: string) {

  return await axios

    .get(`${apiUrl}/PaymentInfo/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
// Create AddPayment
async function AddPayment(data: PaymentInterface) {

  return await axios

    .post(`${apiUrl}/CreatePayment`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
// update Payment Status ตอนนี้มันคือ put ที่ไม่ได้แก้แค่ status
async function UpdatePaymentStatus(id: string, data: PaymentInterface) {

  return await axios

    .put(`${apiUrl}/PaymentStore/${id}`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
// get PaymentMethod
async function GetPaymentMethod() {

  return await axios

    .get(`${apiUrl}/PaymentMethod`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
//============================bill========================================
// get bill by paymentid Preload
async function GetBillByPayidPreload(id: string) {

  return await axios

    .get(`${apiUrl}/Receipt/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
// Create bill
async function CreateBill(data: ReceiptInterface) {

  return await axios

    .post(`${apiUrl}/Receipt`, data, requestOptions)

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
// get Event
async function GetEvent() {

  return await axios

    .get(`${apiUrl}/event`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
// Create AddEvent
async function AddEvent(data: EventInterface) {

  return await axios

    .post(`${apiUrl}/event`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
//Delete Event
async function DeleteEvent(id: string) {
  return await axios
    .delete(`${apiUrl}/event/${id}`, requestOptions)
    .then((res) => {
      return res;
    })
    .catch((e) => e.response);
}
//=============================อุปกรณ์=====================================
// get Inventory
async function ListInventory() {
  return await axios

  .get(`${apiUrl}/inventory`, requestOptions)

  .then((res) => res)

  .catch((e) => e.response);

}
// get CategoryInventory
async function ListCategoryInventory() {

return await axios

  .get(`${apiUrl}/CategoryInventory`, requestOptions)

  .then((res) => res)

  .catch((e) => e.response);

}
// get Inventory by id
async function GetInventoryById(id: string) {

return await axios

  .get(`${apiUrl}/inventory/${id}`, requestOptions)

  .then((res) => res)

  .catch((e) => e.response);


}


//===========================Hall==========================================
//Get ListHall
async function ListHall() {
  
  return await axios

  .get(`${apiUrl}/hall`, requestOptions)

  .then((res) => res)

  .catch((e) => e.response);
}
async function GetHallByID(id: string) {
  return await axios

  .get(`${apiUrl}/hall/${id}`, requestOptions)

  .then((res) => res)

  .catch((e) => e.response);
  
}
async function CreateBookingHall(id: string) {
  return await axios

  .get(`${apiUrl}/hall/bookinghall/${id}`, requestOptions)

  .then((res) => res)

  .catch((e) => e.response);
}
async function UpdateBookingHall(id: string) {
  return await axios

  .get(`${apiUrl}/hall/bookinghall/${id}`,requestOptions)

  .then((res) => res)

  .catch((e) => e.response);
  
}
async function DeleteBookingHall(id: string) {
  return await axios

  .get(`${apiUrl}/hall/bookinghall/${id}`,requestOptions)

  .then((res) => res)

  .catch((e) => e.response);
}
async function GetBookinghall(id: string) {
  return await axios

  .get(`${apiUrl}/bookinghall/${id}`,requestOptions)

  .then((res) => res)

  .catch((e) => e.response);
}

async function ListBookingHall() {
  return await axios

    .get(`${apiUrl}/bookings`, requestOptions)

    .then((res) => res)
    
    .catch((e) => e.response);
}
//=============================Cleaning=====================================
// get Area
async function ListAreas() {

  return await axios

    .get(`${apiUrl}/Area`, requestOptions)

    //.then((res) => res)//ดึงมาทั้งหมด
    .then((res) => res.data) // ดึงเฉพาะข้อมูลที่เป็น Area

    .catch((e) => e.response);

}

async function CreateCleaningRecord(data: CleaningRecordInterface) {

  return await axios

    .post(`${apiUrl}/CleaningRecord`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetCleaningRecordsByArea(id: number) {

  return await axios

    .get(`${apiUrl}/CleaningRecordsByArea/${id}`, requestOptions)

    .then((res) => res.data)

    .catch((e) => e.response);

}

async function GetSchedulesByArea(id: number) {

  return await axios

    .get(`${apiUrl}/SchedulesByArea/${id}`, requestOptions)

    .then((res) => res.data)

    .catch((e) => e.response);

}

async function DeleteCleaningRecord(payload: { AreaID: string; Day: string }) {

    const response = await axios.delete(
      `${apiUrl}/DeleteCleaningRecord`,
      {
        params: {
          AreaID: payload.AreaID,
          Day: payload.Day,
        },
        ...requestOptions, // รวม options เช่น headers
      }
    );

    return response.data; // ส่งผลลัพธ์กลับมา
    
}

//=======================================Service============================================
//listService by status
async function ListService(Status: string) {

  return await axios

    .get(`${apiUrl}/Service/${Status}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
async function ListStoreService() {

  return await axios

    .get(`${apiUrl}/StoreService`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
async function ListRepairman() {

  return await axios

    .get(`${apiUrl}/Repairman`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
async function CreateService(data: ServiceInterface) {

  return await axios

    .post(`${apiUrl}/Service`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
//=======================================EquipmentRequest============================================
async function EquipmentByServiceID(id: string) {

  return await axios

    .get(`${apiUrl}/Equipment/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
async function CreateEquipment(data: EquipmentInterface) {

  return await axios

    .post(`${apiUrl}/Equipment`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
async function UpdateInventory(id: string, data: InventoryInterface) {

  return await axios

    .put(`${apiUrl}/Inventory/${id}`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
//Delete Equipment
async function DeleteEquipment(id: string) {
  return await axios

    .delete(`${apiUrl}/Equipment/${id}`, requestOptions)

    .then((res) => { return res; })
    
    .catch((e) => e.response);
}
async function UpdateService(id: string, data: ServiceInterface) {

  return await axios

    .put(`${apiUrl}/Service/${id}`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
//============================ Car Park ========================================
async function GetUserDetails(id: number) {
  return await axios
    .get(`${apiUrl}/get-user-details/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function GetListCardAndCheckExpiredCardtoUpdate() {
  return await axios
    .get(`${apiUrl}/get-list-parking-card`, requestOptions)
    .then((res) => res)
    .catch((e) => {
      console.error("Error fetching data:", e);
      return e.response;
    });
}
async function GetListTransaction() {
  return await axios
    .get(`${apiUrl}/get-list-parking-transaction`, requestOptions)
    .then((res) => res)
    .catch((e) => {
      console.error("Error fetching data:", e);
      return e.response;
    });
}
async function GetListZoneDaily() {
  return await axios
    .get(`${apiUrl}/get-list-parkingzone-daily`, requestOptions)
    .then((res) => res)
    .catch((e) => {
      console.error("Error fetching data:", e);
      return e.response;
    });
}
async function GetListCardAndUser() {
  return await axios
    .get(`${apiUrl}/get-list-card-and-user`, requestOptions)
    .then((res) => {
      const { cards, users } = res.data;
      return { cards, users };
    })
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
async function CreateVehicle(data: VehicleInterface) {
  return await axios
    .post(`${apiUrl}/create-vehicle`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function CreateZoneDaily(data: ParkingZoneDailyInterface) {
  return await axios
    .post(`${apiUrl}/create-parkingzone-daily`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function CreateParkingPayment(data: ParkingPaymentInterface) {
  return await axios
    .post(`${apiUrl}/create-parking-payment`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
/* async function CreateParkingCardAndVehical(data: ParkingTransactionInterface) {
  return await axios
    .post(`${apiUrl}/create-parkingcard-and-vehical`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}	 */
async function UpdateParkingCard(id: string, data: ParkingCardInterface) {
  return await axios
    .patch(`${apiUrl}/patch-parkingcard/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}	
async function UpdateParkingZone(id: number, data: ParkingZoneInterface) {
  return await axios
    .put(`${apiUrl}/update-parkingzone/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function UpdateVehicle(id: number, data: ParkingCardInterface) {
  return await axios
    .patch(`${apiUrl}/patch-vehicle/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}	
async function UpdateParkingTransaction(id: number, data: ParkingCardInterface) {
  return await axios
    .patch(`${apiUrl}/patch-parkingtransaction/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function UpdateZoneDailyByID(id: number, data: ParkingZoneDailyInterface) {
  return await axios
    .patch(`${apiUrl}/patch-parkingzone-daily/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function UpdateZoneDailyByZoneID(id: number, data: ParkingZoneDailyInterface) {
  return await axios
    .patch(`${apiUrl}/patch-parkingzone-daily-by-zone/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}/* 
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
}	 */	
async function GetParkingCardByID(id: string) {
  return await axios
    .get(`${apiUrl}/get-parking-card/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}		
async function GetParkingFeePolicyByID(id: number) {
  return await axios
    .get(`${apiUrl}/get-parking-fee-policy/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}	
async function GetParkingCardByUserID(id: string) {
  return await axios
    .get(`${apiUrl}/get-parking-card-by-user/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
/* async function GetParkingCardWithZoneByID(id: string) {
  return await axios
    .get(`${apiUrl}/get-parking-card-with-zone/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
} */
async function GetZoneDailyByZoneID(id: number) {
  return await axios
    .get(`${apiUrl}/get-parkingzone-daily/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function GetParkingPaymentByTransactionID(id: number) {
  return await axios
    .get(`${apiUrl}/get-parkingpayment-by-transaction/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function GetListZone() {
  return await axios
    .get(`${apiUrl}/get-list-parking-zone`, requestOptions)
    .then((res) => res)
    .catch((e) => {
      console.error("Error fetching data:", e);
      return e.response;
    });
}
async function GetListStatusCard() {
  return await axios
    .get(`${apiUrl}/get-list-status-card`, requestOptions)
    .then((res) => res)
    .catch((e) => {
      console.error("Error fetching data:", e);
      return e.response;
    });
}
/* async function GetZoneByTypePark(type: string) {
  return await axios
    .get(`${apiUrl}/get-parking-zone-by-type-park/${type}`, requestOptions)
    .then((res) => res)
    .catch((e) => {
      console.error("Error fetching data:", e);
      return e.response;
    });
} */
async function GetIdCardZone(id: string) {
  return await axios
    .get(`${apiUrl}/get-card-zone/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function DeleteParkingCard(id: string) {
  return await axios
    .delete(`${apiUrl}/delete-parkingcard/${id}`, requestOptions)
    .then((res) => {
      return res;
    })
    .catch((e) => e.response);
}

export {
    SignIn,//user
    CreateUser,//user
    GetUserById,
    GetUserAll,
    UpdateUserByid,
    AddStore,
    UserStoreByid,
    DeleteUserStoreByID,
    GetMessageById,
    AddMessage,
    GetTaxById,
    AddTax,
    UpdateTaxByid,
    GetUserByStatus,
    
    GetStoreWaiting,//admin
    ListUser,
    GetEvent,
    AddEvent,
    DeleteEvent,

    GetStoreByFloor,//store
    GetStoreByFloorPreload,
    GetMembership,
    UpdateStoreByid,
    BackUpStore,
    GetBackUpByid,
    GetStoreById,
    GetMembershipByid,
    GetCommentByStore,//rating
    GetCommentByUser,
    CreateComment,
    DeleteCommentFromStore,
    GetAvgCommentByStore,

    GetPaymentByuseridPreload,//payment store
    GetPaymentByuserid,
    GetPaymentid,
    AddPayment,
    UpdatePaymentStatus,
    GetPaymentMethod,
    GetBillByPayidPreload,//bill
    CreateBill,

    ListHall,
    GetHallByID,
    CreateBookingHall,
    UpdateBookingHall,
    DeleteBookingHall,
    GetBookinghall,
    ListBookingHall,

    ListInventory,//อุปกรณ์ทั้งหมด
    ListCategoryInventory,
    GetInventoryById,

    ListService,//ServiceRq
    ListStoreService,
    ListRepairman,
    CreateService,
    EquipmentByServiceID,//Equipment
    CreateEquipment,
    UpdateInventory,
    DeleteEquipment,
    UpdateService,

    ListAreas,
    CreateCleaningRecord,
    GetCleaningRecordsByArea,
    GetSchedulesByArea,
    DeleteCleaningRecord,

     // Car Parking
     GetUserDetails,
     GetListCardAndCheckExpiredCardtoUpdate,
     GetListTransaction,
     GetListZoneDaily,
     /* CreateParkingCardAndVehical, */
     GetListCardAndUser,
     GetListZone,
     GetListStatusCard,
     //GetZoneByTypePark,
     //GetListLastTransaction,
     CreateParkingCard,
     CreateParkingTransaction,
     CreateParkingPayment,
     CreateVehicle,
     CreateZoneDaily,
     UpdateParkingCard,
     UpdateParkingZone,
     UpdateVehicle,
     UpdateParkingTransaction,
     //UpdateParkingCardAndZone,
     UpdateZoneDailyByID,
     UpdateZoneDailyByZoneID,
     GetParkingCardByID,
     GetParkingFeePolicyByID,
     GetParkingCardByUserID,
     GetParkingPaymentByTransactionID,
     //GetParkingCardWithZoneByID,
     GetZoneDailyByZoneID,
     GetIdCardZone,
     DeleteParkingCard,
}
