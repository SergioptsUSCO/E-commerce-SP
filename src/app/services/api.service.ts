import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ApiService {
    private http = inject(HttpClient);
    private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    getItems(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }
}