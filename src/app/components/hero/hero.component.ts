import { Component, inject, OnInit } from '@angular/core';
import { ConfigService } from '../../config.service';
import { config } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent implements OnInit {
  //config part
  private config = inject(ConfigService);
  heroConfig = this.config.heroConfig;
  headerConfig = this.config.headerConfig;
  ngOnInit(): void {
    this.config.getHeroConfig();
  }
}
