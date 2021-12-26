import { Subcomponent, UpdateOtherCssProperties, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { InterconnectedSetting } from '../../../../../interfaces/subcomponentSpecificSettings';

export class InterconnectedSettings {

  private static removeUpdateOtherCssProperties(subcomponent: Subcomponent, updateOtherCssProperties: UpdateOtherCssProperties[]): void {
    const result = updateOtherCssProperties.findIndex((details) => details.baseSubcomponent.customCss === subcomponent.customCss);
    if (result > -1) {
      updateOtherCssProperties.splice(result, 1);
    }
  }

  private static addUpdateOtherCssProperties(subcomponent: Subcomponent, updateOtherCssPropertiesArr: UpdateOtherCssProperties[],
      updateOtherCssPropertiesObjGenerator: InterconnectedSetting['updateOtherCssPropertiesObjGenerator']): void {
    const updateOtherCssProperties = updateOtherCssPropertiesObjGenerator(subcomponent);
    updateOtherCssPropertiesArr.push(updateOtherCssProperties);
  }

  private static updateUpdateOtherCssPropertiesArray(isAdd: boolean, subcomponent: Subcomponent,
      interconnectedSetting: InterconnectedSetting): void {
    const { updateOtherCssProperties, updateOtherCssPropertiesObjGenerator } = interconnectedSetting;
    if (isAdd) {
      InterconnectedSettings.addUpdateOtherCssProperties(subcomponent, updateOtherCssProperties,
        updateOtherCssPropertiesObjGenerator);
    } else {
      InterconnectedSettings.removeUpdateOtherCssProperties(subcomponent, updateOtherCssProperties);
    }
  }

  // currently used only for container components but can be repurposed for all parent components
  public static update(isAdd: boolean, containerComponent: WorkshopComponent, subcomponent: Subcomponent): void {
    containerComponent.interconnectedSettings?.forEach((interconnectedSetting: InterconnectedSetting) => {
      if (interconnectedSetting.dependantChildrenTypes.has(subcomponent.subcomponentType)) {
        InterconnectedSettings.updateUpdateOtherCssPropertiesArray(isAdd, subcomponent, interconnectedSetting);
      }
    });
  }
}
