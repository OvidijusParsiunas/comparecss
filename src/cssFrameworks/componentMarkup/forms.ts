import { ContentMarkup } from '../../interfaces/contentMarkupInterface';

// inputs + disabled + with preview
// checkboxes
// radio
// progress
// general, and then individual ones

// Name - Normal - should contain a placeholder
// Password - hidden
// Disabled Field
// Text Area
// Radio
// Checkbox - One should be ok
// Range
// Switch
// Submit button (optional)
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
              <option value="1">North America</option>
              <option value="2">South America</option>
              <option value="3">Asia</option>
              <option value="4">Australia</option>
              <option value="5">Africa</option>
              <option value="6">Antarctica</option>
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
                <input type="checkbox" class="filled-in" checked="checked" />
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
                <span>1</span>
              </label>
              <label>
                <input name="group1" type="radio" />
                <span>2</span>
              </label>
              <label>
                <input name="group1" type="radio" />
                <span>3</span>
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
  <form>
  <fieldset class="uk-fieldset">

      <legend class="uk-legend">Legend</legend>

      <div class="uk-margin">
          <input class="uk-input" type="text" placeholder="Input">
      </div>

      <div class="uk-margin">
          <select class="uk-select">
              <option>Option 01</option>
              <option>Option 02</option>
          </select>
      </div>

      <div class="uk-margin">
          <textarea class="uk-textarea" rows="5" placeholder="Textarea"></textarea>
      </div>

      <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
          <label><input class="uk-radio" type="radio" name="radio2" checked> A</label>
          <label><input class="uk-radio" type="radio" name="radio2"> B</label>
      </div>

      <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
          <label><input class="uk-checkbox" type="checkbox" checked> A</label>
          <label><input class="uk-checkbox" type="checkbox"> B</label>
      </div>

      <div class="uk-margin">
          <input class="uk-range" type="range" value="2" min="0" max="10" step="0.1">
      </div>

  </fieldset>
</form>
  `,
  foundation: `
  <form>
  <div class="grid-container">
    <div class="grid-x grid-padding-x">
      <div class="medium-6 cell">
        <label>Input Label
          <input type="text" placeholder=".medium-6.cell">
        </label>
      </div>
      <div class="medium-6 cell">
        <label>Input Label
          <input type="text" placeholder=".medium-6.cell">
        </label>
      </div>
    </div>
  </div>
</form>
    `,
  bulma: `
  <div class="field">
  <label class="label">Name</label>
  <div class="control">
    <input class="input" type="text" placeholder="Text input">
  </div>
</div>

<div class="field">
  <label class="label">Username</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input is-success" type="text" placeholder="Text input" value="bulma">
    <span class="icon is-small is-left">
      <i class="fas fa-user"></i>
    </span>
    <span class="icon is-small is-right">
      <i class="fas fa-check"></i>
    </span>
  </div>
  <p class="help is-success">This username is available</p>
</div>

<div class="field">
  <label class="label">Email</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input is-danger" type="email" placeholder="Email input" value="hello@">
    <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
    <span class="icon is-small is-right">
      <i class="fas fa-exclamation-triangle"></i>
    </span>
  </div>
  <p class="help is-danger">This email is invalid</p>
</div>

<div class="field">
  <label class="label">Subject</label>
  <div class="control">
    <div class="select">
      <select>
        <option>Select dropdown</option>
        <option>With options</option>
      </select>
    </div>
  </div>
</div>

<div class="field">
  <label class="label">Message</label>
  <div class="control">
    <textarea class="textarea" placeholder="Textarea"></textarea>
  </div>
</div>

<div class="field">
  <div class="control">
    <label class="checkbox">
      <input type="checkbox">
      I agree to the <a href="#">terms and conditions</a>
    </label>
  </div>
</div>

<div class="field">
  <div class="control">
    <label class="radio">
      <input type="radio" name="question">
      Yes
    </label>
    <label class="radio">
      <input type="radio" name="question">
      No
    </label>
  </div>
</div>

<div class="field is-grouped">
  <div class="control">
    <button class="button is-link">Submit</button>
  </div>
  <div class="control">
    <button class="button is-link is-light">Cancel</button>
  </div>
