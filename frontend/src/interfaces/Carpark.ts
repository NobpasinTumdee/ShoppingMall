export interface BookCarParkInterface {
  key?: string; // Change from string to string | undefined
  idcard: string;
  TypeCardID: number;
  TypeCard?: string;
  status?: string[];
  EntryTime: string;
  ExitTime: string;
  idzone?: number[];
  NameZone: string[];
  Image: string[];
  Capacity: number;
  Available: number;
  LicensePlate: string;
  UserID: number;
}

export interface ParkingCardInterface {
  ID?: string;
  ExpiryDate?: string;
  StoreID?: number;
  TypeParkID?: number;
  StatusCardID?: number;
  MembershipCustomerID?: number;
  ParkingZone?: ParkingZoneInterface[]; // หลายๆ ParkingZone
  UsageCard?: UsageCardInterface;
}

export interface ParkingCardZoneInterface {
  ParkingCardID?: string;
  ParkingZoneID?: number;
  CreatedAt?: string; // ใช้ string แทน time
  DeletedAt?: string; // ใช้ string แทน time
  ParkingCard?: ParkingCardInterface;
  ParkingZone?: ParkingZoneInterface;
}

export interface ParkingZoneInterface {
  ID?: number;
  Name?: string;
  Image?: string;
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
  EntryTime?: string; 
  ExitTime?: string; 
  Hourly_rate?: string;
  Fee?: number;
  LicensePlate?: string;
  UserID?: number;
  ParkingCardID?: string;
  StatusPaymentID?: number;
  ParkingFeePolicyID?: number;
  ParkingPayment?: ParkingPaymentInterface[];
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
