import { Injectable, inject, signal } from "@angular/core";
import { Product } from "./product.model";
import { HttpClient } from "@angular/common/http";
import {catchError, map, Observable, of, tap} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: "root"
}) export class ProductsService {

    private readonly http = inject(HttpClient);
    private readonly path = "/api/products";
    private readonly path2 = "products";

    private readonly _products = signal<Product[]>([]);

    public readonly products = this._products.asReadonly();

    public get(): Observable<Product[]> {
        return this.http.get<Product[]>(`${environment.url.products + this.path2}`).pipe(
            map((res: any) => res.content),
            tap((products) => this._products.set(products)),
        );
    }

    public create(product: Product): Observable<Product> {
      return this.http.post<Product>(`${environment.url.products + this.path2}`, product).pipe(
        catchError(() => {
          console.error("error with create this product");
          return of(product);
        }),
        tap((res:Product) => this._products.update(products => [res, ...products]))
      )
    }

    public update(product: Product): Observable<boolean> {
        return this.http.patch<boolean>(`${environment.url.products + this.path2}/${product.id}`, product).pipe(
            catchError(() => {
                return of(false);
            }),
            tap(() => this._products.update(products => {
                return products.map(p => p.id === product.id ? product : p)
            })),
        );
    }

    public delete(productId: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.path}/${productId}`).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._products.update(products => products.filter(product => product.id !== productId))),
        );
    }
}
