import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/utils/constants';
import { TokenDto } from '../dto/response/token-dto';
import { Observable } from 'rxjs';
import { LoginDto } from '../dto/request/login-dto';
import { RecoveryPasswordRequestDto } from '../dto/request/recovery-password-request-dto';
import { Message } from '../dto/response/message';
@Injectable({
  providedIn: 'root'
})
export class AccessService {

 private URL: string = Constants.API_URL.URL+"auth";

 private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public login( dto:LoginDto): Observable<TokenDto> {
    return this.httpClient.post<TokenDto>(
      `${this.URL}`,dto
    );
  }

  public recoveryPassword( dto:RecoveryPasswordRequestDto): Observable<Message> {
    return this.httpClient.post<Message>(
      `${this.URL}/recovery`,dto
    );
  }
}
