import { Ref, ref, UnwrapRef, watch } from '@vue/runtime-core';

export class CompositionAPIUtils {
  
  public static createCompositionAPI<F extends (...params: unknown[]) => unknown, T, Y extends keyof T, R = ReturnType<F>>
    (compositionAPIFunc: F, propsObj: T, propsValuesToBeUsedInFunc: Y[]): R {
    const refObjects = [];
    propsValuesToBeUsedInFunc.forEach((propertyValue: Y) => {
      const refObject: Ref<UnwrapRef<T[Y]>> = ref(propsObj[propertyValue]);
      watch(() => propsObj[propertyValue], (newComponent) => {
        refObject.value = newComponent as UnwrapRef<T[Y]>;
      });
      refObjects.push(refObject);
    })
    return compositionAPIFunc(...refObjects) as R;
  }
}
