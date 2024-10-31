import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DEFAULT_PAGE_SIZE } from '../../../../shared/global.const';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent{
  @Input() totalEmployees: number = 0;
  @Input() pageSize: number = DEFAULT_PAGE_SIZE;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<{ page: number; size: number }>();

  onPageChange(event: PageEvent) {
    this.pageChange.emit({page: event.pageIndex + 1, size: event.pageSize});
  }
}
