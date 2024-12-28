export interface ParkingCardInterface {
  ID?: string;
  IsPermanent?: boolean;
  ExpiryDate?: string;
  UpdatedAt?: string;
  TypePark?: {
    ID?: number;
    Type?: string;
  };
  StoreID?: number;
  MembershipCustomerID?: number;
  StatusCard?: {
    ID?: number;
    Status?: string;
  };
  UserID?: number;
  TypeParkID?: number;
  StatusCardID?: number;
  ParkingFeePolicyID?: number;
  User?: {
    ID?: number;
    UserName?: string;
    Password?: string;
    Email?: string;
    Profile?: string;
    ProfileBackground?: string;
    FirstName?: string;
    LastName?: string;
    Age?: number;
    Tel?: string;
    Status?: string;
  };
  ParkingZone?: {
    ID?: number;
    Name?: string;
    Image?: string;
    Capacity?: number;
    AvailableZone?: number;
    ReservedCapacity?: number;
    ReservedAvailable?: number;
    TypeParkID?: number;
  }[];
  ParkingTransaction?: {
    ID(ID: any, updateTransactionData: { LicensePlate: string; Image: string; Color: string; Make: string; ParkingCardID: string | undefined; StatusPaymentID: number; ParkingZoneID: number | undefined; UserID: number; }): unknown;
    ReservationDate?: string;
    IsReservedPass?: boolean;
    EntryTime?: string;
    ExitTime?: string;
    Hourly_Rate?: number;
    Image?: string;
    LicensePlate?: string;
    Color?: string;
    Make?: string;
    ParkingZoneID?: number;
    ParkingZone?: {
      ID?: number;
      Name?: string;
      Image?: string;
      Capacity?: number;
      AvailableZone?: number;
      ReservedCapacity?: number;
      ReservedAvailable?: number;
      TypeParkID?: number;
    }[];
    UserID?: number;
    StatusPaymentID?: number;
    ParkingCardID?: string;
    ParkingCard?: ParkingCardInterface;
  }[];
  ParkingPayment?: {
    ID?: number;
    TaxID?: string;
    PaymentDate?: string;
    Amount?: number;
    DiscountAmount?: number;
    NetAmount?: number;
  };
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
  ReservedCapacity?: number;
  ReservedAvailable?: number;
  TypeParkID?: number;
  TypePark?: TypeParkInterface;
  ParkingCard?: ParkingCardInterface[]; // หลายๆ ParkingCard
}

export interface ParkingTransactionInterface {
  ReservationDate?: string;
  IsReservedPass?: boolean;
  EntryTime?: string;
  ExitTime?: string;
  Hourly_Rate?: number;
  Image?: string;
  LicensePlate?: string;
  Color?: string;
  Make?: string;

  UserID?: number;
  StatusPaymentID?: number;
  ParkingZone?: {
    ID?: number;
    Name?: string;
    Image?: string;
    Capacity?: number;
    AvailableZone?: number;
    ReservedCapacity?: number;
    ReservedAvailable?: number;
    TypeParkID?: number;
  }[];
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
  IsExempt?: boolean;
  TypeParkID?: number;
  TypePark?: TypeParkInterface;

  ParkingCard?: ParkingCardInterface[]; // หลายๆ ParkingCard
}

export interface ParkingPaymentInterface {
  ID?: number;
  TaxID?: string;
  PaymentDate?: string;
  Amount?: number;
  DiscountAmount?: number;
  NetAmount?: number;
  ParkingTransaction?: {
    ReservationDate?: string;
    IsReservedPass?: boolean;
    EntryTime?: string;
    ExitTime?: string;
    Hourly_Rate?: number;
    Image?: string;
    LicensePlate?: string;
    Color?: string;
    Make?: string;
    UserID?: number;
    StatusPaymentID?: number;
    ParkingCardID?: string;
    ParkingCard?: ParkingCardInterface;
  }[];
  ParkingCardID?: string;
  StatusPayment?: {
    ID?: number;
    Status?: string;
    ParkingCardID?: string;
    ParkingCard?: ParkingCardInterface;
  }[];
  UserID?: number;
}
export interface VehicleInterface {
  ID?: number;
  LicensePlate?: string;
  Image?: string;
  Color?: string;
  Make?: string;
  UserID?: number;
}

/* export interface MembershipCustomerInterface {
  ID?: number;
  FirstName?: string;
  LastName?: string;
  DOB?: string; // ใช้ string แทน time
  Tel?: string;
  IssueDate?: string; // ใช้ string แทน time
  ExpiryDate?: string; // ใช้ string แทน time
} */