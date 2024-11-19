let video;

function setup() {
  video = createCapture(VIDEO);
  createCanvas(256, 192); // Stroke Weight = 2
  // createCanvas(128, 96); // Stroke Weight = 1
  video.size(width, height);
  video.hide();
  strokeWeight(2);
}

function draw() {
  video.loadPixels();
  if (mouseIsPressed) {
    image(video, 0, 0, width, height);
    background(255, 100);
  } else {
    background(255);
  }
  for (let j = 1; j < video.height; j++) {
    for (let i = 1; i < video.width; i++) {
      if (difEdge(i, j)) {
        point(i, j);
      }
    }
  }
}

function difEdge(i, j) {
  const cur = getColor(i, j);
  const top = getColor(i - 1, j);
  const left = getColor(i, j - 1);

  let curA = gray(cur);
  let topA = gray(top);
  let leftA = gray(left);
  
  return (
    ((cur[0] - top[0]) + (cur[0] - left[0])) > 30 ||
    ((cur[1] - top[1]) + (cur[1] - left[1])) > 30 ||
    ((cur[2] - top[2]) + (cur[2] - left[2])) > 30 ||
    (abs(curA - topA) + abs(curA - leftA) > 50)
  )
  // return (abs(curA - topA) + abs(curA - leftA) > 60); // Moderate Edges / Moderately Good With Noise
}

function getColor(i, j) {
  let index = (i + j * video.width) * 4;
  return [video.pixels[index + 0], video.pixels[index + 1], video.pixels[index + 2]];
}

function gray(c) {
  if (key == "a") {
    return (c[0] + c[1] + c[2]) / 3;
  }
  return (0.299 * c[0]) + (0.587 * c[1]) + (0.114 * c[2]) / 3;
}
