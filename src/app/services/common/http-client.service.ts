import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient : HttpClient, @Inject("baseUrl") private baseUrl : string)  { }
  private url(RequestParameter : Partial<RequestParameters>): string {
    return `${RequestParameter.baseUrl ? RequestParameter.baseUrl : this.baseUrl}/${RequestParameter.controller}${RequestParameter.action ? `/${RequestParameter.action}` : ""}`;
  }
  get<T>(RequestParameter : Partial<RequestParameters>, id? : string) : Observable<T>{
    let url: string = "";
    if (RequestParameter.fullEndPoint)
      url = RequestParameter.fullEndPoint;
    else
      url = `${this.url(RequestParameter)}${id ? `/${id}`: ""}${RequestParameter.queryString ? `?${RequestParameter.queryString}` : ""}`;
    return this.httpClient.get<T>(url,{headers : RequestParameter.headers});
  }
  post<T>(RequestParameter : Partial<RequestParameters>, body : Partial<T>) : Observable<T>{
    let url : string = "";
    if (RequestParameter.fullEndPoint)
      url = RequestParameter.fullEndPoint;
    else
      url = `${this.url(RequestParameter)}${RequestParameter.queryString ? `?${RequestParameter.queryString}` : ""}`;
    return this.httpClient.post<T>(url,body,{headers : RequestParameter.headers});

  }
  put<T>(RequestParameter : Partial<RequestParameters>, body : Partial<T>) : Observable<T>{
    let url : string = "";
    if (RequestParameter.fullEndPoint)
      url = RequestParameter.fullEndPoint;
    else
      url = `${this.url(RequestParameter)}${RequestParameter.queryString ? `?${RequestParameter.queryString}` : ""}`;
    return this.httpClient.put<T>(url,body,{headers : RequestParameter.headers})

  }
  delete<T>(RequestParameter : Partial<RequestParameters>,id : string) : Observable<T> {
    let url : string = "";
    if (RequestParameter.fullEndPoint)
      url = RequestParameter.fullEndPoint;
    else
      url = `${this.url(RequestParameter)}/${id}${RequestParameter.queryString ? `?${RequestParameter.queryString}` : ""}`;
    return this.httpClient.delete<T>(url,{headers : RequestParameter.headers})
  }
}


export class RequestParameters{
  controller? : string;
  action? : string;
  queryString? : string;

  headers? : HttpHeaders;
  baseUrl?:string;
  fullEndPoint? : string;
}