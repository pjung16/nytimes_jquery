

var app = {
	nyTimesArticles : [],

	initialize: function() {
		$("#search").click(function(){
			$(".container").html("");
			var searchWord = $("#query").val();
			console.log(searchWord);
			app.getNYTimesData(searchWord);
		});

		$("#query").keypress(function(e){
			if (e.which == 13){
				$("#search").trigger('click');
			}
		});
	},

	makeHTML: function() {
		var theHTML = '';
		app.nyTimesArticles.forEach(cur => {
			theHTML += `<a href=${cur.link.url}>`;
			theHTML += "<h3>" + cur.display_title + "</h3>";
			theHTML += "</a>";
			theHTML += "<h4>" + cur.summary_short + "</h4>";
		})
		$('.container').html(theHTML);
	},

	getNYTimesData: function(searchWord) {
		console.log("Get NY Times Data");
		var nyTimesURL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=' + searchWord + '&api-key=';
		var myNYKey = 'BL7xZadMoWIyPODt904Cx1TYr3uMWzG1';
		var nyTimesReqURL = nyTimesURL + myNYKey;
		console.log(nyTimesReqURL);
		$.ajax({
			url: nyTimesReqURL,
			type: 'GET',
			dataType: 'json',
			error: function(err){
				console.log("Uh oh...");
				console.log(err);
			},
			success: function(data){
				//console.log(data);
				app.nyTimesArticles = data.results;
				console.log(app.nyTimesArticles);
				app.makeHTML();
			}
		});
	}



};