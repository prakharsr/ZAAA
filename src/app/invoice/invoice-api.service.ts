import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable()
export class InvoiceApiService {

  constructor(private api: ApiService) { }

}
