import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { TelefonSatModule } from './telefon-sat/telefon-sat.module';
import { CihazinidegerlendirModule } from './cihazinidegerlendir/cihazinidegerlendir.module';
import { YakindaModule } from './yakinda/yakinda.module';
import { HakkimizdaModule } from './hakkimizda/hakkimizda.module';
import { IletisimModule } from './iletisim/iletisim.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    TelefonSatModule,
    CihazinidegerlendirModule,
    YakindaModule,
    HakkimizdaModule,
    IletisimModule
  ]
})
export class ComponentsModule { }
