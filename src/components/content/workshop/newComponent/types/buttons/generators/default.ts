import { CustomCss, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { AddComponentsToButtonBaseUtils } from '../utils/addComponentsToButtonBaseUtils';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { buttonBase } from './base';

class DefaultButton extends ComponentBuilder {

  private static overwriteSubcomponentProperties(subcomponent: SubcomponentProperties): void {
    subcomponent.tempCustomCss = new Set(['transition']);
  }

  private static overwriteCustomFeatures(subcomponent: SubcomponentProperties): void {
    subcomponent.customStaticFeatures.alignedLayerSection.section = ALIGNED_SECTION_TYPES.CENTER;
    subcomponent.defaultCustomStaticFeatures.alignedLayerSection.section = ALIGNED_SECTION_TYPES.CENTER;
    subcomponent.customFeatures.animations = ComponentBuilder.createStationaryAnimations({});
    subcomponent.defaultCustomFeatures.animations = ComponentBuilder.createStationaryAnimations({});
  }

  private static createDefaultTextCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        width: 'max-content',
        userSelect: 'none',
        overflow: CSS_PROPERTY_VALUES.UNSET,
        fontSize: '14px',
        fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
        backgroundColor: CSS_PROPERTY_VALUES.INHERIT,
        color: '#ffffff',
        fontWeight: '400',
        paddingTop: '0px',
        paddingBottom: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        marginBottom: '0px',
        transition: CSS_PROPERTY_VALUES.UNSET,
        outline: 'none',
        left: '0px',
      },
      [CSS_PSEUDO_CLASSES.HOVER]: {
        color: CSS_PROPERTY_VALUES.INHERIT,
      },
      [CSS_PSEUDO_CLASSES.CLICK]: {
        color: CSS_PROPERTY_VALUES.INHERIT,
      },
    };
  }

  public static setPropertyOverwritables(buttonComponent: WorkshopComponent): void {
    buttonComponent.newChildComponents.propertyOverwritables = {
      [COMPONENT_TYPES.TEXT]: DefaultButton.overwriteBase,
    };
  }

  private static overwriteCustomCss(subcomponent: SubcomponentProperties): void {
    subcomponent.customCss = DefaultButton.createDefaultTextCss();
    subcomponent.defaultCss = DefaultButton.createDefaultTextCss();
  }

  public static overwriteBase(component: WorkshopComponent): void {
    const { baseSubcomponent } = component;
    DefaultButton.overwriteCustomCss(baseSubcomponent);
    DefaultButton.overwriteCustomFeatures(baseSubcomponent);
    DefaultButton.overwriteSubcomponentProperties(baseSubcomponent);
  }
}

export const defaultButton: ComponentGenerator = {
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
    const buttonComponent = buttonBase.createNewComponent(presetProperties);
    DefaultButton.setPropertyOverwritables(buttonComponent);
    AddComponentsToButtonBaseUtils.add(buttonComponent, TEXT_STYLES.BUTTON, 'Button');
    return buttonComponent;
  },
}
