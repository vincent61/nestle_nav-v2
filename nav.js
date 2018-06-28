$(document).ready(function(){
  var marginPlus = 30;
  var marginMinus = 50;
  var currentStatus = {heights : [], step:0};
  var firstLoad =true;

  /*------------------ On Main Menu label click -----------*/
  if($( window ).width()>950){
    window.device = "desktop";
  }
  else{
    window.device = "mobile";
  }
  console.log(window.device )
  $(".droppable").click(function(){

    if($( window ).width()>950){
      if(!$(this).hasClass('clicked')){
        event.preventDefault();
      } else {
        return true;
      };
      var childNav = $("#"+$(this).data().name).parent();
      /*------------------ Main Menu label reclick when mega menu already open-----------*/
      if($(this).parent().parent().children().find('.clicked').length){
         //console.log('reclicked')
         $('.droppable').removeClass('clicked');
         $("#meta-description").html($("#"+$(this).data().name).data("description")); 
         resetMegaMenu();
         $(this).toggleClass('clicked');
         $(this).addClass('selected');
         childNav.addClass('selected');
         $('.selected .data-depth-1').removeClass('hidden');
         initializeMegaMenuHeight(currentStatus);
         currentStatus.step=0;
       }
       /*------------------ Main Menu label click for first time-----------*/
       else{
        $(this).toggleClass('clicked');
        $(this).addClass('selected');
        $("#"+$(this).data().name).parent().addClass('selected');
        $('.selected .data-depth-1').removeClass('hidden');

        showMegaMenu(currentStatus);
        initializeMegaMenuHeight(currentStatus);

        $('.meta-mega').show();
        $("#meta-description").html($("#"+$(this).data().name).data("description"));
        if(firstLoad)
          addChildrenSymbols();
        firstLoad=false;
        event.stopPropagation();
      }
    }
    else{
      
    }
  });



  $(".kitkat-menu").click(function(){
    if(!$(".wrap").hasClass('mega-menu-opened')){
    $(".wrap").toggleClass('mega-menu-opened');
    $(".nav-underlay").toggle();
    addChildrenSymbols();
    $('.meta-mega').show();
    firstLoad=false;
    event.stopPropagation();
  }
  else{
      $(".wrap").toggleClass('mega-menu-opened');
      $(".nav-underlay").toggle();
  }
  });


  $(".search-menu").click(function(){
    if(!$(".wrap").hasClass('search-menu-opened')){
    $(".wrap").toggleClass('search-menu-opened');
    $(".nav-underlay").toggle();
    addChildrenSymbols();
    $('.search-menu-panel').show();
    firstLoad=false;
    event.stopPropagation();
  }
  else{
      $(".wrap").toggleClass('search-menu-opened');
      $(".nav-underlay").toggle();
  }
  });



  $(".mega-menu a").click(function(){
    event.stopPropagation();
  });

  $(".search-menu a").click(function(){
    event.stopPropagation();
  });

  /*------------------ Hide Mega Menu-----------*/
  $(".nav-underlay").click(function(){
    hideMegaMenu();
    currentStatus.step=0;
  });

  /* ----------------- On Mega Menu sublink Clicked ------------------*/
  $(".ul-reset li").click(function(event) {
        onLabelClick($(event.target), marginPlus, marginMinus,currentStatus);
  });
  $(".ul-reset li a").click(function(event) {
        onLabelClick($(event.target).parent(), marginPlus, marginMinus, currentStatus);
  });
   /* ----------------- Close button click event ------------------*/
  $(".mega-menu .nav-padding .closer a img").click(function() {
    hideMegaMenu();
  });
  $(".search-menu-panel .nav-padding .closer a img").click(function() {
    hideSearchMenu();
  });

  $(".language-select").click(function(){
    $(this).toggleClass('rotate-arrow');
    $(".language-panel").slideToggle();
  });
  $(".language-panel .closer a").click(function(){
    $(this).toggleClass('rotate-arrow');
    $(".language-panel").slideToggle();
  });
    
    resize(currentStatus);
});

