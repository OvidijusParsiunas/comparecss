import { Ref, ref, UnwrapRef, watch } from '@vue/runtime-core';

export class CompositionAPIUtils {
  
  public static createCompositionAPI<T, Y extends keyof T, R, F extends (...params: unknown[]) => R>
    (compositionAPIFunc: F, propsObj: T, propsValuesToBeUsedInFunc: Y[]): any {
    const refObjects = [];
    propsValuesToBeUsedInFunc.forEach((propertyValue: Y) => {
      const refObject: Ref<UnwrapRef<T[Y]>> = ref(propsObj[propertyValue]);
      watch(() => propsObj[propertyValue], (newComponent) => {
        refObject.value = newComponent as UnwrapRef<T[Y]>;
      });
      refObjects.push(refObject);
    })
    return compositionAPIFunc(...refObjects);
  }
}
