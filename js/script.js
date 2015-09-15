var UP = 0, DOWN = 1, LEFT = 2, RIGHT = 3;
var game = {
    on : true,
    SIZE : 4,
    score : 0,
    grid : [],
    update : function () {
        for (var i = 0; i < game.SIZE; i++) {
            for (var j = 0; j < game.SIZE; j++) {
                var val = this.grid[i][j];
                document.getElementById(i + "" + j).innerHTML = (val == 0)
                ? "" : val;
            }
        }
        document.getElementById("score").innerHTML = "" + this.score;
    },
    lose : function () {
        alert ("You lost!");
        this.on = false;
    },
    fill : function () {
        if (!this.on) {
            return;
        }
        var i = Math.floor(Math.random() * 4);
        var j = Math.floor(Math.random() * 4);
        while (this.grid[i][j] != 0) {
            i = Math.floor(Math.random() * 4);
            j = Math.floor(Math.random() * 4);
        }
        this.grid[i][j] =  (Math.random() < 0.1) ? 4 : 2;
        var lose = true;
        for (var i = 0; i < game.SIZE; i++) {
            for (var j = 0; j < game.SIZE; j++) {
                if (this.grid[i][j] == 0) {
                    lose = false;
                    break;
                }
            }
        }
        if (lose) {
            this.lose();
            return;
        }
    },
    shift : function (dir) {
        if (!this.on) {
            return;
        }
        var switches = false;
        function nextx (x) {
            switch (dir) {
                case UP:
                    return x - 1;
                case DOWN:
                    return x + 1;
                default:
                    return x;
            }
        }
        function nexty (y) {
            switch (dir) {
                case LEFT:
                    return y - 1;
                case RIGHT:
                    return y + 1;
                default:
                    return y;
            }
        }
        function helper (x1, y1) {
            var from = game.grid[x1][y1];
            if (0 == from) {
                return false;
            }
            var x2 = x1, y2 = y1;
            switch (dir) {
                case UP:
                    while (0 < x2) {
                        n = x2 - 1;
                        to = game.grid[n][y2];
                        if (to == from) {
                            x2 = n;
                            break;
                        }
                        else if (to != 0) {
                            break;
                        }
                        x2 = n;
                    }
                    break;
                case DOWN:
                    while (x2 < game.SIZE - 1) {
                        n = x2 + 1;
                        to = game.grid[n][y2];
                        if (to == from) {
                            x2 = n;
                            break;
                        }
                        else if (to != 0) {
                            break;
                        }
                        x2 = n;
                    }
                    break;
                case LEFT:
                    while (0 < y2) {
                        n = y2 - 1;
                        to = game.grid[x2][n];
                        if (to == from) {
                            y2 = n;
                            break;
                        }
                        else if (to != 0) {
                            break;
                        }
                        y2 = n;
                    }
                    break;
                case RIGHT:
                    while (y2 < game.SIZE - 1) {
                        n = y2 + 1;
                        to = game.grid[x2][n];
                        if (to == from) {
                            y2 = n;
                            break;
                        }
                        else if (to != 0) {
                            break;
                        }
                        y2 = n;
                    }
                    break;
            }
            if (x1 == x2 && y1 == y2) {
                return false;
            }
            var to = game.grid[x2][y2];
            if (to == 0) {
                game.grid[x2][y2] = from;
                game.grid[x1][y1] = 0;
                return true;
            }
            else if (to == from) {
                game.grid[x2][y2] = from * 2;
                game.grid[x1][y1] = 0;
                game.score += game.grid[x2][y2];
                return true;
            }
        }
        var switches = false;
        switch (dir) {
            case UP:
                for (var x1 = 1; x1 < game.SIZE; x1++) {
                    for (var y1 = 0; y1 < game.SIZE; y1++){
                        if (helper(x1, y1)) {
                            switches = true;
                        }
                    }
                }
                break;
            case DOWN:
                for (var x1 = game.SIZE - 2; -1 < x1; x1--) {
                    for (var y1 = 0; y1 < game.SIZE; y1++){
                        if (helper(x1, y1)) {
                            switches = true;
                        }
                    }
                }
                break;
            case LEFT:
                for (var x1 = 0; x1 < game.SIZE; x1++){
                    for (var y1 = 1; y1 < game.SIZE; y1++) {
                        if (helper(x1, y1)) {
                            switches = true;
                        }
                    }
                }
                break;
            case RIGHT:
                for (var y1 = game.SIZE - 2; -1 < y1; y1--) {
                    for (var x1 = 0; x1 < game.SIZE; x1++){
                        if (helper(x1, y1)) {
                            switches = true;
                        }
                    }
                }
                break;
        }
        if (switches) {
            this.fill();
        }
        this.update();
    }
}
function init() {
    var str = "";
    for (var i = 0; i < game.SIZE; i++) {
        game.grid[i] = [];
        for (var j = 0; j < game.SIZE; j++) {
            game.grid[i][j] = 0;
            str += "<div id='" + i + j + "' class='cell'></div>";
        }
    }
    document.getElementById("board").innerHTML = str;
    game.fill();
    game.fill();
    game.update();
}

window.onkeyup = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    switch (key) {
        case 37:
            game.shift(LEFT);
            break;
        case 38:
            game.shift(UP);
            break;
        case 39:
            game.shift(RIGHT);
            break;
        case 40:
            game.shift(DOWN);
            break;
    }
}