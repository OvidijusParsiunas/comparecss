import { NAVBAR_SUB_MENU_BUTTONS } from '../consts/navbarSubMenuButtons.enum';

export default class CssFrameworksJSFunctionality {
  // tried to use the code below along with an imported jquery library, but accordion function was not found
  // upon utilising an auxiliary query-ui library, the accordion function was found but it was not the one desired for the semantic framework
  // the one that we want to execute from the semantic-accordion.js script (containing the code below) uses the accordion function in the semantic min script
  // (I assume executing accordion from here does not use the overriden function because the semantic min script references the global jquery script, hence allowing its functions
  //  to be executed from it. Whereas the jquery/jquery-ui libraries that have been imported here do not operate at this scope)
  // Therefore the current solution is to execute the line below from an outside script file
  // (<any>$(".ui.accordion")).accordion();

  static getTriggers(clickedButtonName: NAVBAR_SUB_MENU_BUTTONS): () => void {
    switch (clickedButtonName) {
      case NAVBAR_SUB_MENU_BUTTONS.ACCORDIONS:
        return () => {
          window.cssFrameworksJsFunctionality.bulmaAccordion();
          window.cssFrameworksJsFunctionality.bulmaTrigger();
          window.cssFrameworksJsFunctionality.foundationTrigger();
          window.cssFrameworksJsFunctionality.materializeAccordion();
          window.cssFrameworksJsFunctionality.semanticAccordion();
        };
      case NAVBAR_SUB_MENU_BUTTONS.ALERTS:
        return () => {
          window.cssFrameworksJsFunctionality.bulmaAlert();
          window.cssFrameworksJsFunctionality.semanticAlert();
        };
      case NAVBAR_SUB_MENU_BUTTONS.BUTTONS:
        return () => {
          window.cssFrameworksJsFunctionality.materializeButton();
        }
      case NAVBAR_SUB_MENU_BUTTONS.DROPDOWNS:
        return () => {
          window.cssFrameworksJsFunctionality.foundationTrigger();
          window.cssFrameworksJsFunctionality.materializeDropdown();
          window.cssFrameworksJsFunctionality.pureDropdown();
          window.cssFrameworksJsFunctionality.semanticDropdown();
        };
      case NAVBAR_SUB_MENU_BUTTONS.FORMS:
        return () => {
          window.cssFrameworksJsFunctionality.materializeUpdateTextFields();
          window.cssFrameworksJsFunctionality.materializeFormSelect();
          window.cssFrameworksJsFunctionality.foundationTrigger();
          window.cssFrameworksJsFunctionality.semanticDropdown();
          window.cssFrameworksJsFunctionality.semanticCheckbox();
        };
      case NAVBAR_SUB_MENU_BUTTONS.MODALS:
        return () => {
          window.cssFrameworksJsFunctionality.bulmaModal();
          window.cssFrameworksJsFunctionality.foundationTrigger();
          window.cssFrameworksJsFunctionality.materializeModal();
          window.cssFrameworksJsFunctionality.semanticModal();
          window.cssFrameworksJsFunctionality.spectreModal();
        };
      case NAVBAR_SUB_MENU_BUTTONS.NAVBARS:
        return () => {
          window.cssFrameworksJsFunctionality.foundationTrigger();
        };
      case NAVBAR_SUB_MENU_BUTTONS.TOOLTIPS:
        return () => {
          window.cssFrameworksJsFunctionality.bootstrapTooltip();
          window.cssFrameworksJsFunctionality.foundationTrigger();
          window.cssFrameworksJsFunctionality.materializeTooltip();
        };
        default: 
        break;
    }
  }
}
