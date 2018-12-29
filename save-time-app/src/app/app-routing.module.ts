import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { StartPageComponent } from "src/app/containers/start-page/start-page.component";
import { TutorialsComponent } from "src/app/components/start-page/tutorials/tutorials.component";
import { MainComponent } from "src/app/containers/main/main.component";
import { StartPageGuard } from "src/app/services/start-page.quard";
import { MainPageGuard } from "src/app/services/main-page.guard";
import { MainPageActivateGuard } from "src/app/services/main-page-activate.guard";

const routes: Routes = [
  {path: '', component: StartPageComponent, children: [
      { path: '', component: TutorialsComponent },
    ],
    canActivate: [StartPageGuard]
  },
  { path: 'main', loadChildren: "./containers/main/main.module#MainModule", canLoad: [MainPageGuard], canActivate: [MainPageActivateGuard] },
  { path: '**', redirectTo: '' },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
