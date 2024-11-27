export interface InventoryInterface{
    ID?:                            number ;
    InventoryName?:                 string ;
    QuantityInventory?:             number ;
    CategoryID?:                    number ;

    CategoryInventory?:             CategoryInventoryInterface ;
}

export interface CategoryInventoryInterface{
    ID?:                            number ;
    CategoryName?:                  string ;
}