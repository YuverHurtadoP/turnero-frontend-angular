import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/utils/constants';
import { DocumentTypeDto } from '../dto/response/document-type-dto';
import { DepartmentResponseDto } from '../dto/response/department-response-dto';
import { MunicipalityResponseDto } from '../dto/response/municipality-response-dto';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private URL: string = Constants.API_URL.URL;
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
   }

   getListDocumentType(): Observable<DocumentTypeDto[]> {
    return this.httpClient.get<DocumentTypeDto[]>(
      `${this.URL}document/list`
    );
  }

  getListDepartment(): Observable<DepartmentResponseDto[]> {
    return this.httpClient.get<DepartmentResponseDto[]>(
      `${this.URL}department/list`
    );
  }

  getMunicipalityList(departmentId: number): Observable<MunicipalityResponseDto[]> {
    const url = `${this.URL}municipality/list/${departmentId}`;
    return this.httpClient.get<MunicipalityResponseDto[]>(url);
  }
}
