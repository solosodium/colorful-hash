# colorful-hash

A JavaScript library that transforms hex or base64 hash to colorful SVG.

## Getting Started

### Download the JavaScript file

* Uncompressed version: [colorful.hash.js](/dist/colorful.hash.js)

* Minified version: [colorful.hash.min.js](/dist/colorful.hash.min.js)

### Include in HTML
```html
<body>
<head>...
  <script type="application/javascript" src="colorful.hash.[min.]js"></script>
...</head>
<body>...</body>
</body>
```
### Define a SVG
```html
<body>
<head>...</head>
<body>...
  <svg id="svg-id"></svg>
...</body>
</body>
```
### Write some code
To create an hex hash:

```javascript
var element = CH.hex('svg-id', '4d2da9f', ['#000000', '#ffffff']);
```

To create a base64 hash:

```javascript
var element = CH.base64('svg-id', '+A1uDe4', ['#000000', '#ffffff']);
```

> You can pass in an array of colors as a color scheme. Currently color supports hex string (e.g. ```'#002244'```), rgb string (e.g. ```'rgb(0, 127, 255)'```) and rgba string (e.g. ```'rgba(0, 127, 255, 0.5)'```).

## Example

You can check this interactive [example](/example/index.html) to see it in action.

## Compile Yourself

This is a complete Node.js project. Source code locates in [src](/src) folder. To compile uncompressed and minified JavaScript:

* Download this project.
* Within the project folder, run ```npm install```.
* Within the project folder, run ```node index.js```.
* Compiled files will appear in [dist](/dist) folder.

## MIT Licence

Copyright 2018 solosodium

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
