import useSubcomponentPreviewSelectModeEventHandlers from '../compositionAPI/useSubcomponentPreviewSelectModeEventHandlers';
import { SubcomponentAndOverlayElementIds } from '../../../../../interfaces/subcomponentAndOverlayElementIds';
import { SubcomponentPreviewMouseEvents } from '../../../../../interfaces/subcomponentPreviewMouseEvents';
import { CustomCss, Subcomponents, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import useSubcomponentPreviewEventHandlers from '../compositionAPI/useSubcomponentPreviewEventHandlers';
import { SUBCOMPONENT_CURSOR_CLASSES } from '../../../../../consts/subcomponentCursorClasses.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { COMPONENT_PREVIEW_MARKER } from '../../../../../consts/elementClassMarkers';
import { CSS_PROPERTY_VALUES } from '../../../../../consts/cssPropertyValues.enum';

export default class ComponentPreviewUtils {

  private static readonly SUBCOMPONENT_ID_PREFIX = 'subcomponent-id-';
  private static readonly OVERLAY_ID_PREFIX = 'overlay-id-';

  public static generateSubcomponentAndOverlayIds(component: WorkshopComponent): SubcomponentAndOverlayElementIds {
    const subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds = {};
    Object.keys(component.subcomponents).forEach((subcomponentName: string, index: number) => {
      if (!component.componentPreviewStructure.subcomponentNameToDropdownOptionName[subcomponentName]) return;
      subcomponentAndOverlayElementIdsObject[subcomponentName] = {
        subcomponentId: `${ComponentPreviewUtils.SUBCOMPONENT_ID_PREFIX}${index}`,
        overlayId: `${ComponentPreviewUtils.OVERLAY_ID_PREFIX}${index}`,
      };
    });
    return subcomponentAndOverlayElementIdsObject;
  }

  public static generateMouseEvents(subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds,
      subcomponents: Subcomponents, refreshComponentCallback: () => void, clickCallback?: () => void): SubcomponentPreviewMouseEvents {
    const mouseEvents: SubcomponentPreviewMouseEvents = {};
    Object.keys(subcomponentAndOverlayElementIdsObject).forEach((subcomponentName: string) => {
      mouseEvents[subcomponentAndOverlayElementIdsObject[subcomponentName].subcomponentId] = {
        ...useSubcomponentPreviewEventHandlers(subcomponents[subcomponentName], refreshComponentCallback, clickCallback) };
    });
    return mouseEvents;
  }

  public static generateSubcomponentSelectModeMouseEvents(subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds): SubcomponentPreviewMouseEvents {
    const mouseEvents: SubcomponentPreviewMouseEvents = {};
    Object.keys(subcomponentAndOverlayElementIdsObject).forEach((subcomponentName: string) => {
      mouseEvents[subcomponentAndOverlayElementIdsObject[subcomponentName].subcomponentId] = { ...useSubcomponentPreviewSelectModeEventHandlers() };
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

  public static setAllSubcomponentsCursorsToPointer(): void {
    ComponentPreviewUtils.addNewClassToSubcomponentsWithExistingClass(COMPONENT_PREVIEW_MARKER, SUBCOMPONENT_CURSOR_CLASSES.SELECT_MODE);
  }

  public static unsetAllSubcomponentsCursorsFromPointer(): void {
    ComponentPreviewUtils.removeClassFromAllElements(SUBCOMPONENT_CURSOR_CLASSES.SELECT_MODE);
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
}