</div>
  `,
  semantic: `
  <form class="ui form">
  <h4 class="ui dividing header">Shipping Information</h4>
  <div class="field">
    <label>Name</label>
    <div class="two fields">
      <div class="field">
        <input type="text" name="shipping[first-name]" placeholder="First Name">
      </div>
      <div class="field">
        <input type="text" name="shipping[last-name]" placeholder="Last Name">
      </div>
    </div>
  </div>
  <div class="field">
    <label>Billing Address</label>
    <div class="fields">
      <div class="twelve wide field">
        <input type="text" name="shipping[address]" placeholder="Street Address">
      </div>
      <div class="four wide field">
        <input type="text" name="shipping[address-2]" placeholder="Apt #">
      </div>
    </div>
  </div>
  <div class="two fields">
    <div class="field">
      <label>State</label>
      <select class="ui fluid dropdown">
        <option value="">State</option>
    <option value="AL">Alabama</option>
    <option value="AK">Alaska</option>
    <option value="AZ">Arizona</option>
    <option value="AR">Arkansas</option>
    <option value="CA">California</option>
    <option value="CO">Colorado</option>
    <option value="CT">Connecticut</option>
    <option value="DE">Delaware</option>
    <option value="DC">District Of Columbia</option>
    <option value="FL">Florida</option>
    <option value="GA">Georgia</option>
    <option value="HI">Hawaii</option>
    <option value="ID">Idaho</option>
    <option value="IL">Illinois</option>
    <option value="IN">Indiana</option>
    <option value="IA">Iowa</option>
    <option value="KS">Kansas</option>
    <option value="KY">Kentucky</option>
    <option value="LA">Louisiana</option>
    <option value="ME">Maine</option>
    <option value="MD">Maryland</option>
    <option value="MA">Massachusetts</option>
    <option value="MI">Michigan</option>
    <option value="MN">Minnesota</option>
    <option value="MS">Mississippi</option>
    <option value="MO">Missouri</option>
    <option value="MT">Montana</option>
    <option value="NE">Nebraska</option>
    <option value="NV">Nevada</option>
    <option value="NH">New Hampshire</option>
    <option value="NJ">New Jersey</option>
    <option value="NM">New Mexico</option>
    <option value="NY">New York</option>
    <option value="NC">North Carolina</option>
    <option value="ND">North Dakota</option>
    <option value="OH">Ohio</option>
    <option value="OK">Oklahoma</option>
    <option value="OR">Oregon</option>
    <option value="PA">Pennsylvania</option>
    <option value="RI">Rhode Island</option>
    <option value="SC">South Carolina</option>
    <option value="SD">South Dakota</option>
    <option value="TN">Tennessee</option>
    <option value="TX">Texas</option>
    <option value="UT">Utah</option>
    <option value="VT">Vermont</option>
    <option value="VA">Virginia</option>
    <option value="WA">Washington</option>
    <option value="WV">West Virginia</option>
    <option value="WI">Wisconsin</option>
    <option value="WY">Wyoming</option>
      </select>
    </div>
    <div class="field">
      <label>Country</label>
      <div class="ui fluid search selection dropdown">
        <input type="hidden" name="country">
        <i class="dropdown icon"></i>
        <div class="default text">Select Country</div>
        <div class="menu">
    <div class="item" data-value="af"><i class="af flag"></i>Afghanistan</div>
    <div class="item" data-value="ax"><i class="ax flag"></i>Aland Islands</div>
    <div class="item" data-value="al"><i class="al flag"></i>Albania</div>
    <div class="item" data-value="dz"><i class="dz flag"></i>Algeria</div>
    <div class="item" data-value="as"><i class="as flag"></i>American Samoa</div>
    <div class="item" data-value="ad"><i class="ad flag"></i>Andorra</div>
    <div class="item" data-value="ao"><i class="ao flag"></i>Angola</div>
    <div class="item" data-value="ai"><i class="ai flag"></i>Anguilla</div>
    <div class="item" data-value="ag"><i class="ag flag"></i>Antigua</div>
    <div class="item" data-value="ar"><i class="ar flag"></i>Argentina</div>
    <div class="item" data-value="am"><i class="am flag"></i>Armenia</div>
    <div class="item" data-value="aw"><i class="aw flag"></i>Aruba</div>
    <div class="item" data-value="au"><i class="au flag"></i>Australia</div>
    <div class="item" data-value="at"><i class="at flag"></i>Austria</div>
    <div class="item" data-value="az"><i class="az flag"></i>Azerbaijan</div>
    <div class="item" data-value="bs"><i class="bs flag"></i>Bahamas</div>
    <div class="item" data-value="bh"><i class="bh flag"></i>Bahrain</div>
    <div class="item" data-value="bd"><i class="bd flag"></i>Bangladesh</div>
    <div class="item" data-value="bb"><i class="bb flag"></i>Barbados</div>
    <div class="item" data-value="by"><i class="by flag"></i>Belarus</div>
    <div class="item" data-value="be"><i class="be flag"></i>Belgium</div>
    <div class="item" data-value="bz"><i class="bz flag"></i>Belize</div>
    <div class="item" data-value="bj"><i class="bj flag"></i>Benin</div>
    <div class="item" data-value="bm"><i class="bm flag"></i>Bermuda</div>
    <div class="item" data-value="bt"><i class="bt flag"></i>Bhutan</div>
    <div class="item" data-value="bo"><i class="bo flag"></i>Bolivia</div>
    <div class="item" data-value="ba"><i class="ba flag"></i>Bosnia</div>
    <div class="item" data-value="bw"><i class="bw flag"></i>Botswana</div>
    <div class="item" data-value="bv"><i class="bv flag"></i>Bouvet Island</div>
    <div class="item" data-value="br"><i class="br flag"></i>Brazil</div>
    <div class="item" data-value="vg"><i class="vg flag"></i>British Virgin Islands</div>
    <div class="item" data-value="bn"><i class="bn flag"></i>Brunei</div>
    <div class="item" data-value="bg"><i class="bg flag"></i>Bulgaria</div>
    <div class="item" data-value="bf"><i class="bf flag"></i>Burkina Faso</div>
    <div class="item" data-value="mm"><i class="mm flag"></i>Burma</div>
    <div class="item" data-value="bi"><i class="bi flag"></i>Burundi</div>
    <div class="item" data-value="tc"><i class="tc flag"></i>Caicos Islands</div>
    <div class="item" data-value="kh"><i class="kh flag"></i>Cambodia</div>
    <div class="item" data-value="cm"><i class="cm flag"></i>Cameroon</div>
    <div class="item" data-value="ca"><i class="ca flag"></i>Canada</div>
    <div class="item" data-value="cv"><i class="cv flag"></i>Cape Verde</div>
    <div class="item" data-value="ky"><i class="ky flag"></i>Cayman Islands</div>
    <div class="item" data-value="cf"><i class="cf flag"></i>Central African Republic</div>
    <div class="item" data-value="td"><i class="td flag"></i>Chad</div>
    <div class="item" data-value="cl"><i class="cl flag"></i>Chile</div>
    <div class="item" data-value="cn"><i class="cn flag"></i>China</div>
    <div class="item" data-value="cx"><i class="cx flag"></i>Christmas Island</div>
    <div class="item" data-value="cc"><i class="cc flag"></i>Cocos Islands</div>
    <div class="item" data-value="co"><i class="co flag"></i>Colombia</div>
    <div class="item" data-value="km"><i class="km flag"></i>Comoros</div>
    <div class="item" data-value="cg"><i class="cg flag"></i>Congo Brazzaville</div>
    <div class="item" data-value="cd"><i class="cd flag"></i>Congo</div>
    <div class="item" data-value="ck"><i class="ck flag"></i>Cook Islands</div>
    <div class="item" data-value="cr"><i class="cr flag"></i>Costa Rica</div>
    <div class="item" data-value="ci"><i class="ci flag"></i>Cote Divoire</div>
    <div class="item" data-value="hr"><i class="hr flag"></i>Croatia</div>
    <div class="item" data-value="cu"><i class="cu flag"></i>Cuba</div>
    <div class="item" data-value="cy"><i class="cy flag"></i>Cyprus</div>
    <div class="item" data-value="cz"><i class="cz flag"></i>Czech Republic</div>
    <div class="item" data-value="dk"><i class="dk flag"></i>Denmark</div>
    <div class="item" data-value="dj"><i class="dj flag"></i>Djibouti</div>
    <div class="item" data-value="dm"><i class="dm flag"></i>Dominica</div>
    <div class="item" data-value="do"><i class="do flag"></i>Dominican Republic</div>
    <div class="item" data-value="ec"><i class="ec flag"></i>Ecuador</div>
    <div class="item" data-value="eg"><i class="eg flag"></i>Egypt</div>
    <div class="item" data-value="sv"><i class="sv flag"></i>El Salvador</div>
    <div class="item" data-value="gb"><i class="gb flag"></i>England</div>
    <div class="item" data-value="gq"><i class="gq flag"></i>Equatorial Guinea</div>
    <div class="item" data-value="er"><i class="er flag"></i>Eritrea</div>
    <div class="item" data-value="ee"><i class="ee flag"></i>Estonia</div>
    <div class="item" data-value="et"><i class="et flag"></i>Ethiopia</div>
    <div class="item" data-value="eu"><i class="eu flag"></i>European Union</div>
    <div class="item" data-value="fk"><i class="fk flag"></i>Falkland Islands</div>
    <div class="item" data-value="fo"><i class="fo flag"></i>Faroe Islands</div>
    <div class="item" data-value="fj"><i class="fj flag"></i>Fiji</div>
    <div class="item" data-value="fi"><i class="fi flag"></i>Finland</div>
    <div class="item" data-value="fr"><i class="fr flag"></i>France</div>
    <div class="item" data-value="gf"><i class="gf flag"></i>French Guiana</div>
    <div class="item" data-value="pf"><i class="pf flag"></i>French Polynesia</div>
    <div class="item" data-value="tf"><i class="tf flag"></i>French Territories</div>
    <div class="item" data-value="ga"><i class="ga flag"></i>Gabon</div>
    <div class="item" data-value="gm"><i class="gm flag"></i>Gambia</div>
    <div class="item" data-value="ge"><i class="ge flag"></i>Georgia</div>
    <div class="item" data-value="de"><i class="de flag"></i>Germany</div>
    <div class="item" data-value="gh"><i class="gh flag"></i>Ghana</div>
    <div class="item" data-value="gi"><i class="gi flag"></i>Gibraltar</div>
    <div class="item" data-value="gr"><i class="gr flag"></i>Greece</div>
    <div class="item" data-value="gl"><i class="gl flag"></i>Greenland</div>
    <div class="item" data-value="gd"><i class="gd flag"></i>Grenada</div>
    <div class="item" data-value="gp"><i class="gp flag"></i>Guadeloupe</div>
    <div class="item" data-value="gu"><i class="gu flag"></i>Guam</div>
    <div class="item" data-value="gt"><i class="gt flag"></i>Guatemala</div>
    <div class="item" data-value="gw"><i class="gw flag"></i>Guinea-Bissau</div>
    <div class="item" data-value="gn"><i class="gn flag"></i>Guinea</div>
    <div class="item" data-value="gy"><i class="gy flag"></i>Guyana</div>
    <div class="item" data-value="ht"><i class="ht flag"></i>Haiti</div>
    <div class="item" data-value="hm"><i class="hm flag"></i>Heard Island</div>
    <div class="item" data-value="hn"><i class="hn flag"></i>Honduras</div>
    <div class="item" data-value="hk"><i class="hk flag"></i>Hong Kong</div>
    <div class="item" data-value="hu"><i class="hu flag"></i>Hungary</div>
    <div class="item" data-value="is"><i class="is flag"></i>Iceland</div>
    <div class="item" data-value="in"><i class="in flag"></i>India</div>
    <div class="item" data-value="io"><i class="io flag"></i>Indian Ocean Territory</div>
    <div class="item" data-value="id"><i class="id flag"></i>Indonesia</div>
    <div class="item" data-value="ir"><i class="ir flag"></i>Iran</div>
    <div class="item" data-value="iq"><i class="iq flag"></i>Iraq</div>
    <div class="item" data-value="ie"><i class="ie flag"></i>Ireland</div>
    <div class="item" data-value="il"><i class="il flag"></i>Israel</div>
    <div class="item" data-value="it"><i class="it flag"></i>Italy</div>
    <div class="item" data-value="jm"><i class="jm flag"></i>Jamaica</div>
    <div class="item" data-value="jp"><i class="jp flag"></i>Japan</div>
    <div class="item" data-value="jo"><i class="jo flag"></i>Jordan</div>
    <div class="item" data-value="kz"><i class="kz flag"></i>Kazakhstan</div>
    <div class="item" data-value="ke"><i class="ke flag"></i>Kenya</div>
    <div class="item" data-value="ki"><i class="ki flag"></i>Kiribati</div>
    <div class="item" data-value="kw"><i class="kw flag"></i>Kuwait</div>
    <div class="item" data-value="kg"><i class="kg flag"></i>Kyrgyzstan</div>
    <div class="item" data-value="la"><i class="la flag"></i>Laos</div>
    <div class="item" data-value="lv"><i class="lv flag"></i>Latvia</div>
    <div class="item" data-value="lb"><i class="lb flag"></i>Lebanon</div>
    <div class="item" data-value="ls"><i class="ls flag"></i>Lesotho</div>
    <div class="item" data-value="lr"><i class="lr flag"></i>Liberia</div>
    <div class="item" data-value="ly"><i class="ly flag"></i>Libya</div>
    <div class="item" data-value="li"><i class="li flag"></i>Liechtenstein</div>
    <div class="item" data-value="lt"><i class="lt flag"></i>Lithuania</div>
    <div class="item" data-value="lu"><i class="lu flag"></i>Luxembourg</div>
    <div class="item" data-value="mo"><i class="mo flag"></i>Macau</div>
    <div class="item" data-value="mk"><i class="mk flag"></i>Macedonia</div>
    <div class="item" data-value="mg"><i class="mg flag"></i>Madagascar</div>
    <div class="item" data-value="mw"><i class="mw flag"></i>Malawi</div>
    <div class="item" data-value="my"><i class="my flag"></i>Malaysia</div>
    <div class="item" data-value="mv"><i class="mv flag"></i>Maldives</div>
    <div class="item" data-value="ml"><i class="ml flag"></i>Mali</div>
    <div class="item" data-value="mt"><i class="mt flag"></i>Malta</div>
    <div class="item" data-value="mh"><i class="mh flag"></i>Marshall Islands</div>
    <div class="item" data-value="mq"><i class="mq flag"></i>Martinique</div>
    <div class="item" data-value="mr"><i class="mr flag"></i>Mauritania</div>
    <div class="item" data-value="mu"><i class="mu flag"></i>Mauritius</div>
    <div class="item" data-value="yt"><i class="yt flag"></i>Mayotte</div>
    <div class="item" data-value="mx"><i class="mx flag"></i>Mexico</div>
    <div class="item" data-value="fm"><i class="fm flag"></i>Micronesia</div>
    <div class="item" data-value="md"><i class="md flag"></i>Moldova</div>
    <div class="item" data-value="mc"><i class="mc flag"></i>Monaco</div>
    <div class="item" data-value="mn"><i class="mn flag"></i>Mongolia</div>
    <div class="item" data-value="me"><i class="me flag"></i>Montenegro</div>
    <div class="item" data-value="ms"><i class="ms flag"></i>Montserrat</div>
    <div class="item" data-value="ma"><i class="ma flag"></i>Morocco</div>
    <div class="item" data-value="mz"><i class="mz flag"></i>Mozambique</div>
    <div class="item" data-value="na"><i class="na flag"></i>Namibia</div>
    <div class="item" data-value="nr"><i class="nr flag"></i>Nauru</div>
    <div class="item" data-value="np"><i class="np flag"></i>Nepal</div>
    <div class="item" data-value="an"><i class="an flag"></i>Netherlands Antilles</div>
    <div class="item" data-value="nl"><i class="nl flag"></i>Netherlands</div>
    <div class="item" data-value="nc"><i class="nc flag"></i>New Caledonia</div>
    <div class="item" data-value="pg"><i class="pg flag"></i>New Guinea</div>
    <div class="item" data-value="nz"><i class="nz flag"></i>New Zealand</div>
    <div class="item" data-value="ni"><i class="ni flag"></i>Nicaragua</div>
    <div class="item" data-value="ne"><i class="ne flag"></i>Niger</div>
    <div class="item" data-value="ng"><i class="ng flag"></i>Nigeria</div>
    <div class="item" data-value="nu"><i class="nu flag"></i>Niue</div>
    <div class="item" data-value="nf"><i class="nf flag"></i>Norfolk Island</div>
    <div class="item" data-value="kp"><i class="kp flag"></i>North Korea</div>
    <div class="item" data-value="mp"><i class="mp flag"></i>Northern Mariana Islands</div>
    <div class="item" data-value="no"><i class="no flag"></i>Norway</div>
    <div class="item" data-value="om"><i class="om flag"></i>Oman</div>
    <div class="item" data-value="pk"><i class="pk flag"></i>Pakistan</div>
    <div class="item" data-value="pw"><i class="pw flag"></i>Palau</div>
    <div class="item" data-value="ps"><i class="ps flag"></i>Palestine</div>
    <div class="item" data-value="pa"><i class="pa flag"></i>Panama</div>
    <div class="item" data-value="py"><i class="py flag"></i>Paraguay</div>
    <div class="item" data-value="pe"><i class="pe flag"></i>Peru</div>
    <div class="item" data-value="ph"><i class="ph flag"></i>Philippines</div>
    <div class="item" data-value="pn"><i class="pn flag"></i>Pitcairn Islands</div>
    <div class="item" data-value="pl"><i class="pl flag"></i>Poland</div>
    <div class="item" data-value="pt"><i class="pt flag"></i>Portugal</div>
    <div class="item" data-value="pr"><i class="pr flag"></i>Puerto Rico</div>
    <div class="item" data-value="qa"><i class="qa flag"></i>Qatar</div>
    <div class="item" data-value="re"><i class="re flag"></i>Reunion</div>
    <div class="item" data-value="ro"><i class="ro flag"></i>Romania</div>
    <div class="item" data-value="ru"><i class="ru flag"></i>Russia</div>
    <div class="item" data-value="rw"><i class="rw flag"></i>Rwanda</div>
    <div class="item" data-value="sh"><i class="sh flag"></i>Saint Helena</div>
    <div class="item" data-value="kn"><i class="kn flag"></i>Saint Kitts and Nevis</div>
    <div class="item" data-value="lc"><i class="lc flag"></i>Saint Lucia</div>
    <div class="item" data-value="pm"><i class="pm flag"></i>Saint Pierre</div>
    <div class="item" data-value="vc"><i class="vc flag"></i>Saint Vincent</div>
    <div class="item" data-value="ws"><i class="ws flag"></i>Samoa</div>
    <div class="item" data-value="sm"><i class="sm flag"></i>San Marino</div>
    <div class="item" data-value="gs"><i class="gs flag"></i>Sandwich Islands</div>
    <div class="item" data-value="st"><i class="st flag"></i>Sao Tome</div>
    <div class="item" data-value="sa"><i class="sa flag"></i>Saudi Arabia</div>
    <div class="item" data-value="sn"><i class="sn flag"></i>Senegal</div>
    <div class="item" data-value="cs"><i class="cs flag"></i>Serbia</div>
    <div class="item" data-value="rs"><i class="rs flag"></i>Serbia</div>
    <div class="item" data-value="sc"><i class="sc flag"></i>Seychelles</div>
    <div class="item" data-value="sl"><i class="sl flag"></i>Sierra Leone</div>
    <div class="item" data-value="sg"><i class="sg flag"></i>Singapore</div>
    <div class="item" data-value="sk"><i class="sk flag"></i>Slovakia</div>
    <div class="item" data-value="si"><i class="si flag"></i>Slovenia</div>
    <div class="item" data-value="sb"><i class="sb flag"></i>Solomon Islands</div>
    <div class="item" data-value="so"><i class="so flag"></i>Somalia</div>
    <div class="item" data-value="za"><i class="za flag"></i>South Africa</div>
    <div class="item" data-value="kr"><i class="kr flag"></i>South Korea</div>
    <div class="item" data-value="es"><i class="es flag"></i>Spain</div>
    <div class="item" data-value="lk"><i class="lk flag"></i>Sri Lanka</div>
    <div class="item" data-value="sd"><i class="sd flag"></i>Sudan</div>
    <div class="item" data-value="sr"><i class="sr flag"></i>Suriname</div>
    <div class="item" data-value="sj"><i class="sj flag"></i>Svalbard</div>
    <div class="item" data-value="sz"><i class="sz flag"></i>Swaziland</div>
    <div class="item" data-value="se"><i class="se flag"></i>Sweden</div>
    <div class="item" data-value="ch"><i class="ch flag"></i>Switzerland</div>
    <div class="item" data-value="sy"><i class="sy flag"></i>Syria</div>
    <div class="item" data-value="tw"><i class="tw flag"></i>Taiwan</div>
    <div class="item" data-value="tj"><i class="tj flag"></i>Tajikistan</div>
    <div class="item" data-value="tz"><i class="tz flag"></i>Tanzania</div>
    <div class="item" data-value="th"><i class="th flag"></i>Thailand</div>
    <div class="item" data-value="tl"><i class="tl flag"></i>Timorleste</div>
    <div class="item" data-value="tg"><i class="tg flag"></i>Togo</div>
    <div class="item" data-value="tk"><i class="tk flag"></i>Tokelau</div>
    <div class="item" data-value="to"><i class="to flag"></i>Tonga</div>
    <div class="item" data-value="tt"><i class="tt flag"></i>Trinidad</div>
    <div class="item" data-value="tn"><i class="tn flag"></i>Tunisia</div>
    <div class="item" data-value="tr"><i class="tr flag"></i>Turkey</div>
    <div class="item" data-value="tm"><i class="tm flag"></i>Turkmenistan</div>
    <div class="item" data-value="tv"><i class="tv flag"></i>Tuvalu</div>
    <div class="item" data-value="ug"><i class="ug flag"></i>Uganda</div>
    <div class="item" data-value="ua"><i class="ua flag"></i>Ukraine</div>
    <div class="item" data-value="ae"><i class="ae flag"></i>United Arab Emirates</div>
    <div class="item" data-value="us"><i class="us flag"></i>United States</div>
    <div class="item" data-value="uy"><i class="uy flag"></i>Uruguay</div>
    <div class="item" data-value="um"><i class="um flag"></i>Us Minor Islands</div>
    <div class="item" data-value="vi"><i class="vi flag"></i>Us Virgin Islands</div>
    <div class="item" data-value="uz"><i class="uz flag"></i>Uzbekistan</div>
    <div class="item" data-value="vu"><i class="vu flag"></i>Vanuatu</div>
    <div class="item" data-value="va"><i class="va flag"></i>Vatican City</div>
    <div class="item" data-value="ve"><i class="ve flag"></i>Venezuela</div>
    <div class="item" data-value="vn"><i class="vn flag"></i>Vietnam</div>
    <div class="item" data-value="wf"><i class="wf flag"></i>Wallis and Futuna</div>
    <div class="item" data-value="eh"><i class="eh flag"></i>Western Sahara</div>
    <div class="item" data-value="ye"><i class="ye flag"></i>Yemen</div>
    <div class="item" data-value="zm"><i class="zm flag"></i>Zambia</div>
    <div class="item" data-value="zw"><i class="zw flag"></i>Zimbabwe</div>
  </div>
       </div>
    </div>
  </div>
  <h4 class="ui dividing header">Billing Information</h4>
  <div class="field">
    <label>Card Type</label>
    <div class="ui selection dropdown">
      <input type="hidden" name="card[type]">
      <div class="default text">Type</div>
      <i class="dropdown icon"></i>
      <div class="menu">
        <div class="item" data-value="visa">
          <i class="visa icon"></i>
          Visa
        </div>
        <div class="item" data-value="amex">
          <i class="amex icon"></i>
          American Express
        </div>
        <div class="item" data-value="discover">
          <i class="discover icon"></i>
          Discover
        </div>
      </div>
    </div>
  </div>
  <div class="fields">
    <div class="seven wide field">
      <label>Card Number</label>
      <input type="text" name="card[number]" maxlength="16" placeholder="Card #">
    </div>
    <div class="three wide field">
      <label>CVC</label>
      <input type="text" name="card[cvc]" maxlength="3" placeholder="CVC">
    </div>
    <div class="six wide field">
      <label>Expiration</label>
      <div class="two fields">
        <div class="field">
          <select class="ui fluid search dropdown" name="card[expire-month]">
            <option value="">Month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        <div class="field">
          <input type="text" name="card[expire-year]" maxlength="4" placeholder="Year">
        </div>
      </div>
    </div>
  </div>
   <h4 class="ui dividing header">Receipt</h4>
   <div class="field">
    <label>Send Receipt To:</label>
    <div class="ui fluid multiple search selection dropdown">
      <input type="hidden" name="receipt">
      <i class="dropdown icon"></i>
      <div class="default text">Saved Contacts</div>
      <div class="menu">
        <div class="item" data-value="jenny" data-text="Jenny">
          <img class="ui mini avatar image" src="/images/avatar/small/jenny.jpg">
          Jenny Hess
        </div>
        <div class="item" data-value="elliot" data-text="Elliot">
          <img class="ui mini avatar image" src="/images/avatar/small/elliot.jpg">
          Elliot Fu
        </div>
        <div class="item" data-value="stevie" data-text="Stevie">
          <img class="ui mini avatar image" src="/images/avatar/small/stevie.jpg">
          Stevie Feliciano
        </div>
        <div class="item" data-value="christian" data-text="Christian">
          <img class="ui mini avatar image" src="/images/avatar/small/christian.jpg">
          Christian
        </div>
        <div class="item" data-value="matt" data-text="Matt">
          <img class="ui mini avatar image" src="/images/avatar/small/matt.jpg">
          Matt
        </div>
        <div class="item" data-value="justen" data-text="Justen">
          <img class="ui mini avatar image" src="/images/avatar/small/justen.jpg">
          Justen Kitsune
        </div>
      </div>
    </div>
  </div>
   <div class="ui segment">
    <div class="field">
      <div class="ui toggle checkbox">
        <input type="checkbox" name="gift" tabindex="0" class="hidden">
        <label>Do not include a receipt in the package</label>
      </div>
    </div>
  </div>
  <div class="ui button" tabindex="0">Submit Order</div>
