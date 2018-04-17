function addAdjencies() { // too many try catchhh

    tiles.pop();
    tiles.forEach(function (x, y) {
        x.forEach(function (i, j) {
            if (y % 2 == 0) { // outer columns
                try {
                    i.adjacentTiles.push(tiles[y][j + 1]);
                } catch (e) {
                    console.log(e);
                }
                try {
                    i.adjacentTiles.push(tiles[y][j - 1]);
                } catch (e) {

                }
                try {
                    i.adjacentTiles.push(tiles[y + 1][j]);
                } catch (e) {

                }
                try {
                    i.adjacentTiles.push(tiles[y + 1][j - 1]);
                } catch (e) {

                }
                try {
                    i.adjacentTiles.push(tiles[y - 1][j]);
                } catch (e) {

                }
                try {
                    i.adjacentTiles.push(tiles[y - 1][j - 1]);
                } catch (e) {

                }
            } else { // inner columns
                try {
                    i.adjacentTiles.push(tiles[y][j + 1]);
                } catch (e) {

                }
                try {
                    i.adjacentTiles.push(tiles[y][j - 1]);
                } catch (e) {

                }
                try {
                    i.adjacentTiles.push(tiles[y + 1][j]);
                } catch (e) {

                }
                try {
                    i.adjacentTiles.push(tiles[y + 1][j + 1]);
                } catch (e) {

                }
                try {
                    i.adjacentTiles.push(tiles[y - 1][j]);
                } catch (e) {

                }
                try {
                    i.adjacentTiles.push(tiles[y - 1][j + 1]);
                } catch (e) {

                }
            }
        })
    });
}

// borrowed from online ;)
function ptInPoly(nvert, vertx, verty, testx, testy) {
    let i, j, c = 0;
    for (i = 0, j = nvert - 1; i < nvert; j = i++) {
        if (((verty[i] > testy) != (verty[j] > testy)) && (testx < (vertx[j] - vertx[i]) * (testy - verty[i]) / (verty[j] - verty[i]) + vertx[i])) {
            c = !c;
        }
    }
    return c;
}

function hexTile(x, y, r) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.vertices = poly(this.x, this.y, this.radius, 6);

    this.xverts = [];
    this.yverts = [];
    this.clicked = false;

    this.adjacentTiles = [];
    this.adjClicked = false;

    for (let i = 0; i < this.vertices.length; i += 1) {
        this.xverts.push(this.vertices[i][0]);
        this.yverts.push(this.vertices[i][1]);
    }

    this.drawHex = function () {
        if (this.clicked) {
            fill(236, 113, 182, 47);
        } else if (this.adjClicked) {
            fill(251, 179, 140, 47);
        } else {
            noFill();
        }
        beginShape();
        for (let a = 0; a < 6; a += 1) {
            vertex(this.vertices[a][0], this.vertices[a][1]);
        }
        vertex(this.vertices[0][0], this.vertices[0][1]);
        endShape();
    }
}


// is hardcoded for horizontal hexagons... rotation is iffy
function poly(x, y, r, numPoints) {
    var angle = TWO_PI / numPoints;
    var vertices = [];
    for (a = -TWO_PI / 12; a < TWO_PI + (TWO_PI / 12); a += angle) {
        vertex(x + sin(a) * r, y + cos(a) * r);
        let v = [x + sin(a) * r, y + cos(a) * r];
        vertices.push(v);
    }
    return vertices;
}