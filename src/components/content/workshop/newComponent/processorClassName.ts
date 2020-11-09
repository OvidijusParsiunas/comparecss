export default (className: string): string => {
  if (className.length === 1) {
    const everythingExceptCharsRegex = /[^A-Z]/ig;
    className = className.replace(everythingExceptCharsRegex,'-');
  } else {
    const everythingExceptCharsAndNumbersRegex = /[^A-Z0-9]/ig;
    className = className.replace(everythingExceptCharsAndNumbersRegex, '-');
  }
  return className;
}
