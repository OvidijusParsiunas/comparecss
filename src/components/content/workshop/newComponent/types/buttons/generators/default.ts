import { AddComponentsToButtonBaseUtils } from '../utils/addComponentsToButtonBaseUtils';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import ReferenceSharingUtils from '../utils/referenceSharingUtils';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { buttonBase } from './base';

export class DefaultButton extends ComponentBuilder {

  public static addReferences(buttonComponent: WorkshopComponent): void {
    const { coreSubcomponentNames } = buttonComponent;
    ReferenceSharingUtils.appendJsClassesRefToAllSubcomponents(buttonComponent.subcomponents, coreSubcomponentNames);
    ReferenceSharingUtils.appendBaseSubcomponentRefToAllChildSubcomponents(buttonComponent.subcomponents, coreSubcomponentNames);
    buttonComponent.referenceSharingExecutables = [ReferenceSharingUtils.appendJsClassesRefToAllSubcomponents];
  }
}

export const defaultButton: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const buttonComponent = buttonBase.createNewComponent(baseName);
    AddComponentsToButtonBaseUtils.add(buttonComponent, TEXT_STYLES.BUTTON, 'Button');
    DefaultButton.addReferences(buttonComponent);
    return buttonComponent;
  },
}
