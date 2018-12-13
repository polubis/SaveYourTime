import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { StartPageComponent } from "src/app/containers/start-page/start-page.component";
import { TutorialsComponent } from "src/app/components/start-page/tutorials/tutorials.component";
import { MainComponent } from "src/app/containers/main/main.component";

const routes: Routes = [
  {path: '', component: StartPageComponent, children: [
      { path: '', component: TutorialsComponent },
    ]
  },
  { path: 'main', loadChildren: "./containers/main/main.module#MainModule" },
  { path: '**', redirectTo: '' },

];
@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
