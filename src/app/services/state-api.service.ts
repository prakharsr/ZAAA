import { Injectable } from '@angular/core';

@Injectable()
export class StateApiService {

  constructor() { }

  get states() : string[] {
    return [
      "Andra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jammu and Kashmir",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Orissa",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Tripura",
      "Uttaranchal",
      "Uttar Pradesh",
      "West Bengal",
      "Andaman and Nicobar Islands",
      "Dadar and Nagar Haveli",
      "Daman and Diu",
      "Delhi",
      "Lakshadeep",
      "Pondicherry"
    ];
  }

}
