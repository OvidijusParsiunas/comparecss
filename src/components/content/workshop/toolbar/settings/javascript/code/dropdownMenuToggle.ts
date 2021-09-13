import { JavascriptCode } from '../../../../../../../interfaces/javascriptCode';

const vars = {
  dropdownButtonClassName: 'csssymphony-dropdown-button',
  dropdownMenuClassName: 'csssymphony-dropdown-menu',
  auxiliaryComponentClassName: 'auxiliary-component',
  dropdownMenuElement: null,
};

function setMenuElementDisplayProperty(menuElement) {
  const { style } = menuElement;
  style.display = style.display ? '' : 'none';
}

function isMenuElement(element) {
  if (element.classList) {
    return element.classList.contains(vars.auxiliaryComponentClassName)
  }
  return undefined;
}

function findMenuElementFromButtonChildElement(element) {
  const { parentElement } = element;
  const childElementsArr = Array.from(parentElement.childNodes);
  const result = childElementsArr.find((element) => isMenuElement(element));
  return result || findMenuElementFromButtonChildElement(parentElement);
}

function findMenuElementFromChildElement(element) {
  const { parentElement } = element;
  if (parentElement.classList.contains(vars.auxiliaryComponentClassName)) {
    return parentElement;
  }
  return findMenuElementFromChildElement(parentElement);
}

function getMenuElement(targetElement) {
  if (targetElement.classList.contains(vars.dropdownMenuClassName)) {
    return findMenuElementFromChildElement(targetElement);
  } else if (targetElement.classList.contains(vars.dropdownButtonClassName)) {
    return findMenuElementFromButtonChildElement(targetElement);
  }
  return null;
}

function toggleMenu(event) {
  const targetElement = event.target;
  const menuElement = getMenuElement(targetElement);
  if (!menuElement) return;
  setMenuElementDisplayProperty(menuElement);
}

function removeScript() {
  document.body.removeEventListener('mouseup', toggleMenu);
}

function initializeScript() {
  document.body.addEventListener('mouseup', toggleMenu, false);
}

// downloadableJS and downloadableCSS embody the below structure in order to be formatted correctly for the output file
const downloadableJS = `var vars = ${JSON.stringify(vars)};

${toggleMenu.toString()}

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
