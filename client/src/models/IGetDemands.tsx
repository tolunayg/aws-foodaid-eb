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
    product:        string;
    quantity:           number;
    customFields: {
        [key: string]: string;
    };
    status:         string;
}
