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

  private static isFormatValid(file: File): boolean {
    return file.type.includes('image/');
  }
  
  public static uploadImage(settingsComponent: ComponentOptions, event: HTMLInputEvent, spec: any): void {
    const file = event.target.files[0];
    if (ImageUtils.isFormatValid(file)) {
      const reader = new FileReader();
      reader.onload = ImageUtils.fileLoaded.bind(settingsComponent, file, spec);
      reader.readAsDataURL(file);
    }
  }

  private static fileLoaded(file: File, spec: any, event: FileReaderEvent): void {
    const settingsComponent = this as any;
    const result = event.target.result;
    const image = new Image();
    image.src = result;
    SharedUtils.setCustomFeatureValue(spec.customFeatureObjectKeys, settingsComponent.subcomponentProperties, result);
    SharedUtils.setCustomFeatureValue(spec.auxiliaryCustomFeatureObjectKeys, settingsComponent.subcomponentProperties, file.name);
    settingsComponent.imageNames[spec.name] = file.name;
  }
}
