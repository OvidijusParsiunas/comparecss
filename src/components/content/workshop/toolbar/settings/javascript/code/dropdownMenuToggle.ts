import { JavascriptCode } from '../../../../../../../interfaces/javascriptCode';

const vars = {
  dropdownButtonClassName: 'csssymphony-dropdown-button',
  dropdownMenuClassName: 'csssymphony-dropdown-menu',
  dropdownMenuElement: null,
};

function toggleDropdown(event) {
  const { classList } = event.target;
  // the reason why there are separate dropdpown button and menu classes is because they could be utilized
  // differently in the future if this file will provide more functionality, hence this is a good example
  if (classList.contains(vars.dropdownButtonClassName) || classList.contains(vars.dropdownMenuClassName)) {
    const { style } = vars.dropdownMenuElement;
    style.display = style.display ? '' : 'none';
  }
}

function removeScript() {
  document.body.removeEventListener('mouseup', toggleDropdown);
}

function initializeScript() {
  document.body.addEventListener('mouseup', toggleDropdown, false);
  setTimeout(() => {
    vars.dropdownMenuElement = document.getElementsByClassName(vars.dropdownMenuClassName)[0];
  });
}

// downloadableJS and downloadableCSS embody the below structure in order to be formatted correctly for the output file
const downloadableJS = `var vars = ${JSON.stringify(vars)};

${toggleDropdown.toString()}

(${initializeScript.toString()})();
`;

// add this when exporting css
const downloadableCSS = ``;

export const dropdownMenuToggleCode: JavascriptCode = {
  initializeJS: initializeScript,
  revokeJS: removeScript,
  downloadables: {
    jsFileContent: downloadableJS,
    cssFileContent: downloadableCSS,
  }
};
