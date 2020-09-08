import ContentMarkupInterface from '../interfaces/ContentMarkupInterface';

export default {
  bootstrap: '<button type="button" class="btn btn-primary">Second</button>',
  material: '<button type="button" class="btn btn-primary">Second</button>',
  uikit: '<button class="uk-button uk-button-default">Second</button>',
  foundation: '<a class="button">Second</a>',
  bulma: '<button class="button">Second</button>',
  semantic: `<div class="ui three buttons">
  <button class="ui active button">One</button>
  <button class="ui button">Two</button>
  <button class="ui button">Three</button>
  </div>`,
  pure: `<a class="pure-button" href="#">A Pure Button</a>`
} as ContentMarkupInterface;