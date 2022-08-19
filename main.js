/*!
 * Cursor Follower Library v1.0
 * by Ali Ranjbar (https://AliRanjbar.ir) (https://github.com/RanjbarAli)
 *
 * Copyright 2022
 * Released under the MIT licence.
 * https://github.com/RanjbarAli/Cursor-Follower-js
 */
class CursorFollower {
    #properties = {
        elm: 'cursor_follower',
        width: 15,
        height: 15,
        background: '#faca22',
        borderRadius: '50%',
        afterBackground: null,
        afterBorderRadius: null,
        afterScale: 2,
        afterOpacity: 0
    }

    #getCreatedElm = null

    #handleTimeout = null

    get options() {
        return this.#properties
    }

    set options(options) {
        if (options.elm)
            delete options.elm
        this.#properties = {...this.#properties, ...options}
        document.getElementById(`${this.#properties.elm}-stylesheet`).innerText = this.#styles
    }

    position = {
        x: 0,
        y: 0
    }

    get #styles() {
        return `#${this.#properties.elm}{pointer-events:none;z-index:999;width:${this.#properties.width}px;height:${this.#properties.height}px;background:${this.#properties.background};-webkit-border-radius:${this.#properties.borderRadius};-moz-border-radius:${this.#properties.borderRadius};border-radius:${this.#properties.borderRadius};position:fixed;-webkit-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);-o-transform:translate(-50%,-50%);transform:translate(-50%,-50%);-webkit-transition:background .3s,opacity .3s,border-radius .3s,-webkit-transform .3s;-o-transition:background .3s,opacity .3s,border-radius .3s,-o-transform .3s;-moz-transition:background .3s,transform .3s,border-radius .3s,opacity .3s,-moz-transform .3s;transition:background .3s,transform .3s,border-radius .3s,opacity .3s;transition:background .3s,transform .3s,border-radius .3s,opacity .3s,-webkit-transform .3s,-moz-transform .3s,-o-transform .3s}#${this.#properties.elm}.clicked{background:${this.#backgroundOnClicked};-webkit-transform:translate(-50%,-50%) scale(${this.#properties.afterScale});-moz-transform:translate(-50%,-50%) scale(${this.#properties.afterScale});-ms-transform:translate(-50%,-50%) scale(${this.#properties.afterScale});-o-transform:translate(-50%,-50%) scale(${this.#properties.afterScale});transform:translate(-50%,-50%) scale(${this.#properties.afterScale});opacity:${this.#properties.afterOpacity};-webkit-border-radius:${this.#borderRadiusOnClicked};-moz-border-radius:${this.#borderRadiusOnClicked};border-radius:${this.#borderRadiusOnClicked};}`
    }

    #setPosition() {
        this.#getCreatedElm.style.top = this.position.y + "px"
        this.#getCreatedElm.style.left = this.position.x + "px"
    }

    get #borderRadiusOnClicked() {
        return this.#properties.afterBorderRadius ?? this.#properties.borderRadius
    }

    get #backgroundOnClicked() {
        return this.#properties.afterBackground ?? this.#properties.background
    }

    constructor(options = {}) {
        this.#properties = {...this.#properties, ...options}
        let createdElement = document.createElement('div')
        createdElement.id = this.#properties.elm
        document.body.prepend(createdElement)

        this.#getCreatedElm = document.getElementById(this.#properties.elm)

        let createdStylesheet = document.createElement("style"),
            _this = this
        createdStylesheet.id = `${this.#properties.elm}-stylesheet`
        createdStylesheet.innerText = this.#styles
        document.head.appendChild(createdStylesheet)

        document.addEventListener('mousemove', function(event) {
            _this.position = {
                x: event.clientX,
                y: event.clientY
            }
            _this.#setPosition()
        })
        document.addEventListener('click', function(){
            _this.#getCreatedElm.classList.add('clicked')
            clearTimeout(_this.#handleTimeout)
            _this.#handleTimeout = setTimeout(function(){
                _this.#getCreatedElm.classList.remove('clicked')
            }, 300)
        })
    }

    onclick(callback) {
        document.addEventListener('click', () => callback(this))
    }
}