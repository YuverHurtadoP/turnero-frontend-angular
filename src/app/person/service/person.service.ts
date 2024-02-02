import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/utils/constants';
import { PersonRequestDto } from '../dto/request/person-request-dto';

@Injectable({
  providedIn: 'root'
})
export class PersonService {


  private URL: string = Constants.API_URL.URL+"person";

  private httpClient: HttpClient;

   constructor(httpClient: HttpClient) {
     this.httpClient = httpClient;
   }

   public registerPerson( dto:PersonRequestDto): Observable<any> {
    return this.httpClient.post<any>(
      `${this.URL}`,dto
    );
  }

}
