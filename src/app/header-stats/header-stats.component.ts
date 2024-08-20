import { Component, Input } from '@angular/core';
import { CardStatsComponent } from "../card-stats/card-stats.component";

@Component({
  selector: 'app-header-stats',
  standalone: true,
  imports: [CardStatsComponent],
  templateUrl: './header-stats.component.html',
  styleUrl: './header-stats.component.css',
})
export class HeaderStatsComponent {
  @Input() totalColis: number = 0;
  @Input() colisLivres: number = 0;
  @Input() colisRetards: number = 0;
}
