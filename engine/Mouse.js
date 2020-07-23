;(function(){
    'use strict'

    class Mouse {
        constructor(){
            document.querySelectorAll('canvas')[0].addEventListener('click',function (e){
                console.log(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
            })
        }
    }
        
    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Mouse = Mouse
})();