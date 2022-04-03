// DISABLE MENU
function disablemenu() {
  $('.movablemenu').css('overflow', 'hidden');
  $('.movablemenu').addClass('draggable');
  $('.mtriggers').removeClass('active');
}

// CLICKED ON MENU FUNCTION
$('.movablemenu').on('click', function(e) {
  menuclicktimeout();
  $('.movablemenu').removeClass('draggable');
  // dont show menu when menu is dragged
  if($('.movablemenu').hasClass('dragged')) {
    disablemenu();   
  }
  // show menu if not dragged
  else{
    $('.movablemenu').css('overflow', 'visible');
    $('.mtriggers').addClass('active'); 
    $('.movablemenu').removeClass('draggable');
  }
});


// START OF FUNCTION FOR DRAGGIN THE MENU ARROUND

interact('.draggable').draggable({
  // enable inertial throwing
  inertia: true,
  // keep the element within the area of it's parent
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: 'none',
      endOnly: true
    })
  ],
  // enable autoScroll
  autoScroll: false,
  listeners: {
    // call this function on every dragmove event
    move: dragMoveListener,
    // call this function on every dragend event
    end (event) {
      setTimeout(function () {
        $('.movablemenu').removeClass('dragged');
      }, 500);
    }
  }
})
.on('dragmove', function (event) {
  $('.movablemenu').addClass('dragged');
  repositiondots();
});


