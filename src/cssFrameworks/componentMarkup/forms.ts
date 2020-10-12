import { ContentMarkup } from '../../interfaces/contentMarkupInterface';

export default {
  bootstrap: `
    <div style="width: 50%; display: inline-flex">
      <form style="width: 100%">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputUsername4">Username</label>
            <input class="form-control" id="inputUsername4" placeholder="Username">
          </div>
          <div class="form-group col-md-6">
            <label for="inputPassword4">Password</label>
            <input type="password" class="form-control" id="inputPassword4" placeholder="Password">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputState">Continent</label>
            <select id="inputState" class="form-control">
              <option selected>Europe</option>
              <option>North America</option>
              <option>South America</option>
              <option>Asia</option>
              <option>Australia</option>
              <option>Africa</option>
              <option>Antarctica</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <fieldset disabled>
              <label for="disabledTextInput">Disabled input</label>
              <input type="text" id="disabledTextInput" class="form-control" placeholder="Disabled input">
            </fieldset>
          </div>
        </div>
        <div class="form-group" style="text-align: left">
          <label for="exampleFormControlTextarea1">Comments</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <div class="form-row">
          <div class="form-group col-md-4">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="gridCheck">
                <label class="form-check-label" for="gridCheck">
                  Save information
                </label>
              </div>
          </div>
          <div class="form-group col-md-4">
            <div class="custom-control custom-switch">
              <input type="checkbox" class="custom-control-input" id="customSwitch1">
              <label class="custom-control-label" for="customSwitch1">Subscribe</label>
            </div>
          </div>
          <div class="form-group col-md-4">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
              <label class="form-check-label" for="inlineRadio1">1</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
              <label class="form-check-label" for="inlineRadio2">2</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3">
              <label class="form-check-label" for="inlineRadio3">3</label>
            </div>
          </div>
        </div>
        <div class="form-group" style="text-align: left">
          <input type="range" class="form-control-range" id="formControlRange">
        </div>
      </form>
    </div>
  `,
  materialize: `
    <div style="width: 50%; display: inline-flex">
      <form style="width: 100%" class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <input id="last_name" type="text" class="validate">
            <label for="last_name">Username</label>
          </div>
          <div class="input-field col s6">
            <input id="password" type="password" class="validate">
            <label for="password">Password</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <select class="materialize-select">
              <option value="" disabled selected>Continent</option>
              <option value="1">Europe</option>
              <option value="2">North America</option>
              <option value="3">South America</option>
              <option value="4">Asia</option>
              <option value="5">Australia</option>
              <option value="6">Africa</option>
              <option value="7">Antarctica</option>
            </select>
          </div>
          <div class="input-field col s6">
            <input disabled value="Disabled input" id="disabled" type="text" class="validate">
            <label for="disabled">Disabled input</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <textarea id="textarea1" class="materialize-textarea"></textarea>
            <label for="textarea1">Comments</label>
          </div>
        </div>
        <div class="row">
          <div class="col s4">
            <p>
              <label>
                <input type="checkbox" class="filled-in"/>
                <span>Save information</span>
              </label>
            </p>
          </div>
          <div class="col s4">
            <p>
              <div class="switch">
                <label>
                  <input type="checkbox">
                  <span class="lever"></span>
                  Subscribe
                </label>
              </div>
            </p>
          </div>
          <div class="col s4">
            <p>
              <label>
                <input name="group1" type="radio" />
                <span style="padding-left: 25px; margin-right: 5px">1</span>
              </label>
              <label>
                <input name="group1" type="radio" />
                <span style="padding-left: 25px; margin-right: 5px">2</span>
              </label>
              <label>
                <input name="group1" type="radio" />
                <span style="padding-left: 25px; margin-right: 5px">3</span>
              </label>
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <p class="range-field">
              <input type="range" id="test5" min="0" max="100" />
            </p>
          </div>
        </div>   
      </form>
    </div>
  `,
  uikit: `
    <div style="width: 50%; display: inline-flex">
      <form style="width: 100%">
        <fieldset class="uk-fieldset">
          <div class="uk-column-1-2@s">
            <div class="uk-margin">
              <input class="uk-input" type="text" placeholder="Username">
            </div>
            <div class="uk-margin">
              <input class="uk-input" type="password" placeholder="Password">
            </div>
          </div>
          <div class="uk-column-1-2@s">
            <div class="uk-margin">
              <select class="uk-select">
                <option>Europe</option>
                <option>North America</option>
                <option>South America</option>
                <option>Asia</option>
                <option>Australia</option>
                <option>Africa</option>
                <option>Antarctica</option>
              </select>
            </div>
            <div class="uk-margin">
              <input class="uk-input" type="text" disabled placeholder="Disabled input">
          </div>
          </div>
          <div class="uk-margin">
            <textarea class="uk-textarea" rows="5" placeholder="Comments"></textarea>
          </div>
          <div class="uk-column-1-2@s">
            <div style="display: inline-flex" class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
              <label><input style="margin-right: 10px" class="uk-checkbox" type="checkbox">Save information</label>
            </div>
            <div style="display: inherit; margin-bottom: 0px" class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
              <label><input style="margin-right: 5px" class="uk-radio" type="radio" name="radio2">1</label>
              <label><input style="margin-right: 5px" class="uk-radio" type="radio" name="radio2">2</label>
              <label><input style="margin-right: 5px" class="uk-radio" type="radio" name="radio2">3</label>
            </div>
          </div>
          <div class="uk-margin">
            <input class="uk-range" type="range" value="5" min="0" max="10" step="0.1">
          </div>
        </fieldset>
      </form>
    </div>
  `,
  foundation: `
    <div style="width: 50%; display: inline-flex">
      <form style="width: 100%">
        <div class="grid-container">
          <div class="grid-x grid-padding-x">
            <div class="medium-6 cell">
              <label>Username
                <input type="text" placeholder="Username">
              </label>
            </div>
            <div class="medium-6 cell">
              <label>Password
                <input type="text" placeholder="Password">
              </label>
            </div>
          </div>
          <div style="margin-top: 5px" class="grid-x grid-padding-x">
            <div class="medium-6 cell">
              <label>Continent
              <select>
                <option value="Europe">Europe</option>
                <option value="North America">North America</option>
                <option value="South America">South America</option>
                <option value="Asia">Asia</option>
                <option value="Australia">Australia</option>
                <option value="Africa">Africa</option>
                <option value="Antarctica">Antarctica</option>
              </select>
            </label>
          </div>
          <div class="medium-6 cell">
            <label>Disabled input
              <input type="text" disabled placeholder="Disabled input">
            </label>
          </div>
        </div>
        <div style="margin-top: 5px" class="grid-x grid-padding-x">
          <div style="width: 100%" class="medium-12 cell">
            <label>
              Comments
              <textarea placeholder="Comments"></textarea>
            </label>
          </div>
        </div>
        <div style="margin-top: 22px" class="grid-x grid-padding-x">
          <fieldset class="large-4 cell">
            <input id="checkbox1" type="checkbox"><label for="checkbox1">Save information</label>
          </fieldset>
          <div class="switch small large-4 cell">
            <div style="display: inline-block">
              <input class="switch-input" id="exampleSwitch" type="checkbox" name="exampleSwitch">
              <label style="float: left" class="switch-paddle" for="exampleSwitch">
                <span class="show-for-sr">Download Kittens</span>
              </label>
              <label style="float: left; margin-left: 10px;" for="checkbox1">Subscribe</label>
            </div>
          </div>
          <fieldset class="large-4 cell">
            <input type="radio" name="pokemon" value="Red" id="pokemonRed" required><label for="pokemonRed">1</label>
            <input type="radio" name="pokemon" value="Blue" id="pokemonBlue"><label for="pokemonBlue">2</label>
            <input type="radio" name="pokemon" value="Yellow" id="pokemonYellow"><label for="pokemonYellow">3</label>
          </fieldset>
        </div>
        <div style="margin-top: 5px" class="grid-x grid-padding-x">
          <div class="slider large-12 cell" data-slider data-initial-start="100" data-end="200">
            <span class="slider-handle"  data-slider-handle role="slider" tabindex="1"></span>
            <span class="slider-fill" data-slider-fill></span>
            <input type="hidden">
          </div>
        </div>
      </form>
    </div>
    `,
  bulma: `
    <div style="width: 50%; display: inline-block">
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input class="input" type="text" placeholder="Username">
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Password</label>
            <p class="control has-icons-left">
              <input class="input" type="password" placeholder="Password">
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Continent</label>
            <div class="control">
              <div style="width: 100%" class="select">
                <select style="width: 100%">
                  <option>Europe</option>
                  <option>North America</option>
                  <option>South America</option>
                  <option>Asia</option>
                  <option>Australia</option>
                  <option>Africa</option>
                  <option>Antarctica</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Disabled input</label>
            <div class="control">
              <input class="input" type="text" placeholder="Disabled input" disabled>
            </div>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label">Comments</label>
        <div class="control">
          <textarea class="textarea" placeholder="Comments"></textarea>
        </div>
      </div>
      <div style="margin-top: 10px" class="columns">
        <div class="column">
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input type="checkbox">
                Save information
              </label>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <input id="switchExample" type="checkbox" name="switchColorInfo" class="switch is-info">
            <label for="switchExample">Subscribe</label>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <div class="control">
              <label class="radio">
                <input type="radio" name="question">
                1
              </label>
              <label class="radio">
                <input type="radio" name="question">
                2
              </label>
              <label class="radio">
                <input type="radio" name="question">
                3
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-grouped">
        <input style="width: 100%" class="slider is-fullwidth" step="1" min="0" max="100" value="50" type="range">
      </div>
    </div>
  `,
  semantic: `
    <div style="width: 50%; display: inline-block">
      <form style="box-sizing: border-box" class="ui form">
        <div class="field">
          <div class="two fields">
            <div class="field">
              <label>Username</label>
              <input type="text" name="shipping[first-name]" placeholder="First Name">
            </div>
            <div class="field">
              <label>Password</label>
              <input type="password" placeholder="Password">
            </div>
          </div>
        </div>
        <div class="two fields">
          <div class="field">
            <label>State</label>
            <select class="ui fluid dropdown">
              <option value="">State</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
              <option value="Asia">Asia</option>
              <option value="Australia">Australia</option>
              <option value="Africa">Africa</option>
              <option value="Antarctica">Antarctica</option>
            </select>
          </div>
          <div class="disabled field">
            <label>Disabled input</label>
            <input placeholder="Disabled input" type="text" disabled="" tabindex="-1">
          </div>
        </div>
        <div class="field">
          <label>Comments</label>
          <textarea placeholder="Comments"></textarea>
        </div>
        <div class="fields">
          <div class="six wide field">
            <div class="inline field">
              <div class="ui checkbox">
                <input type="checkbox" tabindex="0" class="hidden">
                <label>Save information</label>
              </div>
            </div>
          </div>
          <div class="six wide field">
            <div class="ui toggle checkbox">
              <input type="checkbox" name="gift" tabindex="0" class="hidden">
              <label>Subscribe</label>
            </div>
          </div>
          <div class="six wide field">
              <div class="inline fields">
            <div class="field">
              <div class="ui radio checkbox">
                <input type="radio" name="fruit" tabindex="0" class="hidden">
                <label>1</label>
              </div>
            </div>
            <div class="field">
              <div class="ui radio checkbox">
                <input type="radio" name="fruit" tabindex="0" class="hidden">
                <label>2</label>
              </div>
            </div>
            <div class="field">
              <div class="ui radio checkbox">
                <input type="radio" name="fruit" tabindex="0" class="hidden">
                <label>3</label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  `,
  pure: `
    <div style="width: 50%; display: inline-block">
      <form class="pure-form pure-form-stacked">
        <fieldset>
          <div class="pure-g">
            <div class="pure-u-1 pure-u-md-1-2">
              <label for="multi-first-name">Username</label>
              <input type="text" id="multi-first-name" placeholder="Username" class="pure-u-23-24" />
            </div>
            <div class="pure-u-1 pure-u-md-1-2">
              <label for="multi-last-name">Last Name</label>
              <input type="password" placeholder="Password" class="pure-u-23-24" />
            </div>
            <div style="margin-top: 15px" class="pure-u-1 pure-u-md-1-2">
              <label for="multi-state">Continent</label>
              <select id="multi-state" class="pure-u-23-24">
                <option>Europe</option>
                <option>North America</option>
                <option>South America</option>
                <option>Asia</option>
                <option>Australia</option>
                <option>Africa</option>
                <option>Antarctica</option>
              </select>
            </div>
            <div style="margin-top: 15px" class="pure-u-1 pure-u-md-1-2">
              <label for="multi-last-name">Disabled input</label>
              <input type="text" placeholder="Disabled input" disabled="" class="pure-u-23-24" />
            </div>
            <div style="margin-top: 15px" class="pure-u-1 pure-u-md-1">
              <label for="multi-last-name">Comments</label>
              <textarea class="pure-input-1" placeholder="Comments"></textarea>
            </div>
            <div style="margin-top: 15px" class="pure-u-1 pure-u-md-1-2">
              <label for="checkbox-radio-option-one" class="pure-checkbox">
              <input type="checkbox" id="checkbox-radio-option-one" value="" />Save information</label>
            </div>
            <div style="margin-top: 15px" class="pure-u-1 pure-u-md-1-2">
              <div style="display: inline-flex">
                <label for="checkbox-radio-option-two" class="pure-radio">
                <input type="radio" id="checkbox-radio-option-two" name="optionsRadios" value="option1" />1</label>
                <label style="margin-left: 15px" for="checkbox-radio-option-three" class="pure-radio">
                <input type="radio" id="checkbox-radio-option-three" name="optionsRadios" value="option2" />2</label>
                <label style="margin-left: 15px" for="checkbox-radio-option-four" class="pure-radio">
                <input type="radio" id="checkbox-radio-option-four" name="optionsRadios" value="option3" />3</label>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
    `,
  skeleton: `
    <div style="width: 50%; display: inline-block">
      <form>
        <div class="row">
          <div class="six columns">
            <label for="exampleEmailInput1">Username</label>
            <input class="u-full-width" type="email" placeholder="Username" id="exampleEmailInput1">
          </div>
          <div class="six columns">
            <label for="exampleEmailInput2">Password</label>
            <input class="u-full-width" type="password" placeholder="Password" id="exampleEmailInput2">
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            <label for="exampleRecipientInput">Continent</label>
            <select class="u-full-width" id="exampleRecipientInput">
              <option value="Option 1">Europe</option>
              <option value="Option 2">North America</option>
              <option value="Option 3">South America</option>
              <option value="Option 4">Asia</option>
              <option value="Option 5">Australia</option>
              <option value="Option 6">Africa</option>
              <option value="Option 7">Antarctica</option>
            </select>
          </div>
          <div class="six columns">
            <label for="exampleEmailInput3">Disabled input</label>
            <input disabled class="u-full-width" type="email" placeholder="Disabled input" id="exampleEmailInput3">
          </div>
        </div>
        <label for="exampleMessage">Comments</label>
        <textarea class="u-full-width" placeholder="Comments" id="exampleMessage"></textarea>
        <div class="row">
          <div class="six columns">
            <label class="example-send-yourself-copy">
              <input type="checkbox">
              <span class="label-body">Save information</span>
            </label>
          </div>
          <div class="six columns">
            <div style="display: inline-flex">
              <label class="radio">
                <input type="radio" name="question">
                1
              </label>
              <label style="margin-left: 15px" class="radio">
                <input type="radio" name="question">
                2
              </label>
              <label style="margin-left: 15px" class="radio">
                <input type="radio" name="question">
                3
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  `,
  milligram: `
    <div style="width: 50%; display: inline-block">
      <form>
        <fieldset>
          <div class="row">
            <div class="column">
              <label style="font-size: 16px" for="nameField">Name</label>
              <input style="height: 38px; border-width: 1px; padding: 6px 10px 7px; border-radius: 5px;" type="text" placeholder="Username" id="nameField">
            </div>
            <div class="column">
              <label style="font-size: 16px" for="nameField">Password</label>
              <input style="height: 38px; border-width: 1px; padding: 6px 10px 7px; border-radius: 5px;" type="password" placeholder="Password" id="nameField1">
            </div>
          </div>
          <div class="row">
            <div class="column">
              <label style="font-size: 16px" for="ageRangeField">Continent</label>
              <select style="height: 38px; border-width: 1px; padding: 6px 10px 7px; border-radius: 5px;" id="ageRangeField">
                <option value="Europe">Europe</option>
                <option value="North America">North America</option>
                <option value="South America">South America</option>
                <option value="Asia">Asia</option>
                <option value="Australia">Australia</option>
                <option value="Africa">Africa</option>
                <option value="Antarctica">Antarctica</option>
              </select>
            </div>
            <div class="column">
              <label style="font-size: 16px" for="nameField">Disabled input</label>
              <input style="height: 38px; border-width: 1px; padding: 6px 10px 7px; border-radius: 5px;" type="text" placeholder="Disabled input" disabled id="nameField2">
            </div>
          </div>
          <label style="font-size: 16px" for="commentField">Comments</label>
          <textarea style="height: 38px; border-width: 1px; padding: 6px 10px 7px; border-radius: 5px; font-family: 'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;" placeholder="Comments" id="commentField"></textarea>
          <div class="row">
            <div class="column">
              <input type="checkbox" id="confirmField">
              <label style="height: 38px; font-size: 16px; display: contents" class="label-inline" for="confirmField">Send a copy to yourself</label>
            </div>
            <div class="column">
              <div style="display: inline-flex">
                <label style="height: 38px; font-size: 16px; margin-left: 15px" class="radio">
                  <input type="radio" name="question">
                  1
                </label>
                <label style="height: 38px; font-size: 16px; margin-left: 15px" class="radio">
                  <input type="radio" name="question">
                  2
                </label>
                <label style="height: 38px; font-size: 16px; margin-left: 15px" class="radio">
                  <input type="radio" name="question">
                  3
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  `,
  spectre: `
    <div style="width: 50%; display: inline-block">
      <div class="columns">
        <div style="padding: 6px 10px;" class="col-6 col-xs-12">
          <label class="form-label" for="input-example-1">Username</label>
          <input class="form-input" type="text" id="input-example-1" placeholder="Username">
        </div>
        <div style="padding: 6px 10px;" class="col-6 col-xs-12">
          <label class="form-label" for="input-example-1">Password</label>
          <input class="form-input" id="input-example-12" type="password" placeholder="Password">
        </div>
      </div>
      <div class="columns">
        <div style="padding: 6px 10px;" class="col-6 col-xs-12">
          <label class="form-label" for="spectre-select">Continent</label>
          <select class="form-select">
            <option>Europe</option>
            <option>North America</option>
            <option>South America</option>
            <option>Asia</option>
            <option>Australia</option>
            <option>Africa</option>
            <option>Antarctica</option>
          </select>
        </div>
        <div style="padding: 6px 10px;" class="col-6 col-xs-12">
          <label class="form-label" for="input-example-1">Disabled input</label>
          <input class="form-input" id="input-example-14" type="password" placeholder="Disabled input" disabled >
        </div>
      </div>
      <label style="margin-top: 10px" class="form-label" for="input-example-3">Comments</label>
      <textarea class="form-input" id="input-example-3" placeholder="Comments" rows="3"></textarea>
      <div style="margin-top: 10px" class="columns">
        <div style="padding: 6px 10px;" class="col-4 col-xs-12">
          <div style="display: inline-flex">
            <label class="form-checkbox">
              <input type="checkbox">
              <i class="form-icon"></i> Save information
            </label>
          </div>
        </div>
        <div style="padding: 6px 10px;" class="col-4 col-xs-12">
          <div style="display: inline-flex">
            <label class="form-switch">
              <input type="checkbox">
              <i class="form-icon"></i> Subscribe
            </label>
          </div>
        </div>
        <div style="padding: 6px 10px;" class="col-4 col-xs-12">
          <label class="form-radio form-inline">
            <input type="radio" name="gender"><i class="form-icon"></i> 1
          </label>
          <label class="form-radio form-inline">
            <input type="radio" name="gender"><i class="form-icon"></i> 2
          </label>
          <label class="form-radio form-inline">
            <input type="radio" name="gender"><i class="form-icon"></i> 3
          </label>
        </div>
      </div>
      <input style="max-width: 100%; margin-top: 10px" class="slider tooltip" type="range" min="0" max="100" value="50" oninput="this.setAttribute('value', this.value);">
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
