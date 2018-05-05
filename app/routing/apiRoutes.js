var friendsData = require("../data/friends");
module.exports = function (app) {
  app.get("/api/friends", function (req, res) {
    res.json(friendsData);
  });
  app.post("/api/friends", function (req, res) {
    var bestFriend ={
      name:"",
      photo:"",
      difference:Infinity
    };
     var userScores = req.body.scores;
     var totalDifference;

				
					for (var i = 0; i <friendsData.length; i++) {
            var currentFriend = friendsData [i];
            totalDifference=0;
						for (var j = 0; j < currentFriend.scores.length; j++) {
              var currentFriendScore = currentFriend.scores[j];
              var currentUserScore = userScores[j];
							totalDifference += Math.abs(parseInt (currentUserScore) - parseInt(currentFriendScore));
						}			
						if (totalDifference <= bestFriend.difference) {
							bestFriend.name = currentFriend.name;
							bestFriend.photo = currentFriend.photo;
							bestFriend.difference = totalDifference;
            }
					}
        friendsData.push(req.body);
        res.json(bestFriend);
  });
};