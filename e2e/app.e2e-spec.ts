import { BeanswebPage } from './app.po';

describe('beansweb App', function() {
  let page: BeanswebPage;

  beforeEach(() => {
    page = new BeanswebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
