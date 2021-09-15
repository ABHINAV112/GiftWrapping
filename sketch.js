const points = [];
const hull = [];

let leftMost;
let currVer;
let index=2;
let nextIndex = -1;
let nextVer;

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
  currVer = leftMost;
  hull.push(currVer);
  nextVer = points[1];
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
  point(currVer.x, currVer.y);

  stroke("darkgreen");
  strokeWeight(2);
  line(currVer.x, currVer.y, nextVer.x, nextVer.y);

  let checking = points[index];
  stroke("yellow");
  line(currVer.x, currVer.y, checking.x, checking.y);

  const a = p5.Vector.sub(nextVer, currVer);
  const b = p5.Vector.sub(checking, currVer);
  const cross = a.cross(b);

  if (cross.z < 0) {
    nextVer = checking;
    nextIndex = index;
  }

  index += 1;
  if (index == points.length) {
    if (nextVer == leftMost) {
      noLoop();
    } else {
      hull.push(nextVer);
      currVer = nextVer;
      index = 0;
      nextVer = leftMost;
    }
  }
}
