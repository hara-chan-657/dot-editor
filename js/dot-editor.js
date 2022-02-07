///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////　　以下プロパティ   //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

//================================ 各種変数 ===============================================//

//パレット用色配列
var paletteColors = [
	 '#000000','#f0f8ff','#008b8b','#ffffe0','#ff7f50','#696969','#e6e6fa','#008080','#fafad2','#ff6347'
	,'#808080','#b0c4de','#2f4f4f','#fffacd','#ff4500','#a9a9a9','#778899','#006400','#f5deb3','#ff0000'
	,'#c0c0c0','#708090','#008000','#deb887','#dc143c','#d3d3d3','#4682b4','#228b22','#d2b48c','#c71585'
	,'#dcdcdc','#4169e1','#2e8b57','#f0e68c','#ff1493','#f5f5f5','#191970','#3cb371','#ffff00','#ff69b4'
	,'#ffffff','#000080','#66cdaa','#ffd700','#db7093','#fffafa','#00008b','#8fbc8f','#ffa500','#ffc0cb'
	,'#f8f8ff','#0000cd','#7fffd4','#f4a460','#ffb6c1','#fffaf0','#0000ff','#98fb98','#ff8c00','#d8bfd8'
	,'#faf0e6','#1e90ff','#90ee90','#daa520','#ff00ff','#faebd7','#6495ed','#00ff7f','#cd853f','#ff00ff'
	,'#ffefd5','#00bfff','#00fa9a','#b8860b','#ee82ee','#ffebcd','#87cefa','#7cfc00','#d2691e','#dda0dd'
	,'#ffe4c4','#87ceeb','#7fff00','#a0522d','#da70d6','#ffe4b5','#add8e6','#adff2f','#8b4513','#ba55d3'
	,'#ffdead','#b0e0e6','#00ff00','#800000','#9932cc','#ffdab9','#afeeee','#32cd32','#8b0000','#9400d3'
	,'#ffe4e1','#e0ffff','#9acd32','#a52a2a','#8b008b','#fff0f5','#00ffff','#556b2f','#b22222','#800080'
	,'#fff5ee','#00ffff','#6b8e23','#cd5c5c','#4b0082','#fdf5e6','#40e0d0','#808000','#bc8f8f','#483d8b'
	,'#fffff0','#48d1cc','#bdb76b','#e9967a','#8a2be2','#f0fff0','#00ced1','#eee8aa','#f08080','#9370db'
	,'#f5fffa','#20b2aa','#fff8dc','#fa8072','#6a5acd','#f0ffff','#5f9ea0','#f5f5dc','#ffa07a','#7b68ee'
];

//canvas縦
var canvasHeight = 480;
//canvas横
var canvasWidth = 480;
//canvasBGcontainerPadding
var canvasBGcontainerPadding = 32;
//canvasBGcontainer縦
var canvasBGcontainerHeight = canvasHeight;
//canvasBGcontainer横
var canvasBGcontainerWidth = canvasWidth;
//ダウンロード用縦
var downloadHeight = 0;
//ダウンロード用横
var downloadWidth = 0;
//ドットの大きさ
var dotLength = 0;
//塗りつぶし配列
var fillingCells = [];
//戻る用配列
var backArray = [];
//進む用配列
var forwardArray = [];
//ドラッグフラグ
var draggingFlg = false;
//canvas変更フラグ
var canvasChangeFlg = false;
//色付き配列にプッシュするセル変数
var pushCell = [];
//ミニマムセル
var minCell = 0;
//最小行数
var minRowNum = 0;
//列数
var minColNum = 0;
//スタートx
var sx = 0;
//スタートy
var sy = 0;
//エンドx
var ex = 0;
//エンドy
var ey = 0;
//図形色ぬりセル
var figureColoredCells = [];
//退避canvasデータ
var evacuateCanvas;
//ファイル読み込み回数（不本意な実装）
var readTimeTotal = 0;

//================================ 各種エレメント ===============================================//
//オプションズ
var options = document.getElementById('options');
//オプション
var option = document.getElementsByClassName('option');
//プレビューコンテナ
var previewContainer = document.getElementById('preview-container');
//プレビュー
var preview = document.getElementById('preview');
//キャンバスコンテナ
var canvasContainer = document.getElementById('canvas-container');
//キャンバスBGコンテナ
var canvasBGcontainer = document.getElementById('canvasBG-container');
//キャンバスBG
var canvasBG = document.getElementById('canvasBG');
//キャンバス
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
//ヒドゥンキャンバス
var hiddenCanvas = document.getElementById('hiddenCanvas');
var hiddenContext = hiddenCanvas.getContext('2d');
//context.strokeStyle = "rgb(0, 0, 255)"; // 青;a
//プレビュー誘導ボタンコンテナ
var previewLinkContainer = document.getElementById('preview-link-container');
//プレビュー誘導ボタン
var previewLink = document.getElementById('preview-link');
//プレビューオプションコンテナ
var previewOptionsContainer = document.getElementById('previewOptions-container');
//書き直しボタン
var rewrite = document.getElementById('rewrite');
//ダウンロードボタン
var DlLink = document.getElementById('download-link');
//ファイル読み込みボタン
var readFile = document.getElementById('readFile');
//シフト左
var shiftLeft = document.getElementById('shiftLeft');
//シフト右
var shiftRight = document.getElementById('shiftRight');
//シフト上
var shiftAbove = document.getElementById('shiftAbove');
//シフト下
var shiftBelow = document.getElementById('shiftBelow');
//左右反転
var reverseLeftRight = document.getElementById('reverseLeftRight');
//上下反転
var reverseUpDown = document.getElementById('reverseUpDown');
//90度回転
var reverse90degree = document.getElementById('reverse90degree');
//戻る
var back = document.getElementById('back');
//進む
var forward = document.getElementById('forward');
//ダウンロードサイズセレクトコンテナ
var downloadSizeContainer = document.getElementById('downloadSize-container');
//ダウンロードサイズ縦
var downloadSizeSelectHeight = document.getElementById('downloadSizeSelectHeight');
//ダウンロードサイズ横
var downloadSizeSelectWidth = document.getElementById('downloadSizeSelectWidth');
//ドットサイズセレクトボックス
var dotSizeSelect = document.getElementById('dotSizeSelect');
//現在モード要素
var currentModeElement = document.getElementsByClassName('mode-on');
//消しゴム
var eraser = document.getElementById('eraser');
//塗りつぶし
var fill = document.getElementById('fill');
//ノーマル
var normal = document.getElementById('normal');
//円
var circle = document.getElementById('circle');
//塗りつぶし円
var fillCircle = document.getElementById('fill-circle');
//四角
var square = document.getElementById('square');
//塗りつぶし四角
var fillSquare = document.getElementById('fill-square');
//直線
var straightLine = document.getElementById('straight-line');
//カラーピッカー
var colorPicker = document.getElementById('colorPicker');
//パレットコンテナ
var paletteContainer = document.getElementById('palette-container');
//パレット
var palette = document.getElementById('palette');
//現在色
var currentColor = document.getElementById('currentColor');
//現在色canvas
var currentColorCanvas = document.getElementById('currentColorCanvas');
var context2 = currentColorCanvas.getContext('2d');
//新規プロジェクト作成ボタン
if (document.getElementById('make-project') != null) {
	var makeProject = document.getElementById('make-project');
	makeProject.addEventListener('click', makeProjectToSever, false);
}
//この内容で保存ボタン(マップチップ)
if (document.getElementById('save-maptip-data') != null) {
	var saveMaptipData = document.getElementById('save-maptip-data');
	saveMaptipData.addEventListener('click', saveMaptipDataToSever, false);
}
//この内容で保存ボタン（キャラクター）
if (document.getElementById('save-character-data') != null) {
	var saveMaptipData = document.getElementById('save-character-data');
	saveMaptipData.addEventListener('click', saveCharacterImageDataToSever, false);
}
//この内容で保存ボタン（オブジェクト）
if (document.getElementById('save-object-data') != null) {
	var saveObjectData = document.getElementById('save-object-data');
	saveObjectData.addEventListener('click', saveObjectDataToSever, false);
}
//この内容で保存ボタン（カットシーン）
if (document.getElementById('save-cut-scene-data') != null) {
	var saveCutSceneData = document.getElementById('save-cut-scene-data');
	saveCutSceneData.addEventListener('click', saveCutSceneDataToSever, false);
}
//ドット絵変換
var makeDotsPic = document.getElementById('make-dots-picture');
//ハーフモード
var halfMode = document.getElementById('half-mode');
//展開ボタン
var unfoldButtons = document.getElementsByClassName('unfoldButton');
//折り込みボタン
var foldButtons = document.getElementsByClassName('foldButton');
//バックアップイメージ
var bkImages = document.getElementsByClassName('bkImages');
//バックアップイメージ削除
var delBkImg = document.getElementsByClassName('delBkImg');
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////　　以下イベント   ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
window.addEventListener('load', setDefault, false);
// History APIが使用可能ブラウザか確認
if(history && history.pushState && history.state != undefined){
	// ブラウザの履歴に戻る無効を追加
	history.pushState(null, null, null);
	// 戻るボタン押下でイベント発動
	window.addEventListener("popstate", function() {
	// 確認メッセージ表示
	window.onbeforeunload = function(e) {
	return 'このページから離れますか？';
	};
	// このページを離れるを押した場合さらに１つ履歴を戻る
	// (通常のブラウザバックと同じ挙動)
	// ページを離れない場合は再度ブラウザ戻るボタンを押した時用に
	// 履歴無効を追加
	history.go(-1);
	history.pushState(null, null, null);
	});
}
window.addEventListener('beforeunload', function (evt) {evt.returnValue =  'ほんと？'}, false);
document.addEventListener('keydown', function (evt) {doKeyEvent(evt);}, false);
//options.addEventListener('mouseenter', showDetail, false);
for (var i=0; i<option.length; i++) {
	option[i].addEventListener('mouseenter', function(evt) {showDetail(evt);}, false);
}
for (var i=0; i<option.length; i++) {
	option[i].addEventListener('mouseleave', function(evt) {hideDetail(evt);}, false);
}
canvas.addEventListener('mousedown', changeCellColor, false);
canvas.addEventListener('mousemove', function (evt) {if (draggingFlg == true) changeCellColor(evt);}, false);
canvas.addEventListener('mouseup', function () {if (draggingFlg == true) setDraggingFlg(false); setRealChip();}, false);
canvas.addEventListener('mouseenter', function (evt) {if (draggingFlg == true) changeCellColor(evt);}, false);
canvasContainer.addEventListener('mousedown', function () {
	var currentModeId = currentModeElement[0].id;
	if (draggingFlg == false) {
		if (currentModeId == 'eraser' || currentModeId == 'normal') {
			setDraggingFlg(true);
		}
	}
}, false);
canvasContainer.addEventListener('mouseup', function () {
	var currentModeId = currentModeElement[0].id;
	if (draggingFlg == true) {
			setDraggingFlg(false);
			setRealChip();
	}
}, false);
back.addEventListener('click', function() {if (backArray.length > 0) doBack();}, false);
forward.addEventListener('click', function() {if (forwardArray.length > 0) doForward();}, false);
previewLink.addEventListener('click', showPreview, false);
rewrite.addEventListener('click', doRewrite, false);
DlLink.addEventListener('click', downloadCanvas, false);
readFile.addEventListener('change', function (evt) {readImgFile(evt);}, false);
reverseLeftRight.addEventListener('click', function () {reverseCanvas('leftRight');}, false);
reverseUpDown.addEventListener('click', function () {reverseCanvas('upDown');}, false);
reverse90degree.addEventListener('click', function () {reverseCanvas('90degree');}, false);
shiftLeft.addEventListener('click', function () {shiftCanvas('left');}, false);
shiftRight.addEventListener('click', function () {shiftCanvas('right');}, false);
shiftAbove.addEventListener('click', function () {shiftCanvas('above');}, false);
shiftBelow.addEventListener('click', function () {shiftCanvas('below');}, false);
downloadSizeSelectHeight.addEventListener('change', function () {setDownloadSize('change');}, false);
downloadSizeSelectWidth.addEventListener('change', function () {setDownloadSize('change');}, false);
dotSizeSelect.addEventListener('change', function () {setDotSize('change');}, false);
eraser.addEventListener('click', setCurrentMode, false);
fill.addEventListener('click', setCurrentMode, false);
normal.addEventListener('click', setCurrentMode, false);
circle.addEventListener('click', setCurrentMode, false);
fillCircle.addEventListener('click', setCurrentMode, false);
square.addEventListener('click', setCurrentMode, false);
fillSquare.addEventListener('click', setCurrentMode, false);
straightLine.addEventListener('click', setCurrentMode, false);
colorPicker.addEventListener('click', setCurrentMode, false);
makeDotsPic.addEventListener('click', makeDotsPicture, false);
for (var i=0; i<unfoldButtons.length; i++) {
	unfoldButtons[i].addEventListener('click', function(evt) {changeCategoryDisplay(evt, 'unfold');}, false);
}
for (var i=0; i<foldButtons.length; i++) {
	foldButtons[i].addEventListener('click', function(evt) {changeCategoryDisplay(evt, 'fold');}, false);
}
for (var i=0; i<bkImages.length; i++) {
	bkImages[i].addEventListener('click', function(evt) {setBkImage(evt);}, false);
}
for (var i=0; i<delBkImg.length; i++) {
	delBkImg[i].addEventListener('click', function(evt) {deleteBkImg(evt);}, false);
}
///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////　　以下ファンクション   //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