function dragMoveListener (event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;


// MENU ANIMATIONS
function triggerevents() {
  var tcontainer = document.querySelector(".home");
  var tcp = tcontainer.getBoundingClientRect();

  var bgtrigger=document.querySelector(".btrigger");
  var btp = bgtrigger.getBoundingClientRect();
  var bd = Math.round(btp.top-tcp.bottom);

  var whattrigger=document.querySelector(".wtrigger");
  var wtp = whattrigger.getBoundingClientRect();
  var wd = Math.round(wtp.top-tcp.bottom);

  var visiontrigger=document.querySelector(".vtrigger");
  var vtp = visiontrigger.getBoundingClientRect();
  var vd = Math.round(vtp.top-tcp.bottom);

  var projecttrigger=document.querySelector(".ptrigger");
  var ptp = projecttrigger.getBoundingClientRect();
  var pd = Math.round(ptp.top-tcp.bottom);

  var contacttrigger=document.querySelector(".ctrigger");
  var ctp = contacttrigger.getBoundingClientRect();
  var cd = Math.round(ctp.top-tcp.bottom);

  var mholder = document.querySelector('.menuholder');

  if (bd>-20) {
    $('.movablemenu').css('opacity', '1');
    mholder.classList.remove("bgon","won","von","pon","con");
    $(".menu").each(function () {
      this.classList.remove('active','stage1','stage2','stage3', 'stage4', 'stage5');
    });
    $('#home').addClass('active');    
    $('#background'). addClass('stage1');
    $('#what').addClass('stage2');
    $('#vision').addClass('stage3');
    $('#project').addClass('stage4');
    $('#contact').addClass('stage5');
  }

  if (bd<=-20) {
    $('.movablemenu').css('opacity', '1');
    mholder.classList.remove("bgon","won","von","pon","con");
    $('.menuholder').addClass("bgon")
    $(".menu").each(function () {
      this.classList.remove('active','stage1','stage2','stage3', 'stage4', 'stage5');
    });
    $('#home').addClass('stage1');    
    $('#background'). addClass('active');
    $('#what').addClass('stage1');
    $('#vision').addClass('stage2');
    $('#project').addClass('stage3');
    $('#contact').addClass('stage3');
  }

  if (wd<=-20) {
    $('.movablemenu').css('opacity', '1');
    mholder.classList.remove("bgon","won","von","pon","con");
    $('.menuholder').addClass("won")
    $(".menu").each(function () {
      this.classList.remove('active','stage1','stage2','stage3', 'stage4', 'stage5');
    });
    $('#home').addClass('stage2');    
    $('#background').addClass('stage1');
    $('#what').addClass('active');
    $('#vision').addClass('stage1');
    $('#project').addClass('stage2');
    $('#contact').addClass('stage3');
  }

  if (vd<=-20) {
    mholder.classList.remove("bgon","won","von","pon","con");
    $('.menuholder').addClass("von")
    $(".menu").each(function () {
      this.classList.remove('active','stage1','stage2','stage3', 'stage4', 'stage5');
    });
    $('#home').addClass('stage3');    
    $('#background'). addClass('stage2');
    $('#what').addClass('stage1');
    $('#vision').addClass('active');  
    $('#project').addClass('stage1');
    $('#contact').addClass('stage2');
  }

  if (pd<=-20) {
    $('.movablemenu').css('opacity', '1');
    mholder.classList.remove("bgon","won","von","pon","con");
    $('.menuholder').addClass("pon")
    $(".menu").each(function () {
      this.classList.remove('active','stage1','stage2','stage3', 'stage4', 'stage5');
    });
    $('#home').addClass('stage4');    
    $('#background'). addClass('stage3');
    $('#what').addClass('stage2');
    $('#vision').addClass('stage1');
    $('#project').addClass('active');
    $('#contact').addClass('stage1');
  }  

  if (cd<=-20){
    $('.movablemenu').css('opacity', '1');
    mholder.classList.remove("bgon","won","von","pon","con");
    $('.menuholder').addClass("con")
    $(".menu").each(function () {
      this.classList.remove('active','stage1','stage2','stage3', 'stage4', 'stage5');
    });
    $('#home').addClass('stage5');    
    $('#background'). addClass('stage4');
    $('#what').addClass('stage3');
    $('#vision').addClass('stage2');
    $('#project').addClass('stage1');
    $('#contact').addClass('active'); 
  }
}


// SWIPER
var scrolltimevar;

function menuscrolltimeout() {
  scrolltimevar = setTimeout(function(){
    $(".mtriggers").removeClass('active'); 
    activatesection();
    resetswiperslides()
    disablemenu();
  }, 1200);
}

function menuclicktimeout() {
  scrolltimevar = setTimeout(function(){
    $(".mtriggers").removeClass('active'); 
    disablemenu();
  }, 2000);
}

function menutimeoutrest() {
  clearTimeout(scrolltimevar);
}

function initiateswiper() {
  var menuswiper = new Swiper("#mswiper", {
    direction: "vertical",
    slidesPerView: 12,
    spaceBetween: 0,
    effect: 'slide',
    speed: 100,
    preventClicks:false,
    fadeEffect: {
      crossFade: false,
    },
    mousewheel: {
      thresholdDelta: 5,
    },
    pagination: false,
    on: {      
      setTranslate:function(){
        menutimeoutrest();
        triggerevents();
      },
      setTransition:function(){
        menutimeoutrest();
        triggerevents();
      },
      transitionEnd:function () {
        menuscrolltimeout();      
      },
      init: function () {
      },
    }
  });

  var backgroundswiper = new Swiper("#bgswiper", {
    direction: "horizontal",
    slidesPerView: 1,
    spaceBetween: 0,
    effect: 'slide',
    speed: 1500,
    noSwiping: true,
    noSwipingClass:"disableswipe",
    fadeEffect: {
      crossFade: true,
    },
    mousewheel: {
      thresholdDelta: 5,
    },
    pagination: {
      el: "#bgdots",
      clickable: true,
      clickableClass:".bgdots",
    },
    on: {
      setTranslate:function(){
      },
      setTransition:function(){    
      },
      transitionEnd:function () { 
        bgsectionanaimations()
      },
    }   
  });

  var whatswiper = new Swiper("#wswiper", {
    direction: "horizontal",
    slidesPerView: 1,
    spaceBetween: 0,
    effect: 'slide',
    speed: 1500,
    noSwiping: true,
    noSwipingClass:"disableswipe",
    fadeEffect: {
      crossFade: true,
    },
    mousewheel: {
      thresholdDelta: 10,
    },
    pagination: {
      el: "#wdots",
      clickable: true,
      clickableClass:".wdots",
    },
    on: {
      setTranslate:function(){
      },
      setTransition:function(){    
      },
      transitionEnd:function () { 
        wssectionanaimations()
      },
    }
  });

  var visionswiper = new Swiper("#vswiper", {
    direction: "horizontal",
    slidesPerView: 1,
    spaceBetween: 0,
    effect: 'slide',
    speed: 1500,
    noSwiping: true,
    noSwipingClass:"disableswipe",
    fadeEffect: {
      crossFade: true,
    },
    mousewheel: {
      thresholdDelta: 10,
    },
    pagination: {
      el: "#vdots",
      clickable: true,
      clickableClass:".vdots",
    },
    on: {
      setTranslate:function(){
      },
      setTransition:function(){    
      },
      transitionEnd:function () { 
        vssectionanaimations()
      },
    }
  });
  if(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    var slidePerPage = 1;
  }else{
    var slidePerPage = 3;
  }
  var projectswiper = new Swiper("#pswiper", {
    direction: "horizontal",
    slidesPerView: slidePerPage,
    spaceBetween: 25,
    effect: 'slide',
    speed: 1500,
    noSwiping: true,
    noSwipingClass:"disableswipe",
    fadeEffect: {
      crossFade: true,
    },
    mousewheel: {
      thresholdDelta: 10,
    },
    pagination: false,
    on: {
      init: function () {
      },
    }   
  });

  var contactswiper = new Swiper("#cswiper", {
    direction: "horizontal",
    slidesPerView: 1,
    spaceBetween: 20,
    effect: 'slide',
    speed: 1500,
    noSwiping: true,
    noSwipingClass:"disableswipe",
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    fadeEffect: {
      crossFade: true,
    },
    mousewheel: {
      thresholdDelta: 10,
    },
    pagination: false,
    on: {
      init: function () {
      },
    }   
  });
}

function resetswiperslides() {
  var backgroundswiper = document.querySelector('#bgswiper').swiper;
  backgroundswiper.slideTo(0, 300, false);

  var whatswiper = document.querySelector('#wswiper').swiper;
  whatswiper.slideTo(0, 300, false);

  var visionswiper = document.querySelector('#vswiper').swiper;
  visionswiper.slideTo(0, 300, false);

  var projectswiper = document.querySelector('#pswiper').swiper;
  projectswiper.slideTo(0, 300, false);

  var contactswiper = document.querySelector('#cswiper').swiper;
  contactswiper.slideTo(0, 300, false);
}

function checkEmail() {
  var email = document.getElementById('email').value;
  if( email.length > 0 )
  {
    var filter = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.toLowerCase().match(filter)) {
        $('.validation-error').removeClass('hide').addClass('show');
    }
    else{
      $('.validation-error').removeClass('show').addClass('hide');
    }
  }
  else{
    $('.validation-error').removeClass('show').addClass('hide');
  }
}

function activatesection() {
  loadhomesection();
  loadbgsection();
  loadwhatsection();
  loadvisionsection();
  loadprojectsection();
  loadcontactsection();
}

