import { ListPhoneModelImage } from "./list-phone-model-image";
export class ListPhoneModel {
    id : string;
    modelName : string;  
    modelFirstPrice : number;
    modelLastPrice : number;
    brandName : string;
    //modelPhoto : File;
    //phoneBrand : PhoneBrand
    CreatedDate : Date;
    UpdatedDate : Date;
    phoneModelImageFile : ListPhoneModelImage
}
