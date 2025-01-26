import {SignInInterface} from "../../interfaces/SignIn";
import {StoreInterface,BackupStoreInterface,PaymentInterface,ReceiptInterface,TaxUserInterface, StoreInformationInterface, AdditionalPayInterface, MembershipInterface} from "../../interfaces/StoreInterface";
import { InfoUserStoreInterface , RatingInterface } from "../../interfaces/StoreInterface";
import { UsersInterface , MessageBoardInterface, EventInterface } from "../../interfaces/UsersInterface";
import { BookingHallInterface, PaymentHallInterface, TaxInvoiceInterface } from "../../interfaces/HallInterface";
import { ParkingCardInterface, ParkingPaymentInterface, ParkingUsageCardInterface, ParkingZoneDailyAndUsageCardData, ParkingZoneDailyInterface, VehicleInterface } from "../../interfaces/CarparkInterface";
import { CleaningRecordInterface } from "../../interfaces/CleaningInterface";
import { InventoryRequestInterface } from "../../interfaces/InventoryRequestInterface";

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
// ResetPassword
async function ResetPassword( data: UsersInterface) {

  return await axios

    .put(`${apiUrl}/ResetPasswordUser`, data, requestOptions)

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
// get statusstore all
async function GetStatusAll() {

  return await axios

    .get(`${apiUrl}/statusstore`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
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
//======= รายระเอียดร้าน ======
// get info by Storeid
async function GetStoreInformationById(id: string) {

  return await axios

    .get(`${apiUrl}/information/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
// Create information
async function Addinformation(data: StoreInformationInterface) {

  return await axios

    .post(`${apiUrl}/information`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
//Delete information by store id
async function DeleteInformation(id: string) {
  return await axios

    .delete(`${apiUrl}/information/${id}`, requestOptions)
    
    .then((res) => {
      return res;
    })
    .catch((e) => e.response);
}
//Delete information by id
async function DeleteInformationByid(id: string) {
  return await axios

    .delete(`${apiUrl}/info-pic-store/${id}`, requestOptions)
    
    .then((res) => {
      return res;
    })
    .catch((e) => e.response);
}
// update information
async function UpdateinformationByid(id: string, data: StoreInformationInterface) {

  return await axios

    .put(`${apiUrl}/information/${id}`, data, requestOptions)

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
// update membership-edit
async function UpdateMembership(id: string, data: MembershipInterface) {

  return await axios

    .put(`${apiUrl}/membership-edit/${id}`, data, requestOptions)

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
// get additional-package"
async function ListAdditionalPackage() {

  return await axios

    .get(`${apiUrl}/additional-package`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
// Create CreateAdditionalPay
async function CreateAdditionalPay(data: AdditionalPayInterface) {

  return await axios

    .post(`${apiUrl}/additional-create`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
// get additional by payment id Preload
async function GetAdditionalPayByID(id: string) {

  return await axios

    .get(`${apiUrl}/additional-list/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
//Delete DeleteAdditional
async function DeleteAdditional(id: string) {
  return await axios
    .delete(`${apiUrl}/additional-delete/${id}`, requestOptions)

    .then((res) => {

      return res;

    })
    .catch((e) => e.response);
}
// get TotalPricePackag
async function GetTotalPricePackageByPayID(id: string) {

  return await axios

    .get(`${apiUrl}/additional-total-price/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
// get package filter by payment id
async function GetFilterPackage(id: string) {

  return await axios

    .get(`${apiUrl}/additional-packages?PaymentStoreID=${id}`, requestOptions)

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
async function CreateBookingHall(data:BookingHallInterface) {
  return await axios

  .post(`${apiUrl}/booking`,data, requestOptions)

  .then((res) => res)

  .catch((e) => e.response);
}
async function UpdateBookingHall(id: string, data: BookingHallInterface) {
  return await axios
    .put(`${apiUrl}/booking/${id}`, data, requestOptions) // แก้ไขเส้นทางให้ตรง backend
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteBookingHall(id: string) {
  return await axios
    .delete(`${apiUrl}/booking/${id}`, requestOptions) // ใช้ DELETE แทน GET
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetBookingByID(id: string) {
  return await axios

  .get(`${apiUrl}/bookings/${id}`,requestOptions)

  .then((res) => res)

  .catch((e) => e.response);
}

async function ListBookingByHallID(id: string) {
  return await axios

    .get(`${apiUrl}/booking/${id}`, requestOptions)

    .then((res) => res)
    
    .catch((e) => e.response);
}
async function GetBookingByHallID(id: string) {
  return await axios

    .get(`${apiUrl}/calendar/${id}`, requestOptions)

    .then((res) => res)
    
    .catch((e) => e.response);
}

async function GetFacility() {
  return await axios

  .get(`${apiUrl}/facilities`,requestOptions)

  .then((res) => res)
    
  .catch((e) => e.response);
}

//===========================PaymentHall==========================================
async function GetBookingWithTotalPrice(id: string) {
  return await axios
    .get(`${apiUrl}/total/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
// Create new Payment
async function CreatePaymentHall(data: PaymentHallInterface) {
  return await axios
    .post(`${apiUrl}/payment`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

// Get Payment by ID
async function GetPaymentHallByID(id: string) {
  return await axios
    .get(`${apiUrl}/payment/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

// List all Payments
async function ListPaymentsHall() {
  return await axios
    .get(`${apiUrl}/payments`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

// Update Booking and Payment Status (UpdateStatusHall)
async function UpdateStatusHall( id: string, data: BookingHallInterface){
  return await axios
  .put(`${apiUrl}/payment/${id}`,data, requestOptions)
  .then((res) => res)
  .catch((e) => e.response);
}

// Delete Payment
async function DeletePaymentHall(id: string) {
  return await axios
    .delete(`${apiUrl}/payment/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

// Get Payment Status List
async function ListStatusPaymentHall() {
  return await axios
    .get(`${apiUrl}/statuspaymenthall`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

// Get Payment Status by ID
async function GetStatusPaymentHallByID(id: string) {
  return await axios
    .get(`${apiUrl}/statuspaymenthall/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function CreateInvoice(data:TaxInvoiceInterface) {
  return await axios
  .post(`${apiUrl}/taxinvoice`,data, requestOptions)
  .then((res) => res)
  .catch((e) => e.response);
}
async function GetInvoice(id: string) {
  return await axios
  .get(`${apiUrl}/taxinvoice/${id}`, requestOptions)
  .then((res) => res)
  .catch((e) => e.response);
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
//======================================= Car Park ============================================
async function GetUserDetails(id: number) {
  return await axios
    .get(`${apiUrl}/get-user-details/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
// get Tax at ICONIC
async function GetTaxUserICONIC() {
  return await axios

    .get(`${apiUrl}/Tax-ICONIC`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);
}
async function CreateParkingCard(data: ParkingCardInterface) {
  return await axios
    .post(`${apiUrl}/create-parkingcard`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function UpdateParkingCard(id: string, data: ParkingCardInterface) {
  return await axios
    .patch(`${apiUrl}/patch-parkingcard/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function GetParkingCardByID(id: string) {
  return await axios
    .get(`${apiUrl}/get-parking-card/${id}`, requestOptions)
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
async function UpdateZoneDailyByID(id: number,data: ParkingZoneDailyInterface) {
  return await axios
    .patch(`${apiUrl}/patch-parkingzone-daily/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function CreateVehicle(data: VehicleInterface) {
  return await axios
    .post(`${apiUrl}/create-vehicle`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function UpdateVehicle(id: number, data: ParkingCardInterface) {
  return await axios
    .patch(`${apiUrl}/patch-vehicle/${id}`, data, requestOptions)
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
async function GetParkingPaymentByUsageCardID(id: number) {
  return await axios
    .get(`${apiUrl}/get-parkingpayment-by-usagecard/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function CreateParkingPayment(data: ParkingPaymentInterface) {
  return await axios
    .post(`${apiUrl}/create-parking-payment`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
} 
async function CreateParkingUsageCard(data: ParkingUsageCardInterface) {
  return await axios
    .post(`${apiUrl}/create-parkingusagecard`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function UpdateParkingUsageCard(id: number, data: ParkingCardInterface) {
  return await axios
    .patch(`${apiUrl}/patch-parkingusagecard/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function GetParkingUsageCardByID(id: number) {
  return await axios
    .get(`${apiUrl}/get-parkingusagecard/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
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
async function CreateParkingZoneDailyAndUsageCard(data: ParkingZoneDailyAndUsageCardData) {
  return await axios
    .post(
      `${apiUrl}/create-parkingzone-daily-and-usagecard`,
      data,
      requestOptions
    )
    .then((res) => res)
    .catch((e) => e.response);
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
        ...requestOptions, 
      }
    );

    return response.data;
    
}

async function UpdateCleaningRecord(id: string, data: CleaningRecordInterface) {

  return await axios

    .put(`${apiUrl}/UpdateCleaningRecord/${id}`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

//====================เบิกอุปกรณ์ทำความสะอาดแม่บ้าน===========
async function CreateInventoryRequest(data: InventoryRequestInterface) {

  return await axios

    .post(`${apiUrl}/InventoryRequest`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}
async function ListInventoryRequest() {

  return await axios

    .get(`${apiUrl}/ListInventoryRequest`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function UpdateQuantityInventory(payload: { NameItem: string; Quantity: number }) {
  const response = await axios.put(
      `${apiUrl}/UpdateQuantityInventory`,
      {
        NameItem: payload.NameItem,
        Quantity: payload.Quantity,
      }, 
      requestOptions
  );

  return response.data;
}

async function ListCreateInventoryRequest() {

  return await axios

    .get(`${apiUrl}/ListCreateInventoryRequest`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

export {
    SignIn,//user
    CreateUser,
    ResetPassword,
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
    GetStatusAll,
    GetStoreByFloorPreload,
    GetMembership,
    UpdateStoreByid,
    BackUpStore,
    GetBackUpByid,
    GetStoreById,
    GetMembershipByid,
    GetStoreInformationById,
    Addinformation,
    DeleteInformation,
    DeleteInformationByid,
    UpdateinformationByid,
    GetCommentByStore,//rating
    GetCommentByUser,
    CreateComment,
    DeleteCommentFromStore,
    GetAvgCommentByStore,
    UpdateMembership,

    GetPaymentByuseridPreload,//payment store
    GetPaymentByuserid,
    GetPaymentid,
    AddPayment,
    UpdatePaymentStatus,
    GetPaymentMethod,
    ListAdditionalPackage,
    CreateAdditionalPay,
    GetAdditionalPayByID,
    DeleteAdditional,
    GetFilterPackage,
    GetTotalPricePackageByPayID,
    GetBillByPayidPreload,//bill
    CreateBill,

    ListInventory,//อุปกรณ์ทั้งหมด
    ListCategoryInventory,
    GetInventoryById,

    ListHall,//hall
    GetHallByID,
    CreateBookingHall,
    UpdateBookingHall,
    DeleteBookingHall,
    GetBookingByID,
    ListBookingByHallID,
    GetBookingByHallID,
    GetFacility,
    GetBookingWithTotalPrice,//paymenthall
    CreatePaymentHall,
    GetPaymentHallByID,
    ListPaymentsHall,
    UpdateStatusHall,
    DeletePaymentHall,
    ListStatusPaymentHall,
    GetStatusPaymentHallByID,
    GetInvoice,
    CreateInvoice,

    ListService,//แจ้งซ่อม 
    ListStoreService,
    ListRepairman,
    CreateService,

    EquipmentByServiceID, //เบิกอุปกรณ์
    CreateEquipment,
    UpdateInventory,
    DeleteEquipment,
    UpdateService,

    GetParkingCardByID,  // Car Parking
    CreateParkingCard,
    UpdateParkingCard,
    DeleteParkingCard, 
    UpdateZoneDailyByID, 
    CreateVehicle, 
    UpdateVehicle, 
    GetListCardAndCheckExpiredCardtoUpdate,
    GetParkingPaymentByUsageCardID, 
    CreateParkingPayment, 
    CreateParkingUsageCard, 
    UpdateParkingUsageCard,
    GetParkingUsageCardByID,
    GetListStatusCard,
    CreateParkingZoneDailyAndUsageCard,
    GetListZoneDaily,

    GetUserDetails, 
    GetTaxUserICONIC,

    ListAreas,//แม่บ้าน
    CreateCleaningRecord,
    GetCleaningRecordsByArea,
    GetSchedulesByArea,
    DeleteCleaningRecord,
    UpdateCleaningRecord,

    CreateInventoryRequest,//เบิกอุปกรณ์ทำความสะอาด
    ListInventoryRequest,
    UpdateQuantityInventory,
    ListCreateInventoryRequest
}