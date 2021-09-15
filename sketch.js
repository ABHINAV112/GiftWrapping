const points = [];
const hull = [];

let leftMost;
let currentVertex;
let index=2;
let nextIndex = -1;
let nextVertex;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  let buffer = 20;
  for (let i = 0; i < 50; i++) {
    points.push(
      createVector(
        random(buffer, width - buffer),
        random(buffer, height - buffer)
      )
    );
  }
  points.sort((a, b) => a.x - b.x);
  leftMost = points[0];
  currentVertex = leftMost;
  hull.push(currentVertex);
  nextVertex = points[1];
}

function draw() {
    background(51);

  stroke("white");
  strokeWeight(4);
  for (let p of points) {
    point(p.x, p.y);
  }

  stroke(0,100, 200);
  fill(0, 100, 200, 50);
  beginShape();
  for (let p of hull) {
    vertex(p.x, p.y);
  }
  endShape(CLOSE);

  stroke("cyan");
  strokeWeight(4);
  point(leftMost.x, leftMost.y);

  stroke("cyan");
  strokeWeight(4);
  point(currentVertex.x, currentVertex.y);

  stroke("darkgreen");
  strokeWeight(2);
  line(currentVertex.x, currentVertex.y, nextVertex.x, nextVertex.y);

  let checking = points[index];
  stroke("yellow");
  line(currentVertex.x, currentVertex.y, checking.x, checking.y);

  const a = p5.Vector.sub(nextVertex, currentVertex);
  const b = p5.Vector.sub(checking, currentVertex);
  const cross = a.cross(b);

  if (cross.z < 0) {
    nextVertex = checking;
    nextIndex = index;
  }

  index += 1;
  if (index == points.length) {
    if (nextVertex == leftMost) {
      noLoop();
    } else {
      hull.push(nextVertex);
      currentVertex = nextVertex;
      index = 0;
      nextVertex = leftMost;
    }
  }
}
