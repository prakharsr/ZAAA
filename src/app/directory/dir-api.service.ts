import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable()
export class DirApiService {

  constructor(private api: ApiService) { }

}
