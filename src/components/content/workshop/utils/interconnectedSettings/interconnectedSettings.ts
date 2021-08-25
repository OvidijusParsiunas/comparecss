import { SubcomponentProperties, UpdateOtherCssProperties, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { InterconnectedSetting } from '../../../../../interfaces/subcomponentSpecificSettings';

export class InterconnectedSettings {

  private static removeUpdateOtherCssProperties(subcomponentProperties: SubcomponentProperties, updateOtherCssProperties: UpdateOtherCssProperties[]): void {
    const result = updateOtherCssProperties.findIndex((details) => details.customCss === subcomponentProperties.customCss);
    if (result > -1) {
      updateOtherCssProperties.splice(result, 1);
    }
  }

  private static addUpdateOtherCssProperties(subcomponentProperties: SubcomponentProperties, updateOtherCssPropertiesArr: UpdateOtherCssProperties[],
      updateOtherCssPropertiesObjGenerator: InterconnectedSetting['updateOtherCssPropertiesObjGenerator']): void {
    const updateOtherCssProperties = updateOtherCssPropertiesObjGenerator(subcomponentProperties);
    updateOtherCssPropertiesArr.push(updateOtherCssProperties);
  }

  private static updateUpdateOtherCssPropertiesArray(isAdd: boolean, subcomponentProperties: SubcomponentProperties,
      interconnectedSetting: InterconnectedSetting): void {
    const { updateOtherCssProperties, updateOtherCssPropertiesObjGenerator } = interconnectedSetting;
    if (isAdd) {
      InterconnectedSettings.addUpdateOtherCssProperties(subcomponentProperties, updateOtherCssProperties,
        updateOtherCssPropertiesObjGenerator);
    } else {
      InterconnectedSettings.removeUpdateOtherCssProperties(subcomponentProperties, updateOtherCssProperties);
    }
  }

  // currently used only for container components but can be repurposed for all parent components
  public static update(isAdd: boolean, containerComponent: WorkshopComponent, subcomponentProperties: SubcomponentProperties): void {
    containerComponent.interconnectedSettings?.forEach((interconnectedSetting: InterconnectedSetting) => {
      if (interconnectedSetting.dependantChildrenTypes.has(subcomponentProperties.subcomponentType)) {
        InterconnectedSettings.updateUpdateOtherCssPropertiesArray(isAdd, subcomponentProperties, interconnectedSetting);
      }
    });
  }
}
