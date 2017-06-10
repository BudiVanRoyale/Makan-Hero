import { MakanHeroPage } from './app.po';

describe('makan-hero App', () => {
  let page: MakanHeroPage;

  beforeEach(() => {
    page = new MakanHeroPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
