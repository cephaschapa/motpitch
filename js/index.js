$(document).ready(function(){
    console.log("hello")
    $('.sidenav').sidenav();
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
      });
      $('.slider').slider();
      $('.modal').modal();
})