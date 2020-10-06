import { ContentMarkup } from '../../interfaces/contentMarkupInterface';

export default {
  bootstrap: `
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#bootstrapModal">
        Modal
    </button>
    <div class="modal fade" id="bootstrapModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal header</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div style="text-align: left" class="modal-body">
              Example modal text
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save</button>
          </div>
        </div>
        </div>
    </div>
  `,
  materialize: `
    <a class="waves-effect waves-light btn modal-trigger" href="#materializeModal">Modal</a>
    <div style="max-width: 500px; text-align: left" id="materializeModal" class="modal">
      <div class="modal-content">
        <h4>Modal Header</h4>
        <p>Example modal text</p>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-red btn-flat">Close</a>
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Save</a>
      </div>
    </div>
  `,
  uikit: `
    <button class="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #uikitModal">Modal</button>
    <div id="uikitModal" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">Modal Header</h2>
        <p>Example modal text</p>
        <p class="uk-text-right">
          <button class="uk-button uk-button-default uk-modal-close" type="button">Close</button>
          <button class="uk-button uk-button-primary" type="button">Save</button>
        </p>
      </div>
    </div>
  `,
  foundation: `
    <p><button style="outline: none" class="button" data-open="foundationModal">Modal</button></p>
    <div style="max-width: 500px" class="reveal" id="foundationModal" data-reveal>
      <h3>Modal Header</h3>
      <p>Example modal text</p>
      <button class="close-button" data-close aria-label="Close modal" type="button">
        <span aria-hidden="true">&times;</span>
      </button>
      <a style="margin-left: 5px; float: right" class="button primary" data-close aria-label="Close modal" href="#!">Save</a>
      <a style="float: right" class="button secondary" data-close aria-label="Close modal" href="#!">Close</a>
    </div>
    `,
  bulma: `
    <p><a class="button is-primary modal-button" data-target="#bulmaModal">Modal</a></p>
    <div id="bulmaModal" style="text-align: left" class="modal">
      <div class="modal-background"></div>
      <div style="max-width: 500px" class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal Header</p>
          <button class="bulma-close delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="content">
            <p>Example modal text</p>
          </div>
        </section>
        <footer style="text-align: right; display: block" class="modal-card-foot">
          <button class="bulma-close button">Close</button>
          <button class="bulma-close button is-success">Save</button>
        </footer>
      </div>
    </div>
  `,
  semantic: `
    <button class="ui button primary create_btn" type="button" id="semantic-create-modal-button">Modal</button>
    <div class="ui mini modal semantic-modal">
      <div class="header">
        Modal Header
      </div>
      <div class="content">
        <p>Example modal text</p>
      </div>
      <div class="actions">
        <div class="ui grey button ok">
          Close
        </div>
        <div class="ui positive button">
          Save
        </div>
      </div>
    </div>
  `,
  pure: null,
  skeleton: null,
  milligram: null,
  spectre: `
    <button class="btn btn-primary modal-toggle" data-modal="#spectreModal">Modal</button>
    <div id="spectreModal" style="text-align: left" class="modal">
      <a class="modal-overlay" href="#modals" aria-label="Close"></a>
      <div style="max-width: 500px" class="modal-container" role="document">
          <div class="modal-header">
            <a class="btn btn-clear float-right spectre-modal-close" href="#modals" aria-label="Close"></a>
            <div class="modal-title h5">Modal Header</div>
          </div>
          <div class="modal-body">
            <div class="content">
                <p>Example modal text</p>
            </div>
          </div>
          <div class="modal-footer">
          <a class="btn spectre-modal-close" href="#modals">Close</a>
          <button class="btn btn-primary spectre-modal-close">Save</button>
          </div>
      </div>
    </div>
  `,
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
