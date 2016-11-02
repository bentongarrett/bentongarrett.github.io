$(".navbar-brand").click(function() {
  $('html, body').animate({
    scrollTop: $("body").offset().top
  }, 1000);
});

$("#projects-link").click(function() {
  $('html, body').animate({
    scrollTop: $("#portfolio").offset().top
  }, 1000);
});

$("#about-link").click(function() {
  $('html, body').animate({
    scrollTop: $("#about").offset().top
  }, 1000);
});

$("#contact-link").click(function() {
  $('html, body').animate({
    scrollTop: $("#contact").offset().top
  }, 1000);
});