//ロード時、各デフォルトの値をセットするために呼ばれる
function setDefault() {
	setRealChip();
	showPalette();
	setCurrentMode();
	setCanvas('load');
	setCurrentColor();
	setDotSize('load');
	setDownloadSize('load');
	setMinCell();
	setMinRowAndCol();
//	setBackGround();//背景の罫線を描画する為だけのファンクション。普段はoff
}

//キーボードからの入力でイベントを実行する
function doKeyEvent (evt) {
	// //戻る
	// if (evt.key === 'z' && (evt.ctrlKey || evt.metaKey)) {
	// 	if (backArray.length > 0) {
	// 		doBack();
	// 	}
	// //進む
	// } else if (evt.key === 'u' && (evt.ctrlKey || event.metaKey)) {
	// 	if (forwardArray.length > 0) {
	// 		doForward();
	// 	}
	// } else if (evt.key === 'e' && (evt.ctrlKey || event.metaKey)) {
	// 	eraser.click(this);
	// } else if (evt.key === 'c' && (evt.ctrlKey || event.metaKey)) {
	// 	colorPicker.click(this);
	// } else if (evt.key === 'd' && (evt.ctrlKey || event.metaKey)) {
	// 	normal.click(this);
	// } else if (evt.key === 'ArrowLeft' && (evt.ctrlKey || event.metaKey)) {
	// 	shiftCanvas('left');
	// } else if (evt.key === 'ArrowRight' && (evt.ctrlKey || event.metaKey)) {
	// 	shiftCanvas('right');
	// } else if (evt.key === 'ArrowUp' && (evt.ctrlKey || event.metaKey)) {
	// 	shiftCanvas('above');
	// } else if (evt.key === 'ArrowDown' && (evt.ctrlKey || event.metaKey)) {
	// 	shiftCanvas('below');
	// }
		//戻る
	if (evt.key === 'a') {
		if (backArray.length > 0) {
			doBack();
		}
	//進む
	} else if (evt.key === 's') {
		if (forwardArray.length > 0) {
			doForward();
		}
	} else if (evt.key === 'd') {
		eraser.click(this);
	} else if (evt.key === 'f') {
		normal.click(this);
	} else if (evt.key === 'g') {
		colorPicker.click(this);
	} else if (evt.key === 'v') {
		straightLine.click(this);
	} else if (evt.key === 'b') {
		fill.click(this);
	} else if (evt.key === 'q') {
		circle.click(this);
	} else if (evt.key === 'w') {
		fillCircle.click(this);
	} else if (evt.key === 'e') {
		square.click(this);
	} else if (evt.key === 'r') {
		fillSquare.click(this);
	} else if (evt.key === 'ArrowLeft') {
		shiftCanvas('left');
	} else if (evt.key === 'ArrowRight') {
		shiftCanvas('right');
	} else if (evt.key === 'ArrowUp') {
		shiftCanvas('above');
	} else if (evt.key === 'ArrowDown') {
		shiftCanvas('below');
	} else if (evt.key === '1') {
		dotSizeSelect.options[0].selected = true;
		setDotSize('change');
	} else if (evt.key === '2') {
		dotSizeSelect.options[1].selected = true;
		setDotSize('change');
	} else if (evt.key === '3') {
		dotSizeSelect.options[2].selected = true;
		setDotSize('change');
	} else if (evt.key === '4') {
		dotSizeSelect.options[3].selected = true;
		setDotSize('change');
	} else {
		return;
	}
}

//オプションの詳細を表示する
function showDetail(evt) {
	var hoverSpan = evt.target;
	var z2 = hoverSpan.lastChild;
	z2.style.display = "inline";
	//現在モードでなければ現在モード要素を入れ替える
	if (hoverSpan.style.backgroundColor != "yellow") {
		hoverSpan.style.backgroundColor = "khaki";
	} else {
		//何もしない
	}
}

//オプションの詳細を非表示にする
function hideDetail(evt) {
	var hoverSpan = evt.target;
	var z2 = hoverSpan.lastChild;
	z2.style.display = "none";
	//現在モードでなければ現在モード要素を入れ替える
	if (hoverSpan.style.backgroundColor != "yellow") {
		hoverSpan.style.backgroundColor = "";
	} else {
		//何もしない
	}
}

//ファイルを読み込む
//このファンクションだけほぼ外注
function readImgFile(evt) {
    // ファイル情報を取得
    var fileData = evt.target.files[0];
    // 画像ファイル以外は処理を止める
    if(!fileData.type.match('image.*')) {
        alert('画像を選択してください');
        return;
    }
    // FileReaderオブジェクトを使ってファイル読み込み
    var reader = new FileReader();
    // ファイル読み込みに成功したときの処理
    reader.onload = function() {
        // Canvas上に表示する
        uploadImgSrc = reader.result;
        canvasDraw();
    }
    // ファイル読み込みを実行
    reader.readAsDataURL(fileData);
    // ファイルが指定された時にreadImgFile()を実行
    readFile.addEventListener('change', readImgFile, false);
    // Canvas上に画像を表示する
    function canvasDraw() {
        // Canvas上に画像を表示
        var img = new Image();
        img.src = uploadImgSrc;
        img.onload = function() {
            context.drawImage(img, 0, 0, canvasWidth, this.height * (canvasWidth / this.width));
            //戻る・進む用
            canvasChangeFlg = true;
            setDraggingFlg(false, true);
        }
    }
}

//canvasを反転する
//param1 : mode
function reverseCanvas (mode) {
	if (mode == 'leftRight') {
		//キャンバスデータ取得
		var reverseCanvasData = [];
		for (var i=0; i<minRowNum; i++) {
			reverseCanvasData[i] = [];
			for (var j=0; j<minColNum; j++) {
				reverseCanvasData[i][j] = context.getImageData(j*minCell, i*minCell, minCell, minCell);
			}
		}
		context.clearRect(0,0,canvasWidth,canvasHeight);
		//左右反転させて描画
		for (var i=0; i<minRowNum; i++) {
			for (var j=0; j<minColNum; j++) {
				context.putImageData(reverseCanvasData[i][minColNum-j-1],j*minCell,i*minCell);
			}
		}
	} else if (mode == 'upDown') {
		//キャンバスデータ取得
		var reverseCanvasData = [];
		for (var i=0; i<minRowNum; i++) {
			reverseCanvasData[i] = [];
			for (var j=0; j<minColNum; j++) {
				reverseCanvasData[i][j] = context.getImageData(j*minCell, i*minCell, minCell, minCell);
			}
		}
		context.clearRect(0,0,canvasWidth,canvasHeight);
		//上下反転させて描画
		for (var i=0; i<minRowNum; i++) {
			for (var j=0; j<minColNum; j++) {
				context.putImageData(reverseCanvasData[minRowNum-i-1][j],j*minCell,i*minCell);
			}
		}
	} else if (mode == '90degree') {
		//キャンバスデータ取得
		var reverseCanvasData = [];
		for (var i=0; i<minRowNum; i++) {
			reverseCanvasData[i] = [];
			for (var j=0; j<minColNum; j++) {
				reverseCanvasData[i][j] = context.getImageData(j*minCell, i*minCell, minCell, minCell);
			}
		}
		context.clearRect(0,0,canvasWidth,canvasHeight);
		//90度回転させて描画
		for (var i=0; i<minRowNum; i++) {
			for (var j=0; j<minColNum; j++) {
				context.putImageData(reverseCanvasData[i][j],(minColNum-i-1)*minCell,j*minCell);
			}
		}
	}
	//戻る・進む用
	canvasChangeFlg = true;
	setDraggingFlg(false);
}

//キャンバスを上下左右にシフトする
function shiftCanvas (direction) {
	if (direction == 'left') {
	//左シフト
		var leftLine = context.getImageData(0, 0, dotLength, canvasHeight);
		var other = context.getImageData(dotLength, 0, canvasWidth-dotLength, canvasHeight);
		context.clearRect(0,0,canvasWidth,canvasHeight);
		context.putImageData(leftLine, canvasWidth-dotLength, 0);
		context.putImageData(other, 0, 0);
	} else if (direction == 'right') {
	//右シフト
		var rightLine = context.getImageData(canvasWidth-dotLength, 0, dotLength, canvasHeight);
		var other = context.getImageData(0, 0, canvasWidth-dotLength, canvasHeight);
		context.clearRect(0,0,canvasWidth,canvasHeight);
		context.putImageData(rightLine, 0, 0);
		context.putImageData(other, dotLength, 0);
	} else if (direction == 'above') {
	//上シフト
		var aboveLine = context.getImageData(0, 0, canvasWidth, dotLength);
		var other = context.getImageData(0, dotLength, canvasWidth, canvasHeight-dotLength);
		context.clearRect(0,0,canvasWidth,canvasHeight);
		context.putImageData(aboveLine, 0, canvasHeight-dotLength);
		context.putImageData(other, 0, 0);
	} else if (direction == 'below') {
	//下シフト
		var belowLine = context.getImageData(0, canvasHeight-dotLength, canvasWidth, dotLength);
		var other = context.getImageData(0, 0, canvasWidth, canvasHeight-dotLength);
		context.clearRect(0,0,canvasWidth,canvasHeight);
		context.putImageData(belowLine, 0, 0);
		context.putImageData(other, 0, dotLength);
	} else {
		//何もしない
	}
	//戻る・進む用
	canvasChangeFlg = true;
	setDraggingFlg(false);
}

//背景罫線を描画するためのファンクション（普段はoff）
function setBackGround () {
	for (var i=0; i<120; i++) {
		for (var j=0; j<120; j++) {
			context.strokeStyle = 'blue';
			context.strokeRect(4*i,4*j,4,4);
		}
	}
}

//canvasを一動作前の状態に戻す
function doBack() {
	//戻るよう配列の最後（最新）のデータを、進む用配列に退避
	var lastData = backArray[backArray.length-1];
	backArray.pop();
	forwardArray.push(lastData);
	//canvasをクリア
	context.clearRect(0,0,canvasWidth,canvasHeight);
	//一個前（だった）の戻る用配列のcanvasを表示
	if (backArray.length > 0) {
		var preCanvas = backArray[backArray.length-1];
		context.putImageData(preCanvas,0,0);
	} else {
		//もう戻れない場合は何もせず、戻るを非活性に
		back.style.display = "none";
		backDummy.style.display = "inline";
	}
	if (forwardArray.length > 0) {
		forwardDummy.style.display = "none";
		forward.style.display = "inline";
	}
}

//canvasの状態を戻したものを一個進める
function doForward () {
	//進めるよう配列から、戻るよう配列に戻す
	var lastData = forwardArray[forwardArray.length-1];
	forwardArray.pop();
	backArray.push(lastData);
	back.style.display = "inline";
	backDummy.style.display = "none";
	//canvasをクリア
	context.clearRect(0,0,canvasWidth,canvasHeight);
	//最新の戻る用配列のcanvasを表示
	var newCanvas = backArray[backArray.length-1];
	context.putImageData(newCanvas,0,0);
	//進む配列がなくなった段階で進むを非活性に
	if (forwardArray.length == 0) {
		forwardDummy.style.display = "inline";
		forward.style.display = "none";
	}
}

//canvasの最小のセルの一辺の長さを設定する
function setMinCell () {
	var options = dotSizeSelect.children;
	var values = [];
	for (var i=0; i<options.length; i++) {
		values.push(options[i].value);
	}
	minCell = Math.min.apply(null, values);
}

//canvasの最小行数と最小列数をセットする
function setMinRowAndCol() {
	minRowNum = canvasHeight/minCell;
	minColNum = canvasWidth/minCell;
}

//ドラッグフラグをセットする
//falseをセットする場合にcanvasが変更されていた場合、一動作終了とみなす
//円モードだった場合、最後に描画されていた円を退避していたcanvasとマージしてから動作終了させる
//param1 : boolean
//param2 : boolean(ファイル読み込み時のみ）
function setDraggingFlg (bool, readFileFlg) {
	draggingFlg = bool;
	var currentModeId = currentModeElement[0].id;
	if (bool == false) {
		if (currentModeId == 'circle' ||
			currentModeId == 'fill-circle' ||
			currentModeId == 'square' ||
			currentModeId == 'fill-square' ||
			currentModeId == 'straight-line') {
			canvas.style.backgroundImage = 'url()';
			context.clearRect(0,0,canvasWidth,canvasHeight);
			context.putImageData(evacuateCanvas,0,0);
			var cellColorData2 = context2.getImageData(0, 0, 1, 1);
			for (var i=0; i<figureColoredCells.length; i++) {
				//今回塗りつぶしセルについて、ミニマムセル単位で違う色かどうか調べる
				for (var j=0; j<dotLength/minCell; j++) {
					if (canvasChangeFlg == true) {
						break;
					}
					for (var k=0; k<dotLength/minCell; k++) {
						var gotColor = context.getImageData(figureColoredCells[i][0]+k*minCell,figureColoredCells[i][1]+j*minCell,1,1);
						if (gotColor.data[0] != cellColorData2.data[0]
						 || gotColor.data[1] != cellColorData2.data[1]
						 || gotColor.data[2] != cellColorData2.data[2]
						 || gotColor.data[3] != cellColorData2.data[3]) {
							canvasChangeFlg = true;
							break;
						}
					}
				}
				context.fillRect(figureColoredCells[i][0],figureColoredCells[i][1],dotLength,dotLength);
			}
		}
		//やむなく実装、、
		if (readFileFlg == true) {
			if (readTimeTotal >= 1) {
				readTimeTotal = 0;
				return;
			}
			readTimeTotal++;
		}
	}
	if (!bool && canvasChangeFlg == true) {
		//進む配列初期化
		forwardArray = [];
		forward.style.display = "none";
		forwardDummy.style.display = "inline";
		//戻る用配列更新
		backArray.push(context.getImageData(0,0,canvasWidth,canvasHeight));
		//canvas変更フラグも元に戻す
		canvasChangeFlg = false;
		//戻るを活性化
		backDummy.style.display = "none";
		back.style.display = "inline";
	}
}

