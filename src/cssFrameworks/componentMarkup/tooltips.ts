import { ComponentMarkup } from '../../interfaces/componentMarkup';

export const tooltips: ComponentMarkup =  {
  bootstrap: `
    <button type="button" class="btn btn-secondary" data-toggle="bootstrapTooltip" data-placement="left" title="Tooltip text">Left</button>
    <button type="button" class="btn btn-secondary" data-toggle="bootstrapTooltip" data-placement="top" title="Tooltip text">Top</button>
    <button type="button" class="btn btn-secondary" data-toggle="bootstrapTooltip" data-placement="bottom" title="Tooltip text">Bottom</button>
    <button type="button" class="btn btn-secondary" data-toggle="bootstrapTooltip" data-placement="right" title="Tooltip text">Right</button>
  `,
  materialize: `
    <a href="#!" class="btn tooltipped col s4 offset-s4 l2 offset-l1" data-position="left" materialize-tooltip="Tooltip text">Left</a>
    <a href="#!" class="btn tooltipped col s4 offset-s4 l2 offset-l1" data-position="top" materialize-tooltip="Tooltip text">Top</a>
    <a href="#!" class="btn tooltipped col s4 offset-s4 l2 offset-l1" data-html="true" data-position="bottom" materialize-tooltip="Tooltip text">Bottom</a>
    <a href="#!" class="btn tooltipped col s4 offset-s4 l2 offset-l1" data-position="right" materialize-tooltip="Tooltip text">Right</a>
  `,
  uikit: `
    <p uk-margin>
      <button class="uk-button uk-button-default" uk-tooltip="title:Tooltip text; pos: left">Left</button>
      <button class="uk-button uk-button-default" uk-tooltip="Tooltip text">Top</button>
      <button class="uk-button uk-button-default" uk-tooltip="title: Tooltip text; pos: bottom">Bottom</button>
      <button class="uk-button uk-button-default" uk-tooltip="title: Tooltip text; pos: right">Right</button>
    </p>
  `,
  foundation: `
    <button style="cursor: pointer" class="button" type="button" data-tooltip tabindex="1" title="Tooltip text" data-position="left">Left</button>
    <button style="cursor: pointer" class="button" type="button" data-tooltip tabindex="1" title="Tooltip text" data-position="top" data-alignment="center">Top</button>
    <button style="cursor: pointer" class="button" type="button" data-tooltip tabindex="1" title="Tooltip text" data-position="bottom" data-alignment="center">Bottom</button>
    <button style="cursor: pointer" class="button" type="button" data-tooltip tabindex="1" title="Tooltip text" data-position="right">Right</button>
    `,
  bulma: `
    <button class="button is-primary has-tooltip-left" bulma-tooltip="Tooltip text">Left</button>
    <button class="button is-primary" bulma-tooltip="Tooltip text">Top</button>
    <button class="button is-primary has-tooltip-bottom" bulma-tooltip="Tooltip text">Bottom</button>
    <button class="button is-primary has-tooltip-right" bulma-tooltip="Tooltip text">Right</button>
  `,
  semantic: `
    <div class="ui button" semantic-tooltip="Tooltip text" data-position="left center">Left</div>
    <div class="ui button" semantic-tooltip="Tooltip text" data-position="top center">Top</div>
    <div class="ui button" semantic-tooltip="Tooltip text" data-position="bottom center">Bottom</div>
    <div class="ui button" semantic-tooltip="Tooltip text" data-position="right center">Right</div>
  `,
  spectre: `
    <button class="btn btn-primary spectre-tooltip tooltip-left" spectre-tooltip="Tooltip text">Left</button>
    <button class="btn btn-primary spectre-tooltip" spectre-tooltip="Tooltip text">Top</button>
    <button class="btn btn-primary spectre-tooltip tooltip-bottom" spectre-tooltip="Tooltip text">Bottom</button>
    <button class="btn btn-primary spectre-tooltip tooltip-right" spectre-tooltip="Tooltip text">Right</button>
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
};
