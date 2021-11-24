import useSubcomponentSelectModeEventHandlers from '../compositionAPI/useSubcomponentSelectModeEventHandlers';
import { SubcomponentAndOverlayElementIds } from '../../../../../interfaces/subcomponentAndOverlayElementIds';
import { SubcomponentPreviewMouseEvents } from '../../../../../interfaces/subcomponentPreviewMouseEvents';
import useSubcomponentPreviewEventHandlers from '../compositionAPI/useSubcomponentPreviewEventHandlers';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../consts/subcomponentOverlayClasses.enum';
import { SUBCOMPONENT_CURSOR_CLASSES } from '../../../../../consts/subcomponentCursorClasses.enum';
import { CustomCss, Subcomponents } from '../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { COMPONENT_PREVIEW_MARKER } from '../../../../../consts/elementClassMarkers';
import { CSS_PROPERTY_VALUES } from '../../../../../consts/cssPropertyValues.enum';

export default class ComponentPreviewUtils {

  public static generateMouseEvents(subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds,
      subcomponents: Subcomponents, clickCallback?: () => void): SubcomponentPreviewMouseEvents {
    const mouseEvents: SubcomponentPreviewMouseEvents = {};
    Object.keys(subcomponentAndOverlayElementIdsObject).forEach((subcomponentName: string) => {
      mouseEvents[subcomponentAndOverlayElementIdsObject[subcomponentName].subcomponentId] = {
        ...useSubcomponentPreviewEventHandlers(subcomponents[subcomponentName], clickCallback) };
    });
    return mouseEvents;
  }

  public static generateSubcomponentSelectModeMouseEvents(subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds): SubcomponentPreviewMouseEvents {
    const mouseEvents: SubcomponentPreviewMouseEvents = {};
    Object.keys(subcomponentAndOverlayElementIdsObject).forEach((subcomponentName: string) => {
      mouseEvents[subcomponentAndOverlayElementIdsObject[subcomponentName].subcomponentId] = { ...useSubcomponentSelectModeEventHandlers() };
    });
    return mouseEvents;
  }

  private static addNewClassToSubcomponentsWithExistingClass(existingClass: string, newClass: string): void {
    const elements = document.querySelectorAll(`.${existingClass}`);
    elements.forEach((element) => { element.classList.add(newClass); });
  }

  private static removeClassFromAllElements(classToRemove: string): void {
    const elements = document.querySelectorAll(`.${classToRemove}`);
    elements.forEach((element) => { element.classList.remove(classToRemove); });
  }

  public static setAllSubcomponentsCursors(): void {
    ComponentPreviewUtils.addNewClassToSubcomponentsWithExistingClass(COMPONENT_PREVIEW_MARKER, SUBCOMPONENT_CURSOR_CLASSES.SELECT_MODE);
    ComponentPreviewUtils.addNewClassToSubcomponentsWithExistingClass(SUBCOMPONENT_OVERLAY_CLASSES.OVERLAY_TRIGGER, SUBCOMPONENT_OVERLAY_CLASSES.OVERLAY_TRIGGER_ACTIVE);
  }

  public static unsetAllSubcomponentsCursors(): void {
    ComponentPreviewUtils.removeClassFromAllElements(SUBCOMPONENT_CURSOR_CLASSES.SELECT_MODE);
    ComponentPreviewUtils.removeClassFromAllElements(SUBCOMPONENT_OVERLAY_CLASSES.OVERLAY_TRIGGER_ACTIVE);
  }

  // inherit strategy:
  // when inheriting during a click or hover class, attempt to get a valid value from a lower class
  // when inheriting during a default class - return 'inherit' to make the element transparent
  // currently utilised for background and text color properties only
  public static getInheritedCustomCssValue(cssPseudoClass: CSS_PSEUDO_CLASSES, customCss: CustomCss, cssProperty: string): string {
    switch (cssPseudoClass) {
      case (CSS_PSEUDO_CLASSES.CLICK):
        if (customCss[CSS_PSEUDO_CLASSES.CLICK] && customCss[CSS_PSEUDO_CLASSES.CLICK][cssProperty] !== CSS_PROPERTY_VALUES.INHERIT) {
          return customCss[CSS_PSEUDO_CLASSES.CLICK][cssProperty];
        }
      case (CSS_PSEUDO_CLASSES.HOVER):
        if (customCss[CSS_PSEUDO_CLASSES.HOVER] && customCss[CSS_PSEUDO_CLASSES.HOVER][cssProperty] !== CSS_PROPERTY_VALUES.INHERIT) {
          return customCss[CSS_PSEUDO_CLASSES.HOVER][cssProperty];
        }
      default:
        return customCss[CSS_PSEUDO_CLASSES.DEFAULT][cssProperty];
    }
  }

  private static setInheritedCustomCssValue<T extends WorkshopComponentCss, V extends keyof WorkshopComponentCss>(inheritedValues: T,
      activeCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES, customCss: CustomCss, cssProperty: V): void {
    if (customCss[CSS_PSEUDO_CLASSES.DEFAULT][cssProperty]) {
      inheritedValues[cssProperty] = ComponentPreviewUtils.getInheritedCustomCssValue(activeCssPseudoClassesDropdownItem, customCss, cssProperty) as T[V];
    }
  }

  public static getInheritedValuesFromCustomCss(activeCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES, customCss: CustomCss): WorkshopComponentCss {
    const inheritedValues: WorkshopComponentCss = {}
    const inheritableCssProperties: (keyof WorkshopComponentCss)[] = ['backgroundColor', 'color', 'borderColor', 'boxShadow'];
    inheritableCssProperties.forEach((cssProperty) => {
      ComponentPreviewUtils.setInheritedCustomCssValue(inheritedValues, activeCssPseudoClassesDropdownItem, customCss, cssProperty);
    });
    return inheritedValues;
  }
}
