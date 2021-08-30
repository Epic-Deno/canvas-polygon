const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")
const COLOR = "#1890ff"
const LINEWIDTH = 2
const DOTRADIUS = 3
const textArray = new Array();
let startX = 0;
let startY = 0;

// context.fillStyle = "#FF0000"; 　
// context.fillRect(50,50,150,100); 
context.fillStyle = COLOR
context.strokeStyle = COLOR
context.lineWidth = LINEWIDTH

function windowToCanvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
    return {
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
    };
}

function drawDot(loc) {
    context.beginPath()
    context.arc(loc.x, loc.y, DOTRADIUS * 2, 0, 2 * Math.PI);
    context.fill()
}

function drawLine(locStart, locEnd) {
    context.beginPath()
    context.moveTo(locStart.x, locStart.y);
    context.lineTo(locEnd.x, locEnd.y);
    context.stroke();
}


function drawPolygon(points) {

    context.clearRect(0, 0, canvas.width, canvas.height);
    const length = points.length
    for (let i = 0; i < parseInt(length / 2); i++) {
        // drawDot(points[i * 2])
        drawLine(points[i * 2], points[i * 2 + 1])
    }
    if (points.length % 2 === 1) {
        // drawDot(points[length - 1])
    }
    if (points.length > 2) {
        console.log("close")
        drawLine(points[length - 1], points[0])
    }
}

function drawerRect(pointCollenction) {
    pointCollenction.map(i => {
         let firstPoint = i[0]
         context.moveTo(firstPoint.x, firstPoint.y)
         i.map((item, index) => {
            if (index > 0) {
                context.lineTo(item.x, item.y);
            }
         })
         context.fillStyle="#89c5fd75";
         context.fill(); 
    })
     
}
// todo
function drawerFillRect(x, y, width, height) {
    // context.fillStyle = "rgba(0,255,0,0.2)";
    context.strokeStyle = document.querySelector('#typeColor').value;        
    // context.fillRect(20, 260, 60, 60);        //变浅的红色填充矩形
    context.lineWidth = 2;        //设置边框线框，0.2的透明度不易观察
    context.strokeRect(x, y, width, height);    //变浅的红色边框矩形
}

function drawerText(x, y) {
    context.font = "15px Arial bolder"
    context.fillStyle = document.querySelector('#typeColor').value
    context.fillText(document.querySelector('#inputText').value ,x ,y)
}

let points = []
let isDrawing = false
let isPointAdd = false
let pointCollenction = []
canvas.addEventListener("mousedown", e => {
    const loc = windowToCanvas(canvas, e.clientX, e.clientY)
    // points.push(loc)
    // drawPolygon(points)
    let type = document.querySelector('#reactType').value
    // type == 3 && ()
   
    isDrawing = true
    isPointAdd = true
})

canvas.addEventListener("mousemove", e => {
    if (isDrawing) {
        const loc = windowToCanvas(canvas, e.clientX, e.clientY)
        console.log(document.querySelector('#reactType').value)
        // if (!isPointAdd) {
        //     points.pop()
        // }
        // points.push(loc)
        // isPointAdd = false
        // drawPolygon(points)
    }
})

canvas.addEventListener("dblclick", e => {
    if (isDrawing) {
        let type = document.querySelector('#reactType').value

        if (type == 3) {
            drawerText(e.clientX - 23, e.clientY - 36) // type: 3 的时候需要文字
            textArray.push({
                text: document.querySelector('#inputText').value,
                position: [e.clientX - 23, e.clientY - 36],
                fillStyle: document.querySelector('#typeColor').value
            })
        }
        // drawPolygon(points)
        // pointCollenction.push(points)
        // points = []
        // console.table(pointCollenction)
        // drawerRect(pointCollenction)
        // isDrawing = false
    }
})

canvas.addEventListener("mouseup", e => {
    if (isDrawing) {

    }
})


