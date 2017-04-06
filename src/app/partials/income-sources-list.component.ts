import { Component, EventEmitter, OnInit, ViewChild, Input, Output } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { IncomeSource } from '../models/income-source'
import { IncomeSourceService } from '../services/income-source.service';

@Component({
  selector: 'income-sources-list',
  templateUrl: './income-sources-list.component.html'
})

export class IncomeSourcesListComponent {
  @Input() incomeSources: IncomeSource[];
  @Output() onIncomeSourcesChanged = new EventEmitter<IncomeSource[]>();

  @ViewChild('modal')
  modal: ModalComponent;
  selectedSource: IncomeSource = new IncomeSource();

  constructor(private incomeSourceService: IncomeSourceService) {}

  setIncomeSources(sources) {
    this.incomeSources = sources;
    this.onIncomeSourcesChanged.emit(this.incomeSources);
  }

  getIncomeSources(): void {
    this.incomeSourceService.getIncomeSources()
      .then(s => this.setIncomeSources(s));
  }

  createNewSource(): void {
    this.selectedSource = new IncomeSource();
    this.modal.open();
  }

  editSource(source): void {
    this.selectedSource = source;
    this.modal.open();
  }

  deleteSource(sourceId) {
    this.incomeSourceService.deleteIncomeSource(sourceId)
        .then(s => this.setIncomeSources(s));
    this.modal.close();
  }

  saveIncomeSource(): void {
    if (this.selectedSource.id) {
      this.incomeSourceService.updateIncomeSource(this.selectedSource)
        .then(s => this.setIncomeSources(s));
    } else {
      this.incomeSourceService.createIncomeSource(this.selectedSource)
        .then(s => this.setIncomeSources(s));
    }

    this.modal.close();
  }

  ngOnInit() {
    this.getIncomeSources();
  }
}