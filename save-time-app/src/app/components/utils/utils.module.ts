
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavigationComponent } from "src/app/components/utils/navigation/navigation.component";
import { ProductFormComponent } from "src/app/components/common/product-form/product-form.component";
import { FormComponent } from "src/app/components/utils/form/form.component";
import { ModalComponent } from "src/app/components/utils/modal/modal.component";
import { SpinnerComponent } from "src/app/components/utils/spinner/spinner.component";

@NgModule({
  declarations: [ NavigationComponent, ProductFormComponent, FormComponent, ModalComponent, SpinnerComponent ],
  imports: [ CommonModule ],
  exports: [ NavigationComponent, ProductFormComponent, FormComponent, ModalComponent, SpinnerComponent ]
})
export class UtilsModule{

}
