import { Component } from '@angular/core';
import * as Actions from '../../state/app.actions';
import { SubPage } from 'src/app/models/subpage.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCurrentSubPageDetails } from 'src/app/state/app.selectors';
import { IAppState } from 'src/app/state/app.state';
import { SanitizeHtmlPipe } from 'src/app/services/sanitizehtml.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './subpage.component.html',
  styleUrls: ['./subpage.component.css']
})
export class SubPageComponent {
  subPage$: Observable<SubPage>;
  currentsubPage: SubPage  = new SubPage();
  subPageName!: string;

  constructor(private store: Store<IAppState>, private activatedRoute: ActivatedRoute){
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.subPageName = params['subpage'];
      }
    )
    this.subPage$ = this.store.pipe(select(selectCurrentSubPageDetails));
  }

  ngOnInit(): void{
    this.store.dispatch(Actions.getSubPageDetailsRequest({subPageName: this.subPageName}));
    this.subPage$.subscribe(subPage => {
      this.currentsubPage = subPage;
    })
  }
}
