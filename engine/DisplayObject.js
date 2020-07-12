;(function(){
    'use strict'
    //Это то что надо отобразить( Любая сущность)
    class DisplayObject {
        constructor(args={}){
            //все что есть у DisplayObject (но не точно что все ^_^)
            this.x = args.x || 0
            this.y = args.y || 0

            this.width = args.width || 0
            this.height = args.height || 0
            //поворот
            this.rotation = args.rotation || 0

            this.anchorX = args.anchorX || 0
            this.anchorY = args.anchorY || 0

            this.scaleX = args.scaleX || 1
            this.scaleY = args.scaleY || 1

            this.parent = null
            this.visible = true
            //Проверяет передавался ли skale ( масштаб)
            if (args.scale !== undefined){
                this.setScale(args.scale)
            }
        }
        
        //get и set (геттеры и сеттеры вычисляются на лету, псведо поля)
        //Абсолютные X и Y это точка слева сверху где начинается отрисовка
        get absoluteX (){
            return this.x - this.anchorX * this.width
        }
        set absoluteX(value){
            this.x = value + this.anchorX * this.width
            return value
        }
        get absoluteY (){
            return this.y - this.anchorY * this.height
        }
        set absoluteY(value){
            this.y = value + this.anchorY * this.height
            return value
        }

        setScale (scale){
            this.scaleX = this.scaleY = scale
        }
        setParent (parent){
            if (this.parent && this.parent.remove){
                this.parent.remove(this)
            }
            if (parent && parent.add){
                parent.add(this)
            }
            this.parent = parent
        }
        //Метод отрисовки будет переопределяться для каждыйх дочерних элементов
        draw (callback) {
            if(this.visible){
                callback()
            }
        }

        
    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.DisplayObject = DisplayObject
})();