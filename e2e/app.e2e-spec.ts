import { BudgetManagerPage } from './app.po';

describe('budget-manager App', function() {
  let page: BudgetManagerPage;

  beforeEach(() => {
    page = new BudgetManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