function repositiondots() {
  var borderbox = document.querySelector(".menuborder");
  var borderposition = borderbox.getBoundingClientRect();
  $(".dots").each(function () {
    $(this).css('top',(borderposition.top+22)+'px');
    $(this).css('left',(borderposition.right)+'px');
  });
}

function loadhomesection() {
  if ($("#home").hasClass('active')) {
    $('.movablemenu').css('opacity', '1');
    $(".home").addClass("active");
    setTimeout(function () {
      menuwhite();  
    }, 500); 
  } 
  else {
    $("#bgdots").removeClass("active");
    $(".home").removeClass("active");
  }
}

function loadbgsection() {
  if ($("#background").hasClass('active')) {
    $('.movablemenu').css('opacity', '1');
    $(".bgsection").addClass("active"); 
    $(".bgs1").addClass('active');
    menublack() ;
    $("#bgdots").addClass("active"); 
    var backgroundswiper2 = document.querySelector('#bgswiper').swiper;
    backgroundswiper2.mousewheel.disable();
    bgs1timeline();
    bgs1keyframes.restart();
    setTimeout(function () {
      $(".bgt1").removeClass('disableswipe');
      backgroundswiper2.mousewheel.enable();
    }, bgs1timeout);
  } 
  else {
    bgsectionremoveactiveclass();
    $("#bgdots").removeClass("active");
    $(".bgsection").removeClass("active");
    $(".bgt1").addClass('disableswipe');
    bgs1keyframes.pause(0);
    bgs1keyframes.clear();
    bgs2keyframes.pause();
    bgs3keyframes.pause();
    bgs4keyframes.pause();
    setTimeout(function () {
      bgtimelinereset();
    }, 500);
    menuwhite();
  }
}

function loadwhatsection() {
  if ($("#what").hasClass('active')) {
    $('.movablemenu').css('opacity', '1');
    $(".whatsection").addClass("active"); 
    $(".ws1").addClass('active');
    menuwhite();
    $("#wdots").addClass("active"); 
    var wsswiper2 = document.querySelector('#wswiper').swiper;
    // wsswiper2.mousewheel.disable();
    wss1timeline();
    wss1keyframes.restart();
    setTimeout(function () {
      $(".wt1").removeClass('disableswipe');
      // wsswiper2.mousewheel.enable();
    }, wss1timeout);
  } 
  else {
    wssectionremoveactiveclass();
    $("#wdots").removeClass("active");
    $(".whatsection").removeClass("active");
    $(".wt1").addClass('disableswipe');
    wss1keyframes.pause(0);
    wss1keyframes.clear();
    wss2keyframes.pause();
    wss3keyframes.pause();
    wss4keyframes.pause();
    setTimeout(function () {
      wstimelinereset();
    }, 500);
    menuwhite();
  }
}

function loadvisionsection() {
  if ($("#vision").hasClass('active')) { 
    $('.logo').css('opacity', '0');
    $(".visionsection").addClass("active"); 
    $(".vs1").addClass('active');
    menuwhite();
    $("#vdots").addClass("active"); 
    var vsswiper2 = document.querySelector('#vswiper').swiper;
    // vsswiper2.mousewheel.disable();
    vss1timeline();
    vss1keyframes.restart();
    setTimeout(function () {
      $(".vt1").removeClass('disableswipe');
      // vsswiper2.mousewheel.enable();
    }, vss1timeout);     
  } 
  else {
    $('.logo').css('opacity', '1');
    vssectionremoveactiveclass();
    $("#vdots").removeClass("active");
    $(".visionsection").removeClass("active");
    $(".vt1").addClass('disableswipe');
    vss1keyframes.pause(0);
    vss1keyframes.clear();
    vss2keyframes.pause();
    setTimeout(function () {
      vstimelinereset();
    }, 500);
    menuwhite();
    $('.movablemenu').css('opacity', '1');
    $('.logo').css('opacity', '1');
  }
}

function loadprojectsection() {
  menuwhite();
  $('.swiper-container.pswiper').css('width', '100%');
  if ($("#project").hasClass('active')) {
    menuwhite();
    $('.movablemenu').css('opacity', '1');
    $("#pdots").addClass("active");
    $(".projectsection").addClass("active");   
    var projectswiper3 = document.querySelector('#pswiper').swiper;
    projectswiper3.update();
    $('.swiper-container.pswiper').css('width', '88%');
  } 
  else {
    $("#pdots").removeClass("active");
    $(".projectsection").removeClass("active");
    $(".projectdetailssection").removeClass("active");
    $(".projectdetailssection page").removeClass("active");
    // $(".project").each(function () {
    //   this.classList.remove('hide');
    // });
    $("[data-filter]").removeClass("non-swiper-slide").addClass("swiper-slide").show();
    var projectswiper3 = document.querySelector('#pswiper').swiper;
    projectswiper3.update();
  }
}
var ckeyframes = gsap.timeline({ delay: 0 });
function loadcontactsection() {
  menuwhite();
  if ($("#contact").hasClass('active')) {
    menuwhite();
    $('.movablemenu').css('opacity', '1');
    $("#cdots").addClass("active");
    $(".contactsection").addClass("active");
    setTimeout( function(){
      var ckeyframes2 = gsap.timeline({ delay: 0 });
      ckeyframes2
      .to(".swiper-container.cswiper .box-contact", { duration: 1, opacity: 1, ease: "none" })
      .to(".swiper-container.cswiper .swiper-button-next", { duration: 1, opacity: 1, ease: "none" })
      .to(".swiper-container.cswiper .swiper-button-prev", { duration: 1, opacity: 1, ease: "none" });
      var contactswiper3 = document.querySelector('#cswiper').swiper;
      contactswiper3.update();
    }, 3000);   
  } 
  else {
    $("#cdots").removeClass("active");
    $(".contactsection").removeClass("active");
  }
}
$('#submit').on('click', function(e){
  $('.email-form').removeClass('show').addClass('hide');
  $('.email-form-success').removeClass('hide').addClass('show');
  ckeyframes.to(".email-form-success", { duration: 1, opacity: 1, ease: "none" });
});
// $('.tabweb').on('click', function(e){
//   $(".project").each(function () {
//     this.classList.remove('hide');
//   });
//   $(".app").each(function () {
//     this.classList.add('hide');
//   });

