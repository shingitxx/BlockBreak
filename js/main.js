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

//スコアの操作
let score = 0;
//プレーヤーのライフ
let lives = 3;

//ブロック変数
let brickRowCount = 3; //ブロックの縦の数
let brickColumnCount = 5; //ブロックの横の数
let brickWidth = 75; //ブロックの幅
let brickHeight = 20; //ブロックの高さ
let brickPadding = 10; //ブロックの内側
let brickOffsetTop = 30; //ブロックの画面上に配置したhtml要素の表示位置を座標で取得(Top)
let brickOffsetLeft = 30; //ブロックの画面上に配置したhtml要素の表示位置を座標で取得(Left)

let bricks = []; //ブロック、レンガ

// 2重構文
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

//ブロックの衝突
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];

      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          //ボールの位置の横幅を考慮とした範囲内 y座標が縦幅を考慮した範囲内
          b.status = 0;
          score++; //ブロックにぶつかる事に計算される

          //ブロック成功で勝利メッセージを表示
          if (score == brickRowCount * brickColumnCount) {
            //掛けてブロックの数が全て無くなったら
            alert("YOU WIN, CONGRATULATIONS!"); //アラートで内容を表示する
            document.location.reload(); //再表示
          }
        }
      }
    }
  }
}

//スコアの計算
function drawScore() {
  ctx.font = "16px Arial"; //スコアの文字
  ctx.fillStyle = "#0095DD"; //スコアのカラー 図形の内側を塗りつぶす
  ctx.fillText("Score:" + score, 8, 20); //スコアのテキストの変更
}

//ライフの計算
function drawLives() {
  ctx.font = "16px Arial"; //スコアの文字
  ctx.fillStyle = "#0095DD"; //スコアのカラー 図形の内側を塗りつぶす
  ctx.fillText("lives:" + lives, canvas.width - 65, 8, 20); //スコアのテキストの変更
}

//ボールを描画する部分
function drawBall() {
  ctx.beginPath(); //現在のパスをリセットする
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false); //ctxのサイズ 円弧の作成に用いる
  ctx.fillStyle = "#0095DD"; //ctxのカラー
  ctx.fill(); //塗り潰し
  ctx.closePath(); //最終座標と開始座標を結び閉じる
}

//ボールをぶつける板
function drawPaddle() {
  ctx.beginPath(); //現在のパスをリセットする
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight); //ctxのサイズ 四角形の作成に用いる
  ctx.fillStyle = "#0095DD"; //ctxのカラー
  ctx.fill(); //塗り潰し
  ctx.closePath(); //最終座標と開始座標を結び閉じる
}

//崩すブロック関係 ブロック描画関数
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    //cよりブロックの横の数が大きい時1増える
    for (let r = 0; r < brickRowCount; r++) {
      //rよりブロックの縦の数が大きい時1増える

      if (bricks[c][r].status == 1) {
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX; //bricks レンガ x方向
        bricks[c][r].y = brickY; //bricks レンガ y方向

        ctx.beginPath(); //現在のパスをリセットする
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD"; //ctxのカラー
        ctx.fill(); //塗り潰し
        ctx.closePath(); //最終座標と開始座標を結び閉じる
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //フレーム削除(線が球体になる)
  drawBall(); //ボールを描画する部分を実行
  drawBricks();
  drawPaddle(); //ボールをぶつける板を実行
  drawScore(); //スコアの実行
  drawLives(); //プレーヤーのライフの実行
  collisionDetection();

  if (y + dy < ballRadius) {
    //衝突検知 ボールの半径
    //上下の壁を作成 ボールを閉じ込める
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    //ボールが下についた場合
    if (x > paddleX && x < paddleX + paddleWidth) {
      if ((y = y - paddleHeight)) {
        dy = -dy;
      }
    } else {
      lives--;

      if (!lives) {
        alert("GAME OVER"); //アラートでゲームオーバーとなる
        document.location.reload(); //再リロード
        clearInterval(interval); //interval解除
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if ((x + dx > canvas.width - ballRadius) | (x + dx < ballRadius)) {
    //左右の壁を作成 ボールを閉じ込める
    dx = -dx;
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 10; //右を押したらパドルを7動かす
    //paddleXの範囲もcanvas内として定義する
    rightPressed = false; //パドルが永遠にループしてしまうのを阻止する
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 10; //左を押したらパドルを7動かす
    //paddleXの範囲もcanvas内として定義する
    leftPressed = false; //パドルが永遠にループしてしまうのを阻止する
  }
  x += dx; //右方向
  y += dy; //下方向
  //xとyにマイフレーム描画した後に小さな値を加えボールを動いているようにする

  requestAnimationFrame(draw); //滑らかにアニメーションができる
}

document.addEventListener("keydown", keyDownHandler, false); //keyDownが押されたら反応する
document.addEventListener("keyUp", keyUpHandler, false); //keyUpが押されたら反応する
document.addEventListener("mousemove", mousemoveHandler, false); //パドルをマウスで操作

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

function mousemoveHandler(e) {
  let relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

// let interval = setInterval(draw, 10); //コマ送りのような感じなのでsetIntervalを使う 10ミリ秒で動く

draw();

// ctx.beginPath(); //現在のパスをリセットする
// ctx.rect(20, 40, 50, 50); //ctxのサイズ rect 四角形を作成に用いる
// ctx.fillStyle = "#FF0000"; //ctxのカラー
// ctx.fill(); //塗り潰し
// ctx.closePath(); //最終座標と開始座標を結び閉じる

// ctx.beginPath(); //現在のパスをリセットする
// ctx.arc(240, 160, 20, 0, Math.PI * 2, false); //ctxのサイズ 円弧の作成に用いる
// ctx.fillStyle = "green"; //ctxのカラー
// ctx.fill(); //塗り潰し
// ctx.closePath(); //最終座標と開始座標を結び閉じる

// ctx.beginPath(); //現在のパスをリセットする
// ctx.rect(160, 10, 100, 40); //ctxのサイズ 円弧の作成に用いる
// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)"; //ctxのカラー
// ctx.stroke(); //枠の色変更
// ctx.closePath(); //最終座標と開始座標を結び閉じる
