import { CssFrameworksJsFunctionality } from '../interfaces/cssFrameworksJsFunctionality';
import { BUTTON_NAMES } from '../consts/buttonNames.enum';

declare global {
  interface Window {
    cssFrameworksJsFunctionality: CssFrameworksJsFunctionality;
  }
}

export default class CssFrameworksJSFunctionality {
  // tried to use the code below along with an imported jquery library, but accordion function was not found
  // upon utilising an auxiliary query-ui library, the accordion function was found but it was not the one desired for the semantic framework
  // the one that we want to execute from the semantic-accordion.js script (containing the code below) uses the accordion function in the semantic min script
  // (I assume executing accordion from here does not use the overriden function because the semantic min script references the global jquery script, hence allowing its functions
  //  to be executed from it. Whereas the jquery/jquery-ui libraries that have been imported here do not operate at this scope)
  // Therefore the current solution is to execute the line below from an outside script file
  // (<any>$(".ui.accordion")).accordion();

  static getTriggers(clickedButtonName: BUTTON_NAMES): () => void {
    switch (clickedButtonName) {
      case BUTTON_NAMES.ACCORDIONS:
        return () => {
          window.cssFrameworksJsFunctionality.bulmaAccordion();
          window.cssFrameworksJsFunctionality.bulmaTrigger();
          window.cssFrameworksJsFunctionality.foundationTrigger();
          window.cssFrameworksJsFunctionality.materializeAccordion();
          window.cssFrameworksJsFunctionality.semanticAccordion();
        };
      case BUTTON_NAMES.ALERTS:
        return () => {
          window.cssFrameworksJsFunctionality.bulmaAlert();
          window.cssFrameworksJsFunctionality.semanticAlert();
        };
      case BUTTON_NAMES.DROPDOWNS:
        return () => {
          window.cssFrameworksJsFunctionality.foundationTrigger();
          window.cssFrameworksJsFunctionality.materializeDropdown();
          window.cssFrameworksJsFunctionality.pureDropdown();
          window.cssFrameworksJsFunctionality.semanticDropdown();
        };
      case BUTTON_NAMES.FORMS:
        return () => {
          window.cssFrameworksJsFunctionality.materializeUpdateTextFields();
          window.cssFrameworksJsFunctionality.materializeFormSelect();
          window.cssFrameworksJsFunctionality.foundationTrigger();
          window.cssFrameworksJsFunctionality.semanticDropdown();
          window.cssFrameworksJsFunctionality.semanticCheckbox();
        };
      case BUTTON_NAMES.MODALS:
        return () => {
          window.cssFrameworksJsFunctionality.bulmaModal();
          window.cssFrameworksJsFunctionality.foundationTrigger();
          window.cssFrameworksJsFunctionality.materializeModal();
          window.cssFrameworksJsFunctionality.semanticModal();
          window.cssFrameworksJsFunctionality.spectreModal();
        };
      case BUTTON_NAMES.NAVBARS:
        return () => {
          window.cssFrameworksJsFunctionality.foundationTrigger();
        };
      case BUTTON_NAMES.TOOLTIPS:
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
