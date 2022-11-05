import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../services/storage/product.service";
import {ProductNameService} from "../../../services/storage/product-name.service";
import {AuthService} from "../../../shared/services/auth.service";
import {finalize, map, of, switchMap, tap, throwError} from "rxjs";
import {JwtUser} from "../../../shared/entities/user/jwt-user.model";
import {FormUtil} from "../../../utils/form.util";
import {Product} from "../model/product.model";
import {Page} from "../../../shared/entities/api/page.model";

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {

  public user: JwtUser = JwtUser.fromObject({} as JwtUser);
  public page: Page<Product> | undefined;
  public loading: boolean = false;
  constructor(
    private readonly activateRoute: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly productNameService: ProductNameService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.activateRoute.params.pipe(
      map(({ id }) => +id),
      switchMap(id => {
        if(!FormUtil.isNumberCorrectId(id) || !this.authService.isOwnUserId(id)) {
          this.router.navigate(['/']);
          return throwError(() => "Wrong user id passed");
        }
        return this.authService.user$.pipe(
          switchMap(user => user ? of(user) : throwError(() => "User does not exists"))
        );
      })
    ).subscribe(user => {
      this.user = user;
      this.getProducts();
    })
  }

  public ngOnInit(): void {
  }

  public getProducts(): void {
    this.loading = true;
    this.productService.getProducts()
      .pipe(finalize(() => this.loading = false))
      .subscribe(page => this.page = page);
  }

  loadProducts($event: any): void {
    console.log($event)
  }

  addProduct(): void {

  }
}
