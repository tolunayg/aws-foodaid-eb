export interface IGetTransportation {
    _id:                 string;
    vehicleType:         string;
    vehiclePlate:        string;
    demandId:            string;
    collectionPointId:   string;
    distributionPointId: string;
    transportationItems: TransportationItem[];
    loadingDate:         Date;
    approvedUser:        string;
    arrivingDate:        Date;
}

export interface TransportationItem {
    product:      string;
    customFields: CustomFields;
    quantity:     number;
}

export interface CustomFields {
}
