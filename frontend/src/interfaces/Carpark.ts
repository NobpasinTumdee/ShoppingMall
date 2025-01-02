export interface ParkingCardInterface {
  ID?: string;
  IsPermanent?: boolean;
  ExpiryDate?: string;
  UpdatedAt?: string;
  TypePark?: {
    ID?: number;
    Type?: string;
  };
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
    MaxCapacity?: number;
    MaxReservedCapacity?: number;
    TypeParkID?: number;
  }[];
  ParkingTransaction?: {
    ID(
      ID: any,
      updateTransactionData: {
        LicensePlate: string;
        Image: string;
        Color: string;
        Make: string;
        ParkingCardID: string | undefined;
        StatusPaymentID: number;
        ParkingZoneID: number | undefined;
        UserID: number;
      }
    ): unknown;
    ReservationDate?: string;
    IsReservedPass?: boolean;
    EntryTime?: string;
    ExitTime?: string;
    Hourly_Rate?: number;
    Image?: string;
    LicensePlate?: string;
    Color?: string;
    Make?: string;
    ParkingZoneDailyID?: number;
    ParkingZoneDaily?: {
      ID?: number;
      Date?: string;
      TotalVisitors?: number;
      AvailableZone?: number;
      ReservedAvailable?: number;
      ParkingZone?: {
        ID?: number;
        Name?: string;
        Image?: string;
        MaxCapacity?: number;
        MaxReservedCapacity?: number;
        TypeParkID?: number;
      };
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
    IsCash?: boolean;
  };
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
  ParkingCard?: ParkingCardInterface[]; // หลายๆ ParkingCar
}

export interface ParkingZoneDailyInterface {
  ID?: number;
  Date?: string;
  TotalVisitors?: number;
  AvailableZone?: number;
  ReservedAvailable?: number;
  ParkingZone?: {
    ID?: number;
    Name?: string;
    Image?: string;
    MaxCapacity?: number;
    MaxReservedCapacity?: number;
    TypeParkID?: number;
  };
}

/* export interface ParkingZoneDailyMapInterface {
  ParkingZoneDailyID?: number;
  ParkingZoneID?: number;
  ParkingZoneDaily?: ParkingZoneDailyInterface;
  ParkingZone?: ParkingZoneInterface;
}
 */
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
  ParkingZoneDailyID?: number;
  ParkingZoneDaily?: {
    ID?: number;
    Date?: string;
    TotalVisitors?: number;
    AvailableZone?: number;
    ReservedAvailable?: number;
    ParkingZone?: {
      ID?: number;
      Name?: string;
      Image?: string;
      MaxCapacity?: number;
      MaxReservedCapacity?: number;
      TypeParkID?: number;
    };
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

/* export interface StatusPaymentInterface {
  ID?: number;
  Status?: string;
  ParkingCard?: ParkingCardInterface[]; // หลายๆ ParkingCard
} */

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
  IsCash?: boolean;
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
    ParkingZoneDailyID?: number;
    ParkingZoneDaily?: {
      ID?: number;
      Date?: string;
      TotalVisitors?: number;
      AvailableZone?: number;
      ReservedAvailable?: number;
      ParkingZone?: {
        ID?: number;
        Name?: string;
        Image?: string;
        MaxCapacity?: number;
        MaxReservedCapacity?: number;
        TypeParkID?: number;
      };
    };
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
