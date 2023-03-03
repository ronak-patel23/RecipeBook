import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dataStorage: DataStorageService
  ) {}
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.isAuthenticated = false;
    this.authService.logOut();
  }



  onSave() {
    this.dataStorage.storeRecipe().subscribe((res) => {
      console.log(res);
    });
  }
  onFetch() {
    this.dataStorage.fetchData().subscribe((res) => {
      console.log(res);
    });
  }
}
