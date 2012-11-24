//////////////////////////////
// 1. feedback.html
// 2. contact.html
// 3. booking.html
// 4. dinoline.html
// 5. Functions
//////////////////////////////

$(document).ready(function() {

// 2. contact.html

  var phone_placeholder = $('input[name="phone"]').attr("placeholder");
  var email_placeholder = $('input[name="email"]').attr("placeholder");

  $('input[name="phone"]').focus(function(event) {
  	$(this).attr("placeholder","");
  });

  $('input[name="phone"]').blur(function(event) {
  	$(this).attr("placeholder",phone_placeholder);
  });

  $('input[name="email"]').focus(function(event) {
  	$(this).attr("placeholder","");
  });

  $('input[name="email"]').blur(function(event) {
  	$(this).attr("placeholder",email_placeholder);
  });

  $('form').submit(function(event) {
  	var phone_avail = $('input[name="phone"]').val();
  	var email_avail = $('input[name="email"]').val();
  	var phone_length = phone_avail.length;

		if(phone_length == 0 && email_avail.length == 0) {
 			alert("You must provide either your e-mail address or a contact phone number");
			event.preventDefault();
    }

	  if (phone_length > '0' && phone_length < '10') {
		  alert("Your phone number must include full area code");
		  event.preventDefault();
    } 

  });

// 3. booking.html

  var party = $('select[name="party_type"]').val();  //Is the default school or party?
  var dinolab = dinolab_costs(party); //What are the associated costs with this default?

  var total = dinolab.total; //Total Cost
  var deposit = dinolab.deposit; //Deposit required

  $(".total_amount").html("Total: " + total);
  $(".deposit_amount").html("Deposit required: " + deposit);

  $('select[name="party_type"]').change(function(event) {
    party = $(this).val();

    dinolab = dinolab_costs(party);
    total = dinolab.total;
    deposit = dinolab.deposit;

    $(".total_amount").html("Total: " + total);
    $(".deposit_amount").html("Deposit required: " + deposit);

  });

  var party = localStorage.getItem("schoolOrParty");

  if (party) {
    $('select[name="party_type"]').attr("value",party);
  } else {
    party = $('select[name="party_type"]').val();  //Are they looking a school event or party?
  }

  var dinolab = dinolab_costs(party); //What are the associated costs with this default?
  var total = dinolab.total; //Total Cost
  var deposit = dinolab.deposit; //Deposit required

  $(".total_amount").html("Total: " + total);
  $(".deposit_amount").html("Deposit required: " + deposit);

  $('select[name="party_type"]').change(function(event) {
    party = $(this).val();

    localStorage.setItem("schoolOrParty",party);

    dinolab = dinolab_costs(party);
    total = dinolab.total
    deposit = dinolab.deposit;

    $(".total_amount").html("Total: " + total);
    $(".deposit_amount").html("Deposit required: " + deposit);

  });

// Working out the add-ons

  var addon_one = localStorage.getItem("storedQuantityOne");
  var amount_one = localStorage.getItem("storedAmountOne");
  var addon_two = localStorage.getItem("storedQuantityTwo");
  var amount_two = localStorage.getItem("storedAmountTwo");


  if (addon_one != "NaN") {
    $('.qone .number').html(addon_one);
    $('.qone .amount').html("£"+amount_one);
  } else {
    addon_one = 0;
    amount_one = 0.00;

    $('.qone .number').html("0");  //Set to zero
    $('.qone .amount').html("£"+"0.00");
  }

  if (addon_two != "NaN") {
    $('.qtwo .number').html(addon_two);
    $('.qtwo .amount').html("£"+amount_two);
  } else {
    addon_two = 0;
    amount_two = 0.00;

    $('.qtwo .number').html("0");  //Set to zero
    $('.qtwo .amount').html("£"+"0.00");
  }

  var costs = partybag_costs("party_bag");
  var item_cost = costs.cost;
  var item_deposit = costs.deposit;

  var costs_two = partybag_costs("deluxe_bag");
  var item_cost_two = costs_two.cost;
  var item_deposit_two = costs_two.deposit;

  $('.qone .up').mousedown(function(event) {
    event.preventDefault();

    if (addon_one >= 0) {
      var addon_plus = parseInt(addon_one) + 1;
      var amount_plus = parseFloat(addon_plus * item_cost);
      var deposit_plus = parseFloat(addon_plus * item_deposit).toFixed(2);

      localStorage.setItem("storedQuantityOne",addon_plus);
      localStorage.setItem("storedAmountOne",amount_plus);

      $('.qone .number').html(addon_plus);
      $('.qone .amount').html("£"+amount_plus);
    }
  });

  $('.qone .down').mousedown(function(event) {
    event.preventDefault();

    if (addon_one >= 1) {
      var addon_plus = parseInt(addon_one) - 1;
      var amount_plus = parseFloat(addon_plus * item_cost).toFixed(2);
      var deposit_plus = parseFloat(addon_plus * item_deposit);

      localStorage.setItem("storedQuantityOne",addon_plus);
      localStorage.setItem("storedAmountOne",amount_plus);

      $('.qone .number').html(addon_plus);
      $('.qone .amount').html("£"+amount_plus);
    }
  });

  $('.qtwo .up').mousedown(function(event) {
    event.preventDefault();

    if (addon_two >= 0) {
      var addon_plus = parseInt(addon_two) + 1;
      var amount_plus = parseFloat(addon_plus * item_cost_two).toFixed(2);
      var deposit_plus = parseFloat(addon_plus * item_deposit_two).toFixed(2);

      localStorage.setItem("storedQuantityTwo",addon_plus);
      localStorage.setItem("storedAmountTwo",amount_plus);

      $('.qtwo .number').html(addon_plus);
      $('.qtwo .amount').html("£"+amount_plus);
    }
  });

  $('.qtwo .down').mousedown(function(event) {
    event.preventDefault();

    if (addon_two >= 1) {
      var addon_plus = parseInt(addon_two) - 1;
      var amount_plus = parseFloat(addon_plus * item_cost_two).toFixed(2);
      var deposit_plus = parseFloat(addon_plus * item_deposit_two).toFixed(2);

      localStorage.setItem("storedQuantityTwo",addon_plus);
      localStorage.setItem("storedAmountTwo",amount_plus);

      $('.qtwo .number').html(addon_plus);
      $('.qtwo .amount').html("£"+amount_plus);
    }
  });

// 4. dinoline.html
  //Play audio file when you hover over
  $('.audio_trigger').mousemove(function(event) {

    var audioClass = $(this).attr("class").split(' ')[0];

    $("."+audioClass).mousedown(function(event) {
     $("."+ audioClass + "_audio")[0].play();
    });

  }); //Close audio_trigger

  $('.dinoline_lightbox_trigger').click(function(event) {
         
    //prevent default action (hyperlink)
    event.preventDefault();
         
    //Get clicked link href
    var image_href = $(this).attr("href");
    console.log(image_href);
    var dino_name = $(this).text();
    console.log(dino_name);

    var lightbox = dinoline_lightbox_html(image_href,dino_name);
                  
    if ($('#lightbox_dino').length > 0) { // #lightbox exists
            
      $('#lightbox_dino').html(lightbox);
      //show lightbox window
      $('#lightbox_dino').show();

    } else { //#lightbox does not exist - create and insert (runs 1st time only)
             
      //insert lightbox HTML into page
      $('body').append(lightbox);
    }
         
  });
     
  //Click anywhere on the page to get rid of lightbox window
  $('#lightbox_dino .close').live('click', function() { //must use live, as the lightbox element is inserted into the DOM
    $('#lightbox_dino').hide();
  });

}); // Close document.ready

