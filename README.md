TODO:write documentation

If you are using this library to understand the newUI always load debug info first.
```js
  angular.reloadWithDebugInfo();
```
For now it is not possible to access the $scope and $ctrl without the debug info. The library will throw an error if this is the case and try an alternative method but this does not work for component access.
(__±__ will mark methods that absolutely need $scope access)

# General
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
TODO
## view
TODO
## ip
TODO
## institution
TODO

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
