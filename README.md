TODO:write documentation

Watch my [EPUG-UKI AGM 2017](https://youtu.be/0IV4e94qroo?t=27m6s) presentation to get an idea of what it is and what it can do.

# Install
This package will extend the newUI through a "Template Package" or "Central Package".
  1. Install and configure [primo-explore-devenv](https://github.com/ExLibrisGroup/primo-explore-devenv)
  2. Download a "Template Package" or "Central Package" from the Primo Back Office
  3. Extract the downloaded package to ```primo-explore-devenv/primo-explore/custom```
  4. Rename the "Template Package" directory to reflect your view code
  5. Create a ```package.json``` file if you do not have one by running 
    * ```npm init -y```
  6. Install and store a reference to this package 
    * ```npm install primo-explore-dom --save-dev```
  7. Test.
    * ```gulp run --view YOUR_VIEW_CODE```
    * Open your web browser and go to http://localhost:8003/primo-explore/search?vid=YOUR_VIEW_CODE

PS: __YOUR_VIEW_CODE__ must be replaced with the code you use for your view.    

![install PRIMO Domain Object Model](./img/install_primo-explore-dom.gif "install PRIMO Domain Object Model")


# General
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
# Session
## Getting the session id (only available when logged in)
```js
  Primo.explore.session.id
```
## user
### Get user ID
```js
  Primo.explore.session.user.id
```
### Get user name
```js
  Primo.explore.session.user.name
```
### Get user email
```js
  Primo.explore.session.user.email
```
### Is user logged in
```js
  Primo.explore.session.user.isLoggedIn()
```
### is user on campus
```js
  Primo.explore.session.user.isOnCampus()
```
## view
### Get VID
```js
  Primo.explore.session.view.code
```
### Get institution code
```js
  Primo.explore.session.view.institution.code
```
### Get institution name
```js
  Primo.explore.session.view.institution.name
```
### Get interface language
```js
  Primo.explore.session.view.interfaceLanguage
```
## ip
### Get IP address of your Primo session
```js
  Primo.explore.session.ip.address
```
# Components
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

# Records
## Getting access to all records
```js
  Primo.explore.records
```  
### Mapping all recordid's into a list
```js
  Primo.explore.records.map((m) => m.pnx.control.recordid[0])
```


# Facets
## Getting access to all facets
```js
  Primo.explore.facets
```  
## Examining a facet
### Getting the facet name
```js
  Primo.explore.facets[0].name
```
### Getting facet count
```js
  Primo.explore.facets[0].count
```
### Getting facet values
```js
  Primo.explore.facets[0].values
```
# UI
TODO: Should this go into its own repo?
### Active the UI
```js
  Primo.ui.toggle()
```  
