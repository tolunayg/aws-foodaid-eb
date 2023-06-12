export interface IGetDemands {
    _id:                 string;
    distributionPointId: string;
    creationDate:        Date;
    createdBy:           string;
    lastModifiedDate:    Date;
    lastModifiedBy:      string;
    requestItems:        RequestItem[];
}

export interface RequestItem {
    product:                string;
    quantity:               number;
    satisfiedQuantity:      number;
    unSatisfiedQuantity:    number;
    customFields: {
        [key: string]:      string;
    };
    status:                 string;
}