</form>
  `,
  pure: `
  <form class="pure-form pure-form-stacked">
  <fieldset>
      <legend>Legend</legend>
      <div class="pure-g">
          <div class="pure-u-1 pure-u-md-1-3">
              <label for="multi-first-name">First Name</label>
              <input type="text" id="multi-first-name" class="pure-u-23-24" />
          </div>
          <div class="pure-u-1 pure-u-md-1-3">
              <label for="multi-last-name">Last Name</label>
              <input type="text" id="multi-last-name" class="pure-u-23-24" />
          </div>
          <div class="pure-u-1 pure-u-md-1-3">
              <label for="multi-email">E-Mail</label>
              <input type="email" id="multi-email" class="pure-u-23-24" required="" />
          </div>
          <div class="pure-u-1 pure-u-md-1-3">
              <label for="multi-city">City</label>
              <input type="text" id="multi-city" class="pure-u-23-24" />
          </div>
          <div class="pure-u-1 pure-u-md-1-3">
              <label for="multi-state">State</label>
              <select id="multi-state" class="pure-input-1-2">
                  <option>AL</option>
                  <option>CA</option>
                  <option>IL</option>
              </select>
          </div>
      </div>
      <label for="multi-terms" class="pure-checkbox">
          <input type="checkbox" id="multi-terms" /> I&#x27;ve read the terms and conditions</label>
      <button type="submit" class="pure-button pure-button-primary">Submit</button>
  </fieldset>
