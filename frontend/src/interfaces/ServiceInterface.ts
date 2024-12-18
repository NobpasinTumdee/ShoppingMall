import { InventoryInterface } from "./InventoryInterface";
import { StoreInterface } from "./StoreInterface";
import { UsersInterface } from "./UsersInterface";

export interface ServiceInterface {
    ID: number;
    User?: UsersInterface;
    Store?:  StoreInterface;
    Location?: string;			
	ProblemDescription?: string;	
	RequestDate?: Date; 		
	EquipmentName?: string;		
	StatusService?: boolean;			
}
export interface EquipmentRequestInterface {
    ID: number;
    ServiceRequest?: ServiceInterface;
    Inventory?: InventoryInterface;	
    DateEquipment?: Date; 	
	EquipName?: string;			
	Quantity?: number; 				     	    		
}