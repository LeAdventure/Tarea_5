import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab1PageRoutingModule } from './tab1-routing.module';

import { Tab1Page } from './tab1.page';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from 'src/app/components/form/form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab1PageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [Tab1Page, FormComponent],
  entryComponents: [FormComponent]
})
export class Tab1PageModule {}
