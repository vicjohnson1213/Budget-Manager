import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { IncomeSource } from '../models/income-source'
import { IncomeSourceService } from '../services/income-source.service';

@Component({
  selector: 'income-sources-list',
  templateUrl: './income-sources-list.component.html'
})

export class IncomeSourcesListComponent {
  incomeSources: IncomeSource[];

  @ViewChild('modal')
  modal: ModalComponent;
  selectedSource: IncomeSource = new IncomeSource();

  constructor(private incomeSourceService: IncomeSourceService) {}

  getIncomeSources(): void {
    this.incomeSourceService.getIncomeSources().then(sources => this.incomeSources = sources);
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
        .then(sources => this.incomeSources = sources);
    this.modal.close();
  }

  saveIncomeSource(): void {
    if (this.selectedSource.id) {
      this.incomeSourceService.updateIncomeSource(this.selectedSource)
        .then(sources => this.incomeSources = sources);
    } else {
      this.incomeSourceService.createIncomeSource(this.selectedSource)
        .then(sources => this.incomeSources = sources);
    }

    this.modal.close();
  }

  ngOnInit(): void {
    this.getIncomeSources();
  }
}