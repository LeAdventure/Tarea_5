import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsService } from 'src/app/services/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  data: any;

  constructor(public router: Router, private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getData('top-headlines?country=us').subscribe(data => {
      console.log(data);
      this.data = data;
    });
  }

  gotoarticle(article){
    this.newsService.currentArticle = article;
    this.router.navigate(['/single']);
  }

}

