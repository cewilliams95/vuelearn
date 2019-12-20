# vuelearn
Vue course to prepare for web app development at NYA

## Basics
- Vue constructor: new Vue({
    el: #id,
    data: {
        name:value
    },
    methods {
        name:function(){}
    }
});
- Accessing data in html: {{ name }}
    -  You can perform js operations in this call (e.g. {{ name * 2 }})
- Directives:
    - v-bind:attr="name" ( for binding data or methods that return stringable results to attributes )
    - v-on:event="method(arg)" ( for event handling, you can pass $event to pass the event object, $event is reserved)
- When event handling you can add a modifier to add an intermediate function to the event (e.g. v-on:event.stop will stop propogation, you can chain these)
- Keyboard events ```v-on:keyup.key="method"```
- ```v-model``` is a two-way-binding that listens to changes to a data variable and updates any other instances of that data variable (basically a quick way to set up a listener and update all in one)

## Expanding the Vue Instance
- Another option for a Vue instance: ```computed: {}``` in which you store functions that are treated as properties when called (even in syntax ```{{ computedProp }})```. So, a function in computed will track dependencies and only be called when a dependency changes and cache the result. Where methods will be called more often and recalculate results. USE THESE, they are more optimized. They do always need to be synchronous though.
- Next object: ```watch: {}``` this is where you can track changing properties and set a function to trigger when a prop changes. This is also useful for async tasks. 
- NOTE: before nested functions store the Vue instance in a variable (using ```this```) if you will need to access it.

## Shorthands
- ```v-on:event``` => ```@event```
- ```v-bind:href``` => ```:href```

## CSS Manipulation
- NOTE: to include special characters (like - ) in any of these, the name must be enclosed in single quotes '', for styles you can also use camelCase instead
- Binding to classes: ```:class="{'className': boolean}"``` the boolean tells whether or not to attach a class.
- you can also bind directly to a data prop ```:class="propName"```
- Or you can have an array of classes ```:class="[propName, {'className': boolean}]"```
- You can also bind to the style attribute to just change styles ```:style="{'background-color': colorProp}"```
- You can return styles as objects in functions when bound to the style attr

## DOM Manipulation
- ```v-if="conditional"``` will attach to a conditional and completely remove an element from the DOM if false, show if true
- ```v-else``` automatically refers to the last ```v-if```
- You can use ```<template v-if="conditional">``` to show or hide whole sections/groups
- ```v-show``` also hides elements without detaching from the DOM, only adding a ```display:none;```
- ```v-for="element in list"``` this will create and duplicate an element prop you can call the list with ```{{ element }}``` and get its index by changing to  ```v-for="(element, index) in list"``` and then call ```{{ element}}``` and ```{{ index }}```
- Can loop multiple dom elements with ```<template>``` again to group
- You can nest ```v-for``` and use an arbitrary name to loop values in the object from the upper ```v-for```