//   var projectswiper2 = document.querySelector('#pswiper').swiper;
//   projectswiper2.update();
// });

// $('.tabapp').on('click', function(e){
//   $(".project").each(function () {
//     this.classList.remove('hide');
//   });
//   $(".web").each(function () {
//     this.classList.add('hide');
//   });
//   var projectswiper2 = document.querySelector('#pswiper').swiper;
//   projectswiper2.update();
// });

// $('.taball').on('click', function(e){
//   $(".project").each(function () {
//     this.classList.remove('hide');
//   });
//   var projectswiper2 = document.querySelector('#pswiper').swiper;
//   projectswiper2.update();
// });
$(".projecttab h4").on("click", function(){
  var filter = $(this).html().toLowerCase();
  $(".projecttab h4").removeClass("active");
  $(this).addClass("active");
  
  if(filter=="all")
  {
    $("[data-filter]").removeClass("non-swiper-slide").addClass("swiper-slide").show();
  }
  else {
    $(".swiper-slide").not("[data-filter='"+filter+"']").addClass("non-swiper-slide").removeClass("swiper-slide").hide();
      $("[data-filter='"+filter+"']").removeClass("non-swiper-slide").addClass("swiper-slide").attr("style", null).show();
  }
  $('.swiper-container.pswiper').css('width', '100%');
  var projectswiper2 = document.querySelector('#pswiper').swiper;
  projectswiper2.update();
  $('.swiper-container.pswiper').css('width', '88%');
})

$(".project-item").on("click", function(){
  $('.projectsection').removeClass('active');
  $('.projectdetailssection').addClass('active');
  var pageId = $(this).attr('data-id');
  $('.page').removeClass('active');
  $('#page-'+pageId).addClass('active');
  console.log(pageId);
  // if(filter=="all")
  // {
  //   $("[data-filter]").removeClass("non-swiper-slide").addClass("swiper-slide").show();
  // }
  // else {
  //   $(".swiper-slide").not("[data-filter='"+filter+"']").addClass("non-swiper-slide").removeClass("swiper-slide").hide();
  //     $("[data-filter='"+filter+"']").removeClass("non-swiper-slide").addClass("swiper-slide").attr("style", null).show();
  // }
  // $('.swiper-container.pswiper').css('width', '100%');
  // var projectswiper2 = document.querySelector('#pswiper').swiper;
  // projectswiper2.update();
  // $('.swiper-container.pswiper').css('width', '88%');
})



function menublack() {
  $(".logowhite").removeClass("active");
  $(".logoblack").addClass("active");
  $(".menu").addClass("black");
  $(".menuborder").addClass("black"); 
}

function menuwhite() {
  $(".logowhite").addClass("active");
  $(".logoblack").removeClass("active");
  $(".menu").removeClass("black");
  $(".menuborder").removeClass("black"); 
}

function bgsectionremoveactiveclass() {
  $(".bgs1").removeClass('active');
  $(".bgs2").removeClass('active');
  $(".bgs3").removeClass('active');
  $(".bgs4").removeClass('active');
  $(".bgt1").addClass('disableswipe');
  $(".bgt2").addClass('disableswipe');
  $(".bgt3").addClass('disableswipe');
}

function wssectionremoveactiveclass() {
  $(".ws1").removeClass('active');
  $(".ws2").removeClass('active');
  $(".ws3").removeClass('active');
  $(".ws4").removeClass('active');
  // $(".ws1").addClass('disableswipe');
  // $(".ws2").addClass('disableswipe');
  // $(".ws3").addClass('disableswipe');
}


function vssectionremoveactiveclass() {
  $(".vs1").removeClass('active');
  $(".vs2").removeClass('active');
  // $(".vs1").addClass('disableswipe');
  // $(".vs2").addClass('disableswipe');
}

gsap.registerPlugin(CustomEase);
gsap.registerPlugin(DrawSVGPlugin);
CustomEase.create("human3", "M0,0 C0.11,0.494 0.221,0.703 0.37,0.852 0.506,0.988 0.73,0.988 1,1 ");
CustomEase.create("hbounce", "M0,0c0.14,0,0.28,0.44,0.31,0.56c0.04,0.17,0.09,0.44,0.09,0.44s0.09-0.26,0.23-0.19c0.09,0.04,0.11,0.17,0.12,0.19c0.06-0.08,0.19-0.11,0.25,0");
CustomEase.create( "textfadev2", "M0,0,C0,0,0.718,0,0.9,0.496,0.98,0.716,1,1,1,1 ");

