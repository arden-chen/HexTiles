var canvas;
var rad;
var paddingx; // space before and after the grid
var paddingy;

var tiles = [];
var movers = [];
// this array will have two arrays, one for the higher tiles and one for the lower ones. each one of those will have other arrays for the columns. 
// to up/down columns, stay within column. to move side to side, must switch higher/lower and move across

var button;
var spawntoggle = false;

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    button = createButton('spawn a new dude');
    button.position(0, 0);
    button.mousePressed(spawnToggleF);
    rad = height / 12;

    if (width < rad * 21 && rad > 0) {
        rad = width / 21;
    }
    console.log(width, height);

    paddingx = Math.abs(width - (17 * rad)) / 2;
    paddingy = (height - (12 * cos(PI / 6) * rad)) / 2;
    highTiles = [];
    lowerTiles = [];
    for (let i = 0; i < 6; i += 1) { // higher tiles; 6 tiles across
        let col = [];
        let x = paddingx + rad + (3 * rad) * i;
        for (let j = 0; j < 6; j += 1) {
            let y = paddingy + cos(PI / 6) * rad + 2 * cos(PI / 6) * rad * j;
            t = new hexTile(x, y, rad);
            col.push(t);
        }
        highTiles.push(col);
    }

    // lower tiles; 5 tiles across
    for (let i = 0; i < 5; i += 1) {
        let col = [];
        let x = paddingx + 2.5 * rad + 3 * rad * i;
        for (let j = 0; j < 5; j += 1) {
            let y = paddingy + 2 * cos(PI / 6) * rad + 2 * cos(PI / 6) * rad * j;
            t = new hexTile(x, y, rad);
            col.push(t);

        }
        lowerTiles.push(col);
    }
    lowerTiles.push([]);

    for (let i = 0; i < 6; i += 1) {
        tiles.push(highTiles[i]);
        tiles.push(lowerTiles[i]);
    }
    addAdjencies(); // to not have a million line long setup() 

    console.log(tiles);
    movers.push(new mover(tiles[0][0]));
}

function draw() {
    background('#cbe7f0');
    tiles.forEach(function (x) {
        x.forEach(function (y) {
            y.drawHex();
        });
    });
    movers.forEach(function (x) {
        x.show();
    });

    if (spawntoggle) {
        button.style('background-color', color(0, 255, 0, 50));
    } else {
        button.style('background-color', color(255, 0, 0, 50));
    }
}

function mousePressed() {
    tiles.forEach(function (x) {
        x.forEach(function (y) {
            y.clicked = false;
            y.adjClicked = false;
        });
    });

    tiles.forEach(function (x) {
        x.forEach(function (y) {
            if (ptInPoly(6, y.xverts, y.yverts, mouseX, mouseY)) {
                console.log(spawntoggle);
                if (spawntoggle) {
                    let spawned = new mover(y);
                    spawned.selected = false;
                    spawntoggle = false;
                    movers.forEach(function (x) {
                        x.selected = false;
                    });
                    tiles.forEach(function (x) {
                        x.forEach(function (y) {
                            y.clicked = false;
                            y.adjClicked = false;
                        });
                    });
                    movers.push(spawned);
                }
                y.clicked = !y.clicked;
                y.adjacentTiles.forEach(function (z) {
                    try {
                        z.adjClicked = true;
                    } catch (e) {

                    }
                });
            }
        });
    });

    movers.forEach(function (x) {
        if (dist(mouseX, mouseY, x.location.x, x.location.y) <= x.radius) {
            x.selected = !x.selected;
        }
        if (x.selected) {
            tiles.forEach(function (z) {
                z.forEach(function (y) {
                    if (ptInPoly(6, y.xverts, y.yverts, mouseX, mouseY)) {
                        x.move(y);
                    }
                });
            });
        }
    });
}

function spawnToggleF() {
    spawntoggle = !spawntoggle;
    console.log(spawntoggle);
}



window.onresize = function () {
    var w = window.innerWidth;
    var h = window.innerHeight;
    canvas.size(w, h);
    width = w;
    height = h;
};