const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const COLOR = "#1890ff";
const LINEWIDTH = 2;
const DOTRADIUS = 3;
const textArray = new Array();
const rectArray = new Array();

let startX = 0;
let startY = 0;
// context.fillStyle = "#FF0000";
// context.fillRect(50,50,150,100);
context.fillStyle = COLOR;
context.strokeStyle = COLOR;
context.lineWidth = LINEWIDTH;
// TODO 文字框子的输入
function windowToCanvas(canvas, x, y) {
  var bbox = canvas.getBoundingClientRect();
  return {
    x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height),
  };
}

function drawDot(loc) {
  context.beginPath();
  context.arc(loc.x, loc.y, DOTRADIUS * 2, 0, 2 * Math.PI);
  context.fill();
}

function drawLine(locStart, locEnd) {
  context.beginPath();
  context.moveTo(locStart.x, locStart.y);
  context.lineTo(locEnd.x, locEnd.y);
  context.stroke();
}

function drawPolygon(points) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  const length = points.length;
  for (let i = 0; i < parseInt(length / 2); i++) {
    // drawDot(points[i * 2])
    drawLine(points[i * 2], points[i * 2 + 1]);
  }
  if (points.length % 2 === 1) {
    // drawDot(points[length - 1])
  }
  if (points.length > 2) {
    console.log("close");
    drawLine(points[length - 1], points[0]);
  }
}

function drawerRect(pointCollection) {
  pointCollection.map((i) => {
    let firstPoint = i[0];
    context.moveTo(firstPoint.x, firstPoint.y);
    i.map((item, index) => {
      if (index > 0) {
        context.lineTo(item.x, item.y);
       
      }
    });
    context.fillStyle = "#89c5fd75";
    context.fill();
  });
}
function drawerFillRect(x, y, width, height, color) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  // context.fillStyle = "rgba(0,255,0,0.2)";
  context.strokeStyle = color;
  // context.fillRect(20, 260, 60, 60);        //变浅的红色填充矩形
  context.lineWidth = 2; //设置边框线框，0.2的透明度不易观察
  context.strokeRect(x, y, width, height); //变浅的红色边框矩形
}

function drawerText(x, y, colors, text) {
  context.font = "15px Arial bolder";
  context.fillStyle = colors;
  context.fillText(text, x, y);
}

let points = [];
let isDrawing = false;
let isPointAdd = false;
let pointCollection = [];
canvas.addEventListener("mousedown", (e) => {
  const loc = windowToCanvas(canvas, e.clientX, e.clientY);
  let type = document.querySelector("#reactType").value;
  if (type == 1) {
    points.push(loc)
    drawPolygon(points)
  }
  startX = e.clientX;
  startY = e.clientY - 40;
  isDrawing = true;
  isPointAdd = true;
});

canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    const loc = windowToCanvas(canvas, e.clientX, e.clientY);
    let type = document.querySelector("#reactType").value;
    if (type == 2) {
      drawerFillRect(
        startX,
        startY,
        e.clientX - startX,
        e.clientY - startY,
        document.querySelector("#typeColor").value
      );
    }
    if (type == 1) {
      if (!isPointAdd) {
        points.pop();
      }
      points.push(loc);
      isPointAdd = false;
      drawPolygon(points);
    }
  }
});
// canvas.addEventListener("mouseup", (e) => {
//   let type = document.querySelector("#reactType").value;
//   if (type == 2) {
//     drawerFillRect(
//       startX,
//       startY,
//       e.clientX - startX,
//       e.clientY - startY,
//       document.querySelector("#typeColor").value
//     );
//     rectArray.push({
//       position: [startX, startY],
//       width: e.clientX - startX,
//       height: e.clientY - startY,
//       color: document.querySelector("#typeColor").value,
//     });
//     context.clearRect(0, 0, canvas.width, canvas.height); // 清空一遍
//     pointCollection.length > 0 && drawerRect(pointCollection); // 画多边形
//     if (textArray.length > 0) {
//       // 绘制文字
//       textArray.map((i) => {
//         const { text, position, fillStyle } = i;
//         drawerText(position[0], position[1], fillStyle, text);
//       });
//     }
//     if (rectArray.length > 0) {
//       rectArray.map((i) => {
//         const { width, height, position, color } = i;
//         drawerFillRect(position[0], position[1], width, height, color);
//       });
//     }
//     console.log(pointCollection, rectArray, textArray)
//     isDrawing = false;
//   }

// });
canvas.addEventListener("dblclick", (e) => {
  if (isDrawing) {
    let type = document.querySelector("#reactType").value;

    if (type == 3) {
      drawerText(
        e.clientX - 23,
        e.clientY - 36,
        document.querySelector("#typeColor").value,
        document.querySelector("#inputText").value
      ); // type: 3 的时候需要文字
      textArray.push({
        text: document.querySelector("#inputText").value,
        position: [e.clientX - 23, e.clientY - 36],
        fillStyle: document.querySelector("#typeColor").value,
      });
    }
    if (type == 1) {
      drawPolygon(points);
      pointCollection.push(points);
      points = [];
    }
    context.clearRect(0, 0, canvas.width, canvas.height); // 清空一遍
    console.log(pointCollection)
    pointCollection.length > 0 && drawerRect(pointCollection); // 画多边形
    if (textArray.length > 0) {
      // 绘制文字
      textArray.map((i) => {
        const { text, position, fillStyle } = i;
        drawerText(position[0], position[1], fillStyle, text);
      });
    }
    // if (rectArray.length > 0) {
    //   rectArray.map((i) => {
    //     const { width, height, position, color } = i;
    //     drawerFillRect(position[0], position[1], width, height, color);
    //   });
    // }
    isDrawing = false;
  }
});

canvas.addEventListener("mouseup", (e) => {
  if (isDrawing) {
  }
});
