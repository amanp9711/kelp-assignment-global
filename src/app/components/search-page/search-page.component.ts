import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../../services/http.service';
import { StorageService } from '../../services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['login', 'html_url', 'avatar_url'];
  searchQuery: string = '';
  noDataFound: boolean = true;

  constructor(private httpService: HttpService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['query']){
        this.searchQuery = params['query'] ;
        this.search(true);
      }
    });
  }

  public search(skipSaveSearch?:boolean): void{
    this.searchQuery = this.searchQuery.trim();
    if(!this.searchQuery){
      return;
    }
    this.httpService.getUsers(this.searchQuery).subscribe((response:any) => {
      if(response.items?.length){
        this.noDataFound = false;
        this.dataSource.data = response.items;
      } else{
        this.noDataFound = true;
        this.dataSource.data = [];
      }
      if(!skipSaveSearch){
        this.storageService.saveSearch(this.searchQuery,response.items.length);
      }
    })
  }

  public clearSearch(): void{
    this.searchQuery = '';
    this.dataSource.data = [];
    this.noDataFound = true;
  }

}
