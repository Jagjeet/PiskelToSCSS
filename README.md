# PiskelToSCSS

## About
This is a node app to convert [Piskel](https://www.piskelapp.com/)
 pixel art to SCSS. Per the website 'Piskel is a free online editor for animated sprites & pixel art.' The SCSS can then be displayed using the [Single Element Pixel-Art Mixin](https://codepen.io/roborich/pen/dqoDj) by Rich Howell on Codepen.

This can result in CSS based pixel art as seen below or on [CodePen](https://codepen.io/jagjeetkhalsa/pen/ELppLL?editors=1111)

![Screenshot](./screenshot.png?raw=true "Screenshot")


## Usage
Copy an area of an image from a Piskel image. This will put the JSON data in your clipboard. This data can then be pasted into a data file.

At a console prompt, run the following command:

node PiskelToSCSS.js \<datafile>

Cut-n-paste the output into image section in the CodePen code.

