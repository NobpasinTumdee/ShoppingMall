export interface BookCarParkInterface {
  key?: string; // Change from string to string | undefined
  idcard: string;
  TypeCard?: string;
  status?: string[];
  idzone?: string[];
  NameZone: string[];
  Image: string[];
  Capacity: number[];
  Available: number[];
  LicensePlate: string[];
  UserID: number;
}

export interface ParkingCardInterface {
  ID?: number;
  ExpiryDate?: string; // ใช้ string แทน time เพราะไม่สามารถใช้ date ได้ใน TypeScript
  StoreID?: number;
  TypeParkID?: number;
  StatusCardID?: number;
  MembershipCustomerID?: number;
  ParkingZone?: ParkingZoneInterface[]; // หลายๆ ParkingZone
  UsageCard?: UsageCardInterface;
}

export interface ParkingCardZoneInterface {
  ParkingCardID?: number;
  ParkingZoneID?: number;
  CreatedAt?: string; // ใช้ string แทน time
  DeletedAt?: string; // ใช้ string แทน time
  ParkingCard?: ParkingCardInterface;
  ParkingZone?: ParkingZoneInterface;
}

export interface ParkingZoneInterface {
  ID?: number;
  Name?: string;
  Capacity?: number;
  AvailableZone?: number;
  TypeParkID?: number;
  ParkingCard?: ParkingCardInterface[]; // หลายๆ ParkingCard
}

export interface TypeParkInterface {
  ID?: number;
  Type?: string;
  ParkingCard?: ParkingCardInterface[]; // หลายๆ ParkingCard
  ParkingZone?: ParkingZoneInterface[]; // หลายๆ ParkingZone
}

export interface StatusCardInterface {
  ID?: number;
  Status?: string;
  ParkingCard?: ParkingCardInterface[]; // หลายๆ ParkingCard
}

export interface StatusPaymentInterface {
  ID?: number;
  Status?: string;
  UsageCard?: UsageCardInterface[]; // หลายๆ UsageCard
}

export interface UsageCardInterface {
  ID?: number;
  EntryTime?: string; // ใช้ string แทน time
  ExitTime?: string; // ใช้ string แทน time
  Hourly_rate?: string; // ใช้ string แทน time
  Fee?: number;
  LicenseNo?: string;
  UserID?: number;
  ParkingCardID?: number;
  StatusPaymentID?: number;
  ParkingFeePolicyID?: number;
  ParkingPayment?: ParkingPaymentInterface[]; // หลายๆ ParkingPayment
}

export interface ParkingFeePolicyInterface {
  ID?: number;
  FreeHours?: number;
  AddBase_Fee?: number;
  Time_Increment?: string; // ใช้ string แทน time
  Discount?: number;
  LostCard?: number;
  IsExempt?: boolean;
  ParkingCardZoneID?: number;
  ParkingCardZone?: ParkingCardZoneInterface;
  UsageCard?: UsageCardInterface[]; // หลายๆ UsageCard
}

export interface MembershipCustomerInterface {
  ID?: number;
  FirstName?: string;
  LastName?: string;
  DOB?: string; // ใช้ string แทน time
  Tel?: string;
  HistoryMembership?: HistoryMembershipInterface[]; // หลายๆ HistoryMembership
}

export interface HistoryMembershipInterface {
  ID?: number;
  IssueDate?: string; // ใช้ string แทน time
  ExpiryDate?: string; // ใช้ string แทน time
  MembershipCustomerID?: number;
  MembershipCustomer?: MembershipCustomerInterface;
}

export interface ParkingPaymentInterface {
  ID?: number;
  TaxID?: string;
  PaymentDate?: string; // ใช้ string แทน time
  IsLostCard?: boolean;
  IsPaid?: boolean;
  IsCash?: boolean;
  UsageCardID?: number;
  UsageCard?: UsageCardInterface;
}