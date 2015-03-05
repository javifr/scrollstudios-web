//Clear on focus
(function($){
	$.fn.clearDefault = function(){
		return this.each(function(){
			var default_value = $(this).val();
			$(this).focus(function(){
				if ($(this).val() == default_value)
                              $(this).val("");
			});
			$(this).blur(function(){
				if ($(this).val() == "")
                              $(this).val(default_value);
			});
		});
	};
})(jQuery);


jQuery(document).ready(function($) {

/* Always - - - - - - - - - - - - - - */

	$("a").attr("title","");
	$("img").attr("title","");
	$(".gotop").click(function(e) {
		e.preventDefault();
		$('html, body').animate({scrollTop: $("#top").offset().top}, 400);	
	});

	$(".wpcf7-form-control-wrap input").clearDefault();
	$(".wpcf7-form-control-wrap textarea").clearDefault();
	
	$(".project-navigation .nav-p").hover(function() {
		$("#nav-info").text($(this).text());
	}, function() {
		$("#nav-info").text("");
	});


/* Home - - - - - - - - - - - - - - */	
	
	function add_ajax_project_navigation(){
		
		//Ajax para siguiente o anterior proyecto en home
		$("#project_panel .project-navigation li a").click(function(e) {

			e.preventDefault();

			url_project = $(this).attr("href");

			$.ajax({
				type: "POST",     
				url: url_project,
				data: "ajax=true",
			    dataType: 'html',
				async: true,			
				success: function (html) {

					
					$("#project_panel").fadeOut("slow",function(){$(this).remove});
					//$("#quote_panel").fadeOut("slow",function(){$(this).remove});

					new_project_panel = $(html);
					new_project_panel.hide();
										
					$("#projects_panel").append(new_project_panel);	

					new_project_panel.fadeIn();	
									
					add_ajax_project_navigation();

				}
			 });

		});
		
	}

	add_ajax_project_navigation();


	$("#contact_panel").click(function() { location.href = $(this).attr("rel"); });
	


/* Services - - - - - - - - - - - - - - */	
	if( $("body").hasClass("page-template-services-php") ){ 
	//$(".accordion").accordion({ active: false ,autoheight: false});
	$(".accordion").accordion({ autoHeight: false, active: false});
}



/* Single Project - - - - - - - - - - - - - - */	
	
	$("#view-all-projects").click(function(e) {
		
		e.preventDefault();
		
		$(this).toggleClass("active"); 
		
		if( $(this).hasClass("active") ){
		
			url_projects = $(this).attr("href");

			$.ajax({
				type: "POST",     
				url: url_projects,
				data: "ajax=true",
			    dataType: 'html',
				async: false,			
				success: function (html) {
					container = $("<div/>").append(html).addClass("container").addClass("more-projects");
				  	$('.breadcrumbs').append(container);
				  	//99alert($(".breadcrumbs .container").css("height"));
					$(container).children("ul").slideDown("slow");
					

				}
			 });
			
		}else{
			
			$(container).slideUp('slow', function() { $(container).remove();});

		}
		
	});

	if( $("body").hasClass("s-category-projects-entries") && $("body").hasClass("single")){
	
		total_imgs = $("#slider ul li").size();
		
		$("<div id='nav-slider'><div></div></div>").appendTo("#viewer");
		
		$("#slider ul li").each(function(index) { 
			
			if( index == (total_imgs-1) ) $(this).click(function() { moveSlider(0); manageDot(0); });
			else $(this).click(function() { moveSlider(index+1); manageDot(index+1); });
			
			var a = $("<a></a>").attr('href','#').attr('rel',index).addClass("nav-dot").click(function(e){
				e.preventDefault();
				manageDot(index);
				moveSlider(index);
			}).appendTo('#nav-slider div');
		 	
		});
		
		$("#nav-slider div a:first").addClass("active");
		$("#nav-slider div").width( $("#nav-slider div a").size()*(10+3) );
		$("#slider ul").width($("#nav-slider div a").size()*(710));
		
	}
	
	function moveSlider(index){
		$("#slider ul").animate({
		    left: "-"+index*710+""
		});
	}

	function manageDot(index){
		$("#nav-slider .active").removeClass("active");
		$(".nav-dot[rel='"+index+"']").addClass("active");
	}
	
	


});