import ContentMarkupInterface from '../interfaces/ContentMarkupInterface';

export default {
  bootstrap: '<button type="button" class="btn btn-primary">Second</button>',
  materialize: '<button type="button" class="btn btn-primary">Second</button>',
  uikit: '<button class="uk-button uk-button-default">Second</button>',
  foundation: '<a class="button">Second</a>',
  bulma: '<button class="button">Second</button>',
  semantic: `<div class="ui three buttons">
  <button class="ui active button">One</button>
  <button class="ui button">Two</button>
  <button class="ui button">Three</button>
  </div>`,
  pure: `<a class="pure-button" href="#">A Pure Button</a>`,
  skeleton: `<!-- Standard buttons -->
  <a class="button" href="#">Anchor button</a>
  
  <!-- Primary buttons -->
  <a class="button button-primary" href="#">Anchor button</a>`,
  milligram: `<!-- Standard buttons -->
  <a class="button" href="#">Default Button</a>
  <!-- Outlined Button -->
  <button class="button button-outline">Outlined Button</button>

  <!-- Clear Button -->
  <input class="button button-clear" type="submit" value="Clear Button">`,
  spectre: `<button class="btn">default button</button>
  <button class="btn btn-primary">primary button</button>
  <button class="btn btn-link">link button</button>
  <button class="btn btn-success">success button</button>
  <button class="btn btn-error">error button</button>`,
  primer: `<button class="btn mr-2" type="button">
  <!-- <%= octicon "search" %> -->
  <svg class="octicon octicon-search" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M15.7 13.3l-3.81-3.83A5.93 5.93 0 0013 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 000-1.41v.01zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7 0-2.59 2.11-4.7 4.7-4.7 2.59 0 4.7 2.11 4.7 4.7 0 2.59-2.11 4.7-4.7 4.7z"></path></svg>
  <span>Find file</span>
</button>

<button class="btn btn-primary mr-2" type="button">
  <!-- <%= octicon "cloud-download" %> -->
  <svg class="octicon octicon-cloud-download" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M9 12h2l-3 3-3-3h2V7h2v5zm3-8c0-.44-.91-3-4.5-3C5.08 1 3 2.92 3 5 1.02 5 0 6.52 0 8c0 1.53 1 3 3 3h3V9.7H3C1.38 9.7 1.3 8.28 1.3 8c0-.17.05-1.7 1.7-1.7h1.3V5c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V11h2c2.08 0 4-1.16 4-3.5C16 5.06 14.08 4 12 4z"></path></svg>
  <span>Clone</span>
  <span class="dropdown-caret"></span>
</button>

<button class="btn btn-danger mr-2" type="button">
  <!-- <%= octicon "trashcan" %> -->
  <svg class="octicon octicon-trashcan" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M11 2H9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1H2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1v9c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 12H3V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9zm1-10H2V3h9v1z"></path></svg>
  <span>Delete</span>
</button>

<button class="btn btn-outline mr-2" type="button">
  <!-- <%= octicon "device-desktop" %> -->
  <svg class="octicon octicon-device-desktop" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M15 2H1c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h5.34c-.25.61-.86 1.39-2.34 2h8c-1.48-.61-2.09-1.39-2.34-2H15c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 9H1V3h14v8z"></path></svg>
  <span>Open in Desktop</span>
</button>

<button class="btn" type="button" aria-label="Pencil icon">
  <!-- <%= octicon "pencil" %> -->
  <svg class="octicon octicon-pencil" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 011.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z"></path></svg>
</button>`,
  nes: `<a class="nes-btn" href="#">Normal</a>
  <button type="button" class="nes-btn is-primary">Primary</button>
  <button type="button" class="nes-btn is-success">Success</button>
  <button type="button" class="nes-btn is-warning">Warning</button>
  <button type="button" class="nes-btn is-error">Error</button>
  <button type="button" class="nes-btn is-disabled">Disabled</button>
  <label class="nes-btn">
    <span>Select your file</span>
    <input type="file">
  </label>`
} as ContentMarkupInterface;