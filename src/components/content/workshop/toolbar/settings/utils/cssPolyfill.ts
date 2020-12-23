import { WorkshopComponentCss } from '../../../../../../interfaces/workshopComponentCss';

// this is mostly used for firefox as it has been identified that shadow values of 0px 0px 0px 0px still displays a partial shadow
export default class CssPolyfill {
  
  // use consts for 0px 0px 0px 0px;
  public static setUnsetBoxShadowPropertiesToZero(WorkshopComponentCss: WorkshopComponentCss): void {
    // try to retain the colour
    if (WorkshopComponentCss.boxShadow === 'unset') {
      WorkshopComponentCss.boxShadow = '0px 0px 0px 0px #000000';
    }
  }

  public static setZeroBoxShadowPropertiesToUnset(WorkshopComponentCss: WorkshopComponentCss): void {
    // starts with
    if (WorkshopComponentCss.boxShadow === '0px 0px 0px 0px #000000') {
      WorkshopComponentCss.boxShadow = 'unset';
    }
  }

  public static setBoxShadowSettingsRangeValue(cssPropertyValue: string, settingsSpec: any): boolean {
    if (cssPropertyValue === 'unset') {
      settingsSpec.default = '0';
      return true;
    }
    return false;
  }
}
