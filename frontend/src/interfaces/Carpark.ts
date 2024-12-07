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
  ID: string;
  ExpiryDate?: string;
  EntryTime?: string;
  ExitTime?: string;
  Hourly_rate?: string;
  Fee?: number;
  LicensePlate?: string;
  TypePark?: {
    ID: number;
    Type: string;
  };
  StoreID?: number;
  MembershipCustomerID?: number;
  StatusCard?: {
    ID: number;
    Status?: string;
  };
  StatusPaymentID?: number;
  ParkingFeePolicyID?: number;
  UserID?: number;
  ParkingZone?: {
    ID?: number;
    Name?: string;
    Image?: string;
    Capacity?: number;
    AvailableZone?: number;
    TypeParkID?: number;
  } [];  // Remove the array type here
  BackupCard?: BackupCardInterface[];
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
  TypePark?: TypeParkInterface;
  ParkingCard?: ParkingCardInterface[]; // หลายๆ ParkingCard
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

export interface StatusPaymentInterface {
  ID?: number;
  Status?: string;
  ParkingCard?: ParkingCardInterface[]; // หลายๆ ParkingCard
}

export interface ParkingFeePolicyInterface {
  ID?: number;
  FreeHours?: number;
  AddBase_Fee?: number;
  Time_Increment?: string; // ใช้ string แทน time
  Discount?: number;
  LostCard?: number;
  IsExempt?: boolean;
  TypeParkID?: number;
  TypePark?: TypeParkInterface;

  ParkingCard?: ParkingCardInterface[]; // หลายๆ ParkingCard
}

export interface MembershipCustomerInterface {
  ID?: number;
  FirstName?: string;
  LastName?: string;
  DOB?: string; // ใช้ string แทน time
  Tel?: string;
  HistoryMembership?: HistoryMembershipInterface[];
}

export interface HistoryMembershipInterface {
  ID?: number;
  IssueDate?: string; // ใช้ string แทน time
  ExpiryDate?: string; // ใช้ string แทน time
  MembershipCustomerID?: number;
  MembershipCustomer?: MembershipCustomerInterface;
}

export interface BackupCardInterface {
  EntryTime?: string; // ใช้ string แทน time
  ExitTime?: string; // ใช้ string แทน time
  Hourly_rate?: string; // ใช้ string แทน time
  Fee?: number;
  LicensePlate?: string;

  UserID?: number;

  ParkingCardID?: string;
  ParkingCard?: ParkingCardInterface;

  ParkingPaymentID?: number;
  ParkingPayment?: ParkingPaymentInterface;
}

export interface ParkingPaymentInterface {
  ID?: number;
  TaxID?: string;
  PaymentDate?: string; // ใช้ string แทน time
  IsLostCard?: boolean;
  IsPaid?: boolean;
  IsCash?: boolean;
  UsageCardID?: string;
  UsageCard?: UsageCardInterface;
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
