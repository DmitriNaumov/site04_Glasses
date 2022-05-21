let type = "WebGL"
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas"
}
PIXI.utils.sayHello(type)

class ImageLoad {
    constructor($wrapper) {

        this.wrapper = $wrapper;
        this.width = $wrapper.width();
        this.height = $wrapper.height();
        this.src = $wrapper.data('src');
        this.mouseOn = false;
        this.animated = false;


        this.app = new PIXI.Application(this.width, this.height, { transparent: true });
        // this.app.renderer.autoResize = true;
        this.wrapper.append(this.app.view);


        this.container = new PIXI.Container();
        this.app.stage.addChild(this.container);

        this.load(this.startAnimation.bind(this));
    }

    load(afterLoad) {
        let that = this;
        let tmpImg = new Image();
        tmpImg.src = this.src;
        tmpImg.onload = function () {
            afterLoad();
            that.img = tmpImg;
        };

    }



    startAnimation() {
        let that = this;
        console.log(this.img);
        this.bg = PIXI.Sprite.fromImage(that.src);
        this.bg.width = this.width;
        this.bg.height = this.height;
        this.bg.position.x = 0;
        this.bg.position.y = 0;
        this.container.addChild(this.bg);

        this.displacementSprite = PIXI.Sprite.fromImage('img/displacement/displacement.jpg');
        this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
        this.displacementFilter = new PIXI.filters.DisplacementFilter(
            this.displacementSprite
        );
        this.displacementFilter.scale.set(1e4 + Math.random() * 1000);
        this.displacementSprite.scale.set(0.4 + 0.6 * Math.random());

        this.app.stage.addChild(this.displacementSprite);

        this.container.filters = [this.displacementFilter];
        // this.click();
        let tl = new TimelineMax({ onComplete: function () { that.animated = true; } });
        tl.to(that.displacementFilter.scale, 1, { x: 0, y: 0 });
        this.hover();
    }


    click() {
        // let that = this;
        // this.wrapper.on('click',function() {
        // 	let tl = new TimelineMax({onComplete:function() {that.animated = true;}});
        // 	tl.to(that.displacementFilter.scale,1,{x:1,y:1});
        // });
    }
    hover() {
        let that = this;

        this.wrapper.on('mouseenter', function () {
            if (!that.mouseon && that.animated) {
                that.mouseon = true;
                TweenMax.ticker.addEventListener('tick', that.doWaves, that);
                let tl = new TimelineMax();
                tl.to(that.displacementFilter.scale, 0.5, { x: 13, y: 13 });
            }
        });

        this.wrapper.on('mouseleave', function () {
            if (that.mouseon && that.animated) {
                that.mouseon = false;
                TweenMax.ticker.removeEventListener('tick', that.doWaves, that);
                let tl = new TimelineMax();
                tl.to(that.displacementFilter.scale, 0.5, { x: 0, y: 0 });
            }
        });
    }

    doWaves() {
        this.displacementSprite.x += 1;
    }
}

var targets = document.querySelectorAll('.js-loadme');

var options = {
    rootMargin: '-150px',
    threshold: [0, 1]
};

var observer = new IntersectionObserver(items => {
    // console.log(items);
    items.forEach(el => {

        if (el.isIntersecting && el.intersectionRatio > 0) {
            if (!$(el.target).hasClass('is-init')) {
                $(el.target).addClass('is-init');
                new ImageLoad($(el.target));
                console.log('intersected', el.target);
            }
        }
    });
}, options);

for (var i = 0; i < targets.length; i++) {
    observer.observe(targets[i]);
}




// $('body').on('click', function () {
// let tl = new TimelineMax();
// tl.to(displacementFilter.scale, 2, { x: 0, y: 0 });
// });