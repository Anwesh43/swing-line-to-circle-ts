import { ContextReplacementPlugin } from "webpack"

const w : number = window.innerWidth 
const h : number = window.innerHeight 
const strokeFactor : number = 90 
const sizeFactor : number = 12.9
const parts : number = 5
const delay : number = 20 
const backColor : string = "#BDBDBD"
const scGap : number = 0.02 / parts 
const lSizeFactor : number = 3.2
const colors : Array<string> = [
    "#3F51B5",
    "#F44336",
    "#4CAF50",
    "#FF5722",
    "#009688"
]

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }

    static sinify(scale : number) : number {
        return Math.sin(scale * Math.PI)
    }
}

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawCircle(context : CanvasRenderingContext2D, x : number, y : number, r : number) {
        context.beginPath()
        context.arc(x, y, r, 0, 2 * Math.PI)
        context.fill()
    }

    static drawSwingLineCircle(context : CanvasRenderingContext2D, scale : number) {
        const r : number = Math.min(w, h) / sizeFactor 
        const size : number = Math.min(w, h) / lSizeFactor 
        const sf : number = ScaleUtil.sinify(scale)
        context.save()
        context.translate(w / 2, h / 2)
        for (var j = 0; j < 2; j++) {
            const lx : number = size * ScaleUtil.divideScale(sf, 1, parts)
            context.save()
            context.scale(1 - 2 * j, 1)
            context.translate(w / 2 - r, -h / 2 + r)
            context.rotate(ScaleUtil.divideScale(sf, 2, parts) * Math.PI / 4)
            DrawingUtil.drawLine(context, 0, 0, -lx, lx)
            DrawingUtil.drawCircle(context, size, size, r * ScaleUtil.divideScale(sf, 0, parts))
            context.restore()
        }
        context.restore()
    }

    static drawSLCNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor 
        context.strokeStyle = colors[i]
        context.fillStyle = colors[i]
        DrawingUtil.drawSwingLineCircle(context, scale)
    }
}
