import { UsersInterface } from "./UsersInterface";

export interface ParkingCardInterface {
  ID?: string;
  IsPermanent?: boolean;
  ExpiryDate?: string;
  UpdatedAt?: string;
  TypeCard?: TypeCardInterface;
  StatusCard?: StatusCardInterface;
  UserID?: number;
  TypeCardID?: number;
  StatusCardID?: number;
  ParkingFeePolicyID?: number;
  ParkingFeePolicy?: ParkingFeePolicyInterface;
  User?: UsersInterface;
  ParkingZone?: ParkingZoneInterface[];
  ParkingUsageCard?: ParkingUsageCardInterface[];
  ParkingPayment?: ParkingPaymentInterface;
}
export interface ParkingCardZoneInterface {
  ParkingCardID?: string;
  ParkingZoneID?: number;
  ParkingCard?: ParkingCardInterface;
  ParkingZone?: ParkingZoneInterface;
}

export interface ParkingZoneInterface {
  ID?: number;
  Name?: string;
  Image?: string;
  MaxCapacity?: number;
  MaxReservedCapacity?: number;
  TypeCardID?: number;
  TypeCard?: TypeCardInterface;
  ParkingCard?: ParkingCardInterface[];
}

export interface ParkingZoneDailyInterface {
  ID?: number;
  Date?: string;
  TotalVisitors?: number;
  AvailableZone?: number;
  ReservedAvailable?: number;
  ParkingZoneID?: number;
  ParkingZone?: ParkingZoneInterface;
}

export interface ParkingUsageCardInterface {
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
  ParkingZoneDaily?: ParkingZoneDailyInterface;
  ParkingCardID?: string;
  ParkingCard?: ParkingCardInterface;
}

export interface TypeCardInterface {
  ID?: number;
  Type?: string;
  ExpiryYear?: number;
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
  Time_Increment?: number; // ใช้ string แทน time
  Discount?: number;

  TypeCardID?: number;
  TypeCard?: TypeCardInterface;

  ParkingCard?: ParkingCardInterface[]; // หลายๆ ParkingCard
}

export interface ParkingPaymentInterface {
  ID?: number;
  ReceiptNo?: string;
  PaymentDate?: string;
  Amount?: number;
  DiscountAmount?: number;
  NetAmount?: number;
  IsCash?: boolean;
  CashReceived?: number; // เงินสด
  Change?: number; // เงินทอน
  ParkingUsageCardID?: number;
  ParkingUsageCard?: ParkingUsageCardInterface;
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

export interface ParkingZoneDailyAndUsageCardData  {
  ParkingZoneDaily?: ParkingZoneDailyInterface;
  ParkingUsageCard?: ParkingUsageCardInterface;
}
