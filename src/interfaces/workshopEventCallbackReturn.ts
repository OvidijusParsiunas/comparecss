export interface WorkshopEventCallbackReturn {
  shouldRepeat: boolean;
  newCallback?: () => WorkshopEventCallbackReturn;
}