//セルが同じ色かどうか調べる
//param1 : セル
//return 同色 : true, 異色 : false
function isSameColoredCell (cell1, cell2) {
	if (cell2 === undefined || cell2 === null) {
		//現在色との比較
		var cellColorData = context.getImageData(cell1[0]*minCell, cell1[1]*minCell, 1, 1);
		var cellColorData2 = context2.getImageData(0, 0, 1, 1);
		if (cellColorData.data[0] == cellColorData2.data[0]
		 && cellColorData.data[1] == cellColorData2.data[1]
		 && cellColorData.data[2] == cellColorData2.data[2]
		 && cellColorData.data[3] == cellColorData2.data[3]) {
			return true;
		}
		return false;
	}
	//cell2との比較
	var cellColorData = context.getImageData(cell1[0]*minCell, cell1[1]*minCell, 1, 1);
	var cellColorData2 = context.getImageData(cell2[0]*minCell, cell2[1]*minCell, 1, 1);
	if (cellColorData.data[0] == cellColorData2.data[0]
	 && cellColorData.data[1] == cellColorData2.data[1]
	 && cellColorData.data[2] == cellColorData2.data[2]
	 && cellColorData.data[3] == cellColorData2.data[3]) {
		return true;
	}
	return false;
}

//セルが色付きならtrue、色がついてなければfalseを返す
function isColoredCell (cell) {
	//現在色との比較
	var cellColorData = context.getImageData(cell[0]*minCell, cell[1]*minCell, 1, 1);
	if (cellColorData.data[0] == 0
	 && cellColorData.data[1] == 0
	 && cellColorData.data[2] == 0
	 && cellColorData.data[3] == 0) {
		return false;
	}
	return true;
}

