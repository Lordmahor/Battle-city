;(function(){
    'use strict'

    class Keyboard {
        constructor(){
            const keyboard = this
            this.arrowUp = false
            this.arrowDown = false
            this.arrowLeft = false
            this.arrowRight = false
            this.space = false
            document.body.addEventListener('keydown',function (event){
                switch (event.code){
                    case 'Space':
                        keyboard.space = true
                        break
                    case 'ArrowUp':
                        keyboard.arrowUp = true
                        break
                    case 'ArrowDown':
                        keyboard.arrowDown = true
                        break
                    case 'ArrowLeft':
                        keyboard.arrowLeft = true
                        break
                    case 'ArrowRight':
                        keyboard.arrowRight = true
                        break
                }
            })
            document.body.addEventListener('keyup',function (event){
                switch (event.code){
                    case 'Space':
                        keyboard.space = false
                        break
                    case 'ArrowUp':
                        keyboard.arrowUp = false
                        break
                    case 'ArrowDown':
                        keyboard.arrowDown = false
                        break
                    case 'ArrowLeft':
                        keyboard.arrowLeft = false
                        break
                    case 'ArrowRight':
                        keyboard.arrowRight = false
                        break
                }
            })

        }
        

        
    }
        
    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Keyboard = Keyboard
})();