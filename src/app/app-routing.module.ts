import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { accessGuard } from './common/access.guard';
import { InstructionPageComponent } from './components/instruction-page/instruction-page.component';

const routes: Routes = [
  { path: '', component: InstructionPageComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent,canActivate:[accessGuard]},
  { path: 'orders', component: OrdersComponent, canActivate:[accessGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
