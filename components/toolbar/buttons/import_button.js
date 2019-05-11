/*
 *   Created by Ligal Levy & Shaked Zrihen
 */

function drawLines(points, lines, canvas) {
  lines.forEach(line => {
    canvas.storedSapes.push(
      new Line(canvas, points[line.startPoint], points[line.endPoint])
    );
  });
}

function drawCircles(points, circles, canvas) {
  circles.forEach(circle => {
    canvas.storedSapes.push(
      new Circle(canvas, points[circle.center], circle.radius)
    );
  });
}

function drawBezierCurves(points, bezierCurves, canvas) {
  bezierCurves.forEach(bezierCurve => {
    let controlPoints = [];
    bezierCurve.controlPoints.forEach(point => {
      controlPoints.push(points[point]);
    });
    canvas.storedSapes.push(new BezierCurve(canvas, controlPoints));
  });
}

function parseFile(file, paint) {
  const inputParsed = JSON.parse(file);
  paint.canvas.points = [];
  const points = paint.canvas.points;
  inputParsed.points.forEach(point => {
    paint.canvas.points.push(new Point(point.x, point.y));
  });
  paint.canvas.storedSapes = [];
  drawLines(points, inputParsed.lines, paint.canvas);
  drawCircles(points, inputParsed.circles, paint.canvas);
  drawBezierCurves(points, inputParsed.bezierCurves, paint.canvas);
  paint.canvas.redrawStoredShapes();
}

class ImportBtn extends ShapeButtonBase {
  constructor(name, paint) {
    super(name, paint);
  }

  handleButtonPress(event) {
    const files = document.getElementById("inputFile").files;
    if (files.length < 1) {
      alert("You should choose a file first");
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      parseFile(reader.result, paint);
    };

    reader.readAsText(files[0], "utf-8");
  }

  clearSelect() {}
  select() {}
}
