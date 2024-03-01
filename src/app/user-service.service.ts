import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
// import 'rxjs/add/operator/map';
import {User} from "../shared/models/user/model"
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  getAllUser() {
    throw new Error('Method not implemented.');
  }
  
  url: string =``
 
  api_url: string = "https://jsonplaceholder.typicode.com/users";
  
  getAlluser: any;
    constructor(private _http: HttpClient) {
      this.url=`http://localhost:3000/users`
   
     }
    getUser(): Observable<User[]> {
        return this._http
            .get < any[] > (this.api_url)           
                .pipe(tap((User:any)=> JSON.stringify(User)))
    }

    addUser(user: User): Observable<any>{
      return this._http.post(this.url,user)
    }

    GetAllUser(): Observable<any>{
      return this._http.get(this.url)
    }

    deleteUser(id:number): Observable<any>{
      return this._http.delete(this.url+"/"+id)
    }

    getUsreEdit(id:any): Observable<any>{
      return this._http.get(this.url+"/"+id)
    }

   
    updateUser(user: User, id:number): Observable<User>{
      return this._http.put<User>(this.url+"/"+user.id,user)
    }

    
    
  
}
