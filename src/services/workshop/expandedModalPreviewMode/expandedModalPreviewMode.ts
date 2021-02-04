export interface TransitionAnimation {
  transitionDuration: string;
  transitionProperty: string;
  transitionTimingFunction: string;
}

export default class ExpandedModalPreviewMode {

  public static expandedModalInitialFadeOutAnimationDurationMilliseconds = 300;

  public static expandedModalInitialFadeOutAnimationValues: TransitionAnimation = {
    transitionDuration: `${ExpandedModalPreviewMode.expandedModalInitialFadeOutAnimationDurationMilliseconds / 1000}s`, transitionProperty: 'opacity', transitionTimingFunction: 'ease',
  };
}