$(window).resize(function(currentStatus) {
    resize(currentStatus);
});

function resize(currentStatus){ 
    initializeMegaMenuHeight(currentStatus)
    if($(window).width() < 950)
    {
      //Mobile
      if(window.device=="desktop"){
        window.device="mobile";
        //console.log(window.device);

      }
      $('.nav-underlay').remove().insertBefore($('.header-site'));
    }
    else
    {
      //Desktop
      if(window.device=="mobile"){
        window.device="desktop";
        //console.log(window.device);
        hideMegaMenu();
        hideSearchMenu();
      }
      $('.nav-underlay').remove().insertBefore($('.nav-main'));
    }
}



/*------------------ Setup Mega Menu -----------*/
var navSetup = function () {
  $('#overlay-search-site input[type=text]').attr('placeholder', 'What can we help you find?');
  $('#toggle-search-site, #overlay-search-site .close').on('click', function (e) {
    e.preventDefault();
    $('#overlay-search-site').toggleClass('active');

    setTimeout(function () {
      if ($('#overlay-search-site').hasClass('active')) {
        $('#overlay-search-site input[type=text]').focus();
      }
    }, 500);
  });

  $('#toggle-nav-site').on('click', function (e) {
    e.preventDefault();
    var navIsOpen = $('#nav-site').hasClass('open');

    if (navIsOpen) {
      $(this).removeClass('toggled');
      $('#nav-site').removeClass('open');
    } else {
      $(this).addClass('toggled');
      $('#nav-site').addClass('open');
    }
  });

};

/*------------------ Add arrow when sublink has children -----------*/
function addChildrenSymbols (){
  $(".data-depth-0 li, .data-depth-1 li,.data-depth-2 li,.data-depth-3 li").each(function( index ) {
    if($(this).find("ul").length){
      $(this).addClass('children');
       $(this).children('a').removeAttr("href");
       if($(this).children('a').children('span').length==0){
        $(this).children('a').append("<span>click to collapse</span>");
       }
    }
  });
}

/*------------------ Dive in children -----------*/
function depthPlus (currentStatus, marginPlus, marginMinus){
  $('.nav-sub').animate({
    "margin-left": '-='+marginPlus+'vw'
  });

  $('.nav-sub').animate({
    "margin-left": '+='+marginMinus+'px'
  });
  manageRightLeftGravity(currentStatus)
  step+=1;
}

/*------------------ Back to parent -----------*/
function depthMinus (currentStatus, marginPlus, marginMinus){
  $('.nav-sub').animate({
    "margin-left": '+='+marginPlus+'vw'
  });

  $('.nav-sub').animate({
    "margin-left": '-='+marginMinus+'px'
  });
  leftColumn(currentStatus);
  resetColumnOpacity(currentStatus);
  step-=1;
}

/*------------------ Hide Mega Menu -----------*/
function hideMegaMenu(){
  $('.droppable').removeClass('clicked');
  $(".wrap").removeClass('mega-menu-opened');
  if($('.nav-underlay').css('display') != 'none')
    $(".nav-underlay").toggle();
  resetMegaMenu();
}

/*------------------ Show Mega Menu -----------*/
function showMegaMenu(currentStatus){
  $('.meta-mega').hide();
  $(".wrap").addClass('mega-menu-opened');
  $(".nav-underlay").toggle();
  step=0;
 }

 /*------------------ Hide Search Menu -----------*/
function hideSearchMenu(){
  $('.droppable').removeClass('clicked');
  $(".wrap").removeClass('search-menu-opened');
  if($('.nav-underlay').css('display') != 'none')
    $(".nav-underlay").toggle();
}

/*------------------ Show Mega Menu -----------*/
function showSearchMenu(currentStatus){
  $('.meta-mega').hide();
  $(".wrap").addClass('search-menu-opened');
  $(".nav-underlay").toggle();
 }


/*------------------ Reinitialize Mega Menu -----------*/
 function resetMegaMenu(){
   $('.selected').removeClass('selected');
   $('.data-depth-1, .data-depth-2,.data-depth-3, .data-depth-4').addClass('hidden');
 }

