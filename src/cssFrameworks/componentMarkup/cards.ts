import { ContentMarkup } from '../../interfaces/contentMarkupInterface';

export default {
  bootstrap: `
    <div class="card" style="width: 18rem; display: inline-block; vertical-align: top; margin-bottom: 10px">
      <img style="width: 286px; height: 180px" class="card-img-top" src="../assets/images/card-picture.webp" alt="Card image cap">
      <div style="text-align: left" class="card-body">
        <h5 class="card-title">Card Title</h5>
        <p class="card-text">Example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#!" class="btn btn-primary">Button</a>
      </div>
    </div>
    <div class="card" style="width: 18rem; display: inline-block; text-align: left; vertical-align: top; margin-bottom: 10px">
      <div class="card-header">
        Card Header
      </div>
      <div class="card-body">
        <h5 class="card-title">Card Title</h5>
        <p class="card-text">Example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#!" class="btn btn-primary">Button</a>
      </div>
    </div>
    <div class="card" style="width: 18rem; display: inline-block; vertical-align: top">
      <div style="text-align: left" class="card-body">
        <h5 class="card-title">Card Title</h5>
        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
        <p class="card-text">Example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#!" class="card-link">Link 1</a>
        <a href="#!" class="card-link">Link 2</a>
      </div>
    </div>
  `,
  materialize: `
    <div class="col s12 m7" style="width: 18rem; display: inline-flex; text-align: left; vertical-align: top">
      <div class="card">
        <div class="card-image">
          <img style="width: 286px; height: 180px" src="../assets/images/card-picture.webp">
          <span class="card-title">Card Title</span>
        </div>
        <div class="card-content">
          <p>Example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        <div class="card-action">
          <a href="#!">Link</a>
        </div>
      </div>
    </div>
    <div class="col s12 m6" style="width: 18rem; display: inline-flex; text-align: left; vertical-align: top">
      <div class="card">
        <div class="card-image">
          <img style="width: 286px; height: 180px" src="../assets/images/card-picture.webp">
          <span class="card-title">Card Title</span>
          <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
        </div>
        <div class="card-content">
          <p>Example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
    </div>
    <div class="col s12 m6" style="width: 18rem; display: inline-flex; text-align: left; vertical-align: top">
      <div class="card">
        <div class="card-content">
          <span class="card-title">Card Title</span>
          <p>Example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        <div class="card-action">
          <a href="#!">Link 1</a>
          <a href="#!">Link 2</a>
        </div>
      </div>
    </div>
  `,
  uikit: `
    <div style="width: 18rem; display: inline-flex; text-align: left; vertical-align: top; margin-bottom: 10px">
      <div class="uk-card uk-card-default">
        <div class="uk-card-media-top">
          <img style="width: 286px; height: 180px" src="../assets/images/card-picture.webp" alt="">
        </div>
        <div class="uk-card-body">
          <h3 class="uk-card-title">Card Title</h3>
          <p>Example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
    </div>
    <div style="display: inline-flex; text-align: left; vertical-align: top; margin-bottom: 10px">
      <div class="uk-card uk-card-default" style="width: 18rem;">
        <div class="uk-card-header">
          <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-auto">
              <img style="height: 40px" class="uk-border-circle" width="40" height="40" src="../assets/images/profile-picture.png">
            </div>
            <div class="uk-width-expand">
              <h3 class="uk-card-title uk-margin-remove-bottom">Card Title</h3>
              <p class="uk-text-meta uk-margin-remove-top"><time datetime="2016-04-01T19:00">April 01, 2020</time></p>
            </div>
          </div>
        </div>
        <div class="uk-card-body">
          <p>Example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        <div class="uk-card-footer">
          <a href="#!" class="uk-button uk-button-text">Link</a>
        </div>
      </div>
    </div>
    <div style="width: 18rem; display: inline-flex; text-align: left; vertical-align: top">
      <div class="uk-card uk-card-default uk-card-hover uk-card-body">
        <h3 class="uk-card-title">Card Title</h3>
        <p>Example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
    </div>
  `,
  foundation: `
    <div class="card" style="width: 18rem; display: inline-flex; text-align: left; vertical-align: top">
      <div class="card-divider">
        Card Header
      </div>
      <img style="width: 286px; height: 180px" src="../assets/images/card-picture.webp">
      <div class="card-section">
        <h4>Card Title</h4>
        <p>Example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
    </div>
    <div class="card" style="width: 18rem; display: inline-flex; text-align: left; vertical-align: top">
      <img style="width: 286px; height: 180px" src="../assets/images/card-picture.webp">
      <div class="card-section">
        <p>Example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
    </div>
  `,
  bulma: `
    <div class="card" style="width: 18rem; text-align: left; display: inline-block; vertical-align: top; margin-bottom: 10px">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="../assets/images/card-picture.webp" alt="Placeholder image">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img style="height: 48px" src="../assets/images/profile-picture.png" alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">Card Title</p>
            <p class="subtitle is-6">@ovisource</p>
          </div>
        </div>
        <div class="content">
          Example text to build on the card title and make up the bulk of the card's content.
        </div>
      </div>
    </div>
    <div class="card" style="width: 18rem; text-align: left; display: inline-block; vertical-align: top; margin-bottom: 10px">
      <div class="card-content">
        <p class="title">
          Title text to make up the bulk of the card's content.
        </p>
        <p class="subtitle">
          @ovisource
        </p>
      </div>
      <footer class="card-footer">
        <p class="card-footer-item">
          <span>
            <a href="#!">Link 1</a>
          </span>
        </p>
        <p class="card-footer-item">
          <span>
           <a href="#!">Link 2</a>
          </span>
        </p>
      </footer>
    </div>
    <div class="card" style="width: 18rem; text-align: left; display: inline-block; vertical-align: top">
      <header class="card-header">
        <p class="card-header-title">
          Card Title
        </p>
        <a href="#!" class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </a>
      </header>
      <div class="card-content">
        <div class="content">
          Example text to build on the card title and make up the bulk of the card's content.
        </div>
      </div>
      <footer class="card-footer">
        <a href="#!" class="card-footer-item">Button 1</a>
        <a href="#!" class="card-footer-item">Button 2</a>
        <a href="#!" class="card-footer-item">Button 3</a>
      </footer>
    </div>
  `,
  semantic: `
    <div class="ui link cards" style="width: 18rem; text-align: left; display: inline-block; margin-right: 10px; margin-top: 0px; vertical-align: top">
      <div class="card">
        <div class="image">
          <img style="width: 288px; height: 180px" src="../assets/images/card-picture.webp">
        </div>
        <div class="content">
          <div class="header">Card Title</div>
          <div class="meta">
            <a>ovisource</a>
          </div>
          <div class="description">
            Example text to build on the card title and make up the bulk of the card's content.
          </div>
        </div>
        <div class="extra content">
          <span class="right floated">
            Right Text
          </span>
          <span>
            Left Text
          </span>
        </div>
      </div>
    </div>
    <div class="ui card" style="width: 18rem; text-align: left; display: inline-block; vertical-align: top">
      <div style="top: 0; left: -0.5px" class="ui slide masked reveal image">
        <img style="width: 288px; height: 181px" src="../assets/images/card-picture.webp" class="visible content">
        <img style="width: 288px; height: 181px" src="../assets/images/card-picture.webp" class="hidden content">
      </div>
      <div class="content">
        <a class="header">Card Title</a>
        <div class="meta">
          ovisource
        </div>
      </div>
      <div class="extra content">
        <a href="#!">
          Link
        </a>
      </div>
    </div>
    <div class="ui card" style="width: 18rem; text-align: left; display: inline-block; vertical-align: top">
      <div class="content">
        <div class="right floated meta">14h</div>
          <img class="ui avatar image" src="../assets/images/card-picture.webp">Ovisource
      </div>
      <div class="image">
        <img>
      </div>
      <div class="content">
        <div class="header">Card Title</div>
        <div class="meta">2 days ago</div>
        <div class="description">
          <p>Example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
      <div class="content">
        <span class="right floated">
          17 likes
        </span>
        3 comments
      </div>
      <div class="extra content">
        <div class="ui large transparent left input">
          <input type="text" placeholder="Add Comment...">
        </div>
      </div>
    </div>
  `,
  pure: null,
  skeleton: null,
  milligram: null,
  spectre: null,
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
  nes: `<a class="nes-btn" href="#!">Normal</a>
  <button type="button" class="nes-btn is-primary">Primary</button>
  <button type="button" class="nes-btn is-success">Success</button>
  <button type="button" class="nes-btn is-warning">Warning</button>
  <button type="button" class="nes-btn is-error">Error</button>
  <button type="button" class="nes-btn is-disabled">Disabled</button>
  <label class="nes-btn">
    <span>Select your file</span>
    <input type="file">
  </label>`,
  picnic: `
  <button>Button</button>
<button class='success'>Success</button>
<button class='warning'>Warning</button>
<button class='error'>Error</button>
<button disabled>Disabled</button>`,
  chota: `<a class="button">Default</a>
  <a class="button primary">Primary</a>
  <a class="button secondary">Secondary</a>
  <a class="button dark">Dark</a>
  <a class="button error">Error</a>
  <a class="button success">Success</a>
  <a class="button outline">Outline</a>
  <a class="button outline primary">Primary outline</a>
  <a class="button outline secondary">Secondary outline</a>
  <a class="button outline dark">Dark outline</a>
  <a class="button clear">Clear</a>
  <button type="button" class="button primary icon">New file 
    <img src="https://icongr.am/feather/file.svg?size=16&amp;color=ffffff" alt="icon">
  </button>
  <button class="button icon-only">
    <img src="https://icongr.am/feather/search.svg?size=24">
  </button>`,
  cirrus: ` <div class="btn-container">
  <div class="btn btn-primary btn-animated">test</div>
</div>
<div class="btn-container">
  <button class="btn-primary btn-animated">Regular Button</button>
</div>
<div class="btn-container">
  <input type="submit" class="btn-primary btn-animated" value="Submit"/>
</div>
  `,
  turret: `<div class="button-group">
  <button class="button">Button</button>
  <button class="button">Button</button>
  <button class="button">Button</button>
</div>`,
  hiq: `
  <form>
    <fieldset>
      <legend>Related Fields:</legend>
      <p>
          <label>Field 1:</label>
          <input type="text">
      </p>
      <p>
          <label>Field 2:</label>
          <input type="text">
      </p>
      <p>
          <label>Field 3:</label>
          <input type="text">
      </p>
    </fieldset>
  </form>`,
  mui: `<div>
  <button class="mui-btn">Button</button>
  <button class="mui-btn mui-btn--primary">Button</button>
  <button class="mui-btn mui-btn--danger">Button</button>
  <button class="mui-btn mui-btn--accent">Button</button>
</div>
<div>
  <button class="mui-btn" disabled>Button</button>
  <button class="mui-btn mui-btn--primary" disabled>Button</button>
  <button class="mui-btn mui-btn--danger" disabled>Button</button>
  <button class="mui-btn mui-btn--accent" disabled>Button</button>
</div>`,
  patternfly: `<button class="pf-c-button pf-m-primary" type="button">Primary</button>
  <button class="pf-c-button pf-m-secondary" type="button">Secondary</button>
  <button class="pf-c-button pf-m-tertiary" type="button">Tertiary</button>
  <button class="pf-c-button pf-m-danger" type="button">Danger</button>
  <button class="pf-c-button pf-m-warning" type="button">Warning</button>`,
  bootflat: `<h1>Test bootflat</h1>
  <a class="btn btn-primary">Primary</a>`,
} as ContentMarkup;
