import { Component, Input, OnChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';

export function createDateRangeValidator(minValue, maxValue) {
  return (c: FormControl) => {
    let err = {
      rangeError: {
        given: c.value,
        min: minValue,
        max: maxValue
      }
    };

    if (minValue) { minValue.setHours(0,0,0,0); }
    if (maxValue) { maxValue.setHours(0,0,0,0); }
    if (c.value) { c.value.setHours(0,0,0,0); }

    return (c.value < minValue || c.value > maxValue) ? err : null;
  }
}

@Component({
  selector: 'ui-date-switcher',
  template: `
    <div class="ui-date-switcher-container">

      <svg viewBox="0 0 40 60" class="ui-date-switcher-left" (click)="decrement()" xmlns="http://www.w3.org/2000/svg">
        <polyline fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="30,10 10,30 30,50"/>
      </svg>

      <p class="ui-date-switcher-text">{{date | date:'mediumDate'}}</p>

      <svg viewBox="0 0 40 60" class="ui-date-switcher-right" (click)="increment()" xmlns="http://www.w3.org/2000/svg">
        <polyline fill="none" stroke-linecap="round" stroke-linejoin="round" points="10,10 30,30 10,50"/>
      </svg>

    </div>
  `,
  styles: [
  `
  .ui-date-switcher-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ui-date-switcher-left {
    cursor: pointer;
  }

  .ui-date-switcher-right {
    cursor: pointer;
  }

  .ui-date-switcher-text {
    display: inline-block;
    text-align: center;
    margin-bottom: 1px;
  }
  `
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UIDateSwitcherComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => UIDateSwitcherComponent),
    multi: true
  }]
})

export class UIDateSwitcherComponent implements ControlValueAccessor, OnChanges {
  @Input() _date = new Date();
  @Input() minDate;
  @Input() maxDate;

  propagateChange:any = () => {};
  validateFn:any = () => {};

  get date() {
    this._date.setHours(0,0,0,0);
    return this._date;
  }

  set date(val) {
    this._date = val;
    this.propagateChange(this._date);
  }

  increment() {
    var newDate = new Date(this.date.getTime());
    newDate.setDate(this.date.getDate() + 1);

    this.date = newDate;
  }

  decrement() {
    var newDate = new Date(this.date.getTime());
    newDate.setDate(this.date.getDate() - 1);
    
    this.date = newDate;
  }

  ngOnChanges(inputs) {
    if (inputs.minDate || inputs.maxDate) {
      this.validateFn = createDateRangeValidator(this.minDate, this.maxDate);
      this.propagateChange(this.date);
    }
  }

  writeValue(value: any) {
    if (value) {
      this.date = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  validate(c: FormControl) {
    return this.validateFn(c);
  }

  registerOnTouched() {}
}
