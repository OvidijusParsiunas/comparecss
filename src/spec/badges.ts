import { ContentMarkupInterface } from '../interfaces/ContentMarkupInterface';

export default {
  bootstrap: '<span class="badge badge-primary">Primary</span>',
  materialize: '<span class="new badge">4</span>',
  uikit: `<span class="uk-badge">1</span>
          <span class="uk-badge">100</span>`,
  foundation: `<span class="badge primary">1</span>
              <span class="badge secondary">2</span>
              <span class="badge success">3</span>
              <span class="badge alert">A</span>
              <span class="badge warning">B</span`,
  bulma: `<span class="tag is-black">Black</span>
          <span class="tag is-dark">Dark</span>
          <span class="tag is-light">Light</span>
          <span class="tag is-white">White</span>
          <span class="tag is-primary">Primary</span>
          <span class="tag is-link">Link</span>
          <span class="tag is-info">Info</span>
          <span class="tag is-success">Success</span>
          <span class="tag is-warning">Warning</span>
          <span class="tag is-danger">Danger</span`,
} as ContentMarkupInterface;
