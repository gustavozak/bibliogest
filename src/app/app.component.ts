import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Bookmarks', url: '/bookmarks', icon: 'bookmark' },
    { title: 'Home', url: '/home', icon: 'home' },
  ];
  

}
