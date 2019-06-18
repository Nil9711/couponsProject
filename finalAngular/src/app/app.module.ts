import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterPageComponent } from './register-page/register-page.component';
import { CouponsComponent } from './coupons/coupons.component';
import { CustomersComponent } from './customers/customers.component';
import { UsersComponent } from './users/users.component';
import { CompaniesComponent } from './companies/companies.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { EditInfoComponent } from './customers/edit-info/edit-info.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { AddCouponComponent } from './companies/add-coupon/add-coupon.component';
import { AddCompanyComponent } from './administrator/add-company/add-company.component';
import { DeleteCouponComponent } from './companies/delete-coupon/delete-coupon.component';
import { UpdateCouponComponent } from './companies/update-coupon/update-coupon.component';
import { AddUserComponent } from './administrator/add-user/add-user.component';
import {MatTableModule} from '@angular/material/table';





const routes: Routes = [
    { path: "users/login", component: LoginPageComponent },
    { path: "customers", component: CustomersComponent },
    { path: "customers/register", component: RegisterPageComponent },
    { path: "customers/editInfo", component: EditInfoComponent },
    { path: "coupons", component: CouponsComponent },
    { path: "companies", component: CompaniesComponent },
    { path: "companies/addCoupon", component: AddCouponComponent },              
    { path: "companies/updateCoupon", component: UpdateCouponComponent },              
    { path: "companies/deleteCoupon", component: DeleteCouponComponent },              
    { path: "purchases", component: PurchasesComponent },
    { path: "home", component: HomeComponent },              
    { path: "administrator", component: AdministratorComponent },              
    { path: "administrator/addCompany", component: AddCompanyComponent },              
    { path: "administrator/addUser", component: AddUserComponent },              
    { path: "", redirectTo: "home", pathMatch: "full" }, 
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    CouponsComponent,
    CustomersComponent,
    UsersComponent,
    CompaniesComponent,
    PurchasesComponent,
    HomeComponent,
    EditInfoComponent,
    AdministratorComponent,
    AddCouponComponent,
    AddCompanyComponent,
    DeleteCouponComponent,
    UpdateCouponComponent,
    AddUserComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }