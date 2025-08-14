import { ListCountry } from "./list-country";
import { ListDistrict } from "./list-district";

export class ListCity {
    Id : string;
    cityName : string;
    cityCountry : ListCountry;
    cityDistricts : ListDistrict;
    createdDate : Date;
    updatedDate : Date;
}
