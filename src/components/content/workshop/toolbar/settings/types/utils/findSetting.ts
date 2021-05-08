export class FindSettings {
  
  public static findSettingInOptionsArray(optionsArray: any, settingName: string): any {
    return optionsArray.find((option) => option.spec.name === settingName);
  }
}
