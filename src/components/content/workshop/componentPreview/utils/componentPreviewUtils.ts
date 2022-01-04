import useSubcomponentSelectModeEventHandlers from '../compositionAPI/useSubcomponentSelectModeEventHandlers';
import { SubcomponentAndOverlayElementIds } from '../../../../../interfaces/subcomponentAndOverlayElementIds';
import { ALL_INHERITABLE_CSS_PROPERTY_KEYS } from '../../../../../consts/inheritableCssPropertyKeys.enum';
import { SubcomponentPreviewMouseEvents } from '../../../../../interfaces/subcomponentPreviewMouseEvents';
import useSubcomponentPreviewEventHandlers from '../compositionAPI/useSubcomponentPreviewEventHandlers';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../consts/subcomponentOverlayClasses.enum';
import { SUBCOMPONENT_CURSOR_CLASSES } from '../../../../../consts/subcomponentCursorClasses.enum';
import { InheritableCssProperties } from '../../../../../interfaces/inheritableCssProperties';
import { CustomCss, Subcomponents } from '../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { COMPONENT_PREVIEW_MARKER } from '../../../../../consts/elementClassMarkers';
import { CSS_PROPERTY_VALUES } from '../../../../../consts/cssPropertyValues.enum';
import JSONUtils from '../../utils/generic/jsonUtils';

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
  public static getInheritedCustomCssValue<T extends keyof WorkshopComponentCss>(cssPseudoClass: CSS_PSEUDO_CLASSES, customCss: CustomCss,
      cssPropertyKey: T): WorkshopComponentCss[T] {
    switch (cssPseudoClass) {
      case (CSS_PSEUDO_CLASSES.CLICK):
        if (customCss[CSS_PSEUDO_CLASSES.CLICK] && customCss[CSS_PSEUDO_CLASSES.CLICK][cssPropertyKey] !== CSS_PROPERTY_VALUES.INHERIT) {
          return customCss[CSS_PSEUDO_CLASSES.CLICK][cssPropertyKey];
        }
      case (CSS_PSEUDO_CLASSES.HOVER):
        if (customCss[CSS_PSEUDO_CLASSES.HOVER] && customCss[CSS_PSEUDO_CLASSES.HOVER][cssPropertyKey] !== CSS_PROPERTY_VALUES.INHERIT) {
          return customCss[CSS_PSEUDO_CLASSES.HOVER][cssPropertyKey];
        }
      default:
        return customCss[CSS_PSEUDO_CLASSES.DEFAULT][cssPropertyKey];
    }
  }

  private static setInheritedCustomCssValue<T extends WorkshopComponentCss, Y extends keyof WorkshopComponentCss>(inheritedValues: T,
      activeCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES, customCss: CustomCss, cssPropertyKey: Y): void {
    if (customCss[CSS_PSEUDO_CLASSES.DEFAULT][cssPropertyKey] !== undefined) {
      inheritedValues[cssPropertyKey] = ComponentPreviewUtils.getInheritedCustomCssValue(activeCssPseudoClassesDropdownItem, customCss, cssPropertyKey) as T[Y];
    }
  }

  public static getInheritedValuesFromCustomCss(activeCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES, customCss: CustomCss,
      ...inheritableCssPropertyKeys: (keyof InheritableCssProperties)[]): WorkshopComponentCss {
    const inheritedValues: WorkshopComponentCss = {};
    (inheritableCssPropertyKeys.length > 0 ? inheritableCssPropertyKeys : ALL_INHERITABLE_CSS_PROPERTY_KEYS).forEach((cssPropertyKey) => {
      ComponentPreviewUtils.setInheritedCustomCssValue(inheritedValues, activeCssPseudoClassesDropdownItem, customCss, cssPropertyKey);
    });
    // prevents a bug where property values that are undefined cause the css to be inheirited from the parent dom element,
    // e.g. dropdown menu item text element would have borderLeftWidth inherited from the menu componennt itself
    JSONUtils.removePropertiesWithUndefinedValues(inheritedValues);
    return inheritedValues;
  }
}
