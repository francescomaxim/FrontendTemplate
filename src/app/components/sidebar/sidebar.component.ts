import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, Input, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() isMobileView!: boolean;
  isOpen = signal<true | false>(false); // Sidebar-ul este inițial închis

  constructor(private cdr: ChangeDetectorRef) {}

  toggleSidebar() {
    this.isOpen.set(!this.isOpen());
    this.cdr.detectChanges();
  }
}
