import { ListPhoneModel } from "./list-phone-model";

export class ListPhoneBrand {
    id : string;
    brandName : string;
    createdDate : Date;
    updatedDate : Date;
    brandModels : Array<ListPhoneModel>
}
