import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit, Output, signal } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-content-table-admin',
  standalone: true,
  imports: [TitleCasePipe, NgClass, NgxPaginationModule],
  templateUrl: './content-table-admin.component.html',
  styleUrl: './content-table-admin.component.scss'
})
export class ContentTableAdminComponent implements OnInit {

  @Input() data!: object[];
  @Output() rowId = signal<string>("");

  displayedData = signal<any[]>([]);
  currentPage = signal(1);
  itemsPerPage = signal(10);
  totalPages = signal(0);

  ngOnInit(): void {
    this.pagination();
  }
  pagination():void {
    if (!this.data) {
      return;
    }
    this.totalPages.set(this.calcPages(this.data.length));
    this.changeDisplayedData();
  }
  changeDisplayedData(): void {
    this.displayedData.set(this.data.slice((this.currentPage() - 1) * this.itemsPerPage(), this.currentPage() * this.itemsPerPage()));
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
    if (this.calcPages(this.data.length) <= 3) {
      for (let i = 1; i <= this.calcPages(this.data.length); i++) {
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

  editRow(id: string): void {
    this.rowId.set(id);
  }
}