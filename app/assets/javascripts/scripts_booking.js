//////////////////////////////
// 1. booking.html
// 2. Functions
//////////////////////////////

$(document).ready(function() {

// 1. booking.html

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
  var final_total = localStorage.getItem("storedFinalTotal");


  if (addon_one != "NaN") {
    $('.qone .number').html(addon_one);
    $('.item_one .amount').html("£"+amount_one);
  } else {
    addon_one = 0;
    amount_one = 0.00;

    $('.qone .number').html("0");  //Set to zero
    $('.item_one .amount').html("£"+"0.00");
  }

  if (addon_two != "NaN") {
    $('.qtwo .number').html(addon_two);
    $('.item_two .amount').html("£"+amount_two);
  } else {
    addon_two = 0;
    amount_two = 0.00;

    $('.qtwo .number').html("0");  //Set to zero
    $('.item_two .amount').html("£"+"0.00");
  }
  var vat = "20";
  final_total = parseFloat(amount_one) + parseFloat(amount_two);
  $('.final_running_total').html("Running Total: £" + final_total);
  $('.vat_amount').html("(includes " + vat + "% VAT: £" + (final_total*(vat/100)).toFixed(2)+")");
  $('.final_deposit_total').html("Deposit due with booking: £" + (final_total*0.5).toFixed(2)); //50% deposit due

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
      $('.item_one .amount').html("£"+amount_plus);
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
      $('.item_one .amount').html("£"+amount_plus);
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
      $('.item_two .amount').html("£"+amount_plus);
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
      $('.item_two .amount').html("£"+amount_plus);
    }
  });

 $('.up').mousedown(function(event) {
  event.preventDefault;

 });


}); // Close document.ready

// 2. Functions

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
      desc: "A large, slow moving plant-eater",
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