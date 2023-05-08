export interface IGetProducts {
    _id:               string;
    name:              string;
    productCategoryId: number;
    unit:              string;
    fields: {
        [key: string]: string;
    };
}

// export interface Field {
//     name:         string;
//     datatype:     string;
//     displayNames: DisplayNames;
// }

// export interface DisplayNames {
//     tr: string;
//     en: string;
// }
