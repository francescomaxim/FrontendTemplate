import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectorRef,
  Input,
  signal,
  inject,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() isMobileView!: boolean;
  isOpen = signal<true | false>(false); // Sidebar-ul este inițial închis

  constructor(private cdr: ChangeDetectorRef) {}

  toggleSidebar() {
    this.isOpen.set(!this.isOpen());
    this.cdr.detectChanges();
  }

  private config = inject(ConfigService);
  sideMenuConfig = this.config.sideMenuConfig;

  ngOnInit(): void {
    this.config.getSideMenuConfig();
  }
}
