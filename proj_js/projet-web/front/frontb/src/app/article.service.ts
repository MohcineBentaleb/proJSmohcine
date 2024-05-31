import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from './article';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class ArticleServiceService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  //getArticlesByCategory(categoryId: number): Observable<Article[]> {
    //return this.http.get<Article[]>(${this.apiUrl}/articles?category=${categoryId});
 // }
  getArticlesByCategory(categoryId: number): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/articles?category=${categoryId}`);
  }
  
}