//セルの色を変える
//param1 : クリック時イベント情報
function changeCellColor(evt) {
	//クリックした座標を取得する
	var mousePos = getMousePosition(canvas, evt);
	var x = mousePos.x;
	var y = mousePos.y;
	//クリックされたセルを返す
	var cell = getCurrentCell(x,y);
	//現在モードid取得
	var currentModeId = currentModeElement[0].id;

	switch (currentModeId) {
		case 'eraser':
			//ドラッグフラグ変更
			setDraggingFlg(true);
			//色付きかどうか調べる
			if (halfModeFlg) {
				//現在ドットサイズでの塗りつぶしスタート位置
				var startX = Math.floor(x/dotLength);
				var startY = Math.floor(y/dotLength);
				//消す
				context.clearRect(dotLength*startX,dotLength*startY,dotLength,dotLength);
				//現在ドットサイズでの塗りつぶしスタート位置（反対側）
				startX = (canvasWidth/dotLength)-1-startX;
				context.clearRect(dotLength*startX,dotLength*startY,dotLength,dotLength);
				//canvas変更フラグ変更
				canvasChangeFlg = true

			} else {
				if (isColoredCell(cell)) {
					//現在ドットサイズでの塗りつぶしスタート位置
					var startX = Math.floor(x/dotLength);
					var startY = Math.floor(y/dotLength);
					//消す
					context.clearRect(dotLength*startX,dotLength*startY,dotLength,dotLength);
					//canvas変更フラグ変更
					canvasChangeFlg = true
				}
				//色付きでなければ何もしない
			}
			break;

		case 'fill':
			//ドラッグフラグ変更
			setDraggingFlg(true);
			//同じ色かどうか調べる
			var result = isSameColoredCell(cell);
			if (!result) {
				//塗りつぶし配列にプッシュ
				fillingCells = [];
				fillingCells.push(cell);
				//次回チェックセル配列
				var nextCheckCells = [];
				//上下左右のセル
				var aboveCell = [cell[0], cell[1]-1];
				var rightCell = [cell[0]+1, cell[1]];
				var belowCell = [cell[0], cell[1]+1];
				var leftCell = [cell[0]-1, cell[1]];
				//一個上のセルが一番上の行より上でない、かつ同じ色のセルならば、次回チェックセルにプッシュ
				if (aboveCell[1] >= 0 && isSameColoredCell(aboveCell, cell)) nextCheckCells.push(aboveCell);
				//一個右のセルが一番右の列より右でない、かつ同じ色のセルならば、次回チェックセルにプッシュ
				if (rightCell[0] < minColNum && isSameColoredCell(rightCell, cell)) nextCheckCells.push(rightCell);
				//一個下のセルが一番下の行より下でない、かつ同じ色のセルならばば、次回チェックセルにプッシュ
				if (belowCell[1] < minRowNum && isSameColoredCell(belowCell, cell)) nextCheckCells.push(belowCell);
				//一個左のセルが一番左の列より左でない、かつ同じ色のセルならば、次回チェックセルにプッシュ
				if (leftCell[0] >= 0 && isSameColoredCell(leftCell, cell)) nextCheckCells.push(leftCell);
				//次回チェックセル配列のセルを順番にチェックしていく
				for (var i=0; i<nextCheckCells.length; i++) {
					//塗りつぶし配列にプッシュ
					fillingCells.push(nextCheckCells[i]);
					//上下左右のセルについて次回チェックセルに追加するかの判定
					aboveCell = [nextCheckCells[i][0], nextCheckCells[i][1]-1];
					rightCell = [nextCheckCells[i][0]+1, nextCheckCells[i][1]];
					belowCell = [nextCheckCells[i][0], nextCheckCells[i][1]+1];
					leftCell = [nextCheckCells[i][0]-1, nextCheckCells[i][1]];
					//一個上のセルが一番上の行より上でない、かつ同じ色のセル、かつ次回チェックセルにない場合、次回チェックセルにプッシュ
					if (aboveCell[1] >= 0 && isSameColoredCell(aboveCell, cell) && !isCellExist(nextCheckCells, aboveCell)) nextCheckCells.push(aboveCell);
					//一個右のセルが一番右の列より右でない、かつ同じ色のセル、かつ次回チェックセルにない場合、次回チェックセルにプッシュ
					if (rightCell[0] < minColNum && isSameColoredCell(rightCell, cell) && !isCellExist(nextCheckCells, rightCell)) nextCheckCells.push(rightCell);
					//一個下のセルが一番下の行より下でない、かつ同じ色のセル、かつ次回チェックセルにない場合、次回チェックセルにプッシュ
					if (belowCell[1] < minRowNum && isSameColoredCell(belowCell, cell) && !isCellExist(nextCheckCells, belowCell)) nextCheckCells.push(belowCell);
					//一個左のセルが一番左の列より左でない、かつ同じ色のセル、かつ次回チェックセルにない場合、次回チェックセルにプッシュ
					if (leftCell[0] >= 0 && isSameColoredCell(leftCell, cell) && !isCellExist(nextCheckCells, leftCell)) nextCheckCells.push(leftCell);
				}
				//塗りつぶし配列を、まとめて塗りつぶし
				for (var i=0; i<fillingCells.length; i++) {
					context.fillStyle = currentColor.style.backgroundColor;
					context.fillRect(minCell*fillingCells[i][0],minCell*fillingCells[i][1],minCell,minCell);
				}
				//canvas変更フラグ変更
				canvasChangeFlg = true;
			}
			//同じ色なら何もしない
			break;

		case 'normal':
			//ドラッグフラグ変更
			setDraggingFlg(true);
			if (halfModeFlg) {
				//ハーフモードの場合
				//同じ色かどうかの判定を行わない（けっこう複雑になりそうなので、、）。
				//現在ドットサイズでの塗りつぶしスタート位置
				var startX = Math.floor(x/dotLength);
				var startY = Math.floor(y/dotLength);
				//色ぬり
				context.fillStyle = currentColor.style.backgroundColor;
				context.fillRect(dotLength*startX,dotLength*startY,dotLength,dotLength);
				//現在ドットサイズでの塗りつぶしスタート位置（反対側）
				startX = (canvasWidth/dotLength)-1-startX;
				//色ぬり
				context.fillStyle = currentColor.style.backgroundColor;
				context.fillRect(dotLength*startX,dotLength*startY,dotLength,dotLength);
				//canvas変更フラグ変更
				canvasChangeFlg = true;

			} else {
				//同じ色かどうか調べる
				if (!isSameColoredCell(cell)) {
					//現在ドットサイズでの塗りつぶしスタート位置
					var startX = Math.floor(x/dotLength);
					var startY = Math.floor(y/dotLength);
					//色ぬり
					context.fillStyle = currentColor.style.backgroundColor;
					context.fillRect(dotLength*startX,dotLength*startY,dotLength,dotLength);
					//canvas変更フラグ変更
					canvasChangeFlg = true;
				}
				//同じ色なら何もしない
			}
			break;
			
		case 'circle':
			if (!draggingFlg) {
				//キャンバスを退避
				evacuateCanvas = context.getImageData(0,0,canvasWidth,canvasHeight);
				var evacuateCanvasBG = canvas.toDataURL();
				context.clearRect(0,0,canvasWidth,canvasHeight);
				canvas.style.backgroundImage = 'url('+evacuateCanvasBG+')';
				//マウスダウン始まったらドラッグフラグ変更
				setDraggingFlg(true);
				//スタートセット
				sx = x;
				sy = y;
			}
			//エンドセット
			ex = x;
			ey = y;
			//中心xy
			var centerX = Math.ceil((sx + ex)/2);
			var centerY = Math.ceil((sy + ey)/2);
			//縦横直径
			var absX = Math.abs(sx - ex);
			var absY = Math.abs(sy - ey);
			//半径
			var radius = 0
			//縦横比率初期化
			var horizontalRatio = 1;
			var verticalRatio = 1;
			if (absX != 0 && absY != 0) {
				var radius = Math.ceil(Math.max(absX,absY)/2);
				if (absY > absX) {
					horizontalRatio = absX/absY;
				} else if (absX > absY) {
					verticalRatio = absY/absX;
				} else {
					//一緒の時は何もしない
				}
			} else if (absY == 0 && absX != 0) {
				verticalRatio = 0;
			} else if (absY != 0 && absX == 0) {
				horizontalRatio = 0;
			} else {
				//なんでも無いとき（通らない）
			}
			hiddenContext.save();
			hiddenContext.clearRect(0,0,canvasWidth,canvasHeight);
			context.clearRect(0,0,canvasWidth,canvasHeight);
			hiddenContext.beginPath();
			hiddenContext.scale(horizontalRatio,verticalRatio);
			hiddenContext.arc(centerX/horizontalRatio, centerY/verticalRatio, radius, 0, Math.PI*2, false);
			hiddenContext.stroke();
			hiddenContext.closePath();
			hiddenContext.restore();
			var sRowLine = Math.ceil(sy/dotLength)*dotLength;
			var eRowLine = Math.ceil(ey/dotLength)*dotLength;
			var sColLine = Math.ceil(sx/dotLength)*dotLength;
			var eColLine = Math.ceil(ex/dotLength)*dotLength;
			var checkLineNum = (Math.abs(sRowLine-eRowLine))/dotLength;
			var checkColNum = (Math.abs(sColLine-eColLine))/dotLength;
			var sFrameRowLine = Math.floor(sy/dotLength)*dotLength;
			var eFrameRowLine = Math.floor(ey/dotLength)*dotLength;
			var sFrameColLine = Math.floor(sx/dotLength)*dotLength;
			var eFrameColLine = Math.floor(ex/dotLength)*dotLength;
			figureColoredCells = [];
			context.fillStyle = currentColor.style.backgroundColor;
			if (sx > ex && sy > ey) {
				//左上
				for (var i=0; i<Math.ceil(checkLineNum/2); i++) {
					//左
					for(var j=ex; j<sx; j++) {
						var hiddenContextColor = hiddenContext.getImageData(j,eRowLine+dotLength*i,1,1);
						if (hiddenContextColor.data[3] != 0) {
							var cellX = Math.ceil(j/dotLength)*dotLength;
							var cellY = eRowLine+dotLength*i;
							context.fillRect(cellX,cellY,dotLength,dotLength);
							var distanceX = cellX - eFrameColLine;
							context.fillRect(sFrameColLine-distanceX,cellY,dotLength,dotLength);
							var distanceY = cellY - eFrameRowLine;
							context.fillRect(cellX,sFrameRowLine-distanceY,dotLength,dotLength);
							context.fillRect(sFrameColLine-distanceX,sFrameRowLine-distanceY,dotLength,dotLength);
							figureColoredCells.push([cellX,cellY]);
							figureColoredCells.push([sFrameColLine-distanceX,cellY]);
							figureColoredCells.push([cellX,sFrameRowLine-distanceY]);
							figureColoredCells.push([sFrameColLine-distanceX,sFrameRowLine-distanceY]);
							break;
						}
					}
				}
				for (var i=0; i<Math.ceil(checkColNum/2); i++) {
					//左上
					for(var j=ey; j<sy; j++) {
						var hiddenContextColor = hiddenContext.getImageData(eColLine+dotLength*i,j,1,1);
						if (hiddenContextColor.data[3] != 0 && j%dotLength != 0) {
							var cellY = Math.ceil(j/dotLength)*dotLength;
							var cellX = eColLine+dotLength*i;
							context.fillRect(cellX,cellY,dotLength,dotLength);
							var distanceX = cellX - eFrameColLine;
							context.fillRect(sFrameColLine-distanceX,cellY,dotLength,dotLength);
							var distanceY = cellY - eFrameRowLine;
							context.fillRect(cellX,sFrameRowLine-distanceY,dotLength,dotLength);
							context.fillRect(sFrameColLine-distanceX,sFrameRowLine-distanceY,dotLength,dotLength);
							figureColoredCells.push([cellX,cellY]);
							figureColoredCells.push([sFrameColLine-distanceX,cellY]);
							figureColoredCells.push([cellX,sFrameRowLine-distanceY]);
							figureColoredCells.push([sFrameColLine-distanceX,sFrameRowLine-distanceY]);
							break;
						}
					}
				}
			} else if (sx < ex && sy > ey) {
				//右上
				for (var i=0; i<Math.ceil(checkLineNum/2); i++) {
					//左
					for(var j=sx; j<ex; j++) {
						var hiddenContextColor = hiddenContext.getImageData(j,eRowLine+dotLength*i,1,1);
						if (hiddenContextColor.data[3] != 0) {
							var cellX = Math.ceil(j/dotLength)*dotLength;
							var cellY = eRowLine+dotLength*i;
							context.fillRect(cellX,cellY,dotLength,dotLength);
							var distanceX = cellX - sFrameColLine;
							context.fillRect(eFrameColLine-distanceX,cellY,dotLength,dotLength);
							var distanceY = cellY - eFrameRowLine;
							context.fillRect(cellX,sFrameRowLine-distanceY,dotLength,dotLength);
							context.fillRect(eFrameColLine-distanceX,sFrameRowLine-distanceY,dotLength,dotLength);
							figureColoredCells.push([cellX,cellY]);
							figureColoredCells.push([eFrameColLine-distanceX,cellY]);
							figureColoredCells.push([cellX,sFrameRowLine-distanceY]);
							figureColoredCells.push([eFrameColLine-distanceX,sFrameRowLine-distanceY]);
							break;
						}
					}
				}
				for (var i=0; i<Math.ceil(checkColNum/2); i++) {
					//左上
					for(var j=ey; j<sy; j++) {
						var hiddenContextColor = hiddenContext.getImageData(sColLine+dotLength*i,j,1,1);
						if (hiddenContextColor.data[3] != 0 && j%dotLength != 0) {
							var cellY = Math.ceil(j/dotLength)*dotLength;
							var cellX = sColLine+dotLength*i;
							context.fillRect(cellX,cellY,dotLength,dotLength);
							var distanceX = cellX - eFrameColLine;
							context.fillRect(sFrameColLine-distanceX,cellY,dotLength,dotLength);
							var distanceY = cellY - eFrameRowLine;
							context.fillRect(cellX,sFrameRowLine-distanceY,dotLength,dotLength);
							context.fillRect(sFrameColLine-distanceX,sFrameRowLine-distanceY,dotLength,dotLength);
							figureColoredCells.push([cellX,cellY]);
							figureColoredCells.push([sFrameColLine-distanceX,cellY]);
							figureColoredCells.push([cellX,sFrameRowLine-distanceY]);
							figureColoredCells.push([sFrameColLine-distanceX,sFrameRowLine-distanceY]);
							break;
						}
					}
				}
			} else if (sx > ex && sy < ey) {
				//左下
				for (var i=0; i<Math.ceil(checkLineNum/2); i++) {
					//左
					for(var j=ex; j<sx; j++) {
						var hiddenContextColor = hiddenContext.getImageData(j,sRowLine+dotLength*i,1,1);
						if (hiddenContextColor.data[3] != 0) {
							var cellX = Math.ceil(j/dotLength)*dotLength;
							var cellY = sRowLine+dotLength*i;
							context.fillRect(cellX,cellY,dotLength,dotLength);
							var distanceX = cellX - eFrameColLine;
							context.fillRect(sFrameColLine-distanceX,cellY,dotLength,dotLength);
							var distanceY = cellY - sFrameRowLine;
							context.fillRect(cellX,eFrameRowLine-distanceY,dotLength,dotLength);
							context.fillRect(sFrameColLine-distanceX,eFrameRowLine-distanceY,dotLength,dotLength);
							figureColoredCells.push([cellX,cellY]);
							figureColoredCells.push([sFrameColLine-distanceX,cellY]);
							figureColoredCells.push([cellX,eFrameRowLine-distanceY]);
							figureColoredCells.push([sFrameColLine-distanceX,eFrameRowLine-distanceY]);
							break;
						}
					}
				}
				for (var i=0; i<Math.ceil(checkColNum/2); i++) {
					//左上
					for(var j=sy; j<ey; j++) {
						var hiddenContextColor = hiddenContext.getImageData(eColLine+dotLength*i,j,1,1);
						if (hiddenContextColor.data[3] != 0 && j%dotLength != 0) {
							var cellY = Math.ceil(j/dotLength)*dotLength;
							var cellX = eColLine+dotLength*i;
							context.fillRect(cellX,cellY,dotLength,dotLength);
							var distanceX = cellX - eFrameColLine;
							context.fillRect(sFrameColLine-distanceX,cellY,dotLength,dotLength);
							var distanceY = cellY - sFrameRowLine;
							context.fillRect(cellX,eFrameRowLine-distanceY,dotLength,dotLength);
							context.fillRect(sFrameColLine-distanceX,eFrameRowLine-distanceY,dotLength,dotLength);
							figureColoredCells.push([cellX,cellY]);
							figureColoredCells.push([sFrameColLine-distanceX,cellY]);
							figureColoredCells.push([cellX,eFrameRowLine-distanceY]);
							figureColoredCells.push([sFrameColLine-distanceX,eFrameRowLine-distanceY]);
							break;
						}
					}
				}
			} else if (sx < ex && sy < ey) {
				//右下
				for (var i=0; i<Math.ceil(checkLineNum/2); i++) {
					//左
					for(var j=sx; j<ex; j++) {
						var hiddenContextColor = hiddenContext.getImageData(j,sRowLine+dotLength*i,1,1);
						if (hiddenContextColor.data[3] != 0) {
							var cellX = Math.ceil(j/dotLength)*dotLength;
							var cellY = sRowLine+dotLength*i;
							context.fillRect(cellX,cellY,dotLength,dotLength);
							var distanceX = cellX - sFrameColLine;
							context.fillRect(eFrameColLine-distanceX,cellY,dotLength,dotLength);
							var distanceY = cellY - sFrameRowLine;
							context.fillRect(cellX,eFrameRowLine-distanceY,dotLength,dotLength);
							context.fillRect(eFrameColLine-distanceX,eFrameRowLine-distanceY,dotLength,dotLength);
							figureColoredCells.push([cellX,cellY]);
							figureColoredCells.push([eFrameColLine-distanceX,cellY]);
							figureColoredCells.push([cellX,eFrameRowLine-distanceY]);
							figureColoredCells.push([eFrameColLine-distanceX,eFrameRowLine-distanceY]);
							break;
						}
					}
				}
				for (var i=0; i<Math.ceil(checkColNum/2); i++) {
					//左上
					for(var j=sy; j<ey; j++) {
						var hiddenContextColor = hiddenContext.getImageData(sColLine+dotLength*i,j,1,1);
						if (hiddenContextColor.data[3] != 0 && j%dotLength != 0) {
							var cellY = Math.ceil(j/dotLength)*dotLength;
							var cellX = sColLine+dotLength*i;
							context.fillRect(cellX,cellY,dotLength,dotLength);
							var distanceX = cellX - sFrameColLine;
							context.fillRect(eFrameColLine-distanceX,cellY,dotLength,dotLength);
							var distanceY = cellY - sFrameRowLine;
							context.fillRect(cellX,eFrameRowLine-distanceY,dotLength,dotLength);
							context.fillRect(eFrameColLine-distanceX,eFrameRowLine-distanceY,dotLength,dotLength);
							figureColoredCells.push([cellX,cellY]);
							figureColoredCells.push([eFrameColLine-distanceX,cellY]);
							figureColoredCells.push([cellX,eFrameRowLine-distanceY]);
							figureColoredCells.push([eFrameColLine-distanceX,eFrameRowLine-distanceY]);
							break;
						}
					}
				}
			}
			break;
			
		case 'fill-circle':
			//塗りつぶし円モード
			if (!draggingFlg) {
				//キャンバスを退避
				evacuateCanvas = context.getImageData(0,0,canvasWidth,canvasHeight);
				var evacuateCanvasBG = canvas.toDataURL();
				context.clearRect(0,0,canvasWidth,canvasHeight);
				canvas.style.backgroundImage = 'url('+evacuateCanvasBG+')';
				//マウスダウン始まったらドラッグフラグ変更
				setDraggingFlg(true);
				//スタートセット
				sx = x;
				sy = y;
			}
			//エンドセット
			ex = x;
			ey = y;
			//中心xy
			var centerX = Math.ceil((sx + ex)/2);
			var centerY = Math.ceil((sy + ey)/2);
			//縦横直径
			var absX = Math.abs(sx - ex);
			var absY = Math.abs(sy - ey);
			//半径
			var radius = 0
			//縦横比率
			var horizontalRatio = 1;
			var verticalRatio = 1;
			if (absX != 0 && absY != 0) {
				var radius = Math.ceil(Math.max(absX,absY)/2);
				if (absY > absX) {
					horizontalRatio = absX/absY;
				} else if (absX > absY) {
					verticalRatio = absY/absX;
				} else {
					//一緒の時は何もしない
				}
			} else if (absY == 0 && absX != 0) {
				verticalRatio = 0;
			} else if (absY != 0 && absX == 0) {
				horizontalRatio = 0;
			} else {
				//なんでも無いとき（通らない）
			}
			hiddenContext.save();
			hiddenContext.clearRect(0,0,canvasWidth,canvasHeight);
			context.clearRect(0,0,canvasWidth,canvasHeight);
			hiddenContext.beginPath();
			hiddenContext.scale(horizontalRatio,verticalRatio);
			hiddenContext.arc(centerX/horizontalRatio, centerY/verticalRatio, radius, 0, Math.PI*2, false);
			hiddenContext.stroke();
			hiddenContext.closePath();
			hiddenContext.restore();
			var sRowLine = Math.ceil(sy/dotLength)*dotLength;
			var eRowLine = Math.ceil(ey/dotLength)*dotLength;
			var sColLine = Math.ceil(sx/dotLength)*dotLength;
			var eColLine = Math.ceil(ex/dotLength)*dotLength;
			var checkLineNum = (Math.abs(sRowLine-eRowLine))/dotLength;
			figureColoredCells = [];
			context.fillStyle = currentColor.style.backgroundColor;
			if (sx > ex && sy > ey) {
				//左上
				for (var i=0; i<=Math.ceil(checkLineNum/2); i++) {
					for(var j=ex; j<sx; j++) {
						var hiddenContextColor = hiddenContext.getImageData(j,eRowLine+dotLength*i,1,1);
						if (hiddenContextColor.data[3] != 0) {
							var cellX = Math.ceil(j/dotLength)*dotLength;
							var cellY = eRowLine+dotLength*i;
							var eCellX = Math.ceil((sColLine-(j-eColLine))/dotLength)*dotLength;
							var eCellY = sRowLine-dotLength*i;
							var fillXcolNum = Math.ceil((eCellX-cellX)/dotLength);
							for (var k=0; k<fillXcolNum; k++) {
								context.fillRect(cellX+dotLength*k,cellY,dotLength,dotLength);
								context.fillRect(cellX+dotLength*k,eCellY,dotLength,dotLength);
								figureColoredCells.push([cellX+dotLength*k,cellY]);
								figureColoredCells.push([cellX+dotLength*k,eCellY]);
							}
						}
					}
				}
			} else if (sx < ex && sy > ey) {
				//右上
				for (var i=0; i<=Math.ceil(checkLineNum/2); i++) {
					for(var j=sx; j<ex; j++) {
						var hiddenContextColor = hiddenContext.getImageData(j,eRowLine+dotLength*i,1,1);
						if (hiddenContextColor.data[3] != 0) {
							var cellX = Math.ceil(j/dotLength)*dotLength;
							var cellY = eRowLine+dotLength*i;
							var eCellX = Math.ceil((eColLine-(j-sColLine))/dotLength)*dotLength;
							var eCellY = sRowLine-dotLength*i;
							var fillXcolNum = Math.ceil((eCellX-cellX)/dotLength);
							for (var k=0; k<fillXcolNum; k++) {
								context.fillRect(cellX+dotLength*k,cellY,dotLength,dotLength);
								context.fillRect(cellX+dotLength*k,eCellY,dotLength,dotLength);
								figureColoredCells.push([cellX+dotLength*k,cellY]);
								figureColoredCells.push([cellX+dotLength*k,eCellY]);
							}
						}
					}
				}
			} else if (sx > ex && sy < ey) {
				//左下
				for (var i=0; i<=Math.ceil(checkLineNum/2); i++) {
					for(var j=ex; j<sx; j++) {
						var hiddenContextColor = hiddenContext.getImageData(j,sRowLine+dotLength*i,1,1);
						if (hiddenContextColor.data[3] != 0) {
							var cellX = Math.ceil(j/dotLength)*dotLength;
							var cellY = sRowLine+dotLength*i;
							var eCellX = Math.ceil((sColLine-(j-eColLine))/dotLength)*dotLength;
							var eCellY = eRowLine-dotLength*i;
							var fillXcolNum = Math.ceil((eCellX-cellX)/dotLength);
							for (var k=0; k<fillXcolNum; k++) {
								context.fillRect(cellX+dotLength*k,cellY,dotLength,dotLength);
								context.fillRect(cellX+dotLength*k,eCellY,dotLength,dotLength);
								figureColoredCells.push([cellX+dotLength*k,cellY]);
								figureColoredCells.push([cellX+dotLength*k,eCellY]);
							}
						}
					}
				}
			} else if (sx < ex && sy < ey) {
				//右下
				for (var i=0; i<=Math.ceil(checkLineNum/2); i++) {
					for(var j=sx; j<ex; j++) {
						var hiddenContextColor = hiddenContext.getImageData(j,sRowLine+dotLength*i,1,1);
						if (hiddenContextColor.data[3] != 0) {
							var cellX = Math.ceil(j/dotLength)*dotLength;
							var cellY = sRowLine+dotLength*i;
							var eCellX = Math.ceil((eColLine-(j-sColLine))/dotLength)*dotLength;
							var eCellY = eRowLine-dotLength*i;
							var fillXcolNum = Math.ceil((eCellX-cellX)/dotLength);
							for (var k=0; k<fillXcolNum; k++) {
								context.fillRect(cellX+dotLength*k,cellY,dotLength,dotLength);
								context.fillRect(cellX+dotLength*k,eCellY,dotLength,dotLength);
								figureColoredCells.push([cellX+dotLength*k,cellY]);
								figureColoredCells.push([cellX+dotLength*k,eCellY]);
							}
						}
					}
				}
			} else {
				//何もしない
			}
			break;
			
		case 'square':
			//四角モード
			if (!draggingFlg) {
				//キャンバスを退避
				evacuateCanvas = context.getImageData(0,0,canvasWidth,canvasHeight);
				var evacuateCanvasBG = canvas.toDataURL();
				context.clearRect(0,0,canvasWidth,canvasHeight);
				canvas.style.backgroundImage = 'url('+evacuateCanvasBG+')';
				//マウスダウン始まったらドラッグフラグ変更
				setDraggingFlg(true);
				//スタートセット
				sx = x;
				sy = y;
			}
			//エンドセット
			ex = x;
			ey = y;
			context.clearRect(0,0,canvasWidth,canvasHeight);
			var sRow = Math.floor(sy/dotLength);
			var eRow = Math.floor(ey/dotLength);
			var sCol = Math.floor(sx/dotLength);
			var eCol = Math.floor(ex/dotLength);
			figureColoredCells = [];
			context.fillStyle = currentColor.style.backgroundColor;
			if (sx > ex && sy > ey) {
				//左上
				//上と下のライン
				for(var j=eCol; j<sCol; j++) {
					context.fillRect(j*dotLength,eRow*dotLength,dotLength,dotLength);
					context.fillRect(j*dotLength,sRow*dotLength,dotLength,dotLength);
					figureColoredCells.push([j*dotLength,eRow*dotLength]);
					figureColoredCells.push([j*dotLength,sRow*dotLength]);
				}
				//左と右のライン
				for(var j=eRow; j<=sRow; j++) {
					context.fillRect(eCol*dotLength,j*dotLength,dotLength,dotLength);
					context.fillRect(sCol*dotLength,j*dotLength,dotLength,dotLength);
					figureColoredCells.push([eCol*dotLength,j*dotLength]);
					figureColoredCells.push([sCol*dotLength,j*dotLength]);
				}
			} else if (sx < ex && sy > ey) {
				//右上
				//上と下のライン
				for(var j=sCol; j<eCol; j++) {
					context.fillRect(j*dotLength,eRow*dotLength,dotLength,dotLength);
					context.fillRect(j*dotLength,sRow*dotLength,dotLength,dotLength);
					figureColoredCells.push([j*dotLength,eRow*dotLength]);
					figureColoredCells.push([j*dotLength,sRow*dotLength]);
				}
				//左と右のライン
				for(var j=eRow; j<=sRow; j++) {
					context.fillRect(eCol*dotLength,j*dotLength,dotLength,dotLength);
					context.fillRect(sCol*dotLength,j*dotLength,dotLength,dotLength);
					figureColoredCells.push([eCol*dotLength,j*dotLength]);
					figureColoredCells.push([sCol*dotLength,j*dotLength]);
				}
			} else if (sx > ex && sy < ey) {
				//左下
				//上と下のライン
				for(var j=eCol; j<sCol; j++) {
					context.fillRect(j*dotLength,eRow*dotLength,dotLength,dotLength);
					context.fillRect(j*dotLength,sRow*dotLength,dotLength,dotLength);
					figureColoredCells.push([j*dotLength,eRow*dotLength]);
					figureColoredCells.push([j*dotLength,sRow*dotLength]);
				}
				//左と右のライン
				for(var j=sRow; j<=eRow; j++) {
					context.fillRect(eCol*dotLength,j*dotLength,dotLength,dotLength);
					context.fillRect(sCol*dotLength,j*dotLength,dotLength,dotLength);
					figureColoredCells.push([eCol*dotLength,j*dotLength]);
					figureColoredCells.push([sCol*dotLength,j*dotLength]);
				}
			} else if (sx < ex && sy < ey) {
				//右下
				//上と下のライン
				for(var j=sCol; j<eCol; j++) {
					context.fillRect(j*dotLength,eRow*dotLength,dotLength,dotLength);
					context.fillRect(j*dotLength,sRow*dotLength,dotLength,dotLength);
					figureColoredCells.push([j*dotLength,eRow*dotLength]);
					figureColoredCells.push([j*dotLength,sRow*dotLength]);
				}
				//左と右のライン
				for(var j=sRow; j<=eRow; j++) {
					context.fillRect(eCol*dotLength,j*dotLength,dotLength,dotLength);
					context.fillRect(sCol*dotLength,j*dotLength,dotLength,dotLength);
					figureColoredCells.push([eCol*dotLength,j*dotLength]);
					figureColoredCells.push([sCol*dotLength,j*dotLength]);
				}
			}
			break;
			
		case 'fill-square':
			//塗りつぶし四角モード
			if (!draggingFlg) {
				//キャンバスを退避
				evacuateCanvas = context.getImageData(0,0,canvasWidth,canvasHeight);
				var evacuateCanvasBG = canvas.toDataURL();
				context.clearRect(0,0,canvasWidth,canvasHeight);
				canvas.style.backgroundImage = 'url('+evacuateCanvasBG+')';
				//マウスダウン始まったらドラッグフラグ変更
				setDraggingFlg(true);
				//スタートセット
				sx = x;
				sy = y;
			}
			//エンドセット
			ex = x;
			ey = y;
			context.clearRect(0,0,canvasWidth,canvasHeight);
			var sRowLine = Math.floor(sy/dotLength)*dotLength;
			var eRowLine = Math.floor(ey/dotLength)*dotLength;
			var sColLine = Math.floor(sx/dotLength)*dotLength;
			var eColLine = Math.floor(ex/dotLength)*dotLength;
			var checkLineNum = (Math.abs(sRowLine-eRowLine))/dotLength;
			var checkColNum = (Math.abs(sColLine-eColLine))/dotLength;
			figureColoredCells = [];
			context.fillStyle = currentColor.style.backgroundColor;
			if (sx > ex && sy > ey) {
			//左上
				for(var i=0; i<=checkLineNum; i++) {
					for(var j=0; j<=checkColNum; j++) {
						context.fillRect(eColLine+j*dotLength,eRowLine+i*dotLength,dotLength,dotLength);
						figureColoredCells.push([eColLine+j*dotLength,eRowLine+i*dotLength]);
					}
				}
			} else if (sx < ex && sy > ey) {
			//右上
				for(var i=0; i<=checkLineNum; i++) {
					for(var j=0; j<=checkColNum; j++) {
						context.fillRect(sColLine+j*dotLength,eRowLine+i*dotLength,dotLength,dotLength);
						figureColoredCells.push([sColLine+j*dotLength,eRowLine+i*dotLength]);
					}
				}
			} else if (sx > ex && sy < ey) {
			//左下
				for(var i=0; i<=checkLineNum; i++) {
					for(var j=0; j<=checkColNum; j++) {
						context.fillRect(eColLine+j*dotLength,sRowLine+i*dotLength,dotLength,dotLength);
						figureColoredCells.push([eColLine+j*dotLength,sRowLine+i*dotLength]);
					}
				}
			} else if (sx < ex && sy < ey) {
			//右下
				for(var i=0; i<=checkLineNum; i++) {
					for(var j=0; j<=checkColNum; j++) {
						context.fillRect(sColLine+j*dotLength,sRowLine+i*dotLength,dotLength,dotLength);
						figureColoredCells.push([sColLine+j*dotLength,sRowLine+i*dotLength]);
					}
				}
			}
			break;
			
		case 'straight-line':
			//直線モード
			if (!draggingFlg) {
				//キャンバスを退避
				evacuateCanvas = context.getImageData(0,0,canvasWidth,canvasHeight);
				var evacuateCanvasBG = canvas.toDataURL();
				context.clearRect(0,0,canvasWidth,canvasHeight);
				canvas.style.backgroundImage = 'url('+evacuateCanvasBG+')';
				//マウスダウン始まったらドラッグフラグ変更
				setDraggingFlg(true);
				//スタートセット
				sx = x;
				sy = y;
			}
			//エンドセット
			ex = x;
			ey = y;
			hiddenContext.clearRect(0,0,canvasWidth,canvasHeight);
			context.clearRect(0,0,canvasWidth,canvasHeight);
			hiddenContext.beginPath();     // 1.Pathで描画を開始する
			hiddenContext.moveTo(sx,sy); // 2.描画する位置を指定する
			hiddenContext.lineTo(ex,ey); // 3.指定座標まで線を引く
			hiddenContext.stroke();
			hiddenContext.closePath();
			var sRowLine = Math.ceil(sy/dotLength)*dotLength;
			var eRowLine = Math.ceil(ey/dotLength)*dotLength;
			var sColLine = Math.ceil(sx/dotLength)*dotLength;
			var eColLine = Math.ceil(ex/dotLength)*dotLength;
			var checkLineNum = (Math.abs(sRowLine-eRowLine))/dotLength;
			var checkColNum = (Math.abs(sColLine-eColLine))/dotLength;
			var sFrameRowLine = Math.floor(sy/dotLength)*dotLength;
			var eFrameRowLine = Math.floor(ey/dotLength)*dotLength;
			var sFrameColLine = Math.floor(sx/dotLength)*dotLength;
			var eFrameColLine = Math.floor(ex/dotLength)*dotLength;
			figureColoredCells = [];
			context.fillStyle = currentColor.style.backgroundColor;
			if (sx > ex && sy > ey) {
			//左上
				if (sx-ex > sy-ey) {
				//270-315
					for (var i=0; i<Math.ceil(checkColNum/2); i++) {
						for(var j=ey; j<sy; j++) {
							var hiddenContextColor = hiddenContext.getImageData(eColLine+dotLength*i,j,1,1);
							if (hiddenContextColor.data[3] != 0) {
								var cellY = Math.floor(j/dotLength)*dotLength;
								var cellX = eColLine+dotLength*i;
								context.fillRect(cellX,cellY,dotLength,dotLength);
								var distanceX = cellX - eFrameColLine;
								var distanceY = cellY - eFrameRowLine;
								context.fillRect(sFrameColLine-distanceX,sFrameRowLine-distanceY,dotLength,dotLength);
								figureColoredCells.push([cellX,cellY]);
								figureColoredCells.push([sFrameColLine-distanceX,sFrameRowLine-distanceY]);
								break;
							}
						}
					}
				} else if (sx-ex < sy-ey) {
				//315-360
					for (var i=0; i<Math.ceil(checkLineNum/2); i++) {
						for(var j=ex; j<sx; j++) {
							var hiddenContextColor = hiddenContext.getImageData(j,eRowLine+dotLength*i,1,1);
							if (hiddenContextColor.data[3] != 0) {
								var cellX = Math.floor(j/dotLength)*dotLength;
								var cellY = eRowLine+dotLength*i;
								context.fillRect(cellX,cellY,dotLength,dotLength);
								var distanceX = cellX - eFrameColLine;
								var distanceY = cellY - eFrameRowLine;
								context.fillRect(sFrameColLine-distanceX,sFrameRowLine-distanceY,dotLength,dotLength);
								figureColoredCells.push([cellX,cellY]);
								figureColoredCells.push([sFrameColLine-distanceX,sFrameRowLine-distanceY]);
								break;
							}
						}
					}
				}
			} else if (sx < ex && sy > ey) {
			//右上
				if (ex-sx < sy-ey) {
				//0-45
					for (var i=0; i<Math.ceil(checkLineNum/2); i++) {
						for(var j=sx; j<ex; j++) {
							var hiddenContextColor = hiddenContext.getImageData(j,eRowLine+dotLength*i,1,1);
							if (hiddenContextColor.data[3] != 0) {
								var cellX = Math.floor(j/dotLength)*dotLength;
								var cellY = eRowLine+dotLength*i;
								context.fillRect(cellX,cellY,dotLength,dotLength);
								var distanceX = cellX - sFrameColLine;
								var distanceY = cellY - eFrameRowLine;
								context.fillRect(eFrameColLine-distanceX,sFrameRowLine-distanceY,dotLength,dotLength);
								figureColoredCells.push([cellX,cellY]);
								figureColoredCells.push([eFrameColLine-distanceX,sFrameRowLine-distanceY]);
								break;
							}
						}
					}
				} else if (ex-sx > sy-ey) {
				//45-90
					for (var i=0; i<Math.ceil(checkColNum/2); i++) {
						for(var j=ey; j<sy; j++) {
							var hiddenContextColor = hiddenContext.getImageData(sColLine+dotLength*i,j,1,1);
							if (hiddenContextColor.data[3] != 0) {
								var cellY = Math.floor(j/dotLength)*dotLength;
								var cellX = sColLine+dotLength*i;
								context.fillRect(cellX,cellY,dotLength,dotLength);
								var distanceX = cellX - sFrameColLine;
								var distanceY = cellY - eFrameRowLine;
								context.fillRect(eFrameColLine-distanceX,sFrameRowLine-distanceY,dotLength,dotLength);
								figureColoredCells.push([cellX,cellY]);
								figureColoredCells.push([eFrameColLine-distanceX,sFrameRowLine-distanceY]);
								break;
							}
						}
					}
				}
			} else if (sx > ex && sy < ey) {
			//左下
				if (sx-ex < ey-sy) {
				//180-225
					for (var i=0; i<Math.ceil(checkLineNum/2); i++) {
						for(var j=ex; j<sx; j++) {
							var hiddenContextColor = hiddenContext.getImageData(j,sRowLine+dotLength*i,1,1);
							if (hiddenContextColor.data[3] != 0) {
								var cellX = Math.floor(j/dotLength)*dotLength;
								var cellY = sRowLine+dotLength*i;
								context.fillRect(cellX,cellY,dotLength,dotLength);
								var distanceX = cellX - eFrameColLine;
								var distanceY = cellY - sFrameRowLine;
								context.fillRect(sFrameColLine-distanceX,eFrameRowLine-distanceY,dotLength,dotLength);
								figureColoredCells.push([cellX,cellY]);
								figureColoredCells.push([sFrameColLine-distanceX,eFrameRowLine-distanceY]);
								break;
							}
						}
					}
				} else if (sx-ex > ey-sy) {
				//225-270
					for (var i=0; i<Math.ceil(checkColNum/2); i++) {
						for(var j=sy; j<ey; j++) {
							var hiddenContextColor = hiddenContext.getImageData(eColLine+dotLength*i,j,1,1);
							if (hiddenContextColor.data[3] != 0) {
								var cellY = Math.floor(j/dotLength)*dotLength;
								var cellX = eColLine+dotLength*i;
								context.fillRect(cellX,cellY,dotLength,dotLength);
								var distanceX = cellX - eFrameColLine;
								var distanceY = cellY - sFrameRowLine;
								context.fillRect(sFrameColLine-distanceX,eFrameRowLine-distanceY,dotLength,dotLength);
								figureColoredCells.push([cellX,cellY]);
								figureColoredCells.push([sFrameColLine-distanceX,eFrameRowLine-distanceY]);
								break;
							}
						}
					}
				}
			} else if (sx < ex && sy < ey) {
			//右下
				if (ex-sx > ey-sy) {
				//90-135
					for (var i=0; i<Math.ceil(checkColNum/2); i++) {
						for(var j=sy; j<ey; j++) {
							var hiddenContextColor = hiddenContext.getImageData(sColLine+dotLength*i,j,1,1);
							if (hiddenContextColor.data[3] != 0) {
								var cellY = Math.floor(j/dotLength)*dotLength;
								var cellX = sColLine+dotLength*i;
								context.fillRect(cellX,cellY,dotLength,dotLength);
								var distanceX = cellX - sFrameColLine;
								var distanceY = cellY - sFrameRowLine;
								context.fillRect(eFrameColLine-distanceX,eFrameRowLine-distanceY,dotLength,dotLength);
								figureColoredCells.push([cellX,cellY]);
								figureColoredCells.push([eFrameColLine-distanceX,eFrameRowLine-distanceY]);
								break;
							}
						}
					}
				} else if (ex-sx < ey-sy) {
				//135-180
					for (var i=0; i<Math.ceil(checkLineNum/2); i++) {
						for(var j=sx; j<ex; j++) {
							var hiddenContextColor = hiddenContext.getImageData(j,sRowLine+dotLength*i,1,1);
							if (hiddenContextColor.data[3] != 0) {
								var cellX = Math.floor(j/dotLength)*dotLength;
								var cellY = sRowLine+dotLength*i;
								context.fillRect(cellX,cellY,dotLength,dotLength);
								var distanceX = cellX - sFrameColLine;
								var distanceY = cellY - sFrameRowLine;
								context.fillRect(eFrameColLine-distanceX,eFrameRowLine-distanceY,dotLength,dotLength);
								figureColoredCells.push([cellX,cellY]);
								figureColoredCells.push([eFrameColLine-distanceX,eFrameRowLine-distanceY]);
								break;
							}
						}
					}
				}
			} else {
				//何もしない
			}
			break;
			
		case 'colorPicker':
			//現在色にパレットの色をセットする
			var gotColor = context.getImageData(cell[0]*minCell, cell[1]*minCell, 1, 1);
			var r = gotColor.data[0];
			var g = gotColor.data[1];
			var b = gotColor.data[2];
			var a = gotColor.data[3];
			if (r == 0 && g == 0 && b == 0 && a == 0) {
				return;
			} else {
				currentColor.style.backgroundColor = "rgba("+r+","+g+","+b+","+a+")";
				//現在色を非表示canvasに描画
				context2.fillStyle = currentColor.style.backgroundColor
				context2.fillRect(0,0,30,30);
			}
			break;
	}
}

