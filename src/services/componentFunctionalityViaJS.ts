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

  static triggerComponents(clickedButtonName: BUTTON_NAMES): void {
    switch (clickedButtonName) {
      case BUTTON_NAMES.ACCORDIONS:
        setTimeout(() => {
          window.componentFunctionality.bulmaAccordion();
          window.componentFunctionality.bulmaTrigger();
          window.componentFunctionality.foundationTrigger();
          window.componentFunctionality.materializeAccordion();
          window.componentFunctionality.semanticAccordion();
        }, 10);
        break;
      case BUTTON_NAMES.ALERTS:
        setTimeout(() => {
          window.componentFunctionality.bulmaAlert();
          window.componentFunctionality.semanticAlert();
        }, 10);
        break;
      case BUTTON_NAMES.DROPDOWNS:
        setTimeout(() => {
          window.componentFunctionality.foundationTrigger();
          window.componentFunctionality.materializeDropdown();
          window.componentFunctionality.pureDropdown();
          window.componentFunctionality.semanticDropdown();
        }, 10);
        break;
      case BUTTON_NAMES.MODALS:
        setTimeout(() => {
          window.componentFunctionality.bulmaModal();
          window.componentFunctionality.foundationTrigger();
          window.componentFunctionality.materializeModal();
          window.componentFunctionality.semanticModal();
          window.componentFunctionality.spectreModal();
        }, 10);
        break;
      case BUTTON_NAMES.NAVBARS:
        setTimeout(() => {
          window.componentFunctionality.foundationTrigger();
        }, 10); 
        break;
      case BUTTON_NAMES.TOOLTIPS:
        setTimeout(() => {
          window.componentFunctionality.bootstrapTooltip();
          window.componentFunctionality.foundationTrigger();
          window.componentFunctionality.materializeTooltip();
        }, 10);
      default: 
        break;
    }
  }
}
