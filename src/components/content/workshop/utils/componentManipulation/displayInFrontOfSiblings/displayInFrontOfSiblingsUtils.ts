import { DisplayInFrontOfSiblingsContainerState, DisplayInFrontOfSiblingsState } from '../../../../../../interfaces/displayInFrontOfSiblingsState';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { Subcomponent } from '../../../../../../interfaces/workshopComponent';

export class DisplayInFrontOfSiblings {

  private static readonly MAX_Z_INDEX = 999999;
  public static readonly MIN_Z_INDEX = 0;

  private static decrementNumberOfCurrentlyHighlightedButtons(displayInFrontOfSiblingsContainerState: DisplayInFrontOfSiblingsContainerState): void {
    if (displayInFrontOfSiblingsContainerState.numberOfCurrentlyHighlightedButtons > 0 ) {
      displayInFrontOfSiblingsContainerState.numberOfCurrentlyHighlightedButtons -= 1;
    }
  }

  private static updateDisplayInFrontOfSiblingsContainerState(toFront: boolean, displayInFrontOfSiblingsState: DisplayInFrontOfSiblingsState,
      displayInFrontOfSiblingsContainerState: DisplayInFrontOfSiblingsContainerState): void {
    if (toFront) {
      displayInFrontOfSiblingsContainerState.numberOfCurrentlyHighlightedButtons += 1;
    } else {
      DisplayInFrontOfSiblings.decrementNumberOfCurrentlyHighlightedButtons(displayInFrontOfSiblingsContainerState);
      if (displayInFrontOfSiblingsContainerState.numberOfCurrentlyHighlightedButtons === 0) {
        displayInFrontOfSiblingsContainerState.highestZIndex = 0;
      }
    }
    displayInFrontOfSiblingsState.setZIndexTimeout = null;
  }

  private static setZIndex(toFront: boolean, displayInFrontOfSiblingsState: DisplayInFrontOfSiblingsState,
      displayInFrontOfSiblingsContainerState: DisplayInFrontOfSiblingsContainerState): void {
    displayInFrontOfSiblingsState.zIndex = toFront ? displayInFrontOfSiblingsContainerState.highestZIndex += 1 : 0;
  }

  private static calculateTimeoutDelay(toFront: boolean, subcomponent: Subcomponent): number {
    const { duration } = subcomponent.customFeatures.animations?.stationary?.fade || {};
    return !toFront && duration ? Number.parseFloat(duration) * 1000 : 0;
  }

  private static initializeSetZIndexTimeout(toFront: boolean, subcomponent: Subcomponent,
      displayInFrontOfSiblingsContainerState: DisplayInFrontOfSiblingsContainerState,
      displayInFrontOfSiblingsState: DisplayInFrontOfSiblingsState): void {
    const delayMilliseconds = DisplayInFrontOfSiblings.calculateTimeoutDelay(toFront, subcomponent);
    displayInFrontOfSiblingsState.setZIndexTimeout = setTimeout(() => {
      DisplayInFrontOfSiblings.setZIndex(toFront, displayInFrontOfSiblingsState, displayInFrontOfSiblingsContainerState);
      DisplayInFrontOfSiblings.updateDisplayInFrontOfSiblingsContainerState(toFront, displayInFrontOfSiblingsState,
        displayInFrontOfSiblingsContainerState);
    }, delayMilliseconds);
  }

  private static clearSetZIndexTimeout(displayInFrontOfSiblingsState: DisplayInFrontOfSiblingsState,
      displayInFrontOfSiblingsContainerState: DisplayInFrontOfSiblingsContainerState): void {
    if (displayInFrontOfSiblingsState.setZIndexTimeout) {
      DisplayInFrontOfSiblings.decrementNumberOfCurrentlyHighlightedButtons(displayInFrontOfSiblingsContainerState);
      clearTimeout(displayInFrontOfSiblingsState.setZIndexTimeout);
    }
  }

  // the strategy here is to continuously keep increasing the zIndex of the newly activated components via the use of the highestZIndex
  // the number of currently highlighted components is tracked and when there are no more - the highestZIndex is set back to 0
  public static changeSubcomponentZIndex(toFront: boolean, subcomponent: Subcomponent, cssPseudoClass: CSS_PSEUDO_CLASSES): void {
    const { displayInFrontOfSiblingsContainerState } = subcomponent.seedComponent.containerComponent?.baseSubcomponent.customStaticFeatures || {};
    if (displayInFrontOfSiblingsContainerState) {
      const { displayInFrontOfSiblingsState } = subcomponent.customStaticFeatures;
      if (cssPseudoClass === CSS_PSEUDO_CLASSES.CLICK && displayInFrontOfSiblingsState.isInFrontOnHover) return;
      if (!displayInFrontOfSiblingsContainerState.conditionalFunc || displayInFrontOfSiblingsContainerState.conditionalFunc(subcomponent, cssPseudoClass)) {
        if (cssPseudoClass === CSS_PSEUDO_CLASSES.HOVER) displayInFrontOfSiblingsState.isInFrontOnHover = toFront;
        DisplayInFrontOfSiblings.clearSetZIndexTimeout(displayInFrontOfSiblingsState, displayInFrontOfSiblingsContainerState);
        DisplayInFrontOfSiblings.initializeSetZIndexTimeout(toFront, subcomponent, displayInFrontOfSiblingsContainerState,
          displayInFrontOfSiblingsState);
      }
    }
  }

  public static getZIndex(baseSubcomponent: Subcomponent, isChildComponentSelected = false): number {
    const { customStaticFeatures, activeCssPseudoClassesDropdownItem } = baseSubcomponent || {};
    if (customStaticFeatures?.displayInFrontOfSiblingsState) {
      if (isChildComponentSelected) {
        return DisplayInFrontOfSiblings.MAX_Z_INDEX - 1;
      }
      if (activeCssPseudoClassesDropdownItem === CSS_PSEUDO_CLASSES.HOVER || activeCssPseudoClassesDropdownItem === CSS_PSEUDO_CLASSES.CLICK) {
        return DisplayInFrontOfSiblings.MAX_Z_INDEX;
      }
      return customStaticFeatures.displayInFrontOfSiblingsState.zIndex;
    }
    return 0;
  }
}
