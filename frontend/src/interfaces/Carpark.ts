import { UsersInterface } from "./UsersInterface";

export interface ParkingCardInterface {
  ID?: string;
  IsPermanent?: boolean;
  ExpiryDate?: string;
  UpdatedAt?: string;
  TypePark?: TypeParkInterface;
  StatusCard?: StatusCardInterface;
  UserID?: number;
  TypeParkID?: number;
  StatusCardID?: number;
  ParkingFeePolicyID?: number;
  ParkingFeePolicy?: ParkingFeePolicyInterface;
  User?: UsersInterface;
  ParkingZone?: ParkingZoneInterface[];
  ParkingTransaction?: ParkingTransactionInterface[];
  ParkingPayment?: ParkingPaymentInterface;
}
export interface ParkingCardZoneInterface {
  ParkingCardID?: string;
  ParkingZoneID?: number;
  CreatedAt?: string;
  DeletedAt?: string;
  ParkingCard?: ParkingCardInterface;
  ParkingZone?: ParkingZoneInterface;
}

export interface ParkingZoneInterface {
  ID?: number;
  Name?: string;
  Image?: string;
  MaxCapacity?: number;
  MaxReservedCapacity?: number;
  /* AvailableZone?: number;
  ReservedAvailable?: number; */
  TypeParkID?: number;
  TypePark?: TypeParkInterface;
  ParkingCard?: ParkingCardInterface[];
}

export interface ParkingZoneDailyInterface {
  ID?: number;
  Date?: string;
  TotalVisitors?: number;
  AvailableZone?: number;
  ReservedAvailable?: number;
  ParkingZone?: ParkingZoneInterface;
}

export interface ParkingTransactionInterface {
  ID?: number;
  ReservationDate?: string;
  IsReservedPass?: boolean;
  EntryTime?: string;
  ExitTime?: string;
  TotalHourly?: number;
  Image?: string;
  LicensePlate?: string;
  Color?: string;
  Make?: string;

  UserID?: number;
  StatusPaymentID?: number;
  ParkingZoneDailyID?: number;
  ParkingZoneDaily?: ParkingZoneDailyInterface[];
  ParkingCardID?: string;
  ParkingCard?: ParkingCardInterface;
}

export interface TypeParkInterface {
  ID?: number;
  Type?: string;
  ParkingCard?: ParkingCardInterface[]; // หลายๆ ParkingCard
  ParkingZone?: ParkingZoneInterface[]; // หลายๆ ParkingZone
  ParkingFeePolicy?: ParkingFeePolicyInterface[]; // หลายๆ ParkingFeePolicy
}

export interface StatusCardInterface {
  ID?: number;
  Status?: string;
  ParkingCard?: ParkingCardInterface[]; // หลายๆ ParkingCard
}

export interface ParkingFeePolicyInterface {
  ID?: number;
  InitialFee?: number;
  AddBase_Fee?: number;
  Time_Increment?: string; // ใช้ string แทน time
  Discount?: number;

  TypeParkID?: number;
  TypePark?: TypeParkInterface;

  ParkingCard?: ParkingCardInterface[]; // หลายๆ ParkingCard
}

export interface ParkingPaymentInterface {
  ID?: number;
  PaymentDate?: string;
  Amount?: number;
  DiscountAmount?: number;
  NetAmount?: number;
  IsCash?: boolean;
  IsPaid?: boolean;
  CashReceived?: number; // เงินสด
  Change?: number; // เงินทอน
  ParkingTransactionID?: number;
  ParkingTransaction?: ParkingTransactionInterface[];
  ParkingCardID?: string;
  ParkingCard?: ParkingCardInterface;
  UserID?: number;
  User?: UsersInterface;
}

export interface VehicleInterface {
  ID?: number;
  LicensePlate?: string;
  Image?: string;
  Color?: string;
  Make?: string;
  UserID?: number;
}