/*------------------ Check if Sublink has Children -----------*/
 function hasChildren(clickedLink){
  return clickedLink.children('ul').length
}

/*------------------ On Sub link label click event -----------*/
function onLabelClick(event, marginPlus, marginMinus, currentStatus){
 
  //var clickedStep = event.parent()[0].dataset.depth;
  var currentLevelClass = event.parent().attr('class');
  var clickedStep = parseInt(currentLevelClass.substr(currentLevelClass.length - 1));
  var isMobileDevice = $(window).width() <= 950;

  console.log("clickedStep "+clickedStep);
  console.log("step "+currentStatus.step);
  if(event.hasClass("selected") && isMobileDevice)
  {
    console.log("selected");
    console.log(event);
    event.removeClass('selected');
    event.find("ul").addClass('hidden');

  }
  else
  {
    if(clickedStep>currentStatus.step)
    {
      if(event.children("ul").removeClass('hidden').length){
        if(hasChildren(event)){
          currentStatus.step+=1;
          updateMenuHeight(event.children("ul"),currentStatus, 1);
        }
      }
    }
    else if(clickedStep==currentStatus.step){
      if(isMobileDevice){
        if(currentStatus.step==0){
          $(' .data-depth-1, .data-depth-2, .data-depth-3, .data-depth-4').addClass('hidden').find("li a").css("opacity","inherit");
          $(' .data-depth-0, .data-depth-1, .data-depth-2, .data-depth-3, .data-depth-4').find(".selected").removeClass('selected');
          if(hasChildren(event)){
            updateMenuHeight(event.children("ul"),currentStatus, 0);
          }
        }
        if(currentStatus.step==1){
          $(' .data-depth-2, .data-depth-3, .data-depth-4').addClass('hidden').find("li a").css("opacity","inherit");
          $(' .data-depth-1, .data-depth-2, .data-depth-3, .data-depth-4').find(".selected").removeClass('selected');
          if(hasChildren(event)){
            updateMenuHeight(event.children("ul"),currentStatus, 0);
          }
        }
        if(currentStatus.step==2){
          $('.data-depth-2, .data-depth-3, .data-depth-4').addClass('hidden').find("li a").css("opacity","inherit");
          $('.data-depth-2, .data-depth-3, .data-depth-4').find(".selected").removeClass('selected');
          updateMenuHeight(event.children("ul"),currentStatus, 0);
        }
        event.children("ul").removeClass('hidden').length   
      }
      else{
         if(currentStatus.step==1){
          $(' .data-depth-2,.data-depth-3, .data-depth-4').addClass('hidden').find("li a").css("opacity","inherit");
          $(' .data-depth-1,.data-depth-2,.data-depth-3, .data-depth-4').find(".selected").removeClass('selected');
          if(hasChildren(event)){
            updateMenuHeight(event.children("ul"),currentStatus, 0);
          }
        }
        if(currentStatus.step==2){
          $('.data-depth-3, .data-depth-4').addClass('hidden').find("li a").css("opacity","inherit");
          $('.data-depth-2, .data-depth-3, .data-depth-4').find(".selected").removeClass('selected');
          updateMenuHeight(event.children("ul"),currentStatus, 0);
        }
        event.children("ul").removeClass('hidden').length   
      }
      
    }
    else {
      
      if(clickedStep==0){
        $(' .data-depth-0, .data-depth-1, .data-depth-2, .data-depth-3, .data-depth-4').find(".selected").removeClass('selected');
        $(' .data-depth-1, .data-depth-2, .data-depth-3, .data-depth-4').addClass('hidden').find("li a").css("opacity","inherit");
      }
      else if(clickedStep==1){
        $(' .data-depth-1, .data-depth-2, .data-depth-3, .data-depth-4').find(".selected").removeClass('selected');
        $(' .data-depth-2, .data-depth-3, .data-depth-4').addClass('hidden').find("li a").css("opacity","inherit");
      }
      else if(clickedStep==2){
        $(' .data-depth-2, .data-depth-3, .data-depth-4').find(".selected").removeClass('selected');
        $(' .data-depth-3, .data-depth-4').addClass('hidden').find("li a").css("opacity","inherit");
      }
      if(currentStatus.step==2 && clickedStep==1){
        currentStatus.step-=2;
        updateMenuHeight(event.children("ul"),currentStatus, -2);
      }
      else{
        currentStatus.step-=1;
        updateMenuHeight(event.children("ul"),currentStatus, -1);
      }
      event.children("ul").toggleClass('hidden').length;
    }
     if($(window).width() > 950){
      event.parent().find("li").removeClass("selected");
    }
    event.addClass("selected");
  }
  
     
}

