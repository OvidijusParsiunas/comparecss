import { AddComponentsToButtonBaseUtils } from '../utils/addComponentsToButtonBaseUtils';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { buttonBase } from './base';

// WORK 3 - will be removed from here
class Button {
  public static addCopyableSubcomponents(buttonComponent: WorkshopComponent): void {
    const { coreSubcomponentRefs } = buttonComponent;
    buttonComponent.sync.copyables = {
      subcomponents: {
        [SUBCOMPONENT_TYPES.BASE]: coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE],
        [SUBCOMPONENT_TYPES.TEXT]: coreSubcomponentRefs[SUBCOMPONENT_TYPES.TEXT],
        [SUBCOMPONENT_TYPES.ICON]: coreSubcomponentRefs[SUBCOMPONENT_TYPES.ICON],
      },
      childComponents: [],
    };
  }
}

export const buttonWithIcon: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const buttonComponent = buttonBase.createNewComponent(baseName);
    AddComponentsToButtonBaseUtils.add(buttonComponent, TEXT_STYLES.BUTTON, 'Button', true);
    Button.addCopyableSubcomponents(buttonComponent);
    return buttonComponent;
  },
}
