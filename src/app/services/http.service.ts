import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private githubUrl: string = 'https://api.github.com/search/users';
  constructor(public httpClient: HttpClient) { }

  public getUsers(searchString: string): Observable<any> {
    return this.httpClient.get(`${this.githubUrl}?q=${searchString}`);
  }

}
