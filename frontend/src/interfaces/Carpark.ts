/* export interface BookCarParkInterface {
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
 */
export interface ParkingCardInterface {
  ID: string;
  ExpiryDate?: string;
  IsActive?: boolean;
  UpdatedAt?: string;
  TypePark?: {
    ID: number;
    Type: string;
  };
  StoreID?: number;
  MembershipCustomerID?: number;
  StatusCard?: {
    ID?: number;
    Status?: string;
  };
  ParkingFeePolicyID?: number;
  UserID?: number;
  ParkingZone?: {
    ID?: number;
    Name?: string;
    Image?: string;
    Capacity?: number;
    AvailableZone?: number;
    TypeParkID?: number;
  }[]; // Remove the array type here
  ParkingTransaction?: {
    EntryTime?: string; // ใช้ string แทน time
    ExitTime?: string; // ใช้ string แทน time
    Hourly_Rate?: number;
    Fee?: number;
    Image?: string;
    LicensePlate?: string;
    Color?: string;
    Make?: string;
    UserID?: number;
    StatusPaymentID?: number;
    ParkingCardID?: string;
    ParkingCard?: ParkingCardInterface;
    IsLostCard?: boolean;
    IsPaid?: boolean;
    IsCash?: boolean;
  }[];
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

export interface ParkingTransactionInterface {
  EntryTime?: string; // ใช้ string แทน time
  ExitTime?: string; // ใช้ string แทน time
  Hourly_Rate?: number;
  Fee?: number;
  Image?: string;
  LicensePlate?: string;
  Color?: string;
  Make?: string;

  UserID?: number;
  StatusPaymentID?: number;

  ParkingCardID?: string;
  ParkingCard?: ParkingCardInterface;

  IsLostCard?: boolean;
  IsPaid?: boolean;
  IsCash?: boolean;
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
  IssueDate?: string; // ใช้ string แทน time
  ExpiryDate?: string; // ใช้ string แทน time
}

/* export interface BackupCardInterface {
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
} */

export interface ParkingPaymentInterface {
  ID?: number;
  TaxID?: string;
  PaymentDate?: string; // ใช้ string แทน time
  Amount?: number;
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
