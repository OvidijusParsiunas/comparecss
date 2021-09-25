import { AddComponentsToButtonBaseUtils } from '../utils/addComponentsToButtonBaseUtils';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { buttonBase } from './base';

export const defaultButton: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const buttonComponent = buttonBase.createNewComponent(baseName);
    AddComponentsToButtonBaseUtils.add(buttonComponent, TEXT_STYLES.BUTTON, 'Button');
    return buttonComponent;
  },
}
