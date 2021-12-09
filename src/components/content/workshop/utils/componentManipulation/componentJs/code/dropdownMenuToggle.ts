import { JavascriptCode } from '../../../../../../../interfaces/javascriptCode';

const vars = {
  dropdownButtonClassName: 'csssymphony-dropdown-button',
  auxiliaryComponentClassName: 'auxiliary-component',
  componentPreviewMarkerClassName: 'component-preview-marker',
  componentPreviewContinerClassName: 'component-preview-container-default',
};

function setMenuElementDisplayProperty(menuElement) {
  const { style } = menuElement;
  style.display = style.display ? '' : 'none';
}

function toggleMenus(menuElement) {
  const auxiliaryComponents = document.getElementsByClassName(vars.auxiliaryComponentClassName) as HTMLCollection;
  for (const auxiliaryComponent of auxiliaryComponents) {
    if (auxiliaryComponent !== menuElement && (auxiliaryComponent as HTMLElement).style.display !== 'none') {
      setMenuElementDisplayProperty(auxiliaryComponent);
    }
  }
}

function componentPreviewContainerClick() {
  toggleMenus(null);
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

function componentClick(targetElement) {
  if (targetElement.classList.contains(vars.dropdownButtonClassName)) {
    const menuElement = findMenuElementFromButtonChildElement(targetElement);
    toggleMenus(menuElement);
    setMenuElementDisplayProperty(menuElement);
  } else {
    toggleMenus(null);
  }
}

function toggleMenu(event) {
  const targetElement = event.target;
  if (targetElement.classList.contains(vars.componentPreviewMarkerClassName)) {
    componentClick(targetElement);
  } else if (targetElement.classList.contains(vars.componentPreviewContinerClassName)) {
    componentPreviewContainerClick();
  }
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
