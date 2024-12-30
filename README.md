# Rasterizing-Lines-and-Triangles

![output](./output.png)

# Project Overview

Implement rasterization algorithms that allow you to draw lines and solid triangles

1. Implement line rasterization, for now with a constant color value along the line. Base the implementation on the DDA algorithm, correctly extended to handle lines in all orientations. 

2. Implement color interpolation along the line. Assume linear interpolation along each RGB color channel from the start to the end of the line. 

3. Implement a triangle inside-outside test function to determine whether a pixel is inside a triangle.

4. Use the above test to implement triangle rasterization in function drawTriangle . Implementation should avoid naively checking all pixel points. 

5. Implement barycentric color interpolation to determine the color value at each pixel inside a triangle. 
