$( document ).ready(function(){
	//setTimeout(function(){
		$('.top').addClass('show');
	//}, 1000);
	canvas();
	scroll();
})
function scroll(){
	var lastScrollTop = 0;

	var scroll = {
        direct: "",
        cs: 0,
        ls: 0,
        csb: $(window).height()
    };

	$(window).scroll(function(a) {
        scroll.cs = $(this).scrollTop();
        scroll.csb = scroll.cs + $(window).height(); 

        if(scroll.cs > scroll.ls){
        	scroll.direct = "down";
        	$(".scroll-event").not(".show").each(function() {
            	if($(this).offset().top  < scroll.csb -100) {
            		console.log($(this).offset().top, scroll.csb);
            		$(this).addClass("show");
            	} 
            	
        	});
        }
        else {
        	scroll.direct = "up"; 
        	$(".scroll-event.show").each(function() {
            	if($(this).offset().top  > scroll.csb -100) {
            		$(this).removeClass("show");
            	}
    		});
        }
        scroll.ls = scroll.cs;
    })
}

function canvas(){

	var canvas = document.getElementById('bgCanvas');
	var ctx = canvas.getContext('2d');
	var particles = [];
	var particleCount = 300;

	for(var i=0; i<particleCount;i++)
	  particles.push(new particle());

	function particle() {
	  this.x = Math.random() * canvas.width;
	  this.y = canvas.height + Math.random() * 300;
	  this.speed = 0.3 + Math.random()/5;
	  this.radius = Math.random()*3;
	  this.opacity = (Math.random() * 100) / 1000;
	}


	function loop() {
	  requestAnimationFrame(loop);
	  draw();
	}

	function draw() {
	  ctx.clearRect(0,0,canvas.width,canvas.height);
	  
	  ctx.globalCompositeOperation = 'lighter';
	  for(var i=0; i<particles.length; i++) {
	    var p = particles[i];
	    ctx.beginPath();
	    ctx.fillStyle = 'rgba(255,255,255,' + p.opacity + ')';
	    ctx.arc(p.x, p.y, p.radius, 0, Math.PI*2, false);
	    ctx.fill();
	    p.y -= p.speed;
	    if(p.y <= -10)
	      particles[i] = new particle();
	  }
	}

	loop();
}