import { PropertyOverwritingExecutablesUtils } from '../../shared/propertyOverwritingExecutables/propertyOverwritingExecutablesUtils';
import { AddComponentsToButtonBaseUtils } from '../utils/addComponentsToButtonBaseUtils';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { buttonBase } from './base';

export class DefaultButton extends ComponentBuilder {

  public static populateReferences(buttonComponent: WorkshopComponent): void {
    PropertyOverwritingExecutablesUtils.executePropertyOverwritingExecutables(buttonComponent);
  }
}

export const buttonWithIcon: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const buttonComponent = buttonBase.createNewComponent(baseName);
    AddComponentsToButtonBaseUtils.add(buttonComponent, TEXT_STYLES.BUTTON, 'Button', true);
    DefaultButton.populateReferences(buttonComponent);
    return buttonComponent;
  },
}
