;(function(){
    'use strict'
    //Отрисовка идет на канвасе html5, отрисовка идет в контексте
    //Тут создаем canvas и context
    //Renderer занимаеться отрисовкой но что именно отрисовывает знать не должен
    //Инициирует процесс отрисовки( А занимаются отрисовкой Спрайты и тд.)
    class Renderer{
        constructor(args = {}){
            //создаем виртуальный-"Тег которого еще нет на странице"  DOM элемент canvas
            this.canvas = document.createElement('canvas')
            //создаем контекст канваса
            this.context = this.canvas.getContext('2d')

            this.background = args.background || 'black'
            //Применяем к элементу, переданные параметры
            this.canvas.width = args.width || 50
            this.canvas.height = args.height || 50
            //Метод который вызываеться в tick, если не передана в аргументах, вызывает пустую функцию
            // this.update = args.update || (() => {})
        }

        //Возващает  displayObject со всех контейнеров
        // get displayObjects(){
        //     return _getDisplayObjects(this.stage)
        //     function _getDisplayObjects (container, result = []){
        //         for (const displayObject of container.displayObjects){
        //             if(displayObject instanceof GameEngine.Container){
        //                 _getDisplayObjects (displayObject, result)
        //             }
        //             else{
        //                 result.push(displayObject)
        //             }
        //         }
        //         return result
        //     }
        // }
        

        // render(){
        //     //Метод draw принимает и вызывает функцию с Канвасом и Контекстом
        //     this.stage.draw(this.canvas, this.context)
        // }
            //Очищает рисует прямоуголник с заданным цветом
        clear(){
            this.context.fillStyle = this.background
            this.context.beginPath()
            this.context.rect(0,0,this.canvas.width,this.canvas.height)
            this.context.fill()
            
        }
    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Renderer = Renderer
})();