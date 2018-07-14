
$(document).ready( function() {

    var goButtonClicked = false;
    var food;
    var starterButtonArray = ["chicken tenders","strawberry","pizza","bacon","french fries","ranch dressing"];

    function loadButtons() {
        for (var n=0; n < starterButtonArray.length; n++) {
            var $starterButton = $("<button>");
            $starterButton.text(starterButtonArray[n]);
            $starterButton.addClass("button btn btn-primary button-style");
            $starterButton.attr("data-food",starterButtonArray[n]);
            $starterButton.attr("style","margin:4px");
            $('#button-div').append($starterButton);
        }
    };
    loadButtons();

    $('body').on('click','#go-button',function() {
        goButtonClicked = true;
    });

    $('body').on('click','#add-button',function() {
        var userInput = $("#food-input").val().trim();
        if (userInput === "") {
            // do nothing
        } else {
            var $newButton = $("<button>");
            $newButton.text(userInput);
            $newButton.addClass("button btn btn-primary button-style");
            $newButton.attr("data-food",userInput);
            $newButton.attr("style","margin:4px");

            $("#button-div").append($newButton);

            $("#food-input").val("");
        }
        
    });
    
    // Any button is clicked
    $('body').on('click','.button',function() {

        if (goButtonClicked) {
            food = $("#food-input").val().trim();
        } else {
            food = $(this).attr("data-food");
        }

        // Sets the URL using the data-food input
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Runs AJAX call using the built URL
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            // Empties the div so GIFs replace eachother after button click
            $("#gifs-appear-here").empty();

            console.log(queryURL);
            console.log(response);
            // Stores data in "results"
            var results = response.data;

            // Loops through all 10 GIFs
            for (var n=0; n < results.length; n++) {

                // Creates a div
                var $foodDiv = $('<div style="display: inline-block; padding: 0 10px 0 0">');

                // Creates a p tag and img to add to the div
                var pTag = $("<p>").text("Rating: " + results[n].rating);
                var $foodPic = $("<img>");
                $foodPic.attr("src", results[n].images.fixed_height.url);
                $foodPic.attr("alt", "pic error!");
                $foodPic.attr("data-still", results[n].images.fixed_height_still.url);
                $foodPic.attr("data-animate", results[n].images.fixed_height.url);
                $foodPic.attr("data-state", "animate");
                $foodPic.addClass("gif");
                

                // Adds content to the div
                $foodDiv.append(pTag);
                $foodDiv.append($foodPic);

                // Paste div onto the page
                $("#gifs-appear-here").append($foodDiv);
            }
        });

        $("#food-input").val("");
        goButtonClicked = false;

    });

});

// Event handler (on click) has to be on body, not on load/doc.ready
$('body').on('click','.gif',function() {
    var state = $(this).attr("data-state");

    if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    } else {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
});