/*------------------ Manage initial height of Mega menu when opening -----------*/
function initializeMegaMenuHeight(currentStatus){
  currentStatus.heights=[]
  max=0;
  //console.log("before : "+currentStatus.heights);
  $(".data-depth-0>li.selected").children(".ul-reset").each(function() {
   if(max<$(this).find(".ul-reset").height()){
    max = $(this).find(".ul-reset").height();
  }
});
  currentStatus.heights.push($(".data-depth-0>li.selected").children(".ul-reset").height());
  $(".data-depth-0").height(currentStatus.heights[currentStatus.heights.length-1]+20);
  //console.log("after : "+currentStatus.heights);
}

/*------------------ Manage height of Mega menu when sub link is clicked -----------*/
function updateMenuHeight(children, currentStatus, deepness){
      //console.log("before : "+currentStatus.heights);
      if(deepness==0){
        currentStatus.heights.pop();
      }
      if (deepness==-1) {
        currentStatus.heights.pop();
      }
      
      if (deepness==-2) {
        currentStatus.heights.pop();
        currentStatus.heights.pop();
      }
      else{
      if(children.height() > currentStatus.heights[currentStatus.heights.length-1]  ){
        currentStatus.heights.push(children.height());
      }
      else{
        currentStatus.heights.push(currentStatus.heights[currentStatus.heights.length-1]);
      }
      }
    $(".data-depth-0").animate({
            height: currentStatus.heights[currentStatus.heights.length-1]+20
        }, 200, "linear");
}



/*
function rightColumn(columnDepth){
  $(columnDepth).children('li').each(function( index ) {
    var a =  $(this).find('a').first();
    a.css('position', 'relative').animate({ left: $(this).width() - a.width()-40
    } , function() {
     $(columnDepth+">li>a").css("opacity","0.5");
     $(columnDepth+">li>a").css("text-align","right");
   });
  });
}*/
/*
function leftColumn(currentStatus){
  var columnDepth;
  if(currentStatus.step==1){
    columnDepth=".data-depth-1";
  }
  if(currentStatus.step==2){
    columnDepth=".data-depth-2";
  }
  if(currentStatus.step==3){
    columnDepth=".data-depth-3";
  }
  $(columnDepth).children('li').each(function( index ) {
    $(this).find('a').first().animate({ left:0 });
  });
}*/

/*
function resetColumnOpacity(currentStatus){
  if(currentStatus.step==1){
    columnDepth=".data-depth-1";
  }
  if(currentStatus.step==2){
    columnDepth=".data-depth-2";
  }
  if(currentStatus.step==3){
    columnDepth=".data-depth-3";
  }
  $(columnDepth).find("li a").css("opacity","inherit");
}*/
/*
function leftColumnAll(){
  $(".data-depth-1").find('li').each(function( index ) {
    $(this).find('a').first().animate({ left:0 });
  });
}*/

/*
function manageRightLeftGravity(currentStatus){
 if(currentStatus.step==0){
  rightColumn(".data-depth-1");
}
if(currentStatus.step==1){
  rightColumn(".data-depth-two");
}
if(currentStatus.step==2){
  rightColumn(".data-depth-3");
}
if(currentStatus.step==3){
  rightColumn(".data-depth-4");
}
}*/

