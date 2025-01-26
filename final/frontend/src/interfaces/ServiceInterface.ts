import { CategoryInventoryInterface, InventoryInterface } from "./InventoryInterface";
import { StoreInterface } from "./StoreInterface";
import { UsersInterface } from "./UsersInterface";
export interface ServiceInterface {
    ID?:                number;
    Location?:  		string ;
    Description?:  		string ;
    RequestDate?:  		Date ;
    StatusService?:  	string ;
    StoreID?:           number;
    Store?:             StoreInterface;
    UserID?:            number;
    User?: 				UsersInterface;
}
export interface EquipmentInterface {
    ID?:                number;
    Quantity?:  		number ;
    DateEquipment?:     Date ;
    InventoryID?:       number;
    Inventory?:         InventoryInterface;
    ServiceRequestID?:  number;
    Category?: 			CategoryInventoryInterface;
}