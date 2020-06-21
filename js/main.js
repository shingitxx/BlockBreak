"use strict";

let canvas = document.getElementById("myCanvas"); //htmlのidを指定
let ctx = canvas.getContext("2d"); //contextで色や線を書いていく

let x = canvas.width / 2; //x方向÷2
let y = canvas.height - 30; //y方向-30

let dx = 2; //デルタx 右方向
let dy = -2; //デルタy 下方向

let ballRadius = 10; //衝突検知 ボールの半径を定義

let paddleHeight = 10; //ボールにぶつかる板
let paddleWidth = 75; //ボールにぶつかる板
let paddleX = (canvas.width - paddleWidth) / 2;

//板の操作
let rightPressed = false; //右の矢印のフラグ 押されてなかったらfalse
let leftPressed = false; //左の矢印のフラグ 押されてなかったらfalse

function drawBall() {
  //ボールを描画する部分
  ctx.beginPath(); //現在のパスをリセットする
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false); //ctxのサイズ 円弧の作成に用いる
  ctx.fillStyle = "#0095DD"; //ctxのカラー
  ctx.fill(); //塗り潰し
  ctx.closePath(); //最終座標と開始座標を結び閉じる
}

function drawPaddle() {
  //ボールをぶつける板
  ctx.beginPath(); //現在のパスをリセットする
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight); //ctxのサイズ 四角形の作成に用いる
  ctx.fillStyle = "#0095DD"; //ctxのカラー
  ctx.fill(); //塗り潰し
  ctx.closePath(); //最終座標と開始座標を結び閉じる
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //フレーム削除(線が球体になる)
  drawBall(); //ボールを描画する部分を実行
  drawPaddle(); //ボールをぶつける板を実行

  if ((y + dy > canvas.height - ballRadius) | (y + dy < ballRadius)) {
    //上下の壁を作成 ボールを閉じ込める
    dy = -dy;
  }

  if ((x + dx > canvas.width - ballRadius) | (x + dx < ballRadius)) {
    //左右の壁を作成 ボールを閉じ込める
    dx = -dx;
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7; //右を押したらパドルを7動かす
    //paddleXの範囲もcanvas内として定義する
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7; //左を押したらパドルを7動かす
    //paddleXの範囲もcanvas内として定義する
  }

  x += dx; //右方向
  y += dy; //下方向
  //xとyにマイフレーム描画した後に小さな値を加えボールを動いているようにする
}

document.addEventListener("keydown", keyDownHandler, false); //keyDownが押されたら反応する
document.addEventListener("keyUp", keyUpHandler, false); //keyUpが押されたら反応する

function keyDownHandler(e) {
  // keyDown ボタンを押している時
  if (e.key == "Right" || e.key == "ArrowRight") {
    //右矢印ArrowRight 右矢印が押されたらtrue
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    //左矢印ArrowLeft 左矢印が押されたらfalse
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  //keyUp ボタンを押していない時
  if (e.key == "Right" || e.key == "ArrowRight") {
    //左矢印ArrowRight 左矢印が押されたらfalse
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    //左矢印ArrowRight 左矢印が押されたらfalse
    leftPressed = false;
  }
}

setInterval(draw, 10); //コマ送りのような感じなのでsetIntervalを使う 10ミリ秒で動く

ctx.beginPath(); //現在のパスをリセットする
ctx.rect(20, 40, 50, 50); //ctxのサイズ rect 四角形を作成に用いる
ctx.fillStyle = "#FF0000"; //ctxのカラー
ctx.fill(); //塗り潰し
ctx.closePath(); //最終座標と開始座標を結び閉じる

ctx.beginPath(); //現在のパスをリセットする
ctx.arc(240, 160, 20, 0, Math.PI * 2, false); //ctxのサイズ 円弧の作成に用いる
ctx.fillStyle = "green"; //ctxのカラー
ctx.fill(); //塗り潰し
ctx.closePath(); //最終座標と開始座標を結び閉じる

ctx.beginPath(); //現在のパスをリセットする
ctx.rect(160, 10, 100, 40); //ctxのサイズ 円弧の作成に用いる
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)"; //ctxのカラー
ctx.stroke(); //枠の色変更
ctx.closePath(); //最終座標と開始座標を結び閉じる
