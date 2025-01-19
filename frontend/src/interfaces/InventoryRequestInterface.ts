import { UsersInterface } from "./UsersInterface";

export interface InventoryRequestInterface{
    ID?:                            number ;
    NameItem?:                 string ;
    DateRequest?:             Date ;
    QuantityRequest?:      number ;
    Reason?:               string;
    UserID?:               number;
    User?:        UsersInterface;
    RequestDetails?: RequestDetailInterface[];
}

export interface RequestDetailInterface{
    ID?:        number ;
    InventoryID?:   number;
    RequestID?:   number;
    StatusRequest?: boolean;
    Reason?:     string;
}