</form>
    `,
  skeleton: `
  <form>
  <div class="row">
    <div class="six columns">
      <label for="exampleEmailInput">Your email</label>
      <input class="u-full-width" type="email" placeholder="test@mailbox.com" id="exampleEmailInput">
    </div>
    <div class="six columns">
      <label for="exampleRecipientInput">Reason for contacting</label>
      <select class="u-full-width" id="exampleRecipientInput">
        <option value="Option 1">Questions</option>
        <option value="Option 2">Admiration</option>
        <option value="Option 3">Can I get your number?</option>
      </select>
    </div>
  </div>
  <label for="exampleMessage">Message</label>
  <textarea class="u-full-width" placeholder="Hi Dave …" id="exampleMessage"></textarea>
  <label class="example-send-yourself-copy">
    <input type="checkbox">
    <span class="label-body">Send a copy to yourself</span>
  </label>
  <input class="button-prima
  `,
  milligram: `
  <form>
  <fieldset>
    <label for="nameField">Name</label>
    <input type="text" placeholder="CJ Patoilo" id="nameField">
    <label for="ageRangeField">Age Range</label>
    <select id="ageRangeField">
      <option value="0-13">0-13</option>
      <option value="14-17">14-17</option>
      <option value="18-23">18-23</option>
      <option value="24+">24+</option>
    </select>
    <label for="commentField">Comment</label>
    <textarea placeholder="Hi CJ …" id="commentField"></textarea>
    <div class="float-right">
      <input type="checkbox" id="confirmField">
      <label class="label-inline" for="confirmField">Send a copy to yourself</label>
    </div>
    <input class="button-primary" type="submit" value="Send">
  </fieldset>
</form>
  `,
  spectre: `
  <div class="form-group">
  <label class="form-radio form-inline">
    <input type="radio" name="gender" checked=""><i class="form-icon"></i> Male
  </label>
  <label class="form-radio form-inline">
    <input type="radio" name="gender"><i class="form-icon"></i> Female
  </label>
</div>

<div class="form-group">
  <label class="form-checkbox form-inline">
    <input type="checkbox"><i class="form-icon"></i> Checkbox 1
  </label>
  <label class="form-checkbox form-inline">
    <input type="checkbox" checked=""><i class="form-icon"></i> Checkbox 2
  </label>
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
