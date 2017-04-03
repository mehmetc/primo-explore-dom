export default class Helper {
    static isDebugEnabled() {
        return typeof(angular.element(document.querySelector('prm-logo')).scope()) == 'undefined' ? false : true;
    }

    static isPrimoAvailable() {
        if ('undefined' !== typeof(window.angular)) {
            if (document.querySelector('primo-explore') !== null) {
                return true;
            }
        }
        return false;
    }

    static get componentNames() {
        let tags = document.getElementsByTagName('*');
        let componentNames = [];
        for (let tag of tags) {
            let tagName = tag.localName;
            if (/^prm-/.test(tagName) || /^primo-/.test(tagName)) {
                if (!componentNames.includes(tagName)) {
                    componentNames.push(tagName);
                }
            }
        }

        componentNames = componentNames.sort().filter((e, i, a) => i === a.findIndex((e2) => e === e2));
        return componentNames;
    }

    static querySelectorAll(selector) {
        return Array.from(document.querySelectorAll(selector));
    }

    static injector() {
      let c = Primo.explore.components.get('primo-explore');
      if (c && c.length > 0) {
          let primoExplore = angular.element(c[0].element);
          let injector     = primoExplore.injector();
          if (injector){
            return injector;
          }
      }

      return null;
    }

    static rootScope() {
      let injector = this.injector();
      if (injector) {
          let rootScope    = injector.get('$rootScope');
          if (rootScope) {
            return rootScope;
          }
      }

      return null;
    }

    static get userSessionManagerService() {
      let rootScope = this.rootScope();
      if (rootScope) {
        return rootScope.$$childHead.$ctrl.userSessionManagerService;
      }

      return null;
    }

    static blink(component, numberOfBlinks = 4) {
        let intervalId = null;
        let borderElement = null;
        let index = Math.floor(Math.random() * (1000 - 1)) + 1;
        let borderSelector = component.element.cssPath + index + 'Rect';

        let createBorderElement = () => {
            if (component && component.element) {
                let elementRect = component.element.getBoundingClientRect();
                let borderElement = document.createElement('div');
                let index = Math.floor(Math.random() * (1000 - 1)) + 1;
                borderElement.setAttribute('id', borderSelector);
                borderElement.style.border = '3px solid red';
                borderElement.style.position = 'absolute';
                borderElement.style.top = elementRect.top + 'px';
                borderElement.style.height = elementRect.height + 'px';
                borderElement.style.width = elementRect.width + 'px';
                borderElement.style.left = elementRect.left + 'px';
                document.body.appendChild(borderElement);

                return document.querySelector('#' + borderSelector);
            }

            return null;
        }

        let removeBorderElement = () => {
          if (borderElement) {
            borderElement.remove();
          }
        }

        let blinkBorderElement = (numberOfBlinks = 4) => {
            window.clearInterval(intervalId);

            if (numberOfBlinks < 0) {
                removeBorderElement();
            } else {
                borderElement.style.display = ((numberOfBlinks % 2) == 0) ? 'none' : 'block';
                numberOfBlinks--;
                intervalId = window.setInterval(blinkBorderElement, 1000, numberOfBlinks);
            }
        }

        borderElement = createBorderElement();
        blinkBorderElement(numberOfBlinks);
    }
}
