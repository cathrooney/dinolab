//////////////////////////////
// 1. feedback.html
// 2. Functions
//////////////////////////////

$(document).ready(function() {

// 1. feedback.html

	var feedbackNum = $(".galleryItem").length; //count how many feedback forms we have

	for(var i=1; i<= feedbackNum; i++) {
		// Create number specific image_ and feedback_ classes
		var image_title = $(".image_"+i).attr("title");
		var t=i; //What number are we?

		$(".feedback_" + i + " h3").html(image_title); //Place the image title into the h3 so that it appears on the main page
		$(".feedback_" + i).attr("title",image_title); //Add the image title so that it appears in the hover-over
	}

  var image_href;
  var image_title;
  var image_class;
  var imageNum;

	$('.lightbox_trigger').click(function(event) {
    // Code that makes the lightbox appear
    event.preventDefault();

		image_href = $(this).attr("href"); // Find out the image source link
		image_title = $(this).attr("title"); // Find out the title for the image
		image_class = $(this).attr("class").split(' ')[1]; //Find out which feedback/image form we are on

		var t = image_class.length-1;

		//Extract the number to use underneath the image
		if (t == 6) {
			imageNum = image_class[6];
		} else if (t == 7) {
			imageNum = image_class[6]+image_class[7];
		}
		
		var lightbox = feedback_lightbox_html(image_href,image_title,imageNum,feedbackNum); //Creates the lightbox html

    if ($('#lightbox').length > 0) { // #lightbox exists
             
      //insert lightbox HTML into page
      $('#lightbox').html(lightbox);
             
      //show lightbox window
      $('#lightbox').show();

    } else { // #lightbox does not exist - create and insert (runs 1st time only)

      //insert lightbox HTML into page
      $('body').append(lightbox);
    }

  });
  
  // Create photo previous/next slideshow effect
  var newImageNum;
  var newImageN;

  // Move back through the images

  $("#lightbox .previous").live('click',function(event) {
    newImageN = parseInt(imageNum); // string to integer
    newImageNum = new_image_number(newImageN,feedbackNum,"previous"); // use function to determine the image requested

    var feedback_position = ".galleryItem .image_"+newImageNum;

    image_href = $(feedback_position).attr("href"); // Find out the image source link
    image_title = $(feedback_position).attr("title"); // Find out the title for the image

    lightbox = feedback_lightbox_html(image_href,image_title,newImageNum,feedbackNum); //Creates the lightbox html

    //insert lightbox HTML into page
    $('#lightbox').html(lightbox);
             
    //show lightbox window
    $('#lightbox').show();

    imageNum = newImageNum; // set imageNum to the new number for future prev/next
  });

  // Move forward through the images

  $("#lightbox .next").live('click',function(event) {
    newImageN = parseInt(imageNum); // string to integer
    newImageNum = new_image_number(newImageN,feedbackNum,"next"); // use function to determine the image requested

    var feedback_position = ".galleryItem .image_"+newImageNum;

    image_href = $(feedback_position).attr("href"); // Find out the image source link
    image_title = $(feedback_position).attr("title"); // Find out the title for the image

    lightbox = feedback_lightbox_html(image_href,image_title,newImageNum,feedbackNum); //Creates the lightbox html

    //insert lightbox HTML into page
    $('#lightbox').html(lightbox);
             
    //show lightbox window
    $('#lightbox').show();

    imageNum = newImageNum; // set imageNum to the new number for future prev/next
  });

  //Click on the 'Close x' to get rid of lightbox window
  $('#lightbox .close').live('click', function() { //must use live, as the lightbox element is inserted into the DOM
    $('#lightbox').hide();
  });

}); // Close document.ready

// Functions

function feedback_lightbox_html(image_href,image_title,imageNum,feedbackNum) {
	result =	'<div id="lightbox">' +
     					'<div class="feedback_image">' + //insert clicked link's href into img src
       					'<img src="' + image_href +'" />' +
	      				'<div class="lb_bottom">' +
		      			'<div class="lb_title">' +
		      				'<p>' + image_title + '</p>' +
	    	      		'<div class="clear"> </div>' +
				    		'</div> <!--Close lb_title -->' + 
				      	'<div class="lb_copy">' +
	  	    				'<p>Copyright: The DinoLab</p>' +
	        	  		'<div class="clear"> </div>' +
				      	'</div>' +
			  	  	'</div> <!--Closing content -->' +

	        		'<div class="clear"> </div>' +

		      		'<div class="slideshow">' +

                '<div class="prev_next">' +
			      			'<span><< </span>' +
				      		'<span class="previous"><a href="#">Previous</a></span>' +
				   	  		'<span class="next"><a href="#">Next</a></span>' +
		    	  			'<span> >></span>' +
	    	  			'</div>' +
		      			'<div class="image_pos">' +
			      			'<span>image ' + imageNum + ' of ' + feedbackNum +'</span>' +
	    	  			'</div>' +
		      			'<div class="close">' +
			      			'<span><a href="#">close x</a></span>' +
	    	  			'</div>' +
			      	'</div <!-- Closing the slideshow -->' +

		  			'</div> <!-- Closing the lightbox -->';

 	return result;
}

function new_image_number(newImageN,feedbackNum,direction) {
  var result;

  if (newImageN == 1 && direction == "previous") { // send the user to the last feedback form
   result = feedbackNum;
  } else if (newImageN == feedbackNum && direction == "next") { //send the user to the first feedback form once they reach last
    result = 1;
  } else {
    if (direction == "next") {
      result = newImageN+1; //add one to go forward
    } else {
      result = newImageN-1; // remove one to go backwards
    }
  }
  return result;
}
