import { ContentMarkupInterface } from '../interfaces/ContentMarkupInterface';

// need materialize cloud icons
export default {
  bootstrap: `
    <button type="button" class="btn btn-primary">Primary</button>
    <button type="button" class="btn btn-secondary">Secondary</button>
    <button type="button" class="btn btn-success">Success</button>
    <button type="button" class="btn btn-danger">Danger</button>
    <button type="button" class="btn btn-warning">Warning</button>
    <button type="button" class="btn btn-info">Info</button>
    <button type="button" class="btn btn-light">Light</button>
    <button type="button" class="btn btn-dark">Dark</button>
    <button type="button" class="btn btn-link">Link</button>
    <button type="button" class="btn btn-outline-primary">Primary</button>
    <button type="button" class="btn btn-outline-secondary">Secondary</button>
    <button type="button" class="btn btn-outline-success">Success</button>
    <button type="button" class="btn btn-outline-danger">Danger</button>
    <button type="button" class="btn btn-outline-warning">Warning</button>
    <button type="button" class="btn btn-outline-info">Info</button>
    <button type="button" class="btn btn-outline-light">Light</button>
    <button type="button" class="btn btn-outline-dark">Dark</button>
  `,
  materialize: `
    <a class="waves-effect waves-light btn">button</a>
    <a class="waves-effect waves-light btn"><i class="material-icons left">cloud</i>button</a>
    <a class="waves-effect waves-light btn"><i class="material-icons right">cloud</i>button</a>
    <a class="btn-large disabled">Button</a>
    <a class="btn disabled">Button</a>
    <a class="btn-flat disabled">Button</a>
    <a class="btn-floating disabled"><i class="material-icons">add</i></a>
  `,
  uikit: `
    <a class="uk-button uk-button-default" href="#">Link</a>
    <button class="uk-button uk-button-default">Button</button>
    <button class="uk-button uk-button-default" disabled>Disabled</button>
    <button class="uk-button uk-button-default">Default</button>
    <button class="uk-button uk-button-primary">Primary</button>
    <button class="uk-button uk-button-secondary">Secondary</button>
    <button class="uk-button uk-button-danger">Danger</button>
    <button class="uk-button uk-button-text">Text</button>
    <button class="uk-button uk-button-link">Link</button>
  `,
  foundation: `
    <a class="button">Learn More</a>
    <a class="button">View All Features</a>
    <button type="button" class="success button">Save</button>
    <button type="button" class="alert button">Delete</button>
    <a class="button primary" href="#">Primary</a>
    <a class="button secondary" href="#">Secondary</a>
    <a class="button success" href="#">Success</a>
    <a class="button alert" href="#">Alert</a>
    <a class="button warning" href="#">Warning</a>
  `,
  bulma: `
    <a class="button">Anchor</a>
    <button class="button">Button</button>
    <input class="button" type="submit" value="Submit input">
    <input class="button" type="reset" value="Reset input">
    <button class="button is-white">White</button>
    <button class="button is-light">Light</button>
    <button class="button is-dark">Dark</button>
    <button class="button is-black">Black</button>
    <button class="button is-text">Text</button>
    <button class="button is-primary">Primary</button>
    <button class="button is-link">Link</button>
    <button class="button is-info">Info</button>
    <button class="button is-success">Success</button>
    <button class="button is-warning">Warning</button>
    <button class="button is-danger">Danger</button>
    <button class="button is-primary is-light">Primary</button>
    <button class="button is-link is-light">Link</button>
    <button class="button is-info is-light">Info</button>
    <button class="button is-success is-light">Success</button>
    <button class="button is-warning is-light">Warning</button>
    <button class="button is-danger is-light">Danger</button>
  `,
  semantic: `
    <button class="ui button">Button</button>
    <button class="ui primary button">Save</button>
    <button class="ui secondary button">Okay</button>
    <button class="ui red button">Red</button>
    <button class="ui orange button">Orange</button>
    <button class="ui yellow button">Yellow</button>
    <button class="ui olive button">Olive</button>
    <button class="ui green button">Green</button>
    <button class="ui teal button">Teal</button>
    <button class="ui blue button">Blue</button>
    <button class="ui violet button">Violet</button>
    <button class="ui purple button">Purple</button>
    <button class="ui pink button">Pink</button>
    <button class="ui brown button">Brown</button>
    <button class="ui grey button">Grey</button>
    <button class="ui black button">Black</button>
    <button class="ui primary basic button">Primary</button>
    <button class="ui secondary basic button">Secondary</button>
    <button class="ui positive basic button">Positive</button>
    <button class="ui negative basic button">Negative</button>
    <button class="ui red basic button">Red</button>
    <button class="ui orange basic button">Orange</button>
    <button class="ui yellow basic button">Yellow</button>
    <button class="ui olive basic button">Olive</button>
    <button class="ui green basic button">Green</button>
    <button class="ui teal basic button">Teal</button>
    <button class="ui blue basic button">Blue</button>
    <button class="ui violet basic button">Violet</button>
    <button class="ui purple basic button">Purple</button>
    <button class="ui pink basic button">Pink</button>
    <button class="ui brown basic button">Brown</button>
    <button class="ui grey basic button">Grey</button>
    <button class="ui black basic button">Black</button>
  `,
  pure: `
    <button class="pure-button">A Pure Button</button>
    <button class="pure-button" disabled="">A Disabled Button</button>
    <button class="pure-button pure-button-active">An Active Button</button>
    <button class="pure-button pure-button-primary">A Primary Button</button>
    <button class="button-success pure-button">Success Button</button>
    <button class="button-error pure-button">Error Button</button>
    <button class="button-warning pure-button">Warning Button</button>
    <button class="button-secondary pure-button">Secondary Button</button>
  `,
  skeleton: `
    <a class="button" href="#">Anchor button</a>
    <button>Button element</button>
    <input type="submit" value="submit input">
    <input type="button" value="button input">
    <a class="button button-primary" href="#">Anchor button</a>
    <button class="button-primary">Button element</button>
    <input class="button-primary" type="submit" value="submit input">
    <input class="button-primary" type="button" value="button input">
  `,
  milligram: `
    <a class="button" href="#">Default Button</a>
    <button class="button button-outline">Outlined Button</button>
    <input class="button button-clear" type="submit" value="Clear Button">
  `,
  spectre: `
    <button class="btn">default button</button>
    <button class="btn btn-primary">primary button</button>
    <button class="btn btn-link">link button</button>
    <button class="btn btn-success">success button</button>
    <button class="btn btn-error">error button</button>
    <button class="btn disabled" tabindex="-1">disabled button</button>
    <button class="btn" disabled tabindex="-1">disabled button</button>
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
} as ContentMarkupInterface;
