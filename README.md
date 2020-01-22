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
- When looping through objects you can use parentheses to get key-value pairs with ```v-for="(value, key) in object"``` a third variable in the parenteses will give you the index ```v-for="(value, key, index) in object"```
- list of numbers: ```v-for="n in 100"``` will list 1-100 in ```{{ n }}```

## Multiple Vue instances
- You can access other Vue instances from inside a Vue instance when they are assigned to variables.
- The data property can be initialized by an external object.
- Each Vue instance has a ```$refs``` property that you can access. This refers to all ```ref=''```
- The Vue properties accessed externally are prefixed with $
- If you don't already know where you are going to mount the Vue instance (if the HTML doesn't exist yet for example) you can use ```vm.$mount('#selector')``` where vm is your Vue instance (AKA View Model in an application)

## Templates
- template is another Vue property that can take a simple string (with HTML) and you can mount it onto another element
- Using a selector in the ```el``` property only attaches the template to the first instance
- To reuse in multiple elements you must make a ```Vue.component('.selector', {})``` there will be more on this later

## Instance Lifecycle
- Each VueJS instance has lifecycle methods we can tap into to run code at specific points in the Lifecycle
- ```beforeCreate```, ```created```, ```beforeMount```, ```mounted```, ```beforeUpdate```, ```updated```, ```beforeDestroy```, ```destroyed``` are all root functions in a Vue Instance that you can place code into
- To destroy a Vue Instance you can call ```$destroy()``` on the instance

## Vue CLI
- ```npm install -g @vue/cli``` and ```npm install -g @vue/cli-init``` for old templates used in this course (like webpack-simple).
- Test with ```npm run dev``` and build with ```npm run build``` for production.

## Single File Templates (\*.vue)
- The general structure of a .vue file is a ```<template> ... </template``` followed by a ```<script> ... </script>``` sometimes followed by styles
- ```export default {}``` in the script tag in any single file template is its own Vue instance.

## Components
- ```Vue.component('myComponent');``` use the component with ```<myComponent></myComponent>``` add a prefix to these as to not conflict with other html tags or js (nya)
- In the call you can follow the selector with the component object ```Vue.component('myComponent', {});```
- A component extends the Vue instance, but the data property cannot act the same, in a component data is a function that returns an object holding the data
  data: function() { return { key: val } }
- rather than calling ```Vue.component``` you can assign the component to a variable and add it to the components property of a Vue instance, if they are defined here they are local components rather than global components and just apply to that instance
- A component must have ONLY ONE root element, so not a bunch of sibling elements in a template. One wrapper and then elements in it.
- Component naming convention: CapitalCamel.vue
- When styling components add ```scoped``` to the ```<style>``` to contain that stylesheet to that component, otherwise it is global

## Communicating Between Components
- Add the ```props``` property to a Vue instance to be able to set the included data from outside the component (i.e. from parent to child)
- to set a prop from ```props``` you can add it as a binded attribute to a component call like 
```<component :propName="dataProperty">```
- You can validate props by adding a type definition (or an array of types) in the ```props``` property. So, ```props: { myProp: String }``` will ensure it is a string and ```props: { myProp: [String, Array] }``` will ensure a string or array type
- the type definition can be part of an object consisting of options, so ```myprop: { type: String, required: false, default: "foo" }``` where required is if it must be passed and default is the default value assigned
- If the type is Object or Array you must have a function that returns an Object or Array in default
- Keep in mind if the passed prop is an Object or Array they are pass-by-reference and can be altered in memory inside a child, to avoid this kind of thing there are custom events you can emit
- in a Vue Instance you can use 
```this.$emit('eventName', this.dataToPass)``` the arguments are the name of the event and the data being passed, to refer to this passed data use ```$event``` on the listener
- VueJS applications have a unidirectional data flow, meaning for child components to communicate they go through their shared parent
- You can pass a callback function to a child component by using a binded pointer to a function ```:passedFn="functionName"```
- An event bus can save you from crazy child-to-child chains, to use this you create a new Vue instance in your main js file where your root vue app is defined with ```export const eventBus = new Vue();``` (this should go before the main app instance). Now you can include this with ```import { eventBus } from '../main';``` and use this bus to use ```$emit``` how you normally would