var bgs1line = document.querySelector(".bgs1linecontainer");
var bgs1linevar = bgs1line.getBoundingClientRect();
bgs1linetime = 2.2;
if (bgs1linevar.width <= 250) {
  overlap = "-=" + 0.96785;
} else {
  overlap = "-=" + bgs1linetime * 0.9125;
}
var bgs1timeout=(bgs1linetime+2.25)*1000
var bgs1keyframes = gsap.timeline({ delay: 3.25 });
function bgs1timeline() {
  $('.movablemenu').css('opacity', '1');
  bgs1keyframes
  .to(".bgs1img", { duration: 1.75, y: "-1%", ease: "hbounce" })
  .to(".bgs1line",{ duration: bgs1linetime, width: "100%", ease: "none" }, .75)
  .to(".bgs1heading", { duration: 1.5, y: "0%", ease: "human3" }, overlap)
  .to(".bgs1heading", { duration: 1.5, opacity: 1, ease: "textfadev2" }, overlap);
}

function bgtimelinereset() {
  bgs2keyframes.reverse(-10);
  bgs3keyframes.reverse(-10);
  bgs4keyframes.reverse(-10);
  resetcircles();
}

var bgs2line = document.querySelector(".bgs2linecontainer");
var bgs2linevar = bgs2line.getBoundingClientRect();
    bgs2linetime = bgs2linevar.width / 400;
    bgs2timeout=bgs2linetime*1000
var bgs2keyframes = gsap.timeline({ delay: 0});
function bgs2timeline() {
  $('.movablemenu').css('opacity', '1');
  var bgs2text1 = document.querySelector(".bgs2text1");
      bgs2text1var = bgs2text1.getBoundingClientRect();
      bgs2textlefttime = (bgs2text1var.left)/250;
      bgs2textdelay = "-=" + (bgs2linetime - bgs2textlefttime)
      bgs2text2delay = "-=" + ((bgs2linetime - bgs2textlefttime)-.5)
      bgs2imgdelay = "-=" + (3*.95)
      bgs2keyframes
      .to(".bgs2line",{ duration: 3, width: "100%", ease: "none" })
      .to(".bgs2img", { duration: 1.75, opacity: 1, ease: "textfadev2" }, bgs2imgdelay)
      .to(".bgs2text1", { duration: 1.8, y: "0%", ease: "human3" }, 1.2)
      .to(".bgs2text1", { duration: 1.8, opacity: 1, ease: "textfadev2" }, 1.3)
      .to(".bgs2text2", { duration: 1.5, y: "0%", ease: "human3" }, 1.2)
      .to(".bgs2text2", { duration: 1.5, opacity: 1, ease: "textfadev2" }, 1.2);   
      // console.log(bgs2linevar.width, bgs2text1var.left, bgs2linetime, bgs2textlefttime, bgs2textdelay, bgs2text2delay)
}

var bgs3line = document.querySelector(".bgs3lineleft");
var bgs3linevar = bgs3line.getBoundingClientRect();
    bgs3linetime = bgs3linevar.width / 250;
    bgs3timeout = bgs3linetime*2000
    bgs3imgdelay = "-=" + (bgs3linetime*.95)
    bgs3keyframes = gsap.timeline({ delay: 0 });
    bgs3textholder = document.querySelector(".bgs3textcontainer");
    bgs3textvar = bgs3textholder.getBoundingClientRect();
    bgs3textvarwidth = bgs3textvar.width;
    bgs3tvw = bgs3textvarwidth+"px";
    bgs3textvarheight = bgs3textvar.height;
    bgs3tvh = bgs3textvarheight+"px";
    console.log( bgs3tvw,bgs3tvh);

function bgs3timeline() {   
  $('.movablemenu').css('opacity', '1');
  var bgs3text = document.querySelector(".bgs3textblock");
      bgs3textvar = bgs3text.getBoundingClientRect();
      bgs3texttime = bgs3textvar.width / 250;
      bgs3textoverlap="-=" + (bgs3texttime/2);
      bgs3keyframes
      .to(".bgs3line1",{ duration: 1, width: "100%", ease: "none" })
      .to(".bgs2corners",{ duration: .8, width: "100px", ease: "human3" },"-=1.25")
      .to(".bgs3textblock",{ duration: .8, width: bgs3tvw, ease: "human3" })
      .to(".bgs3textblock",{ duration: .8, height: bgs3tvh, ease: "human3" },"-=.8")
      .to(".bgs3textcontainer",{ duration: .75, opacity: "1", ease: "textfadev2" }, 2)
      .to(".bgs3img", { duration: 1.75, opacity: 1, ease: "textfadev2" },"-=2.6")
      // .to(".bgs2corners",{ duration: 1.5, width: "100px", ease: "human3" })
      // .to(".bgs2corners",{ duration: 1.5, height: "100px", ease: "human3" },"-=1.5")
      .to(".bgs3line3",{ duration: 1, width: "100%", ease: "none" },"-=1.25")      
}


var bgs4keyframes = gsap.timeline({ delay: 0 });
function bgs4timeline() {
  $('.movablemenu').css('opacity', '1');
  var bgs4line = document.querySelector(".bgs4linecontainer");
  var bgs4linevar = bgs4line.getBoundingClientRect();
      bgs4linetime = bgs4linevar.width / 300;
      bgs4imgdelay = "-=" + (2.5*.95)
      bgs4keyframes
      .to(".bgs4line",{ duration: 1.9, width: "100%", ease: "none" })
      .to(".bgs4img", { duration: 1.8, opacity: 1, ease: "textfadev2" },"-=2")
      .to(".topcircle", {duration: 6, drawSVG:"-100%"})
      .to(".bottomcircle", {duration: 4.5, drawSVG:"100%"},"-=6")
      .to(".bgs4heading",{ duration: 1, y: "0%", ease: "human3" },"-=6.15")
      .to(".bgs4heading",{ duration: 1, opacity: "1", ease: "textfadev2" },"-=6.15")
      .to(".bgs4subtext",{ duration: 1, y: "0%", ease: "human3" },"-=6.15")
      .to(".bgs4subtext",{ duration: 1, opacity: "1", ease: "textfadev2" },"-=6.15")
}

