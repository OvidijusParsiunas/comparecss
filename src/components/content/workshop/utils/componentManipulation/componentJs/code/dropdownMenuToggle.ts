import { JavascriptCode } from '../../../../../../../interfaces/javascriptCode';

const vars = {
  menuComponentClassName: 'menu-component',
  auxiliaryComponentClassName: 'auxiliary-component',
  dropdownButtonClassName: 'csssymphony-dropdown-button',
  componentPreviewMarkerClassName: 'component-preview-marker',
  componentPreviewContainerClassName: 'component-preview-container-default',
};

function setMenuElementDisplayProperty(menuElement) {
  const { style } = menuElement;
  style.display = style.display ? '' : 'none';
}

function hideMenus(mouseTargetMenuElement) {
  const menuElements = document.getElementsByClassName(vars.menuComponentClassName) as HTMLCollection;
  for (const menuElement of menuElements) {
    if (menuElement !== mouseTargetMenuElement && (menuElement as HTMLElement).style.display !== 'none') {
      setMenuElementDisplayProperty(menuElement);
    }
  }
}

function componentPreviewContainerClick() {
  hideMenus(null);
}

function getContainerElementFromAuxiliaryComponent(auxiliaryComponent) {
  return auxiliaryComponent.childNodes[1].childNodes[0];
}

function isAuxiliaryMenuElement(element) {
  if (element.classList) {
    return (element.classList.contains(vars.auxiliaryComponentClassName)
      && getContainerElementFromAuxiliaryComponent(element).classList.contains(vars.menuComponentClassName));
  }
  return undefined;
}

function findAuxiliaryMenuElement(element) {
  const { parentElement } = element;
  const childElementsArr = Array.from(parentElement.childNodes);
  const result = childElementsArr.find((element) => isAuxiliaryMenuElement(element));
  return result || findAuxiliaryMenuElement(parentElement);
}

function componentClick(targetElement) {
  if (targetElement.classList.contains(vars.dropdownButtonClassName)) {
    const menuAuxElement = findAuxiliaryMenuElement(targetElement);
    const mouseTargetMenuElement = getContainerElementFromAuxiliaryComponent(menuAuxElement);
    hideMenus(mouseTargetMenuElement);
    setMenuElementDisplayProperty(mouseTargetMenuElement);
  } else {
    hideMenus(null);
  }
}

function toggleMenu(event) {
  const targetElement = event.target;
  if (targetElement.classList.contains(vars.componentPreviewMarkerClassName)) {
    componentClick(targetElement);
  } else if (targetElement.classList.contains(vars.componentPreviewContainerClassName)) {
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