//クリックされた座標を返す
//param1 : canvas要素
//param2 : eventオブジェクト
//return : クリックされたxy座標
function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

//座標をもとに、現在セル（の開始位置）を取得する(最小のセルの値で）
//param1 : x座標
//param2 : y座標
//return : クリックされたセル（の開始位置xy座標）
function getCurrentCell(x, y) {
	var cellX = Math.floor(x/minCell);
	var cellY = Math.floor(y/minCell);
	var cell = [cellX,cellY];
	return cell;
}

//判定セルが指定セル配列にあるかどうか判断する
//param1 : 指定セル配列
//param2 : 判定セル（セル番号（pxじゃなく））
//return : あった場合 : [セル番号, 指定セル配列でのインデックス] ②非色付きの場合 : false
function isCellExist(cellsArray, cell) {
	for (var i=0; i<cellsArray.length; i++) {
		var cx = cellsArray[i][0];
		var cy = cellsArray[i][1];
		//指定セル配列からparam2と一致のセルがあった場合、そのセル情報をリターン
		if (cx == cell[0] && cy == cell[1] ) {
			return [cellsArray[i], i];
		}
	}
	//指定セル配列になかったらfalseをリターン
	return false;
}

//カテゴリを展開する or たたむ
function changeCategoryDisplay (evt, mode) {
	if (mode == 'unfold') {
		//プラスボタンを非表示に
		evt.target.style.display = 'none';
		//マイナスボタンを表示
		var minus = evt.target.nextElementSibling;
		minus.style.display = 'inline';
		// コンテンツを表示
		var parent = evt.target.parentNode;
		var div = parent.nextElementSibling;
		div.style.display = 'block';
	} else if (mode == 'fold') {
		//マイナスボタンを非表示に
		evt.target.style.display = 'none';
		//プラスボタンを表示
		var plus = evt.target.previousElementSibling;
		plus.style.display = 'inline';
		// コンテンツを非表示
		var parent = evt.target.parentNode;
		var div = parent.nextElementSibling;
		div.style.display = 'none';
	} else {

	}
}