## Advanced Components
- Slots are reserved tags you can use in a child component to render HTML written in a parent component (inside it's tag ```<myComponent>...</myComponent>```)
- You can also, weirdly, use the parent's properties (and other Vue syntax) in the HTML, since that is where it's written
- to map an html tag to a slot (to break up content for example) you would use the ```slot="foo"``` attribute in the html and ```name="foo"``` in the slot.
- Default content can be defined in the ```<slot>``` tag
- Dynamic components are displayed dynamically and can map to different components using the ```<component>``` tag
- You can bind this to a property that holds which component to render ```<component :is="selectedComponent"></component>``` where selectedComponent holds a string that matches component names
- One thing to keep in mind is that these components are created and destroyed when switched, but this behavior can be overidden by wrapping them in ```<keep-alive>```

## Forms
- When handling forms ```v-model``` will two-way bind your input data and ```v-model.lazy``` will wait to update until the focus leaves the input field (when the change event happens), .trim trims whitespace, and .number converts to a number
- When binding a textarea, make sure to use the data property for setting a default, putting it in the tag will not work
- Adding multiple items to an array can be done by adding the same array prop in ```v-model``` on two or more input elements, great for groups of checkboxes
- Once you've bound an input to data, you can use the ```@input``` event
- Keep in mind when using a ```this.$emit('input', this.value)``` that the 'value' prop name is important

## Custom Directives
- There are five hook functions to use with custom directives. These are attached with a custom directive to the element it's on.
- They are:     ```bind(el,binding,vnode)``` for when it is attached (binding and vnode should be read-only)
                ```inserted(el,binding,vnode)``` when it is inserted into the DOM
                ```update(el,binding,vnode,oldVnode)``` when it is updated
                ```componentUpdated(el,binding,vnode,oldVnode)``` when the component is updated
- Define a directive with ```Vue.directive('name', {...hooks...});```
- el is the element the directive is attached to, so change styles with ```el.style```
- binding is the actual ```v-name="value"``` and to get the passed argument you use ```binding.value```
- ```binding.arg``` gets you the argument passed after a colon, like: ```v-name:arg="value"``` then you can check ```if(binding.arg == "foo")```
- ```binding.modifiers``` is your object containing modifiers given after the period of a binding: ```v-name:arg.mod1.mod2="value"```, you can check if a modifier exists by checking for the key ```binding.modifiers['mod1']```
- you can use the directives object in a Vue instance to register local directives
- you can also pass an object to directives ```v-name:arg.mod1.mod2="{key1: 'val1', key2: 'val2'}```
- if the value in your directive maps to a method name in the Vue instance, you can use it as a function: ```binding.value()```

## Filters and Mixins
- A filter in VueJS is a syntax feature to transform output in a template
- register a filter with ```Vue.filter('filter-name');``` or the ```filters``` prop in a vue instance
- A filter must return the same data type
- use a filter with ```{{ prop | filterName }}```
- add more pipes to chain
- To filter a list, you can use a computed property to output a filtered list based on another property
- Mixins are to avoid duplicate code
- You can create mixins in js files ```myMixin.js```
- a mixin will be a JS object using ```export const {...}``` and include it with the ```mixins``` prop in a Vue instance
- VueJS will merge the objects together when a mixin is included with already created props
- Mixins are not shared globally, each time it is included it is a new instance

## APIs and HTTP connections
- Using Axios with Vue is preferred. After the install you can just ```import Axios from 'axios'``` and then do a ```Vue.use(Axios)``` to register it as a plugin
- Since a request gives back a Promise you can chain then() after it to fire asynchronously with data ```axios.post('', this.data).then(response => {...});``` and add error reporting with ```...then(response => {...}, error => {...})```
- to set the default URL for queries you can do ```Axios.defaults.baseURL``` in main.js
- 

## Routing
- Install vue-router and create a routes.js in the root, in this you have an array of objects each with a path and a component. Include the components you want and add objects to the array like: ```{ path: '/example', component: Example }``` when Example is an included component
- In main.js have something like: 
```import {routes} from './routes';```
```Vue.use(VueRouter);```
```const router = new VueRouter({routes});```
- include in your main vue instance the router property
- The ```<router-view>``` component is built-in and will show the component that is routed to
- You must set up the server to always redirect to index.html to get rid of the hash in URLs and then switch the mode in the VueRouter to be 'history' instead of 'hash'
- You can use the provided ```<router-link>``` component with the ```to="/route"``` attribute for linking
- using router-link instead of a standard a tag means it skips the default behavior of sending a request to the server and just loads the component
- You can put whatever you want inside of router-link and it will still create the link. You can define what tag the outer link will be with the tag attribute
- To style active links you can set the associated class name with the active-class attribute
- By default active will trigger if the URL starts with the given 'to' attribute. for "/" this will always trigger. By adding 'exact' as an empty attribute you can prevent this behavior.
- You can access the router in a vue instance with ```this.$router``` and you can route using ```this.$router.push('/');``` or you can pass an object with the path property ```this.$router.push({path: '/'});```
- to add a dynamic variable to a route use a colon, like '/user/:id'
- to access this you can use ```this.$route.params.id``` where $route is the current route
- One thing to keep in mind is that when only the path changes a component will not automatically be recreated/reloaded. You can add a watcher for $route with ```watch: { '$route'(to,from){...} }``` to run whatever code you need to on a URL change, where 'to' is the new route and 'from' is the old.
- Instead of using a watch you can now pass a static value or bind a dynamic value to props, see: [the vue-router github](https://github.com/vuejs/vue-router/tree/dev/examples/route-props)
- subroutes go in the 'children' prop inside a route, and will be an array of route objects (path & component)
- Give routes names with the 'name' property
- You can use named routes by passing an object to the 'to' attribute (with a bind): ```:to="{name: 'routeName'}"``` 
and add params to define parameters to pass: ```:to=" { name: 'routeName', params: { id: $route.params.id } }"```
- To add query parameters you can add a query property to set key: value pairs
- In a ```<router-view>``` you can set a name which will correspond to a component provided in a route so ```<router-view name="header-top">``` may correspond with ```components: { 'header-top': Header, ...}```
- Adding a redirect is as easy as adding a new route with the path you would like to redirect and adding a redirect property with the path you want to redirect to. ```{path: '/redirect-this', redirect: '/to-this'}``` you could also use an object to point to a named route
- You can set up a universal redirect that handles any unkown route with ```{ path: '*' redirect: '/' }```
- You can wrap a ```<router-view>``` element in a transition to animate route changes.
- In your router definition you can define scroll behavior with the scrollBehavior function
- you can set ```router.beforeEach((to,from,next)=>{... next();});``` (making a guard) to run some code before each routing action , where next() will continue the route
- To accomplish the same thing for a specific route, you can add the ```beforeEnter: () => {}``` prop to a route in routes.js
- You can even add a guard in a component, in the vue instance add ```beforeRouteEnter(to,from,next) {... next();}``` and this will run before the component will not be created until after this runs
- enclosing this next() function in a conditional is a good way to check authentication to get to certain parts of an app.
- You can also add a ```beforeLeave``` or ```beforeRouteLeave``` to check if a user is allowed to leave a route
- Lazy loading: With Webpack you can, instead of the normal component import in routes.js, set ```const Comp = resolve => { require.ensure(['./components/MyComponent.vue'], () => { resolve(require('./components/MyComponent.vue')); } )};```
- This is an async function which only runs when it is needed. This saves performance in large applications.

## State Management With Vuex
- Using an event bus gets crowded and state changes are hard to track. So, for large applications use Vuex
- There is a central store that stores a central state. This is commonly kept in the store folder in src.
- in the js file (commonly index.js or store.js) you import Vue, have ```Vue.use(Vuex);``` and ```export const store = new Vuex.Store({ state: {..} });``` and the state property is reserved and should hold all the props you want to pass between your components
- After importing your store object in the main.js file, you add the ```store``` prop to the main Vue instance and you are able to use the ```this.$store``` prop in any internal Vue instance to access this central store.
### Getters
- You should use getters and setters to alleviate code duplication
-   Add the ```getters``` prop to the store instance and you return ```state.propName``` with whatever operations you may need to perform
- Access getters with ```this.$store.getters.getterName```
- You can map getters in a component by importing:
```import {mapGetters} from 'vuex';``` 
and adding a computed property with a mapGetters call with an array of the getter names:
```mapGetters(['getter1', 'getter2'])```
- if you have babel-preset-stage-2 installed and add stage-2 to the babel presets you can use the spread operator to allow writing computed props alongside the getters ```...mapGetters([...])```
### Mutations
- Mutations change the central state of the app, then all of the components using getters will get the updated state
- To add a mutation add the reserved property 'mutations' to your store. When you change a prop in the store in a mutation, it will change across all components
- To use a mutation you can run ```this.$store.commit('mutationName');``` in a vue instance
- You can also map mutations just like getters with ```import {mapMutations} from 'vuex';```
- You cannot run async functions in mutations
### Actions
- To combine async and mutations you can use Actions
-  'actions' is another reserved prop in store
- A method in the actions prop passes context (a sort of store instance) ```actionName: context => {context.commit('actionName');}``` This is where you do your async tasks and then commit the action to then do a mutation and change the central state
### Two-way binding with Vuex
- You can set up a computed value as an object with a getter (```return this.$store.getters.propName;```) and a setter (```this.$store.dispatch('emitName',propName);```) to achieve a two-way binding with v-model. This is a rare case, computed properties should normally be computed and not reactive
### Reorganizing Vuex
- You can break up store.js to multiple files for larger applications
- In /store you can create a modules folder to contain individual modules, which will include a state, getters, setters, mutations, and actions each in their own object
- You then include the modules in the store.js file and assign them in the modules object in the Vuex.store instance
- If you have a lot of actions and mutations, you can separate those into their own files and import those into store.js