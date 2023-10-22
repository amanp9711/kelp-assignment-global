import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HistoryData, StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private storageService: StorageService, private router: Router){

  }
  dataSource = new MatTableDataSource<HistoryData>([]);
  displayedColumns: string[] = ['searchString', 'usersResultCount', 'searchResult', 'deleteButton'];
  noDataFound: boolean = true;
  ngOnInit(): void {
    this.getHistory();
  }

  getHistory(): void{
    const historyData:HistoryData[] = this.storageService.getSearchHistory();
    if(historyData.length > 0) {
      this.noDataFound = false;
      this.dataSource.data = historyData;
    } else {
      this.dataSource.data = [];
      this.noDataFound = true;
    }
  }

  deleteHistory(id:string): void{
     this.storageService.deleteSearch(id);
     this.getHistory();
  }

  navigateToSearchPage(searchString: string): void {
    // Navigate to the search page and pass the search string as a route parameter
    this.router.navigate(['/search', { query: searchString }]);
  }

}
