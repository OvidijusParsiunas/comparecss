import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { Subcomponent } from '../../../../../../../interfaces/workshopComponent';

export class ButtonGroupButtonDisplayInFrontOfSiblings {
  
  private static areBorderColorsMatching(subcomponent: Subcomponent, newModePseudoClass: CSS_PSEUDO_CLASSES,
      oldModePseudoClass: CSS_PSEUDO_CLASSES): boolean {
    const newBorderColor = subcomponent.customCss[newModePseudoClass].borderColor;
    const oldBorderColor = subcomponent.customCss[oldModePseudoClass].borderColor;
    return newBorderColor === CSS_PROPERTY_VALUES.INHERIT || newBorderColor === oldBorderColor;
  }

  private static areBorderPropertiesDifferent(subcomponent: Subcomponent, newModePseudoClass: CSS_PSEUDO_CLASSES,
      oldModePseudoClass: CSS_PSEUDO_CLASSES): boolean {
    return subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderLeftWidth !== '0px'
      && !ButtonGroupButtonDisplayInFrontOfSiblings.areBorderColorsMatching(subcomponent, newModePseudoClass, oldModePseudoClass);
  }

  private static isShadowSpreadMoreThanZero(subcomponent: Subcomponent, cssPseudoClass: CSS_PSEUDO_CLASSES): boolean {
    const boxShadowProps = subcomponent.customCss[cssPseudoClass].boxShadow.split(' ');
    const shadowSpread = boxShadowProps[3];
    return shadowSpread !== '0px';
  }

  private static areShadowPropertiesDifferentDuringClick(subcomponent: Subcomponent): boolean {
    return subcomponent.customCss[CSS_PSEUDO_CLASSES.CLICK].boxShadow !== CSS_PROPERTY_VALUES.INHERIT
      && ButtonGroupButtonDisplayInFrontOfSiblings.isShadowSpreadMoreThanZero(subcomponent, CSS_PSEUDO_CLASSES.CLICK);
  }

  private static shouldComponentBeInFrontDuringClick(subcomponent: Subcomponent): boolean {
    return (ButtonGroupButtonDisplayInFrontOfSiblings.areShadowPropertiesDifferentDuringClick(subcomponent))
      || ButtonGroupButtonDisplayInFrontOfSiblings.areBorderPropertiesDifferent(subcomponent, CSS_PSEUDO_CLASSES.CLICK, CSS_PSEUDO_CLASSES.HOVER);
  }

  private static areShadowPropertiesDifferentDuringHover(subcomponent: Subcomponent): boolean {
    return subcomponent.customCss[CSS_PSEUDO_CLASSES.HOVER].boxShadow !== CSS_PROPERTY_VALUES.INHERIT
      && ButtonGroupButtonDisplayInFrontOfSiblings.isShadowSpreadMoreThanZero(subcomponent, CSS_PSEUDO_CLASSES.HOVER);
  }

  private static shouldComponentBeInFrontDuringHover(subcomponent: Subcomponent): boolean {
    return ButtonGroupButtonDisplayInFrontOfSiblings.areShadowPropertiesDifferentDuringHover(subcomponent)
      || ButtonGroupButtonDisplayInFrontOfSiblings.areBorderPropertiesDifferent(subcomponent, CSS_PSEUDO_CLASSES.HOVER, CSS_PSEUDO_CLASSES.DEFAULT);
  }

  // WORK 2 - fix for synced components
  // this is a workaround for a bug in Chrome - the margin left property does not appear to align left/right borders correctly
  // as some of them tend to be a little too far left or too far right - giving a sensation of border movement when a button
  // is moved to the front.
  // Hence this prevents buttons from being moved to the front when there are no border or shadow differences on hover/click
  // as it would be pointless to do it otherwise.
  public static shouldComponentBeMovedToFront(subcomponent: Subcomponent, cssPseudoClass: CSS_PSEUDO_CLASSES): boolean {
    if (cssPseudoClass === CSS_PSEUDO_CLASSES.HOVER) {
      return ButtonGroupButtonDisplayInFrontOfSiblings.shouldComponentBeInFrontDuringHover(subcomponent);
    } else if (cssPseudoClass === CSS_PSEUDO_CLASSES.CLICK) {
      return ButtonGroupButtonDisplayInFrontOfSiblings.shouldComponentBeInFrontDuringClick(subcomponent);
    }
    return false;
  }
}
