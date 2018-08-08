function GameController() {
  let gameService = new GameService();

  function setup() {
    let cities = gameService.getCities();

    let template = "";

    for (let i = 0; i < cities.length; i++) {
      const city = cities[i];
      template += `
      <button type="button" onclick="app.gameController.travel(${i})">${city}</button>
      `;
    }
    document.getElementById("cities").innerHTML = template;
    draw();
  }

  function draw() {
    let gumShoe = gameService.getGumshoe();
    document.getElementById("city").innerText = gumShoe.city;
    document.getElementById("budget").innerText = gumShoe.budget.toString();
    if (gumShoe.victory) {
      document.getElementById("victory").innerText = "WE WONN!!!11!11!!1";
    }
  }

  setup();

  this.search = function() {
    gameService.search(draw);
  };

  this.travel = function(index) {
    gameService.travel(index, draw);
  };

  this.reset = function() {
    gameService.reset();
    draw();
  };
}