//クリックしたバックアップ画像をキャンバスへ描画する。
function setBkImage (evt) {
	var img = evt.target;
	//context.putImageData(img,0,0);
	context.drawImage(img, 0, 0);
	            //戻る・進む用
				canvasChangeFlg = true;
				setDraggingFlg(false, true);
}

//BKイメージを削除する
function deleteBkImg(evt) {
	var img = evt.target.previousElementSibling;
	document.forms['del_bk_image'].elements['del_img_path'].value = img.src;
	document.forms['del_bk_image'].submit();
}

//プレビューを表示する
function showPreview () {
	//ダウンロードサイズを取得する
	//最初からダウンロードサイズをいじってない場合、一個目のやつをセレクト
	// if (downloadSizeSelectHeight.selectedIndex === null && downloadSizeSelectWidth.selectedIndex === null) {
	// 	downloadSizeSelectHeight.options[0].selected = true;
	// 	downloadSizeSelectWidth.options[0].selected = true;
	// }
	// var downloadSizeIndexHeight =  downloadSizeSelectHeight.selectedIndex;
	// var downloadSizeIndexWidth =  downloadSizeSelectWidth.selectedIndex;
	// downloadSize = downloadSizeSelect.options[downloadSizeIndexHeight].value;
	// downloadSize = downloadSizeSelect.options[downloadSizeIndexWidth].value;
	//canvasのデータURLをpreviewimgにセット
	//backUpImg.src = canvas.toDataURL();
	preview.src = canvas.toDataURL();
	//プレビューの表示
	previewContainer.style.display = 'block';
	preview.style.height = downloadHeight + 'px';
	preview.style.width = downloadWidth + 'px';
	//canvasを非表示に
	canvasContainer.style.display = 'none';
	//プレビュー誘導ボタン以下は非表示に
	options.style.display = 'none';
	previewLink.style.display = 'none';
	downloadSizeContainer.style.display = 'none';
	paletteContainer.style.display = 'none';
	//プレビューオプションを表示
	previewOptionsContainer.style.display = 'block';
}

//書き直す
function doRewrite () {
	//プレビューのURLを消去
	preview.src = "";
	//プレビューを非表示に
	previewContainer.style.display = 'none';
	//canvasを表示
	canvasContainer.style.display = 'block';
	//プレビュー誘導ボタン以下表示
	options.style.display = 'block';
	//previewLink.style.display = 'block';
	downloadSizeContainer.style.display = 'block';
	paletteContainer.style.display = 'block';
	//プレビューオプションを非表示
	previewOptionsContainer.style.display = 'none';
}

//canvasの描画をダウンロードする
function downloadCanvas(evt) {
	//ダウンロード前にcanvasを退避
	evacuateCanvas = context.getImageData(0,0,canvasWidth,canvasHeight);
	//canvasをクリア（一応）
	context.clearRect(0, 0, canvasWidth, canvasHeight);
	//canvasの縦横を変更
	canvas.height = downloadHeight;
	canvas.width = downloadWidth;
	//previewをcanvasに描画
	context.drawImage(preview, 0, 0, downloadWidth, downloadHeight);
	//aタグにデータをセット
	const a = evt.target; //e.targetはクリックされた要素を指す（<a>タグ）
	a.href = canvas.toDataURL(); //Canvasからdata:URLを取得
	a.download = new Date().getTime() + '_H' + downloadHeight + '_W' + downloadWidth + '.png'; //ダウンロードファイル名はタイムスタンプに設定
	//ダウンロードが終わったら退避canvasを復元
	canvas.height = canvasHeight;
	canvas.width = canvasWidth;
	context.clearRect(0, 0, canvasWidth, canvasHeight);
	context.putImageData(evacuateCanvas,0,0);
}

//ダウンロードするサイズをセットする
function setDownloadSize (mode) {
	//ロード時はセレクトボックスの一番目のサイズをセット
	if (mode == 'load') {
		downloadHeight = Number(downloadSizeSelectHeight.firstElementChild.value);
		downloadWidth = Number(downloadSizeSelectWidth.firstElementChild.value);
		//キャンバスBGコンテナの背景をセット
		var singleSize = Math.min(downloadHeight, downloadWidth);
		setSingleMaptipBG(singleSize);
	//セレクトボックスが変更された場合変更された値にセット
	} else if (mode == 'change') {
		//縦横セレクトボックスの選択中インデックスを取得
		var downloadSizeIndexHeight =  downloadSizeSelectHeight.selectedIndex;
		var downloadSizeIndexWidth =  downloadSizeSelectWidth.selectedIndex;
		//選択中の縦横の値をダウンロードサイズにセット
		downloadHeight = Number(downloadSizeSelectHeight.options[downloadSizeIndexHeight].value);
		downloadWidth = Number(downloadSizeSelectWidth.options[downloadSizeIndexWidth].value);
		//キャンバスBGコンテナの背景画像（１マップの大きさを表示するやつ）のサイズを取得（縦横の小さい方が基準）
		var singleSize = Math.min(downloadHeight, downloadWidth);
		//キャンバスBGコンテナの背景をセット
		setSingleMaptipBG(singleSize);
		//キャンバスの大きさを変更する
		setCanvas('change');
		//キャンバスの行数とカラム数をリセット
		setMinRowAndCol();
		//キャンバスの大きさを変更するとキャンバスがクリアされてしまう。
		//そのため、一個戻って一個進むの処理を実施し、変更前のキャンバスを描画する
		if (backArray.length == 0 && forwardArray.length == 0){
			//厳密には間違えているかもしれないが、、多分このパターン（初っ端でまずサイズを変える）でエラーになる可能性が一番高いので、、
			return;
		} 
		doBack();
		doForward();
	} else {
		return;
	}
}

