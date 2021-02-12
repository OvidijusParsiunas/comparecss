import { JavascriptCode } from '../../../../../../../interfaces/javascriptCode';

// TO-DO:
// Strategy for nested elements where we want scoped nested animations for each button and one for the background element:
// <div class="csssymphony-ripples">
//  <button class="csssymphony-ripples"></button>
//  <button class="csssymphony-ripples"></button>
// </div>
// instead of if (event.target.classList.contains(vars.className)) {
//  traverse the current and parent elements until one of them contains csssymphony-ripples
//  then proceed to create a ripple on that element

const vars = {
  animationDurationMs: 1000,
  rippleElements: [],
  displayAnimationName: 'displayRipple',
  fadeAnimationName: 'fadeRipple',
  className: 'csssymphony-ripples',
};

function createRipple(event, buttonElement) {
  const rippleElement = document.createElement('span');
  rippleElement.style.cssText = 'background-color: rgba(255, 255, 255, 0.5); pointer-events: none; position: absolute; border-radius: 50%;';
  const diameter = Math.max(buttonElement.clientWidth, buttonElement.clientHeight);
  const radius = diameter / 2;
  rippleElement.style.width = rippleElement.style.height = `${diameter}px`;
  rippleElement.style.left = `${event.offsetX - radius}px`;
  rippleElement.style.top = `${event.offsetY - radius}px`;
  rippleElement.style.animation = `${vars.displayAnimationName} ${vars.animationDurationMs}ms forwards`;
  buttonElement.appendChild(rippleElement);
  vars.rippleElements.push(rippleElement);
}

function removeRipple(event) {
  event.target.removeEventListener('mouseup', removeRipple, false);
  event.target.removeEventListener('mouseleave', removeRipple, false);
  if (vars.rippleElements.length > 0) {
    const lastRippleElement = vars.rippleElements.shift();
    lastRippleElement.style.animation = `${vars.fadeAnimationName} ${vars.animationDurationMs}ms forwards, ${vars.displayAnimationName} ${vars.animationDurationMs}ms forwards`;
    setTimeout(() => {
      event.target.removeChild(lastRippleElement);
    }, vars.animationDurationMs);
  }
}

function showEffect(event) {
  if (event.target.classList.contains(vars.className)) {
    createRipple(event, event.target);
    event.target.addEventListener('mouseup', removeRipple, false);
    event.target.addEventListener('mouseleave', removeRipple, false);
  }
}

function removeScript() {
  document.body.removeEventListener('mousedown', showEffect);
}

function initializeScript() {
  document.body.addEventListener('mousedown', showEffect, false);
}

// downloadableJS and downloadableCSS embody the below structure in order to be formatted correctly for the output file
const downloadableJS = `var vars = ${JSON.stringify(vars)};

${createRipple.toString()}

${removeRipple.toString()}

${showEffect.toString()}

(${initializeScript.toString()})();
`;

const downloadableCSS = `
.csssymphony-ripples {
  overflow: hidden;
  position: relative;
}

@keyframes displayRipple {
  from {
    transform: scale(0.5);
  }
  to {
    transform: scale(4);
  }
}

@keyframes fadeRipple {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
`;

export const ripplesCode: JavascriptCode = {
  executeJS: initializeScript,
  revokeJS: removeScript,
  downloadables: {
    jsFileContent: downloadableJS,
    cssFileContent: downloadableCSS,
  }
};
