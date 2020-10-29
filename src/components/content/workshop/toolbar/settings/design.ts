const animationDurationMs = 1000;
const rippleElements = [];
const displayAnimationName = 'displayRipple';
const fadeAnimationName = 'fadeRipple';
const rippleClassName = 'ripple';

function createRipple(event) {
  const buttonElement = event.currentTarget;
  const rippleElement = document.createElement('span');
  rippleElement.classList.add(rippleClassName);
  const diameter = Math.max(buttonElement.clientWidth, buttonElement.clientHeight);
  const radius = diameter / 2;
  rippleElement.style.width = rippleElement.style.height = `${diameter}px`;
  rippleElement.style.left = `${event.offsetX - radius}px`;
  rippleElement.style.top = `${event.offsetY - radius}px`;
  rippleElement.style.animation = `${displayAnimationName} ${animationDurationMs}ms forwards`;
  buttonElement.appendChild(rippleElement);
  rippleElements.push(rippleElement);
}

function removeRipple(event) {
  if (rippleElements.length > 0) {
    const lastRippleElement = rippleElements.shift();
    lastRippleElement.style.animation = `${fadeAnimationName} ${animationDurationMs}ms forwards, ${displayAnimationName} ${animationDurationMs}ms forwards`;
    setTimeout(() => {
      event.target.removeChild(lastRippleElement);
    }, animationDurationMs);
  }
}

function addMaterializeRipple() {
  const button = document.getElementById('demoComponent');
  button.addEventListener('mousedown', createRipple);
  button.addEventListener('mouseup', removeRipple);
  button.addEventListener('mouseleave', removeRipple);
}

function removeMaterializeRipple() {
  const button = document.getElementById('demoComponent');
  button.removeEventListener('mousedown', createRipple);
  button.removeEventListener('mouseup', removeRipple);
  button.removeEventListener('mouseleave', removeRipple);
}

// create an optional interface
export default {
  options: [
    {
      type: 'checkbox',
      spec: {
        name: 'Material',
        default: false,
        conditionalStyle: {
          truthy: 'table-cell',
          falsy: '',
        },
        executeJS: addMaterializeRipple,
        revokeJS: removeMaterializeRipple,
      },
    },
  ]
};