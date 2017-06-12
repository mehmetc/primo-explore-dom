import Primo from './primo'
window.Primo = Primo;

window.setTimeout(function(){
  if (Primo.isDebugEnabled()) {
    Primo.explore.ui.toggle();
  }
}, 2000);
