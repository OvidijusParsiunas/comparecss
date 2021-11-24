import { AutoSyncedSiblingComponentUtils } from '../../../../utils/componentManipulation/autoSyncedSiblingComponentUtils/autoSyncedSiblingComponentUtils';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CustomCss, Subcomponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';

export class ButtonGroupButtonDisplayInFrontOfSiblings {
  
  private static areBorderColorsMatching(subcomponent: Subcomponent, newPseudoClass: CSS_PSEUDO_CLASSES,
      oldPseudoClass: CSS_PSEUDO_CLASSES): boolean {
    const newBorderColor = subcomponent.customCss[newPseudoClass].borderColor;
    const oldBorderColor = subcomponent.customCss[oldPseudoClass].borderColor;
    return newBorderColor === CSS_PROPERTY_VALUES.INHERIT || newBorderColor === oldBorderColor;
  }

  private static areBorderPropertiesDifferent(subcomponent: Subcomponent, newPseudoClass: CSS_PSEUDO_CLASSES,
      oldPseudoClass: CSS_PSEUDO_CLASSES): boolean {
    return subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRightWidth !== '0px'
      && !ButtonGroupButtonDisplayInFrontOfSiblings.areBorderColorsMatching(subcomponent, newPseudoClass, oldPseudoClass);
  }

  private static isShadowSpreadMoreThanZero(subcomponent: Subcomponent, cssPseudoClass: CSS_PSEUDO_CLASSES): boolean {
    const boxShadowProps = subcomponent.customCss[cssPseudoClass].boxShadow.split(' ');
    const shadowSpread = boxShadowProps[3];
    return shadowSpread !== '0px';
  }

  private static areShadowPropertiesDifferent(subcomponent: Subcomponent, overwriteCssForSyncedComponent: CustomCss,
      newPseudoClass: CSS_PSEUDO_CLASSES): boolean {
    if (overwriteCssForSyncedComponent) {
      return !!overwriteCssForSyncedComponent[newPseudoClass].boxShadow;
    }
    return subcomponent.customCss[newPseudoClass].boxShadow !== CSS_PROPERTY_VALUES.INHERIT
      && ButtonGroupButtonDisplayInFrontOfSiblings.isShadowSpreadMoreThanZero(subcomponent, newPseudoClass);
  }

  private static shouldComponentBeInFront(subcomponent: Subcomponent, overwriteCssForSyncedComponent: CustomCss, newPseudoClass: CSS_PSEUDO_CLASSES,
      oldPseudoClass: CSS_PSEUDO_CLASSES): boolean {
    return ButtonGroupButtonDisplayInFrontOfSiblings.areShadowPropertiesDifferent(subcomponent, overwriteCssForSyncedComponent, newPseudoClass)
      || ButtonGroupButtonDisplayInFrontOfSiblings.areBorderPropertiesDifferent(subcomponent, newPseudoClass, oldPseudoClass);
  }

  // this is a workaround for a bug in Chrome - the margin left property does not appear to align left/right borders correctly
  // as some of them tend to be a little too far left or too far right - giving a sensation of border movement when a button
  // is moved to the front.
  // Hence this prevents buttons from being moved to the front when there are no border or shadow differences on hover/click
  // as it would be pointless to do it otherwise.
  public static shouldComponentBeMovedToFront(subcomponent: Subcomponent, cssPseudoClass: CSS_PSEUDO_CLASSES): boolean {
    // when button components are in sync with another button component
    const { overwriteCssForSyncedComponent } = AutoSyncedSiblingComponentUtils.getParentLayerSiblingChildComponentsAutoSyncedObject(
      subcomponent.seedComponent);
    if (cssPseudoClass === CSS_PSEUDO_CLASSES.HOVER) {
      return ButtonGroupButtonDisplayInFrontOfSiblings.shouldComponentBeInFront(subcomponent, overwriteCssForSyncedComponent,
        CSS_PSEUDO_CLASSES.HOVER, CSS_PSEUDO_CLASSES.DEFAULT);
    } else if (cssPseudoClass === CSS_PSEUDO_CLASSES.CLICK) {
      return ButtonGroupButtonDisplayInFrontOfSiblings.shouldComponentBeInFront(subcomponent, overwriteCssForSyncedComponent,
        CSS_PSEUDO_CLASSES.CLICK, CSS_PSEUDO_CLASSES.HOVER);
    }
    return false;
  }
}
