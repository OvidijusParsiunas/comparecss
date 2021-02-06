export default class EntranceTransitions {
  
  // TO-DO potentially may need to be removed
  public static readonly slideIn = {
    background: {
      transitionDuration: '0.1s',
    },
    modal: {
      initialPosition: {
        marginTop: '-50.4vh',
        top: '0px',
      },
      finalPosition: {
        top: '40px',
        transitionDuration: '0.3s',
        transitionTimingFunction: 'linear',
        appearanceTimeoutAfterBackgroundMilliseconds: 150,
      }
    }
  }

  private static REVEAL_OPACITY_DEFAULT = '1';
  private static REVEAL_MODAL_AFFECTED_PROPERTIES_DEFAULT = 'all';

  public static applySlideIn(backgroundElement: any, modalElement: any): void {
    backgroundElement.style.opacity = EntranceTransitions.REVEAL_OPACITY_DEFAULT;
    backgroundElement.style.transitionDuration = '0.1s';
    modalElement.style.marginTop = '-50.4vh';
    modalElement.style.top = '0px';
    setTimeout(() => {
      modalElement.style.opacity = EntranceTransitions.REVEAL_OPACITY_DEFAULT;
      modalElement.style.transitionProperty = EntranceTransitions.REVEAL_MODAL_AFFECTED_PROPERTIES_DEFAULT;
      modalElement.style.top = '40px';
      modalElement.style.transitionDuration = '0.3s';
      modalElement.style.transitionTimingFunction = 'linear';
    }, 150);
  }
  // TO-DO remove transitions after ended
}
