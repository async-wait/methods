(function (window, undefined) {
    class Swiper {
        constructor({autoplay = false, loop = false, el}) {
            this.autoplay = autoplay;
            this.loop = loop;
            this.index = 0;
            this.swiperWp = document.querySelector(el);
            this.init();
        }
        init() {
            let container = document.createElement('ul');
            let li = document.createElement('li');
            container.className = 'container';
            this.container = container;
            this.swiperWp.append(this.container);
        }
    }
    window.Swiper = Swiper;
})(window, undefined);