// Functions

function dinoline_lightbox_html(image_href,dino_name) {
  var dino_text = dino_information(dino_name);
  var dino_desc = dino_text.desc;
  var dino_found = dino_text.found;

  result = '<div id="lightbox_dino">' +

              '<div class="dino_popup">' +

                '<div class="dino_header">' +
                  '<div class="dino_name">' +
                    '<span>' + dino_name +'</span>' +
                  '</div>' +
                  '<div class="dino_found">' +
                    '<span>Found in ' + dino_found +'</span>' +
                  '</div>' +
                '</div <!-- Closing the dino_header -->' +

                '<div class="dino_image">' + //insert clicked link's href into img src
                  '<img src="' + image_href +'" />' +
                '</div>' +    
                '<div class="clear"> </div>' +

                '<div class="dino_desc">' +
                  '<p>' + dino_desc + '</p>' +
                '</div>' +
                '<div class="clear"> </div>' +

                '<div class="close">' +
                  '<span><a href="#">close x</a></span>' +
                '</div>' +

              '</div> <!-- Closing the dino_popup -->';

            '</div> <!-- Closing the lightbox -->';
  return result;
}

function partybag_costs(item) {
  var results;

  if (item == "party_bag") {
    results = {cost: "9.99",
    deposit: "5"}
  } else if (item == "deluxe_bag") {
    results = {cost: "15.99",
    deposit: "8"}
  } else if (item == "tshirt_large") {
    results = {cost: "6.99",
    deposit: "3.50"}
  } else if (item == "tshirt_medium") {
    results = {cost: "5.99",
    deposit: "3.00"}
  } else if (item == "tshirt_small") {
    results = {cost: "4.99",
    deposit: "2.50"}
  } else {
    results = {cost: "0",
    deposit: "0"}
  }
  return results;
}

function dinolab_costs(party) {
	var results;

	if (party == "school") {
 		results = {total: "£450",
 		deposit: "£100"}
 	} else if (party == "party") {
 		results = {total: "£350",
 		deposit: "£75"}
 	} else {
 		results = {total: "£tbd",
 		deposit: "£tbd"}
  }
  return results;
}

function dino_information(dino_name) {
  var results;
  if(dino_name == "Plateosaurus") {
    results = {
      desc: "Plateosaurus had five fingered hands and a large thumb claw",
      found: "France, Germany, Switzerland",
      short_name: "plateo"}

  } else if (dino_name == "Stegosaurus") {
    results = {
      desc: "Stegosaurus was a large, slow moving plant-eater who would have defended itself from predators like Allosaurus and Ceratosaurus with its powerful spiked tail.",
      found: "USA",
      short_name: "stego"}

  } else if (dino_name == "Triceratops") {
    results = {
      desc: "The Triceratops skull is one of the largest and most striking of any land animal.",
      found: "USA",
      short_name: "tricero"}

  } else if (dino_name == "Tyrannosaurus") {
    results = {
      desc: "Tyrannosaurus lives up to its reputation as one of the most fearsome animals of all time",
      found: "Canada, USA",
      short_name: "tyranno"}

  } else {
    results = {
      desc: "tbd",
      found: "tbd",
      short_name: "none"}
  }

  return results;
}