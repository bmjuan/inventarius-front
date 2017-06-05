import { InventariusWebadminPage } from './app.po';

describe('inventarius-webadmin App', function() {
  let page: InventariusWebadminPage;

  beforeEach(() => {
    page = new InventariusWebadminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