//canvasの縦横の大きさをセットする
//※あくまでダウンロードサイズに対する画面のキャンバスの縦横比を変化させるもの
function setCanvas(mode) {
	if (mode == 'load') {
		canvas.setAttribute('height', canvasHeight);
		canvas.setAttribute('width', canvasWidth);
		canvasBG.style.height = canvasHeight + 'px';
		canvasBG.style.width = canvasWidth + 'px';
		canvasBGcontainer.style.height = canvasBGcontainerHeight + 'px';
		canvasBGcontainer.style.width = canvasBGcontainerWidth + 'px';
		canvasBGcontainer.style.padding = canvasBGcontainerPadding + 'px';
		canvasBGcontainer.style.backgroundImage = 'url(./image/dot-editor/canvasBGcontainer.png)';
		hiddenCanvas.setAttribute('height', canvasHeight);
		hiddenCanvas.setAttribute('width', canvasWidth);
	} else if (mode == 'change') {
		//ダウンロードサイズの縦横の割合を元に、canvasの縦横の割合を設定
		var smallerSize = Math.min(downloadHeight, downloadWidth);
		var biggerSize = Math.max(downloadHeight, downloadWidth);
		var smallerCanvasSize =  480 * (smallerSize/biggerSize);
		if (downloadHeight > downloadWidth) {
			canvasHeight = 480;
			canvasWidth = smallerCanvasSize;
		} else if (downloadHeight < downloadWidth) {
			canvasHeight = smallerCanvasSize;
			canvasWidth = 480;
		} else {
			canvasHeight = 480;
			canvasWidth = 480;
		}
		canvas.setAttribute('height', canvasHeight);
		canvas.setAttribute('width', canvasWidth);
		canvasBG.style.height = canvasHeight + 'px';
		canvasBG.style.width = canvasWidth + 'px';
		canvasBGcontainer.style.height = canvasBGcontainerHeight + 'px';
		canvasBGcontainer.style.width = canvasBGcontainerWidth + 'px';
		canvasBGcontainer.style.padding = canvasBGcontainerPadding + 'px';
		canvasBGcontainer.style.backgroundImage = 'url(./image/dot-editor/canvasBGcontainer.png)';
		hiddenCanvas.setAttribute('height', canvasHeight);
		hiddenCanvas.setAttribute('width', canvasWidth);
		setSingleMaptipBG(biggerSize);
	}
}

//キャンバスBGコンテナの背景のマップチップの大きさを、ダウンロードサイズに合わせてセットする
function setSingleMaptipBG (size) {
	canvasBGcontainer.style.backgroundImage = 'url(./image/dot-editor/canvasBGcontainer' + size + '.png)';
}

//ドットのサイズをセットする。同時に背景の罫線も同じマス目のものに変更する。
//param1 : セット時のモード
function setDotSize (mode) {
	//ロード時はセレクトボックスの一番目のサイズをセット
	if (mode == 'load') {
		dotLength =  dotSizeSelect.firstElementChild.value;
		canvasBG.style.backgroundImage = 'url(./image/dot-editor/bg-image' + dotLength + '.png)';
		hiddenCanvas.style.backgroundImage = 'url(./image/dot-editor/bg-image' + dotLength + '.png)';
	//セレクトボックスが変更された場合変更された値にセット
	} else if (mode == 'change') {
		var dotSizeIndex =  dotSizeSelect.selectedIndex;
		dotLength = dotSizeSelect.options[dotSizeIndex].value;
		canvasBG.style.backgroundImage = 'url(./image/dot-editor/bg-image' + dotLength + '.png)';
	} else {
		return;
	}
}

//パレットを表示する
function showPalette() {
	//パレット列数
	var paletteCols = 5;
	//パレット行配列
	var tr = [];
	//各パレット行に色をセット
	for (var i=0; i<paletteColors.length; i++) {
		var colFlg = i % paletteCols;
		if (colFlg == 0) tr[Math.floor(i/paletteCols)] = document.createElement('tr');
		var td = document.createElement('td');
		td.style.backgroundColor = paletteColors[i];
		td.setAttribute('onclick', 'setCurrentColor(this)');
		tr[Math.floor(i/paletteCols)].appendChild(td);
	}
	//全ての行をパレットにセット
	for (var i=0; i<tr.length; i++) palette.appendChild(tr[i]);
}

//現在色にパレットの色をセットする
function setCurrentColor(evt) {
	//ロード時はパレットの一個目の色
	if (evt === undefined || evt === null) {
		currentColor.style.backgroundColor = paletteColors[0];
		//現在色を非表示canvasに描画
		context2.fillStyle = currentColor.style.backgroundColor
		context2.fillRect(0,0,30,30);
	//クリックしたパレットの色をセット
	} else {
		var gotColor = evt.style.backgroundColor;
		currentColor.style.backgroundColor = gotColor;
		//現在色を非表示canvasに描画
		context2.fillStyle = currentColor.style.backgroundColor
		context2.fillRect(0,0,30,30);
	}
}

//現在モードをセットする
function setCurrentMode(evt) {
	//ロード時のみデフォルトの現在モードをセット
	if (evt === undefined || evt === null) {
		normal.classList.add('mode-on');
		normal.parentNode.style.backgroundColor = "yellow";
	} else {
		//クリックされたアイコンが現在モードか調べる
		var isCurrentMode = evt.target.classList.contains('mode-on')
		//現在モードでなければ現在モード要素を入れ替える
		if (!isCurrentMode) {
			currentModeElement[0].parentNode.style.backgroundColor = "";
			currentModeElement[0].classList.remove('mode-on');
			evt.target.classList.add('mode-on');
			currentModeElement[0] = evt.target;
			currentModeElement[0].parentNode.style.backgroundColor = "yellow";
		}
	}
}

//マップチップを保存
function saveMaptip() {
	//キャンバスの大きさを変更する前にまずはバックアップ用のデータを作成
	var bkData = canvas.toDataURL("image/png");
	bkData = bkData.replace("data:image/png;base64,", "");
	//canvasの縦横を変更
	canvas.height = downloadHeight;
	canvas.width = downloadWidth;
	//previewをcanvasに描画
	context.drawImage(preview, 0, 0, downloadWidth, downloadHeight);
	var data = canvas.toDataURL("image/png");
	data = data.replace("data:image/png;base64,", "");
	document.forms['maptip_data'].elements['maptip_image_data'].value = data;
	document.forms['maptip_data'].elements['maptip_height'].value = downloadHeight; //これは名前にサイズつけるために使うだけ、サイズを変更するためではないので注意
	document.forms['maptip_data'].elements['maptip_width'].value = downloadWidth;   //これは名前にサイズつけるために使うだけ、サイズを変更するためではないので注意
	document.forms['maptip_data'].elements['maptip_backUpImage_data'].value = bkData;
	document.forms['maptip_data'].elements['maptip_backUpImage_height'].value = 480; //これは名前にサイズつけるために使うだけ、サイズを変更するためではないので注意
	document.forms['maptip_data'].elements['maptip_backUpImage_width'].value = 480;  //これは名前にサイズつけるために使うだけ、サイズを変更するためではないので注意
}

//マップチップデータをサーバに保存する
function saveMaptipDataToSever() {
	//フォーム取得
	var MaptipDataForm = document.forms['maptip_data'];
	var maptipType = MaptipDataForm.maptipTypes.value;
	var maptipData = 'マップチップタイプ：' + maptipType;
	//いったん本当に良いかアラート
	var confirmTxt = '下記の情報でマップデータをサーバに保存します。\n\n' + maptipData + '\n\n編集画面には戻れません。\nよろしいですか？';
	var ret = confirm(confirmTxt);
	if (ret) {
		//アラートの結果もよければ、マップチップデータを保存して、サブミット
		saveMaptip();
		MaptipDataForm.submit();
	}
}

//キャラクター画像データをサーバに保存する
function saveCharacterImageDataToSever() {
	//フォーム取得
	var characterDataForm = document.forms['character_data'];
	var project = characterDataForm.projectsForCharacters.value;
	var characterImageType = characterDataForm.characterImageTypes.value;
	var projectData = 'プロジェクト：' + project;
	var characterImageData = 'キャラクター画像タイプ：' + characterImageType;

	//小さい224でないサイズの場合はリターン
	if (characterImageType == 'wipe') {
		if (downloadHeight != 96 || downloadWidth != 96) {
			alert("タイプ：wipeを選択中です。\n縦横のサイズを96にしてください。");
			return;
		}
	} else if (characterImageType == 'battle') {
		if (downloadHeight != 224 || downloadWidth != 224) {
			alert("タイプ：battleを選択中です。\n縦横のサイズを224にしてください。");
			return;
		}
	}

	//いったん本当に良いかアラート
	var confirmTxt = '下記の情報でキャラクター画像データをサーバに保存します。\n\n' + projectData + '\n' + characterImageData + '\n\n編集画面には戻れません。\nよろしいですか？';
	var ret = confirm(confirmTxt);
	if (ret) {
		//アラートの結果もよければ、キャラクター画像データを保存して、サブミット
		saveCharacter(characterImageType);
		characterDataForm.submit();
	}
}

//キャラクターを保存（ここから）
function saveCharacter(characterImageType) {
	//キャンバスの大きさを変更する前にまずはバックアップ用のデータを作成
	var bkData = canvas.toDataURL("image/png");
	bkData = bkData.replace("data:image/png;base64,", "");
	//canvasの縦横を変更
	canvas.height = downloadHeight;
	canvas.width = downloadWidth;
	//previewをcanvasに描画
	context.drawImage(preview, 0, 0, downloadWidth, downloadHeight);
	var data = canvas.toDataURL("image/png");
	data = data.replace("data:image/png;base64,", "");
	document.forms['character_data'].elements['character_image_data'].value = data;
	document.forms['character_data'].elements['character_height'].value = downloadHeight;   //これは名前にサイズつけるために使うだけ、サイズを変更するためではないので注意
	document.forms['character_data'].elements['character_width'].value = downloadWidth;     //これは名前にサイズつけるために使うだけ、サイズを変更するためではないので注意
	document.forms['character_data'].elements['character_backUpImage_data'].value = bkData;
	document.forms['character_data'].elements['character_backUpImage_height'].value = 480;  //これは名前にサイズつけるために使うだけ、サイズを変更するためではないので注意
	document.forms['character_data'].elements['character_backUpImage_width'].value = 480;   //これは名前にサイズつけるために使うだけ、サイズを変更するためではないので注意
}

//オブジェクトデータをサーバに保存する
function saveObjectDataToSever() {
	//フォーム取得
	var objectDataForm = document.forms['object_data'];
	//選択中のオブジェクトタイプを取得する
	var objectType = document.getElementById('objectTypes').value;

	//選択中のオブジェクトタイプで処理を分ける（idで値を取得）
	switch (objectType) {
		case 'tool':
			//キャンバスの大きさを変更する前にまずはバックアップ用のデータを作成
			var bkData = canvas.toDataURL("image/png");
			bkData = bkData.replace("data:image/png;base64,", "");
			//canvasの縦横を変更
			canvas.height = downloadHeight;
			canvas.width = downloadWidth;
			//previewをcanvasに描画
			context.drawImage(preview, 0, 0, downloadWidth, downloadHeight);
			var data = canvas.toDataURL("image/png");
			data = data.replace("data:image/png;base64,", "");
			document.forms['object_data'].elements['tool_object_data'].value = data;
			document.forms['object_data'].elements['tool_height'].value = downloadHeight;   //これは名前にサイズつけるために使うだけ、サイズを変更するためではないので注意
			document.forms['object_data'].elements['tool_width'].value = downloadWidth;     //これは名前にサイズつけるために使うだけ、サイズを変更するためではないので注意
			document.forms['object_data'].elements['tool_backUpImage_data'].value = bkData;
			document.forms['object_data'].elements['tool_backUpImage_height'].value = 480;  //これは名前にサイズつけるために使うだけ、サイズを変更するためではないので注意
			document.forms['object_data'].elements['tool_backUpImage_width'].value = 480;   //これは名前にサイズつけるために使うだけ、サイズを変更するためではないので注意
			break;

		case 'character':
			//キャンバスの大きさを変更する前にまずはバックアップ用のデータを作成
			var bkData = canvas.toDataURL("image/png");
			bkData = bkData.replace("data:image/png;base64,", "");
			//canvasの縦横を変更
			canvas.height = downloadHeight;
			canvas.width = downloadWidth;
			//previewをcanvasに描画
			context.drawImage(preview, 0, 0, downloadWidth, downloadHeight);
			var data = canvas.toDataURL("image/png");
			data = data.replace("data:image/png;base64,", "");
			document.forms['object_data'].elements['character_object_data'].value = data;
			document.forms['object_data'].elements['character_height'].value = downloadHeight;   //これは名前にサイズつけるために使うだけ、サイズを変更するためではないので注意
			document.forms['object_data'].elements['character_width'].value = downloadWidth;     //これは名前にサイズつけるために使うだけ、サイズを変更するためではないので注意
			document.forms['object_data'].elements['character_backUpImage_data'].value = bkData;
			document.forms['object_data'].elements['character_backUpImage_height'].value = 480;  //これは名前にサイズつけるために使うだけ、サイズを変更するためではないので注意
			document.forms['object_data'].elements['character_backUpImage_width'].value = 480;   //これは名前にサイズつけるために使うだけ、サイズを変更するためではないので注意
			break;
	}

	var confirmTxt = '登録します';
	var ret = confirm(confirmTxt);
	if (ret) {
		objectDataForm.submit();
	}
}

