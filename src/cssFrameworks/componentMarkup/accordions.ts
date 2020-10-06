import { ContentMarkup } from '../../interfaces/contentMarkupInterface';

export default {
  bootstrap: `
    <div id="accordion" style="text-align: left; width: 51%; display: inline-block">
      <div class="card">
        <div class="card-header" id="headingOne">
          <h5 class="mb-0">
            <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Item 1
            </button>
          </h5>
        </div>
        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
          <div class="card-body">
            According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground.
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingTwo">
          <h5 class="mb-0">
            <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Item 2
            </button>
          </h5>
        </div>
        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
          <div class="card-body">
            The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black.
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingThree">
          <h5 class="mb-0">
            <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Item 3
            </button>
          </h5>
        </div>
        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
          <div class="card-body">
            Students, faculty, distinguished bees, please welcome Dean Buzzwell. Welcome, New Hive Oity graduating class of... 9:15.
          </div>
        </div>
      </div>
    </div>
  `,
  materialize: `
    <ul class="collapsible" style="text-align: left; width: 51%; display: inline-block">
      <li class="active">
        <div class="collapsible-header">Item 1</div>
        <div class="collapsible-body"><span>According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground.</span></div>
      </li>
      <li>
        <div class="collapsible-header">Item 2</div>
        <div class="collapsible-body"><span>The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black.</span></div>
      </li>
      <li>
        <div class="collapsible-header">Item 3</div>
        <div class="collapsible-body"><span>Students, faculty, distinguished bees, please welcome Dean Buzzwell. Welcome, New Hive Oity graduating class of... 9:15.</span></div>
      </li>
    </ul>
  `,
  uikit: `
    <ul uk-accordion style="text-align: left; width: 51%; display: inline-block">
      <li class="uk-open">
        <a class="uk-accordion-title" href="#">Item 1</a>
        <div class="uk-accordion-content">
          <p>According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground.</p>
        </div>
      </li>
      <li>
        <a class="uk-accordion-title" href="#">Item 2</a>
        <div class="uk-accordion-content">
          <p>The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black.</p>
        </div>
      </li>
      <li>
        <a class="uk-accordion-title" href="#">Item 3</a>
        <div class="uk-accordion-content">
          <p>Students, faculty, distinguished bees, please welcome Dean Buzzwell. Welcome, New Hive Oity graduating class of... 9:15.</p>
        </div>
      </li>
    </ul>
  `,
  foundation: `
    <ul style="text-align: left; width: 51%; display: inline-block" class="accordion" data-accordion data-allow-all-closed="true">
      <li class="accordion-item is-active" data-accordion-item>
          <a href="#!" class="accordion-title">Item 1</a>
          <div class="accordion-content" data-tab-content >
            According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground.
          </div>
      </li>
      <li class="accordion-item" data-accordion-item>
          <a href="#!" class="accordion-title">Item 2</a>
          <div class="accordion-content" data-tab-content>
            The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black.
          </div>
      </li>
      <li class="accordion-item" data-accordion-item>
          <a href="#!" class="accordion-title">Item 3</a>
          <div class="accordion-content" data-tab-content>
            Students, faculty, distinguished bees, please welcome Dean Buzzwell. Welcome, New Hive Oity graduating class of... 9:15.
          </div>
      </li>
    </ul>
    `,
  bulma: `
    <section style="text-align: left; width: 51%; display: inline-block" class="accordions">
      <article class="accordion is-active">
        <div class="accordion-header toggle">
          <p>Item 1</p>
        </div>
        <div class="accordion-body">
          <div class="accordion-content">
            According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground.
          </div>
        </div>
      </article>
      <article class="accordion">
        <div class="accordion-header">
          <p>Item 2</p>
          <button class="toggle" aria-label="toggle"></button>
        </div>
        <div class="accordion-body">
          <div class="accordion-content">
            The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black.
          </div>
        </div>
      </article>
      <article class="accordion">
        <div class="accordion-header">
          <p>Item 3</p>
          <button class="toggle" aria-label="toggle"></button>
        </div>
        <div class="accordion-body">
          <div class="accordion-content">
            Students, faculty, distinguished bees, please welcome Dean Buzzwell. Welcome, New Hive Oity graduating class of... 9:15.
          </div>
        </div>
      </article>
    </section>
  `,
  semantic: `
    <div style="text-align: left; width: 51%; display: inline-block" class="ui styled accordion">
      <div class="title active">
        <i class="dropdown icon"></i>
        Item 1
      </div>
      <div class="content active">
        <p class="transition visible">According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground.</p>
      </div>
      <div class="title">
        <i class="dropdown icon"></i>
        Item 2
      </div>
      <div class="content">
        <p class="transition hidden">The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black.</p>
      </div>
      <div class="title">
        <i class="dropdown icon"></i>
        Item 3
      </div>
      <div class="content">
        <p>Students, faculty, distinguished bees, please welcome Dean Buzzwell. Welcome, New Hive Oity graduating class of... 9:15.</p>
      </div>
    </div>
  `,
  pure: `
    <button class="pure-button pure-button-primary">Button</button>
    <button class="button-success pure-button">Success</button>
    <button class="button-error pure-button">Danger</button>
    <button class="pure-button" disabled="">Disabled</button>
    `,
  skeleton: `
    <button>Button</button>
    <button class="button-primary">Button</button>
  `,
  milligram: `
    <button class="button">Button</button>
    <button class="button button-outline">Outlined</button>
  `,
  spectre: `
    <button class="btn btn-primary">Button</button>
    <button class="btn btn-success">Success</button>
    <button class="btn btn-error">Danger</button>
    <button class="btn disabled" tabindex="-1">Disabled</button>
    <button class="btn">Outlined</button>
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
