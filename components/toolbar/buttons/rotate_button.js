/*
 *   Created by Ligal Levy & Shaked Zrihen & Chen Shavit
 */

class RotateBtn extends ButtonBase {
  constructor(name, paint) {
    super(name, paint);
  }

  handleButtonPress(event) {
    this.paint.toolbar.clearSelected();
    this.select();
    this.paint.canvas.clearListeners();
    const setterBtn = document.getElementById("setter-btn");
    setterBtn.addEventListener("click", event =>
      this.rotate(this.paint.canvas)
    );
    setterBtn.innerHTML = "rotate";
    document.getElementById("setter-value").value = 45;
  }

  rotate(canvas) {
    const degree = document.getElementById("setter-value").value;
    if (isNaN(degree)) {
      alert("Must input a number");
      return;
    }
    const angle = (degree * Math.PI) / 180;
    Transform3D.rotate(canvas, canvas.centerPoint, new Point3D(angle, 0, 0));
    canvas.redrawPolygons();
  }

  clearSelect() {
    this.btn.style.backgroundColor = "";
    document.getElementById("setter").style.display = "none";
    const setterBtn = document.getElementById("setter-btn");
    const new_element = setterBtn.cloneNode(true);
    setterBtn.parentNode.replaceChild(new_element, setterBtn);
  }

  select() {
    this.btn.style.backgroundColor = "#282828";
    document.getElementById("setter").style.display = "block";
  }
}