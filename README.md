
### This is a __pre-release__: you can help us make it better.

### Current version 0.0.5
- refactored: user, view, records, facets, ui
- added user.email
- added view.interfaceLanguage
- user, view, records, facets returns a promise
- removed Primo.explore.session.id



Watch my [EPUG-UKI AGM 2017](https://youtu.be/0IV4e94qroo?t=27m6s) presentation to get an idea of what it is and what it can do.

# Why do we need a Domain Object Model?
A domain object model according to [Tim Howard](https://www.amazon.com/Smalltalk-Developers-Guide-VisualWorks-diskette/dp/013442526X) is a logical container of domain information. You might assume that a model is present in every component and that is kind of true. When you examine a component you get a long list of context(component) specific information and there is no obvious way to access the most common(session, user, record, facet) information from within this component. And if you use an newUI service Ex Libris does not garentee that this service will still be present in the next newUI release.

I'm not saying that we need an [SDK](https://en.wikipedia.org/wiki/Software_development_kit) but we definitely need something that will withstand the test of time and maybe even is AngularJS agnostic. Currently the newUI is written using AngularJS 1 but plans are in place to upgrade to a future AngularJS and when this happens everybody who has written custom newUI code has to rewrite it for that AngularJS version.

TODO:write more documentation



# Install
This package will extend the newUI through a "Template Package" or "Central Package".
  1. Install and configure [primo-explore-devenv](https://github.com/ExLibrisGroup/primo-explore-devenv)
  2. Download a "Template Package" or "Central Package" from the Primo Back Office
  3. Extract the downloaded package to ```primo-explore-devenv/primo-explore/custom```
  4. Rename the "Template Package" directory to reflect your view code for example to ```YOUR_VIEW_CODE```
  5. Create a ```package.json``` file __inside__ your package directory
    * ```cd YOUR_VIEW_CODE```
    * ```npm init -y```
  6. Install and store a reference to this package
    * ```npm install primo-explore-dom --save-dev```
  7. Test.
    * ```gulp run --view YOUR_VIEW_CODE```
    * Open your web browser and go to http://localhost:8003/primo-explore/search?vid=YOUR_VIEW_CODE

PS: __YOUR_VIEW_CODE__ must be replaced with the code you use for your view.    

![install PRIMO Domain Object Model](./img/install_primo-explore-dom.gif "install PRIMO Domain Object Model")



## If you haven't installed [primo-explore-devenv](https://github.com/ExLibrisGroup/primo-explore-devenv) but do want to explore you can load [primo-explore-dom](https://github.com/mehmetc/primo-explore-dom) from your web browser console.
```javascript
//enable debug information. Wait for the screen to reload.
angular.reloadWithDebugInfo();


//When screen is reloaded
//Get a pointer to AngularJs and angularLoad
var appInjector = angular.injector(['ng','angularLoad'])
//Get a reference to angularLoad
var angularLoad = appInjector.get('angularLoad');
//Load the script;
angularLoad.loadScript('https://npmcdn.com/primo-explore-dom/js/primo-explore-dom.js').then(function(){
    console.log('script loaded');    
});

//activate explorer ui
Primo.explore.ui.toggle();

//Print the VID
Primo.view.then(v => console.log(v.code));
```

# Quick links
- [General](#general)
- [User](#user)
- [Components](#components)
- [Records](#records)
- [Facets](#facets)
- [UI](#ui)

# General<a name="general"></a>
If you are using this library to understand the newUI always load debug info first.
```js
  angular.reloadWithDebugInfo();
```
For now it is not possible to access the $scope and $ctrl without the debug info. The library will throw an error if this is the case and try an alternative method but this does not work for component access.
(__±__ will mark methods that absolutely need $scope access)


## Check if the library is loaded with debug info enabled
```js
  Primo.isDebugEnabled()
```  
## This is an artifact. Should not be used!
```js
  Primo.isPrimoAvailable()
```  
## Get the library version
```js
  Primo.version
```  

# User<a name="user"></a>
```Primo.user``` returns a promise

## user<a name="user"></a>
### Get user ID
```js
  Primo.user.then(user => console.log(user.id));
```
### Get user name
```js
  Primo.user.then(user => console.log(user.name));
```
### Get user email
```js
  Primo.user.then(user => console.log(user.email));  
```
### Is user logged in
```js
  Primo.user.then(user => console.log(user.isLoggedIn()));  
```
### is user on campus
```js
  Primo.user.then(user => console.log(user.isOnCampus()));  
```
## view<a name="view"></a>
```Primo.view``` returns a promise
### Get VID
```js
  Primo.view.then(view => console.log(view.code));  
```
### Get institution code
```js
  Primo.view.then(view => console.log(view.institution.code));
```
### Get institution name
```js
  Primo.view.then(view => console.log(view.institution.name));  
```
### Get interface language
```js
  Primo.view.then(view => console.log(view.interfaceLanguage));
```
## ip
### Get IP address of your Primo session
```js
  Primo.view.then(view => console.log(view.ip.address));
```

# Records<a name="records"></a>
```Primo.records``` returns a promise
This is a pointer to the new UI result set
## Getting access to all records
```js
  Primo.records.then(records => console.log(records));
```  
### Mapping all recordid's into a list
```js
  Primo.records.then(records => console.log(records.map((m) => m.pnx.control.recordid[0])));
```
### This is just a glimpse of what can be done.

# Facets<a name="facets"></a>
```Primo.facets``` returns a promise
This is a pointer to the new UI facet set
## Getting access to all facets
```js
  Primo.facets.then(facets => console.log(facets));
```  
## Examining a facet
### Getting the facet name
```js
  Primo.facets.then(facets => console.log(facets[0].name));
```
### Getting facet count
```js
  Primo.facets.then(facets => console.log(facets[0].count));  
```
### Getting facet values
```js
  Primo.facets.then(facets => console.log(facets[0].values));  
```
### This is just a glimpse of what can be done.

# Components<a name="Components"></a>
## Getting available components
The components list changes over time. Some components are only available in certain situations
```js
  Primo.explore.components.keys();
```
## Getting the 'prm-icon' component
```js
  var prmIcons = Primo.explore.components.get('prm-icon');
```
## Examining the prmIcon component
### Get component name
```js
  primIcons[0].name
```

### Get DOM element
```js
  primIcons[0].element
```

### Find out css path to component
```js
  primIcons[0].cssPath
```

### Get $scope for component __(±)__
```js
  primIcons[0].scope()
```

### Get $ctrl form component __(±)__
```js
  primIcons[0].ctrl()
```

### Make component blink on screen
```js
  primIcons[0].blink()
```

# Helper
__TODO:__ write documentation


# UI<a name="ui"></a>

### Activate the UI
```js
  Primo.expose.ui.toggle()
```  
![PRIMO Domain Object Model UI](./img/primo-explore-dom_ui.gif "PRIMO Domain Object Model UI")
