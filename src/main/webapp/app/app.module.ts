import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

import './vendor';
import { InformaSharedModule } from 'app/shared/shared.module';
import { InformaCoreModule } from 'app/core/core.module';
import { InformaAppRoutingModule } from './app-routing.module';
import { InformaHomeModule } from './home/home.module';
import { InformaEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { PerfilGrupoViewComponent } from 'app/layouts/navbar/perfil-grupo-view.component';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { PerfilGrupoViewDetailComponent } from './layouts/navbar/perfil-grupo-view-detail/perfil-grupo-view-detail.component';
import { GrupoNoRouteModule } from 'app/entities/grupo/grupo-no-route/grupo-no-route.module';

@NgModule({
  imports: [
    BrowserModule,
    InformaSharedModule,
    InformaCoreModule,
    InformaHomeModule,
    GrupoNoRouteModule,
    ServiceWorkerModule.register('/service-worker.js', { enabled: !DEBUG_INFO_ENABLED }),
    // jhipster-needle-angular-add-module JHipster will add new module here
    InformaEntityModule,
    InformaAppRoutingModule
  ],
  declarations: [MainComponent, PerfilGrupoViewComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent, PerfilGrupoViewDetailComponent],
  bootstrap: [MainComponent]
})
export class InformaAppModule {}
