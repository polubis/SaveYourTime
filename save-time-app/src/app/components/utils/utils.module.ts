
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavigationComponent } from "src/app/components/utils/navigation/navigation.component";
import { FormComponent } from "src/app/components/utils/form/form.component";
import { ModalComponent } from "src/app/components/utils/modal/modal.component";
import { SpinnerComponent } from "src/app/components/utils/spinner/spinner.component";
import { RatesComponent } from "src/app/components/utils/rates/rates.component";
import { SliderComponent } from "src/app/components/utils/slider/slider.component";
import { ConfirmComponent } from './confirm/confirm.component';
import { ImageDirective } from "src/app/components/utils/image-directive";
import { FilePickerComponent } from './file-picker/file-picker.component';
import { EmptyListComponent } from './empty-list/empty-list.component';
import { TableComponent } from './table/table.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { Dropzone } from "src/app/components/utils/dropzone/dropzone";
import { TextPipe } from "src/app/components/utils/text-pipe";
import { ProductsCartComponent } from "src/app/components/common/products-cart/products-cart.component";

@NgModule({
  declarations: [ NavigationComponent, FormComponent, ModalComponent, SpinnerComponent,
    RatesComponent, SliderComponent, ConfirmComponent, ImageDirective, FilePickerComponent, EmptyListComponent, TableComponent, PaginationComponent,
    Dropzone, TextPipe,
    DropzoneComponent, ProductsCartComponent
  ],
  imports: [ CommonModule ],
  exports: [ NavigationComponent, FormComponent, ModalComponent, SpinnerComponent,
    RatesComponent, SliderComponent, ConfirmComponent, ImageDirective,
    FilePickerComponent, EmptyListComponent, TableComponent, PaginationComponent, Dropzone, TextPipe,
    DropzoneComponent, ProductsCartComponent ]
})
export class UtilsModule{

}
