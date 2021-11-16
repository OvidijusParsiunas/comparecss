import { ComponentOptions } from '@vue/runtime-core';
import SharedUtils from './sharedUtils';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

interface FileReaderEventTarget extends EventTarget {
  result: string;
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
}

export default class ImageUtils {

  private static fileLoaded(file: File, spec: any, event: FileReaderEvent): void {
    const settingsComponent = this as any;
    const result = event.target.result;
    const image = new Image();
    image.src = result;
    SharedUtils.setCustomFeatureValue(spec.customFeatureObjectKeys, settingsComponent.subcomponent, result);
    SharedUtils.setCustomFeatureValue(spec.auxiliaryCustomFeatureObjectKeys, settingsComponent.subcomponent, file.name);
    settingsComponent.imageNames[spec.name] = file.name;
  }

  public static uploadImage(settingsComponent: ComponentOptions, event: HTMLInputEvent, spec: any): void {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ImageUtils.fileLoaded.bind(settingsComponent, file, spec);
    reader.readAsDataURL(file);
  }

  public static removeImage(settingsComponent: ComponentOptions, spec: any): void {
    SharedUtils.setCustomFeatureValue(spec.customFeatureObjectKeys, settingsComponent.subcomponent, null);
    SharedUtils.setCustomFeatureValue(spec.auxiliaryCustomFeatureObjectKeys, settingsComponent.subcomponent, null);
    delete settingsComponent.imageNames[spec.name];
  }
}
