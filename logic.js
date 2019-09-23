var cvs = document.getElementById('cvs');
var ctx = cvs.getContext('2d');
var score = document.getElementById('score');
var span = score.getElementsByTagName('span')[0];
var gGame = null;
var dialog = document.getElementsByTagName("dialog")[0];
var button = document.getElementsByTagName("button")[0];
function onLoad() {
        gGame = new Game();
        gGame.update();
}
function endGame() {
    dialog.open = true;
}
function replay() {
    location.reload();
}
function stop() {
    gGame.play  = false;
}
function play() {
    gGame.play  = true;
    gGame.update();
}