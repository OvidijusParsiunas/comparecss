import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';

export class ButtonGroupButtonDisplayInFrontOfSiblings {
  
  private static areBorderColorsMatching(subcomponentProperties: SubcomponentProperties, newModePseudoClass: CSS_PSEUDO_CLASSES,
      oldModePseudoClass: CSS_PSEUDO_CLASSES): boolean {
    const newBorderColor = subcomponentProperties.customCss[newModePseudoClass].borderColor;
    const oldBorderColor = subcomponentProperties.customCss[oldModePseudoClass].borderColor;
    return newBorderColor === CSS_PROPERTY_VALUES.INHERIT || newBorderColor === oldBorderColor;
  }

  private static areBorderPropertiesDifferent(subcomponentProperties: SubcomponentProperties, newModePseudoClass: CSS_PSEUDO_CLASSES,
      oldModePseudoClass: CSS_PSEUDO_CLASSES): boolean {
    return subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderLeftWidth !== '0px'
      && !ButtonGroupButtonDisplayInFrontOfSiblings.areBorderColorsMatching(subcomponentProperties, newModePseudoClass, oldModePseudoClass);
  }

  private static isShadowSpreadMoreThanZero(subcomponentProperties: SubcomponentProperties, cssPseudoClass: CSS_PSEUDO_CLASSES): boolean {
    const boxShadowProps = subcomponentProperties.customCss[cssPseudoClass].boxShadow.split(' ');
    const shadowSpread = boxShadowProps[3];
    return shadowSpread !== '0px';
  }

  private static areShadowPropertiesDifferentDuringClick(subcomponentProperties: SubcomponentProperties): boolean {
    return subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.CLICK].boxShadow !== CSS_PROPERTY_VALUES.INHERIT
      && ButtonGroupButtonDisplayInFrontOfSiblings.isShadowSpreadMoreThanZero(subcomponentProperties, CSS_PSEUDO_CLASSES.CLICK);
  }

  private static shouldComponentBeInFrontDuringClick(subcomponentProperties: SubcomponentProperties): boolean {
    return (ButtonGroupButtonDisplayInFrontOfSiblings.areShadowPropertiesDifferentDuringClick(subcomponentProperties))
      || ButtonGroupButtonDisplayInFrontOfSiblings.areBorderPropertiesDifferent(subcomponentProperties, CSS_PSEUDO_CLASSES.CLICK, CSS_PSEUDO_CLASSES.HOVER);
  }

  private static shouldComponentBeInFrontDuringHover(subcomponentProperties: SubcomponentProperties): boolean {
    return ButtonGroupButtonDisplayInFrontOfSiblings.isShadowSpreadMoreThanZero(subcomponentProperties, CSS_PSEUDO_CLASSES.HOVER)
      || ButtonGroupButtonDisplayInFrontOfSiblings.areBorderPropertiesDifferent(subcomponentProperties, CSS_PSEUDO_CLASSES.HOVER, CSS_PSEUDO_CLASSES.DEFAULT);
  }

  // this is a workaround for a bug in Chrome - the margin left property does not appear to align left/right borders correctly
  // as some of them tend to be a little too far left or too far right - giving a sensation of border movement when a button
  // is moved to the front.
  // Hence this prevents buttons from being moved to the front when there are no border or shadow differences on hover/click
  // as it would be pointless to do it otherwise.
  public static shouldComponentBeMovedToFront(subcomponentProperties: SubcomponentProperties, cssPseudoClass: CSS_PSEUDO_CLASSES): boolean {
    if (cssPseudoClass === CSS_PSEUDO_CLASSES.HOVER) {
      return ButtonGroupButtonDisplayInFrontOfSiblings.shouldComponentBeInFrontDuringHover(subcomponentProperties);
    } else if (cssPseudoClass === CSS_PSEUDO_CLASSES.CLICK) {
      return ButtonGroupButtonDisplayInFrontOfSiblings.shouldComponentBeInFrontDuringClick(subcomponentProperties);
    }
    return false;
  }
}
