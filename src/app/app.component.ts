import { Component } from '@angular/core';
import { ModalService } from './components/_modal';
import { Subscription } from 'rxjs';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
import { EventBusService } from './services/eventbus.service';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'focusUI';
  isLoggedIn = false;
  isAdmin = false;
  email!: String;
  eventBusSub?: Subscription;

  constructor(private modalService: ModalService, private storageService: StorageService, private authService: AuthService, private eventBusService: EventBusService){
    
  }

  ngOnInit(): void{
    this.isLoggedIn = this.storageService.isLoggedIn();
    if(this.isLoggedIn){
      const user: User = this.storageService.getUser();
      this.isAdmin = user.isAdmin;
      this.email = user.email;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.storageService.clean();
    window.location.reload();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
