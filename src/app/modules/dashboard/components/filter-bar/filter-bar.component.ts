import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss'
})
export class FilterBarComponent{
  @Input() usernameFilter: string = '';
  @Input() firstNameFilter: string = '';
  @Input() sortField: string = '';

  @Output() filterChange = new EventEmitter<{ username: string; firstName: string; sortField: string }>();

  onFilterChange() {
    this.filterChange.emit({
      username: this.usernameFilter,
      firstName: this.firstNameFilter,
      sortField: this.sortField
    });
  }

}
