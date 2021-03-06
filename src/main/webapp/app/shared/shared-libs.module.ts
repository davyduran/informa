import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { MatomoModule } from 'ngx-matomo';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { LayoutModule } from '@angular/cdk/layout';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  imports: [
    DeviceDetectorModule.forRoot(),
  ],
  exports: [
    FormsModule,
    CommonModule,
    NgbModule,
    NgJhipsterModule,
    InfiniteScrollModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    TranslateModule,
    MatomoModule,
    LayoutModule,
    ImageCropperModule,
    ColorPickerModule,
    NgSelectModule
  ]
})
export class InformaSharedLibsModule {}
