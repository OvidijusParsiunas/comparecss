import { ContentMarkup } from '../../interfaces/contentMarkupInterface';

export default {
  bootstrap: `
    <div style="display: inline-flex">
      <div style="margin-left: 5px" class="dropdown">
      <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Click Dropdown
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#!">Option 1</a>
        <a class="dropdown-item" href="#!">Option 2</a>
        <a class="dropdown-item" href="#!">Option 3</a>
      </div>
      </div>
      <div style="margin-left: 5px" class="btn-group">
        <button type="button" class="btn btn-primary">Split Dropdown</button>
        <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#!">Option 1</a>
          <a class="dropdown-item" href="#!">Option 2</a>
          <a class="dropdown-item" href="#!">Option 3</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#!">Option 4</a>
        </div>
      </div>
    </div>
  `,
  materialize: `
    <a class='dropdown-trigger btn' href='#' data-target='dropdown1'>Click Dropdown</a>
    <ul id='dropdown1' class='dropdown-content'>
      <li><a href="#!">Option 1</a></li>
      <li><a href="#!">Option 2</a></li>
      <li><a href="#!">Option 3</a></li>
      <li class="divider" tabindex="-1"></li>
      <li><a href="#!">Option 4</a></li>
    </ul>
  `,
  uikit: `
    <button class="uk-button uk-button-default" type="button">Click Dropdown</button>
    <div uk-dropdown="mode: click">
        <ul style="text-align: left" class="uk-nav uk-dropdown-nav">
          <li><a href="#!">Option 1</a></li>
          <li><a href="#!">Option 2</a></li>
          <li><a href="#!">Option 3</a></li>
          <li class="uk-nav-divider"></li>
          <li><a href="#!">Option 4</a></li>
        </ul>
    </div>
    <button class="uk-button uk-button-default" type="button">Hover Dropdown</button>
    <div uk-dropdown>
        <ul style="text-align: left" class="uk-nav uk-dropdown-nav">
          <li><a href="#!">Option 1</a></li>
          <li><a href="#!">Option 2</a></li>
          <li><a href="#!">Option 3</a></li>
          <li class="uk-nav-divider"></li>
          <li><a href="#!">Option 4</a></li>
        </ul>
    </div>
  `,
  foundation: `
    <button class="button" type="button" data-toggle="example-dropdown">Click Dropdown</button>
    <div style="padding: 0; width: 198px" class="dropdown-pane" id="example-dropdown" data-dropdown data-auto-focus="true">
      <ul class="menu submenu is-dropdown-submenu first-sub vertical" data-submenu="" role="menubar" style="display: contents; text-align: left">
        <li role="none" class="is-submenu-item is-dropdown-submenu-item"><a href="#Item-2A" role="menuitem">Option 1</a></li>
        <li role="none" class="is-submenu-item is-dropdown-submenu-item"><a href="#Item-2B" role="menuitem">Option 2</a></li>
        <li role="none" class="is-submenu-item is-dropdown-submenu-item"><a href="#Item-2B" role="menuitem">Option 3</a></li>
      </ul>
    </div>
    <button class="button" type="button" data-toggle="example-dropdown-1">Hover Dropdown</button>
    <div style="padding: 0; width: 198px" class="dropdown-pane" id="example-dropdown-1" data-dropdown data-hover="true" data-hover-pane="true">
      <ul class="menu submenu is-dropdown-submenu first-sub vertical" data-submenu="" role="menubar" style="display: contents; text-align: left">
        <li role="none" class="is-submenu-item is-dropdown-submenu-item"><a href="#Item-2A" role="menuitem">Option 1</a></li>
        <li role="none" class="is-submenu-item is-dropdown-submenu-item"><a href="#Item-2B" role="menuitem">Option 2</a></li>
        <li role="none" class="is-submenu-item is-dropdown-submenu-item"><a href="#Item-2B" role="menuitem">Option 3</a></li>
      </ul>
    </div>
    `,
  bulma: null,
  semantic: `
    <select class="ui dropdown">
      <option value="">Select Dropdown</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </select>
    <div class="ui compact menu">
      <div class="ui simple dropdown item">
        Hover Dropdown
        <i class="dropdown icon"></i>
        <div class="menu">
          <div class="item">Option 1</div>
          <div class="item">Option 2</div>
          <div class="item">Option 3</div>
        </div>
      </div>
    </div>
    <div class="ui buttons">
      <div class="ui button">Split Dropdown</div>
      <div class="ui floating dropdown icon button">
        <i class="dropdown icon"></i>
        <div class="menu">
          <div class="item">Option 1</div>
          <div class="item">Option 2</div>
          <div class="item">Option 3</div>
        </div>
      </div>
    </div>
    <div class="ui floating dropdown labeled search icon button">
      <i class="world icon"></i>
      <span class="text">Search Dropdown</span>
      <div class="menu">
        <div class="item">Arabic</div>
        <div class="item">Chinese</div>
        <div class="item">Danish</div>
        <div class="item">Dutch</div>
        <div class="item">English</div>
        <div class="item">French</div>
        <div class="item">German</div>
        <div class="item">Greek</div>
        <div class="item">Hungarian</div>
        <div class="item">Italian</div>
        <div class="item">Japanese</div>
        <div class="item">Korean</div>
        <div class="item">Lithuanian</div>
        <div class="item">Persian</div>
        <div class="item">Polish</div>
        <div class="item">Portuguese</div>
        <div class="item">Russian</div>
        <div class="item">Spanish</div>
        <div class="item">Swedish</div>
        <div class="item">Turkish</div>
        <div class="item">Vietnamese</div>
      </div>
    </div>
  `,
  pure: `
    <div style="display: inline-flex">
      <div class="pure-menu pure-menu-horizontal">
        <ul class="pure-menu-list">
          <li class="pure-menu-item pure-menu-has-children">
            <a href="#!" id="menuLink1" class="pure-menu-link">Click Dropdown</a>
            <ul class="pure-menu-children">
              <li class="pure-menu-item">
                <a href="#!" class="pure-menu-link">Option 1</a>
              </li>
              <li class="pure-menu-item">
                <a href="#!" class="pure-menu-link">Option 2</a>
              </li>
              <li class="pure-menu-item">
                <a href="#!" class="pure-menu-link">Option 3</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="pure-menu pure-menu-horizontal">
        <ul class="pure-menu-list">
          <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
            <a href="#!" id="menuLink1" class="pure-menu-link">Hover Dropdown</a>
            <ul class="pure-menu-children">
              <li class="pure-menu-item">
                <a href="#!" class="pure-menu-link">Option 1</a>
              </li>
              <li class="pure-menu-item">
                <a href="#!" class="pure-menu-link">Option 2</a>
              </li>
              <li class="pure-menu-item">
                <a href="#!" class="pure-menu-link">Option 3</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    `,
  skeleton: null,
  milligram: null,
  spectre: `
    <div style="display: inline-flex">
      <div class="column col-xs-12">
        <div class="dropdown dropdown-right"><a class="btn btn-primary dropdown-toggle" tabindex="0">Click Dropdown<i class="icon icon-caret"></i></a>
          <ul class="menu text-left">
            <li class="menu-item"><a href="#dropdowns">Option 1</a></li>
            <li class="menu-item"><a href="#dropdowns">Option 2</a></li>
            <li class="menu-item"><a href="#dropdowns">Option 3</a></li>
          </ul>
        </div>
      </div>
      <div class="dropdown">
        <div class="btn-group"><a class="btn btn-primary">Split Dropdown</a><a class="btn btn-primary dropdown-toggle" tabindex="0"><i class="icon icon-caret"></i></a>
          <ul class="menu text-left">
            <li class="menu-item"><a href="#dropdowns">Option 1</a></li>
            <li class="menu-item"><a href="#dropdowns">Option 2</a></li>
            <li class="menu-item"><a href="#dropdowns">Option 3</a></li>
          </ul>
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
