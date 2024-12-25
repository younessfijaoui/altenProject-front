import {Component, inject} from "@angular/core";
import { RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ProductsService } from "app/products/data-access/products.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  standalone: true,
  imports: [CardModule, RouterLink, ButtonModule],
})
export class HomeComponent {
  private readonly productsService = inject(ProductsService);
  public readonly products = this.productsService.products;
  ngOnInit() {
    this.productsService.get().subscribe();
  }
}
