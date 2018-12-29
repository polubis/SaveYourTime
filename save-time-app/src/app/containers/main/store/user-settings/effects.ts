import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { RequestsService } from "src/app/services/requests.service";
import { Router } from "@angular/router";
@Injectable()
export class UserSettingsEffects {
  constructor(private requestsService: RequestsService, private actions$: Actions,
    private router: Router) {
  }
}
