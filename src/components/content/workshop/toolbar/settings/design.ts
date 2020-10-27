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
          executeJS: () => {
            // https://material-components.github.io/material-components-web-catalog/#/component/ripple
            // https://css-tricks.com/how-to-recreate-the-ripple-effect-of-material-design-buttons/
            // https://codepen.io/BretCameron/pen/mdPMVaW
            const shearableElements = { buttons: [] }
            function createRipple(event) {
              const button = event.currentTarget;
        
              const circle = document.createElement("span");
              const diameter = Math.max(button.clientWidth, button.clientHeight);
              const radius = diameter / 2;
              circle.style.width = circle.style.height = `${diameter}px`;
              circle.style.left = `${event.offsetX - radius}px`;
              circle.style.top = `${event.offsetY - radius}px`;
              circle.classList.add("ripple");

              button.appendChild(circle);
              console.log(this);
              this.buttons.push(circle);
              // setTimeout(() => {
              //   button.removeChild(circle);
              // }, 4000);
            }

            function removeRipple(event) {
              const lastRippleElement = this.buttons.pop();
              lastRippleElement.classList.add('fadeOut');
              // lastRippleElement.classList.remove('ripple');
              // console.log(lastRippleElement);
            }
          
              const button = document.getElementById("findOut");
              button.addEventListener("mousedown", createRipple.bind(shearableElements));
              button.addEventListener('mouseup', removeRipple.bind(shearableElements))
          },
        },
      },
    ]
  };
  