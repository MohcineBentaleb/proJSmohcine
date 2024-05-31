import { Component, OnInit } from '@angular/core';
import { ArticleServiceService } from '../article.service';
import { Article } from '../article';
import { Category } from '../category';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articl.component.html',
  styleUrls: ['./articl.component.css'],
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,CommonModule]
})
export class ArticlesComponent implements OnInit {
  categories: Category[] = [];
  selectedArticles: Article[] = [];

  constructor(private articleService: ArticleServiceService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.articleService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onSelectCategory(categoryId: number): void {
    this.articleService.getArticlesByCategory(categoryId).subscribe(articles => {
      this.selectedArticles = articles;
    });
  }
}