function bgsectionanaimations() {
  $('.movablemenu').css('opacity', '1');
  var bcontainer = document.querySelector(".bgsection");
  var bcp = bcontainer.getBoundingClientRect();

  var bgslide2=document.querySelector(".bgt2");
  var bgslide2position = bgslide2.getBoundingClientRect();
  var bgs2p = Math.round(bgslide2position.left-bcp.right);

  var bgslide3=document.querySelector(".bgt3");
  var bgslide3position = bgslide3.getBoundingClientRect();
  var bgs3p = Math.round(bgslide3position.left-bcp.right);

  var bgslide4=document.querySelector(".bgt4");
  var bgslide4position = bgslide4.getBoundingClientRect();
  var bgs4p = Math.round(bgslide4position.left-bcp.right);

  if (bgs2p>-10) {
    menublack();
  }

  if (bgs2p<=-10) {
    if ($(".bgs2").hasClass('active')) {
      menuwhite(); 
    }
    else {
      var backgroundswiper3 = document.querySelector('#bgswiper').swiper;
      backgroundswiper3.mousewheel.disable();
      setTimeout(function () {
        $(".bgt2").removeClass('disableswipe');
        backgroundswiper3.mousewheel.enable();
      },bgs2timeout);
      $(".bgs2").addClass('active');
      menuwhite(); 
      bgs2timeline();
      bgs2keyframes.play();
    }
  }

  if (bgs3p<=-10) {
    if ($(".bgs3").hasClass('active')) {
      menuwhite(); 
    }
    else {
    var backgroundswiper3 = document.querySelector('#bgswiper').swiper;
    backgroundswiper3.mousewheel.disable();
    setTimeout(function () {
      $(".bgt3").removeClass('disableswipe');
      backgroundswiper3.mousewheel.enable();
      },bgs3timeout);
      $(".bgs3").addClass('active');
      menuwhite(); 
      bgs3timeline();
      bgs3keyframes.play();
    }
  }

  if (bgs4p<=-10) {
    $(".bgs4").addClass('active');
    menuwhite(); 
    bgs4timeline();
    bgs4keyframes.play();
    $(".bgt4").removeClass('disableswipe');
  }

}

function resetcircles(){
hidecircle = gsap.timeline({repeat:0});
hidecircle.to(".topcircle", {duration: 0,drawSVG:"-100%"})
  .to(".topcircle", {duration: 0,drawSVG:"0%"})
  .to(".bottomcircle", {duration: 0,drawSVG:"100%"})
  .to(".bottomcircle", {duration: 0,drawSVG:"0%"})
}


function wstimelinereset() {
  wss2keyframes.reverse(-10);
  wss3keyframes.reverse(-10);
  wss4keyframes.reverse(-10);
  resetcirclesWS();
}
function vstimelinereset() {
  wss2keyframes.reverse(-10);
}

var wss1line = document.querySelector(".wss1lineleft");
var wss1linevar = wss1line.getBoundingClientRect();
    wss1linetime = wss1linevar.width / 250;
    wss1timeout = wss1linetime*2000
    wss1imgdelay = "-=" + (wss1linetime*.95)
    wss1keyframes = gsap.timeline({ delay: 0 });
    wss1textholder = document.querySelector(".wss1textcontainer");
    wss1textvar = wss1textholder.getBoundingClientRect();
    wss1textvarwidth = wss1textvar.width;
    wss1tvw = wss1textvarwidth+"px";
    wss1textvarheight = wss1textvar.height;
    wss1tvh = wss1textvarheight+"px";
    console.log( wss1tvw,wss1tvh);

function wss1timeline() {   
  $('.movablemenu').css('opacity', '1');
  var wss1text = document.querySelector(".wss1textblock");
      wss1textvar = wss1text.getBoundingClientRect();
      wss1texttime = wss1textvar.width / 250;
      wss1textoverlap="-=" + (wss1texttime/2);
      wss1keyframes
      .to(".wss1line1",{ duration: 1, width: "100%", ease: "none" })
      .to(".wss1corners",{ duration: .8, width: "100px", ease: "human3" },"-=1.25")
      .to(".wss1textblock",{ duration: .8, width: "100%", ease: "human3" })
      .to(".wss1textblock",{ duration: .8, height: wss1tvh, ease: "human3" },"-=.8")
      .to(".wss1textcontainer",{ duration: .75, opacity: "1", ease: "textfadev2" }, 2)
      .to(".ws1img", { duration: 1.75, opacity: 1, ease: "textfadev2" },"-=2.6")
      // .to(".bgs2corners",{ duration: 1.5, width: "100px", ease: "human3" })
      // .to(".bgs2corners",{ duration: 1.5, height: "100px", ease: "human3" },"-=1.5")
      .to(".wss1line3",{ duration: 1, width: "100%", ease: "none" },"-=1.25")      
}

var wss2line = document.querySelector(".wss2linecontainer");
var wss2linevar = wss2line.getBoundingClientRect();
    wss2linetime = wss2linevar.width / 400;
    wss2timeout = wss2linetime*1000
