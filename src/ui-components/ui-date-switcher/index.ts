import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UIDateSwitcherComponent } from './ui-date-switcher.component';

@NgModule({
    declarations: [UIDateSwitcherComponent],
    exports: [UIDateSwitcherComponent],
    imports: [CommonModule]
})

export class UIDateSwitcherModule {
    
}