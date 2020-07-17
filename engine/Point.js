;(function(){
    'use strict'

    class Point extends GameEngine.DisplayObject{
        constructor(args = {}){
            super(args)
            this.color = args.color || "white"
        }
        draw (canvas, context){
            super.draw(()=>{
                context.fillStyle = this.color
                context.beginPath()
                context.arc(this.x,this.y,10,0,Math.PI*2)
                context.fill()

            })
        }
    }
        
    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Point = Point
})();