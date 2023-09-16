# Rasterizing-Lines-and-Triangles

![output](./output.png)

Implement rasterization algorithms that allow you to draw lines and solid triangles

# Implementation instructions

The program uses a simple framebuffer that you can control using the function setPixel(x, y, color) where x and y specify integer
pixel coordinates along the horizontal and vertical axes respectively, with the top-left corner of the image being the origin. The color
variable is an array containing RGB color values (i.e. color = [R, G, B] ), each represeting as a floating point value in [0,1] .

Use the following syntax to control the input:

- `v,x,y,r,g,b;` specifies a vertex position at `x,y` with color value `color = [r, g, b]` . The order in which lines starting with `v`
are provided defines an index for each vertex v . That is, the first v line is the 0-th vertex, the second line is the 1-th vertex etc.
- `p,i;` specifies a point (i.e. "pixel") defined by the vertex with index `i` .
- `l,i,j;` specifies a line defined by the start and end vertices with index `i` and `j` respectively.
- `t,i,j,k;` specifies a triangle defined by the three vertices with indices `i , j` and `k` .

You can change the contents of the text box to add vertices as well as point, line and triangle definitions using the defined vertices.
Clicking the "Update" button will refresh the image output.

1. First, implement line rasterization, for now with a constant color value along the line. Base the implementation on the DDA algorithm, correctly extended to handle lines in all orientations. 

2. Implement color interpolation along the line. Assume linear interpolation along each RGB color channel from the start to the end of the line. 

3. Implement a triangle inside-outside test function to determine whether a pixel is inside a triangle.

4. Use the above test to implement triangle rasterization in function drawTriangle . Implementation should avoid naively checking all pixel points. 

5. Implement barycentric color interpolation to determine the color value at each pixel inside a triangle. 
