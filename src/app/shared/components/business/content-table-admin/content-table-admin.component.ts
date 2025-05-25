import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit, Output, signal } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchBarAdminComponent } from "../search-bar-admin/search-bar-admin.component";

@Component({
  selector: 'app-content-table-admin',
  standalone: true,
  imports: [TitleCasePipe, NgClass, NgxPaginationModule, SearchBarAdminComponent],
  templateUrl: './content-table-admin.component.html',
  styleUrl: './content-table-admin.component.scss'
})
export class ContentTableAdminComponent implements OnInit {

  @Input({ required: true }) tableType!: string;
  @Input({ required: true }) tableHeaders!: string[];
  @Input({ required: true }) data!: object[];


  @Output() rowId = signal<string>("");

  searchBarPlaceholder = signal('Search for a category...');
  searchValue = signal('');

  usedData!: object[];
  displayedData = signal<any[]>([]);
  currentPage = signal(1);
  itemsPerPage = signal(10);
  totalPages = signal(0);
  optionShowed = signal(false);

  ngOnInit(): void {
    this.usedData = this.data;
    this.pagination();
  }
  pagination():void {
    if (!this.usedData) {
      return;
    }
    this.totalPages.set(this.calcPages(this.usedData.length));
    this.changeDisplayedData();
  }
  changeDisplayedData(): void {
    this.displayedData.set(this.usedData.slice((this.currentPage() - 1) * this.itemsPerPage(), this.currentPage() * this.itemsPerPage()));
  }
  calcPages(dataLength: number): number {
    return Math.ceil(dataLength / this.itemsPerPage());
  }
  changePage(page: number): void {
    this.currentPage.set(page);
    this.changeDisplayedData();
  }

  changePageNumbers(page: number): any[] {
    let pageNumbers = [];
    if (this.calcPages(this.usedData.length) <= 3) {
      for (let i = 1; i <= this.calcPages(this.usedData.length); i++) {
        pageNumbers.push(i);
      }
    }
    else if (page == 1 || page == 2) {
      pageNumbers = [1, 2, 3, '...', this.totalPages()];
    }
    else if (page == this.totalPages() || page == this.totalPages() - 1 || page == this.totalPages() - 2) {
      pageNumbers = [1, '...', (this.totalPages() - 2), (this.totalPages() - 1), this.totalPages()];
    }
    else {
      pageNumbers = [1, '...', (page - 1), page, (page + 1), '...', this.totalPages()];
    }
    return pageNumbers;
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  setRow(id: string): void {
    this.rowId.set(id);
  }

  changeSearchValue(value: string) {
    this.usedData = this.data;
    this.searchValue.set(value);
    console.log("Search value changed to:", this.searchValue());
    this.usedData = this.usedData.filter((item: any) => {
      return Object.values(item).some((val: any) => {
        if (typeof val === 'string') {
          return val.toLowerCase().includes(this.searchValue().toLowerCase());
        }
        return false;
      });
    })
    this.pagination()
  }
}