var wss2keyframes = gsap.timeline({ delay: 0});
function wss2timeline() {
  $('.movablemenu').css('opacity', '1');
  var wss2text1 = document.querySelector(".wss2text1");
      wss2text1var = wss2text1.getBoundingClientRect();
      wss2textlefttime = (wss2text1var.left)/250;
      wss2textdelay = "-=" + (wss2linetime - wss2textlefttime)
      wss2text2delay = "-=" + ((wss2linetime - wss2textlefttime)-.5)
      wss2imgdelay = "-=" + (3*.95)
      wss2keyframes
      .to(".wss2line",{ duration: 3, width: "100%", ease: "none" })
      .to(".ws2img", { duration: 1.75, opacity: 1, ease: "textfadev2" }, wss2imgdelay)
      .to(".wss2text1", { duration: 1.8, y: "0%", ease: "human3" }, 1.2)
      .to(".wss2text1", { duration: 1.8, opacity: 1, ease: "textfadev2" }, 1.3)
      .to(".wss2text2", { duration: 1.5, y: "0%", ease: "human3" }, 1.2)
      .to(".wss2text2", { duration: 1.5, opacity: 1, ease: "textfadev2" }, 1.2);   
      // console.log(bgs2linevar.width, bgs2text1var.left, bgs2linetime, bgs2textlefttime, bgs2textdelay, bgs2text2delay)
}

var wss3timeout = 0;
var wss3keyframes = gsap.timeline({ delay: 0 });
    wss3textholder = document.querySelector(".ws3textblock");
    wss3textvar = wss3textholder.getBoundingClientRect();
    wss3textvarwidth = wss3textvar.width;
    wss3tvw = wss3textvarwidth+"px";
    wss3textvarheight = wss3textvar.height;
    wss3tvh = wss3textvarheight+"px";
    console.log( wss3tvw, wss3tvh);

function wss3timeline() {   
  $('.movablemenu').css('opacity', '1');
  var wss3text = document.querySelector(".ws3textblock");
      wss3textvar = wss3text.getBoundingClientRect();
      wss3texttime = wss3textvar.width / 250;
      wss3textoverlap="-=" + (wss3texttime/2);
      wss3keyframes
        .to(".ws3textblock",{ duration: .75, opacity: "1", ease: "textfadev2" }, 2)
        .to(".ws3-1img", { duration: 1.75, opacity: 0, ease: "none" })
        .to(".ws3-2img", { duration: 2.75, opacity: 1, ease: "none" })
        .to(".ws3-2img", { duration: 3.5, opacity: 0, ease: "none" })
        .to(".ws3-3img", { duration: 4.25, opacity: 1, ease: "none" })
        .to(".ws3-3img", { duration: 6.00, opacity: 0, ease: "none" })
        .to(".ws3-4img", { duration: 6.75, opacity: 1, ease: "none" })
        .to(".ws3-4img", { duration: 7.50, opacity: 0, ease: "none" })
}

var wss4keyframes = gsap.timeline({ delay: 0 });
function wss4timeline() {
  $('.movablemenu').css('opacity', '1');
  var wss4line = document.querySelector(".wss4linecontainer");
  var wss4linevar = wss4line.getBoundingClientRect();
      wss4linetime = wss4linevar.width / 300;
      wss4imgdelay = "-=" + (2.5*.95)
      wss4keyframes
      .to(".ws4text",{ duration: .75, opacity: "1", ease: "textfadev2" }, 2)
      .to(".ws4text.bottom",{ duration: 1.5, opacity: "1", ease: "textfadev2" }, 2)
      .to(".wss4line",{ duration: 1.9, width: "100%", ease: "none" })
      .to(".ws4img", { duration: 1.8, opacity: 1, ease: "textfadev2" },"-=2")
}

function wssectionanaimations() {
  $('.movablemenu').css('opacity', '1');
  var wcontainer = document.querySelector(".whatsection");
  var wcp = wcontainer.getBoundingClientRect();

  var wsslide2 = document.querySelector(".wt2");
  var wsslide2position = wsslide2.getBoundingClientRect();
  var wss2p = Math.round(wsslide2position.left-wcp.right);

  var wsslide3=document.querySelector(".wt3");
  var wsslide3position = wsslide3.getBoundingClientRect();
  var wss3p = Math.round(wsslide3position.left-wcp.right);

  var wsslide4=document.querySelector(".wt4");
  var wsslide4position = wsslide4.getBoundingClientRect();
  var wss4p = Math.round(wsslide4position.left-wcp.right);
  if (wss2p>-10) {
    menuwhite();
  }

  if (wss2p<=-10) {
    if ($(".ws2").hasClass('active')) {
      menuwhite(); 
    }
    else {
      var whatswiper3 = document.querySelector('#wswiper').swiper;
      whatswiper3.mousewheel.disable();
      setTimeout(function () {
        $(".wt2").removeClass('disableswipe');
        whatswiper3.mousewheel.enable();
      },wss2timeout);
      
      $(".ws2").addClass('active');
      menuwhite(); 
      wss2timeline();
      wss2keyframes.play();
    }
  }

  if (wss3p<=-10) {
    if ($(".bgs3").hasClass('active')) {
      menuwhite(); 
    }
    else {
      var whatswiper3 = document.querySelector('#wswiper').swiper;
      whatswiper3.mousewheel.disable();
      setTimeout(function () {
        $(".wt3").removeClass('disableswipe');
        whatswiper3.mousewheel.enable();
      },wss3timeout);

      $(".ws3").addClass('active');
      menuwhite(); 
      wss3timeline();
      wss3keyframes.play();
      setInterval( function() {
        // wss3keyframes.clear();
        wss3keyframes.restart();
      }, 37250 );
    }
  }

  if (wss4p<=-10) {
    $(".ws4").addClass('active');
    menuwhite(); 
    wss4timeline();
    wss4keyframes.play();
    $(".wt4").removeClass('disableswipe');
  }

}
// for (var j = 0; j < Math.floor(Math.random() * 20); j++) {
//   count++;
// }