//カットシーンデータをサーバに保存する
function saveCutSceneDataToSever() {

	if (downloadHeight != 288 || downloadWidth != 480) {
		alert("カットシーンです。\n480 × 288に設定してください。");
		return;
	}

	//フォーム取得
	var cutSceneDataForm = document.forms['cut_scene_data'];
	//選択中のカットシーンタイプを取得する
	var cutSceneTypes = document.getElementById('cutSceneTypes').value;

	var bkData = canvas.toDataURL("image/png");
	bkData = bkData.replace("data:image/png;base64,", "");
	//canvasの縦横を変更
	canvas.height = downloadHeight;
	canvas.width = downloadWidth;
	//previewをcanvasに描画
	context.drawImage(preview, 0, 0, downloadWidth, downloadHeight);
	var data = canvas.toDataURL("image/png");
	data = data.replace("data:image/png;base64,", "");
	document.forms['cut_scene_data'].elements['cut_scene_image_data'].value = data;
	document.forms['cut_scene_data'].elements['cut_scene_height'].value = downloadHeight;   //これは名前にサイズつけるために使うだけ、サイズを変更するためではないので注意
	document.forms['cut_scene_data'].elements['cut_scene_width'].value = downloadWidth;     //これは名前にサイズつけるために使うだけ、サイズを変更するためではないので注意
	document.forms['cut_scene_data'].elements['cut_scene_backUpImage_data'].value = bkData;
	document.forms['cut_scene_data'].elements['cut_scene_backUpImage_height'].value = 288;  //これは名前にサイズつけるために使うだけ、サイズを変更するためではないので注意
	document.forms['cut_scene_data'].elements['cut_scene_backUpImage_width'].value = 480;   //これは名前にサイズつけるために使うだけ、サイズを変更するためではないので注意

	var confirmTxt = '登録します';
	var ret = confirm(confirmTxt);
	if (ret) {
		cutSceneDataForm.submit();
	}
}

//マップチップタイプをchangeした際にコールされる
function showMapChipRegisterContainer() {
	var html = '';
	var maptipTypes = document.getElementById('maptipTypes').value;
	html += '<span>複数構成マップチップ名（※新規のみ入力）</span><input type="text" id="mapchip_name" name="mapchip_name"></input>';
	html += getMultiMapChipNames(maptipTypes);
	document.getElementById('editMapChipInfo').innerHTML = html;
}

//キャラクタータイプをchangeした際にコールされる
function showCharacterRegisterContainer() {
	var html = '';
	var characterImageType = document.getElementById('characterImageTypes').value;
	if (characterImageType == 'wipe') {
		html += '<span>キャラ名（※新規のみ入力）</span><input type="text" id="chara_name" name="chara_name"></input>';
		html += getWipeCharaNames();
	} else if (characterImageType == 'battle') {
		// html += getCharaObjPatterns();
		// html += '<br>';
		// html += '<span>キャラ名（※新規のみ入力）</span><input type="text" id="chara_name" name="character_name"></input>';
		// html += getCharaObjNames();
		html = '';
	} else {
		html = '';
	}
	document.getElementById('editCharaInfo').innerHTML = html;
}

//オブジェクトタイプをchangeした際にコールされる
function showObjectRegisterContainer() {
	var html = '';
	var objectType = document.getElementById('objectTypes').value;
	if (objectType == 'tool') {
		html += '<span>ツール名</span><input type="text" id="tool_name" name="tool_name"></input><br>';
	} else if (objectType == 'character') {
		html += getCharaObjPatterns();
		html += '<br>';
		html += '<span>キャラ名（※新規のみ入力）</span><input type="text" id="chara_name" name="character_name"></input>';
		html += getCharaObjNames();
		html += '<div id="registeredCharaObjImage">新規オブジェクトのためテーブル非表示</div>';
	} else {
		html = '';
	}
	document.getElementById('editObjInfo').innerHTML = html;
}

//カットシーンタイプをchangeした際にコールされる
function showCutSceneRegisterContainer() {
	var html = '';
	var cutSceneType = document.getElementById('cutSceneTypes').value;
	if (cutSceneType == 'scene') {
		html += '<span>シーン名</span><input type="text" id="scene_name" name="scene_name"></input><br>';
	} else if (cutSceneType == 'specialSkill') {
		//html += getCharaObjPatterns();
		html += '<br>';
		html += '<span>キャラ名（※新規のみ入力）</span><input type="text" id="special_skill_user_name" name="special_skill_user_name"></input>';
		html += getSpecialSkillUserNames();
	} else {
		html = '';
	}
	document.getElementById('editCutSceneInfo').innerHTML = html;
}

//選択中プロジェクトに紐づくキャラオブジェクト名を取得する。
//キャラオブジェクト名の一覧は、事前にphpで取得し、どこかに保持しておく
function getMultiMapChipNames(chipType) {
	var prj = document.getElementById('projectsForMapChip').value;
	var multiChip = document.getElementById('MMN_' + prj + '_' + chipType);
	var html = '';
	if (multiChip == null) {
		html += '<span>マルチチップは登録されてません</span>';
	} else {
		html += multiChip.innerHTML;
		if (chipType == 'mapTurn') {
			html += '<br><span style="color: red;">※mapTurnの場合は、必ず複数構成マップチップにしてください。</span>';
		}
	}
	return html;
}

//選択中プロジェクトに紐づくワイプキャラ名を取得する。
//一覧は、事前にphpで取得し、どこかに保持しておく
function getWipeCharaNames() {
	var prj = document.getElementById('projectsForCharacters').value;
	var charaSelect = document.getElementById('WCN_' + prj);
	if (charaSelect == null) {
		return '<span>キャラクター（ワイプ）は登録されてません</span>'
	} else {
		return charaSelect.innerHTML;
	}
}

//選択中プロジェクトに紐づくキャラオブジェクト名を取得する。
//キャラオブジェクト名の一覧は、事前にphpで取得し、どこかに保持しておく
function getCharaObjNames() {
	var prj = document.getElementById('projectsForObj').value;
	var charaSelect = document.getElementById('CON_' + prj);
	if (charaSelect == null) {
		return '<span>キャラオブジェクトは登録されてません</span>'
	} else {
		return charaSelect.innerHTML;
	}
}

//大技のユーザ名を取得する。
//一覧は、事前にphpで取得し、どこかに保持しておく
function getSpecialSkillUserNames() {
	var prj = document.getElementById('projectsForCutScene').value;
	var userSelect = document.getElementById('SUN_' + prj);
	if (userSelect == null) {
		return '<span>大技ユーザーは登録されてません</span>'
	} else {
		return userSelect.innerHTML;
	}
}

//切り替える
//
function changeMMN(obj) {
	var idx = obj.selectedIndex;
	var value = obj.options[idx].value; // 値
	if (value == 'new') {
		document.getElementById('mapchip_name').value = '';
		document.getElementById('mapchip_name').readOnly = false;;
	} else {
		document.getElementById('mapchip_name').value = value;
		document.getElementById('mapchip_name').readOnly = true;;
	}
}

//キャラクターオブジェクトの名前入力値を切り替える
//新規を選んだ場合⇨テキストをenableに、それいがいはテキストをdisableにし、選択値のバリューをいれる。
function changeWCN(obj) {
	var idx = obj.selectedIndex;
	var value = obj.options[idx].value; // 値
	if (value == 'new') {
		document.getElementById('chara_name').value = '';
		document.getElementById('chara_name').readOnly = false;;
	} else {
		document.getElementById('chara_name').value = value;
		document.getElementById('chara_name').readOnly = true;;
	}
}

//キャラクターオブジェクトの名前入力値を切り替える
//新規を選んだ場合⇨テキストをenableに、それいがいはテキストをdisableにし、選択値のバリューをいれる。
function changeCON(obj) {
	var idx = obj.selectedIndex;
	var value = obj.options[idx].value; // 値
	if (value == 'new') {
		document.getElementById('chara_name').value = '';
		document.getElementById('chara_name').readOnly = false;
		document.getElementById('registeredCharaObjImage').innerHTML = '新規オブジェクトのためテーブル非表示';
	} else {
		document.getElementById('chara_name').value = value;
		document.getElementById('chara_name').readOnly = true;
		document.getElementById('registeredCharaObjImage').innerHTML = document.getElementById('tbl_'+value).innerHTML;
	}
}

//切り替える
//
function changeSUN(obj) {
	var idx = obj.selectedIndex;
	var value = obj.options[idx].value; // 値
	if (value == 'new') {
		document.getElementById('special_skill_user_name').value = '';
		document.getElementById('special_skill_user_name').readOnly = false;;
	} else {
		document.getElementById('special_skill_user_name').value = value;
		document.getElementById('special_skill_user_name').readOnly = true;;
	}
}

function resetMapChipRegisterContainer() {
	document.getElementById('maptipTypes').options[0].selected = true; //選択してくださいに戻す
	document.getElementById('editMapChipInfo').innerHTML = '';             //エディットエリアをクリアする	
}

//キャラオブジェクト登録先を変更した際、入力内容をリセットする。
function resetCharacterRegisterContainer() {
	document.getElementById('characterImageTypes').options[0].selected = true; //選択してくださいに戻す
	document.getElementById('editCharaInfo').innerHTML = '';             //エディットエリアをクリアする
}

//キャラオブジェクト登録先を変更した際、入力内容をリセットする。
function resetObjectRegisterContainer() {
	document.getElementById('objectTypes').options[0].selected = true; //選択してくださいに戻す
	document.getElementById('editObjInfo').innerHTML = '';             //エディットエリアをクリアする
}

//キャラオブジェクト登録先を変更した際、入力内容をリセットする。
function resetCutSceneRegisterContainer() {
	document.getElementById('cutSceneTypes').options[0].selected = true; //選択してくださいに戻す
	document.getElementById('editCutSceneInfo').innerHTML = '';             //エディットエリアをクリアする
}


var charaObjPatterns = [
	['f','前向'],
	['fr','前向右足前'],
	['fl','前向左足前'],
	['b','後向'],
	['br','後向右足前'],
	['bl','後向左足前'],
	['r','右向'],
	['rr','右向足前'],
	['l','左向'],
	['ll','左向足前'],
	['ot','その他'],
];
function getCharaObjPatterns() {
	var html = '';
	html += '<select id="character_pattern" name="character_pattern">';
	for (var i=0; i<charaObjPatterns.length; i++) {
		html += '<option value="' + charaObjPatterns[i][0] + '">' + charaObjPatterns[i][1] + '</option>';
	}
	html += '</select>';
	return html;
}

function makeProjectToSever() {
	//フォーム取得
	var form = document.forms['make_project'];
	var confirmTxt = 'プロジェクトを作成します。よろしいですか？';
	var ret = confirm(confirmTxt);
	if (ret) {
		form.submit();
	}
}

//画像をドット絵に変換する
function makeDotsPicture() {
	var dotsArray = [];
	var r_sum = 0;
	var g_sum = 0;
	var b_sum = 0;
	var a_sum = 0;
	var dotsNumX = canvasWidth/dotLength;
	var dotsNumY = canvasHeight/dotLength;
	for (var i=0; i<dotsNumY; i++) {
		for (var j=0; j<dotsNumX; j++) {
			for (var k=0; k<dotLength; k++) {
				for (var l=0; l<dotLength; l++) {
					var dotData = context.getImageData(j*dotLength+l, i*dotLength+k, 1, 1);
					r_sum += dotData.data[0];
					g_sum += dotData.data[1];
					b_sum += dotData.data[2];
					a_sum += dotData.data[3];
				}
			}
			var r_avg = r_sum/dotLength/dotLength;
			var g_avg = g_sum/dotLength/dotLength;
			var b_avg = b_sum/dotLength/dotLength;
			var a_avg = a_sum/dotLength/dotLength;
			context.fillStyle = 'rgba(' + r_avg + ',' + g_avg + ',' + b_avg + ',' + a_avg + ')'; //塗りつぶしの色
			context.fillRect(j*dotLength, i*dotLength, dotLength, dotLength);
			r_sum = 0;
			g_sum = 0;
			b_sum = 0;
			a_sum = 0;
		}
	}
}

//リアルマップチップを描画する
var realChip = document.getElementById("real-chip");
function setRealChip() {
	realChip.src = canvas.toDataURL();
}

//ハーフモードを切り替える
//ハーフモード適用：消しゴム、通常ペン
var halfModeFlg = false;
function changeHalfMode() {
	if (halfModeFlg) {
		halfMode.style.backgroundColor = '';
		halfModeFlg = false;
	} else {
		halfMode.style.backgroundColor = 'red';
		halfModeFlg = true;
	}
}

