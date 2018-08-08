function GameService() {
  let defaultSearchCost = 500;
  let defaultTravelCost = 800;
  let countdown = 4;

  let cities = [
    "London",
    "Bangkok",
    "Paris",
    "Dubai",
    "Istanbul",
    "New York",
    "Singapore",
    "Kualal Lumpur",
    "Seoul",
    "Hong Kong",
    "Tokyo",
    "Barcelona",
    "Amsterdam",
    "Rome",
    "Milan",
    "Taipei",
    "Vienna",
    "Prague",
    "Los Angeles"
  ];

  let gumShoe = {
    budget: 10000,
    city: getRandomCity(),
    victory: false
  };

  let carmen = {
    firstName: "Carmen",
    secondName: "Sansiago",
    city: "",
    wanted: true
  };

  function hideCarmen() {
    setTimeout(function() {
      countdown--;
      if (countdown > 0) {
        console.log(countdown);
        return hideCarmen();
      } else {
        carmen.city = getRandomCity();
        console.log(`Oh No, it would appear that Carmen Sansiago TM,
         the thieving villain is on the loose its your job to track
         her down and bring her to justice GumShoe. You have $
         ${gumShoe.budget} to find her.`);
        console.log(carmen.city);
      }
    }, 1000);
  }

  function getRandomCity() {
    let randNum = Math.floor(Math.random() * cities.length);
    return cities[randNum];
  }

  this.getCities = function() {
    let citiesCopy = [];

    cities.forEach(city => {
      citiesCopy.push(city);
    });

    return citiesCopy;
  };

  this.getGumshoe = function() {
    return {
      city: gumShoe.city,
      budget: gumShoe.budget,
      victory: gumShoe.victory
    };
  };

  this.search = function(callWhenDone) {
    if (gumShoe.budget - defaultSearchCost < 0) {
      console.error("Error: Construct additional pylons!");
      return;
    }
    console.log("Searching...");
    setTimeout(function() {
      gumShoe.budget -= defaultSearchCost;
      if (gumShoe.city == carmen.city) {
        gumShoe.victory = true;
        console.log("WE WON!!!!!111");
      } else {
        console.log(
          `A woman wearing a red hat and black boots is more likely found in ${getRandomCity()}`
        );
      }
      console.log("Value of callWhenDone: ", callWhenDone);
      callWhenDone();
    }, 1000);
  };

  this.travel = function(index, callBack) {
    let cost = (
      defaultTravelCost * index +
      1 +
      (cities.indexOf(gumShoe.city) + 1) / 10
    ).toFixed();
    console.log(cost);
    if (gumShoe.budget - +cost > 0 && gumShoe.city != cities[index]) {
      gumShoe.budget -= +cost;
      console.log(`Flight Departing from ${gumShoe.city} to ${cities[index]}`);
      setTimeout(function() {
        gumShoe.city = cities[index];
        callBack();
        console.log(
          `You have arrived at ${gumShoe.city}! Thanks for flying skyblue.`
        );
      }, 2000);
    } else if (gumShoe.city == cities[index]) {
      console.error("You cant fly to the same city. PS your money is GONE!");
      gumShoe.budget -= 109210298317319284575685765465477785;
      callBack();
    } else {
      console.error("Need more creep");
    }
  };

  this.reset = function() {
    gumShoe.city = getRandomCity();
    gumShoe.victory = false;
    gumShoe.budget = 10000;
    countdown = 4;
    hideCarmen();
  };

  hideCarmen();
}