var vss1Content = document.querySelector(".visionsection");
var vss1contentvar = vss1Content.getBoundingClientRect();
    vss1contenttime = vss1contentvar.width / 250;
    vss1timeout = vss1contenttime*2000
    vss1keyframes = gsap.timeline({ delay: 0 });
function vss1timeline() {
      $('.movablemenu').css('opacity', '0');
      vss1imgdelay = "-=" + (2.5*.95);
      vss1keyframes
      .to(".blur-white", { duration: 3, opacity: 0.5, ease: "none" })
      .to(".logo", { duration: 2, opacity: 1, ease: "none" })
      .to(".movablemenu", { duration: 0, opacity: 1, ease: "none" })
      .to(".vs1text", { duration: 2, opacity: 1, ease: "none" })
      .to(".blur-white", { duration: 2, opacity: 0, ease: "none" })
      .to(".blur-black", { duration: 3, opacity: 0.5, ease: "none" })
}

function randomIntFromInterval(){
  var img = document.querySelectorAll('.grid-wrapper img').length;
  var arr = [];
  while(arr.length < img){
      var r = Math.floor(Math.random() * img) + 1;
      if(arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}

var vss2Content = document.querySelector(".visionsection");
var vss2contentvar = vss1Content.getBoundingClientRect();
    vss2contenttime = vss2contentvar.width / 250;
    vss2timeout = vss2contenttime*2000
    vss2keyframes = gsap.timeline({ delay: 0 });
function vss2timeline() {
    $('.movablemenu').css('opacity', '1');
      vss2imgdelay = "-=" + (2.5*.95);
      vss1keyframes
      .to(".vs2text", { duration: .75, opacity: 1, ease: "none" });
      var frames = randomIntFromInterval();
      var contentKey = '';
      for (var j = 0; j < frames.length; j++) {
        vss2keyframes.to(".vis-"+frames[j], { duration: 1.75, opacity: 0, ease: "none" }).to(".vis-"+frames[j], { duration: 1.75, opacity: 1, ease: "none" });
      }
      
      setTimeout( function() {
        vss1keyframes.to(".box-black", { duration: .75, backgroundColor: "rgba(0,0,0,0.5)", ease: "none" });
      }, 43500);
      
      // vss2keyframes
      // .to(".blur-white", { duration: 5, opacity: 0.5, ease: "none" })
      // .to(".logo", { duration: 2, opacity: 1, ease: "none" })
      // .to(".movablemenu", { duration: 0, opacity: 1, ease: "none" })
      // .to(".vs1text", { duration: 2, opacity: 1, ease: "none" })
      // .to(".blur-white", { duration: 2, opacity: 0, ease: "none" })
      // .to(".blur-black", { duration: 3, opacity: 0.5, ease: "none" })
      // .to(".vs4text",{ duration: .75, opacity: "1", ease: "textfadev2" }, 2)
      // .to(".vs4text.bottom",{ duration: 1.5, opacity: "1", ease: "textfadev2" }, 2)
}

function vssectionanaimations() {
  var vcontainer = document.querySelector(".visionsection");
  var vcp = vcontainer.getBoundingClientRect();

  var vsslide2 = document.querySelector(".vt2");
  var vsslide2position = vsslide2.getBoundingClientRect();
  var vss2p = Math.round(vsslide2position.left-vcp.right);

  if (vss2p>-10) {
    menuwhite();
  }

  if (vss2p<=-10) {
    if ($(".vs2").hasClass('active')) {
      menuwhite(); 
    }
    else {
      var visionswiper3 = document.querySelector('#vswiper').swiper;
      visionswiper3.mousewheel.disable();
      setTimeout(function () {
        $(".vt2").removeClass('disableswipe');
        visionswiper3.mousewheel.enable();
      },vss1timeout);
      
      $(".vs2").addClass('active');
      menuwhite(); 
      vss2timeline();
      vss2keyframes.play();
    }
  }
}

function resetcirclesWS(){
  // hidecircle = gsap.timeline({repeat:0});
  // hidecircle.to(".topcircle", {duration: 0,drawSVG:"-100%"})
  //   .to(".topcircle", {duration: 0,drawSVG:"0%"})
  //   .to(".bottomcircle", {duration: 0,drawSVG:"100%"})
  //   .to(".bottomcircle", {duration: 0,drawSVG:"0%"})
}



// SECTION ANIMATIONS

$(document).ready(function() { 
  repositiondots();
  setTimeout(function () {
    initiateswiper();
    activatesection();
  }, 500);
  resetcircles();
  resetcirclesWS();
});



$(window).resize(function(){
  repositiondots();
});

$('.mslides').mouseup(function(e){
  setTimeout(function () {
    activatesection();
    disablemenu();
  }, 500);
});

$(".bgs1r").on("click", function (e) { bgs1keyframes.restart(); });
$(".bgs2r").on("click", function (e) { bgs2keyframes.restart(); });
$(".bgs3r").on("click", function (e) { bgs3keyframes.restart(); });
$(".bgs4r").on("click", function (e) { bgs4keyframes.restart(); });


$(".wss1r").on("click", function (e) { wss1keyframes.restart(); });
$(".wss2r").on("click", function (e) { wss2keyframes.restart(); });
$(".wss3r").on("click", function (e) { wss3keyframes.restart(); });
$(".wss4r").on("click", function (e) { wss4keyframes.restart(); });


$(".vss1r").on("click", function (e) { vss1keyframes.restart(); });
$(".vss2r").on("click", function (e) { vss2keyframes.restart(); });
