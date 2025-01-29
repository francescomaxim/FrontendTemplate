import { Component, inject, OnInit } from '@angular/core';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent implements OnInit {
  //config part
  private config = inject(ConfigService);
  heroConfig = this.config.heroConfig;
  ngOnInit(): void {
    this.config.getHeroConfig();
  }
}
