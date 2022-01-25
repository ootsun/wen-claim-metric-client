import {Component, HostListener, OnInit} from '@angular/core';
import {SecurityService} from '@services/security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private securityService: SecurityService
  ) {}

  ngOnInit() {
  }

  @HostListener('document:click', ['$event'])
  private onClick(event: any) {
    this.securityService.onClick();
  }
}
