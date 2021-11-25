import { CustomCss, Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentBuilder } from '../componentBuilder';

class PaddingComponent extends ComponentBuilder {

  public static setBaseContainerComponent(paddingComponent: WorkshopComponent): void {
    paddingComponent.sync.syncables.containerComponents = [paddingComponent];
  }

  private static createDefaultBaseCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        height: '100%',
      },
    };
  }

  public static createBaseSubcomponent(name: string): Subcomponent {
    const subcomponentType = this as any as SUBCOMPONENT_TYPES;
    return {
      name,
      subcomponentType,
      customCss: PaddingComponent.createDefaultBaseCss(),
      defaultCss: PaddingComponent.createDefaultBaseCss(),
      activeCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES.DEFAULT,
      activeCssPseudoClassViaUserAction: CSS_PSEUDO_CLASSES.DEFAULT,
    };
  }
}

export const paddingBase: ComponentGenerator = {
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
    const paddingComponent = ComponentBuilder.createBaseComponent(presetProperties,
      PaddingComponent.createBaseSubcomponent.bind(presetProperties.baseSubcomponentType));
    paddingComponent.sync.syncables.containerComponents = [paddingComponent];
    return paddingComponent;
  },
};
