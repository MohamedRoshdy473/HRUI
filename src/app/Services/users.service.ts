import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {User} from '../../app/Data_Types/user'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient:HttpClient) { }
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*'
       
  })};

  getAllUsers():Observable<User[]>
  {
    return this.httpClient.get<User[]>(`${environment.ApiURL}/users`,this.httpHeader);
  }
  GetUnregisteredUsers():Observable<User[]>
  {
    return this.httpClient.get<User[]>(`${environment.ApiURL}/users/GetUnregisteredUsers`,this.httpHeader);
  }
  addUser(NewUser:User)
  {
    return this.httpClient.post(`${environment.ApiURL}/Authenticate/register`,NewUser,this.httpHeader)
  }
  delete(id)
  {
    return this.httpClient.delete(`${environment.ApiURL}/users/`+id,this.httpHeader)
  }
}
