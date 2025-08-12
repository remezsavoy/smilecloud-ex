Which method did you use to draw the triangle, and why?
I used SVG, as it makes it straightforward to draw lines, small angle arcs, and text labels as separate DOM elements. SVG graphics also remain crisp at any size. I flipped the Y-axis in code so that “up” is positive, matching the mathematical convention. This approach allowed for precise placement of all elements while keeping the implementation simple.

How did you compute the angle values?
I computed the three angles using pairwise distances and the Law of Cosines (in degrees). The arcs were drawn using atan2 to determine the two ray directions for each vertex, and the labels were positioned along a simple angle-bisector vector at a fixed distance from the vertex. Considering the limited time frame of about an hour and a half, I chose a simple yet effective method to ensure accurate results without unnecessary complexity.

What was challenging?
Two main points:
1. Making the SVG scale well for triangles of different sizes. I addressed this by sizing stroke widths, arc radii, and label distances relative to the triangle’s bounding box.
2. Ensuring the coordinate orientation felt “mathematical” (positive Y going up). I solved this by flipping the Y-axis for rendering.

Did you use external tools (including AI)? If yes, how did it help?
Yes. AI helped me quickly compare two possible approaches vector dot-product versus the Law of Cosines—and select the simpler and more intuitive one for this case. All logic and code were written or adapted by me to fit the assignment requirements (client-side only, no input validation), and thoroughly tested to ensure correctness.

*I did not implement navigation or multiple pages, as the task requirements could be fully met with a single input-to-display flow. This kept the solution lightweight and straightforward.
