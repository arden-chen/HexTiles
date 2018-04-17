function mover(loc) {
    this.location = loc; // hextile object of the tile that this mover is on
    this.radius = this.location.radius / 1.5;
    this.moves = 1; // how many spaces it can move

    this.selected = false;
    this.show = function () {
        fill('red');
        if (this.selected) {
            fill('green');
        }
        ellipse(this.location.x, this.location.y, this.radius);
    }
    this.move = function (tile) { // pass in clicked tile
        if (this.selected) {
            if (this.testTile(tile)) {
                this.location = tile;
            }
        }
    }
    this.testTile = function (tile) { // check if clicked tile is valid
        validTiles = this.location.adjacentTiles;
        result = false;
        validTiles.forEach(function (x) {
            if (x === tile) {
                result = true;
            }
        });
        return result;
    }
}