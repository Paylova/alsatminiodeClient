import { ListPhoneModel } from "./list-phone-model";
import { ListPhoneQuestion } from "./list-phone-question";

export class ListPhoneCost{
    id : string;
    phoneQuestion : ListPhoneQuestion;
    phoneModel : ListPhoneModel;
    phoneCost : number;
    createdDate : Date;
    updatedDate : Date;

}