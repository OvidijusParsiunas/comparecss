import { ComponentFunctionality } from '../interfaces/ComponentFunctionalityInterface';
import { BUTTON_NAMES } from '../consts/buttonNames.enum';

declare global {
  interface Window {
    componentFunctionality: ComponentFunctionality;
  }
}

export default class ComponentFunctionalityViaJS {
  // tried to use the code below along with an imported jquery library, but accordion function was not found
  // upon utilising an auxiliary query-ui library, the accordion function was found but it was not the one desired for the semantic framework
  // the one that we want to execute from the semantic-accordion.js script (containing the code below) uses the accordion function in the semantic min script
  // (I assume executing accordion from here does not use the overriden function because the semantic min script references the global jquery script, hence allowing its functions
  //  to be executed from it. Whereas the jquery/jquery-ui libraries that have been imported here do not operate at this scope)
  // Therefore the current solution is to execute the line below from an outside script file
  // (<any>$(".ui.accordion")).accordion();

  static getComponentTriggers(clickedButtonName: BUTTON_NAMES): () => void {
    switch (clickedButtonName) {
      case BUTTON_NAMES.ACCORDIONS:
        return () => {
          window.componentFunctionality.bulmaAccordion();
          window.componentFunctionality.bulmaTrigger();
          window.componentFunctionality.foundationTrigger();
          window.componentFunctionality.materializeAccordion();
          window.componentFunctionality.semanticAccordion();
        };
      case BUTTON_NAMES.ALERTS:
        return () => {
          window.componentFunctionality.bulmaAlert();
          window.componentFunctionality.semanticAlert();
        };
        break;
      case BUTTON_NAMES.DROPDOWNS:
        return () => {
          window.componentFunctionality.foundationTrigger();
          window.componentFunctionality.materializeDropdown();
          window.componentFunctionality.pureDropdown();
          window.componentFunctionality.semanticDropdown();
        };
        break;
      case BUTTON_NAMES.MODALS:
        return () => {
          window.componentFunctionality.bulmaModal();
          window.componentFunctionality.foundationTrigger();
          window.componentFunctionality.materializeModal();
          window.componentFunctionality.semanticModal();
          window.componentFunctionality.spectreModal();
        };
        break;
      case BUTTON_NAMES.NAVBARS:
        return () => {
          window.componentFunctionality.foundationTrigger();
        };
        break;
      case BUTTON_NAMES.TOOLTIPS:
        return () => {
          window.componentFunctionality.bootstrapTooltip();
          window.componentFunctionality.foundationTrigger();
          window.componentFunctionality.materializeTooltip();
        };
        default: 
        break;
    }
  }
}
