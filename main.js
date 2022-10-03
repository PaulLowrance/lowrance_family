
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
}

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullText = this.toRotate[i];
    
    if (this.isDeleting) {
        this.txt = fullText.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullText.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = `<span class="typed">`+this.txt+'</span>';
    
    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {delta /= 2;}

    if(!this.isDeleting && this.txt === fullText) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};


window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');

    var statementsPlayed = 0;
    
    if(statementsPlayed !== elements.length) {
    for(var i = 0; i < elements.length; i++) {
        console.log(statementsPlayed);
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if(toRotate && statementsPlayed !== elements.length){
            new TxtType(elements[i], JSON.parse(toRotate), period);
            statementsPlayed++;
        }
    }
}
};