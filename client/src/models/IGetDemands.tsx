export interface IGetDemands {
    _id:                 string;
    distributionPointId: string;
    creationDate:        Date;
    createdBy:           number;
    lastModifiedDate:    Date;
    lastModifiedBy:      number;
    requestItems:        RequestItem[];
}

export interface RequestItem {
    productId?:  number;
    quantity:    number;
    categoryId?: number;
}
