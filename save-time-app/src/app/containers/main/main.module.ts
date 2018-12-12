
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "src/app/containers/main/main.component";
import { MainRoutingModule } from "src/app/containers/main/main-routing.module";
import { UtilsModule } from "src/app/components/utils/utils.module";

@NgModule({
  declarations: [ MainComponent ],
  imports: [ MainRoutingModule, CommonModule, UtilsModule ]
})
export class MainModule {

}
