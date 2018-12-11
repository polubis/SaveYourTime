import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  template: `
    <div class="notifications">
      <app-notification *ngFor="let notification of notifications" [type]="notification.type" [content]="notification.content">
      </app-notification>
    </div>

  `,
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [
    {id: 0, content: 'Your new account has been succesfully created !', icon: 'check', type: 'ok'},
    // {id: 1, content: 'Your new account has been succesfully edited !'},
    // {id: 2, content: 'Your new account has been succesfully edited !'},
    // {id: 3, content: 'Your new account has been succesfully edited !'},
    // {id: 4, content: 'Your new account has been succesfully edited !'},
  ];
  constructor() { }

  ngOnInit() {
  }


}
