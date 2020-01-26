<?php
require_once("dot-editor-model.php");

$obj = new dotEditor();

if(isset($_GET['id']) && isset($_GET['pas'])) {
	$id = $_GET['id'];
	$pas = $_GET['pas'];
	$adminRes = $obj->isAdmin($id, $pas);
	if ($adminRes) {
		$saveMaptipContainer = $obj->getSaveMaptipContainer();
	}
} else {
	$saveMaptipContainer = '';
}

if (isset($_POST['maptip_image_data']) && isset($_POST['maptipTypes'])) {
    //マップ画像データとマップオブジェクトデータを取得
	$maptipImageData = $_POST['maptip_image_data'];
	$maptipType = $_POST['maptipTypes'];
	$maptipHeight = $_POST['maptip_height'];
	$maptipWidth = $_POST['maptip_width'];

    //マップチップをサーバに保存
    $ret = $obj->addMaptipData($maptipType, $maptipImageData, $maptipHeight, $maptipWidth);
    if ($ret) {
		echo '保存しました！';
	}
}
?>

<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>dot-editor</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="./css/dot-editor.css">
<link rel="stylesheet"
	href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
	integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
	crossorigin="anonymous">
</head>
<body>
	<div id="header-container">
		<img src="./image/dot-editor/header.png" alt="ヘッダー画像">
	</div>
	<div id="options">
			<span class="option"><img src="./image/dot-editor/back.png" alt="戻るダミー" id="backDummy"><img src="./image/dot-editor/backActv.png" alt="戻る" id="back"><span class="z2">戻る</span></span>
			<span class="option"><img src="./image/dot-editor/forward.png" alt="進むダミー" id="forwardDummy"><img src="./image/dot-editor/forwardActv.png" alt="進む" id="forward"><span class="z2">進む</span></span>
			<span class="option"><img src="./image/dot-editor/eraser.png" alt="消しゴム" id="eraser" class="z1"><span class="z2">消しゴム</span></span>
			<span class="option"><img src="./image/dot-editor/colorPick.png" alt="カラーピッカー" id="colorPicker" class="z1"><span class="z2">カラーピッカー</span></span>
			<span class="option"><img src="./image/dot-editor/normal.png" alt="ノーマル" id="normal" class="z1"><span class="z2">ノーマル</span></span>
			<span class="option"><img src="./image/dot-editor/line.png" alt="直線" id="straight-line" class="z1"><span class="z2">直線</span></span>
			<span class="option"><img src="./image/dot-editor/fill.png" alt="塗りつぶし" id="fill" class="z1"><span class="z2">塗りつぶし</span></span>
			<span class="option"><img src="./image/dot-editor/circle.png" alt="円" id="circle" class="z1"><span class="z2">円</span></span>
			<span class="option"><img src="./image/dot-editor/fillCircle.png" alt="塗りつぶし円" id="fill-circle" class="z1"><span class="z2">塗りつぶし円</span></span>
			<span class="option"><img src="./image/dot-editor/square.png" alt="四角" id="square" class="z1"><span class="z2">四角</span></span>
			<span class="option"><img src="./image/dot-editor/fillSquare.png" alt="塗りつぶし四角" id="fill-square" class="z1"><span class="z2">塗りつぶし四角</span></span>
			<span class="option"><img src="./image/dot-editor/reverseLR.png" alt="左右反転" id="reverseLeftRight" class="z1"><span class="z2">左右反転</span></span>
			<span class="option"><img src="./image/dot-editor/reverseUD.png" alt="上下反転" id="reverseUpDown" class="z1"><span class="z2">上下反転</span></span>
			<span class="option"><img src="./image/dot-editor/reverse90.png" alt="90度回転" id="reverse90degree" class="z1"><span class="z2">90度回転</span></span>
			<span class="option"><img src="./image/dot-editor/shiftLeft.png" alt="左シフト" id="shiftLeft" class="z1"><span class="z2">左シフト</span></span>
			<span class="option"><img src="./image/dot-editor/shiftRight.png" alt="右シフト" id="shiftRight" class="z1"><span class="z2">右シフト</span></span>
			<span class="option"><img src="./image/dot-editor/shiftAbove.png" alt="上シフト" id="shiftAbove" class="z1"><span class="z2">上シフト</span></span>
			<span class="option"><img src="./image/dot-editor/shiftBelow.png" alt="下シフト" id="shiftBelow" class="z1"><span class="z2">下シフト</span></span>
			<span class="option"><label for="readFile" id="readFileButton" class="z1"></label><span class="z2">画像を読み込む</span></span>
			<input type="file" id="readFile" value="画像を読み込む">
	</div>
	<div id="preview-container">
		<img id ="preview" src="">
	</div>
	<div id="canvas-container">
		<div id="canvasBG-container">
			<div id="canvasBG">
				<canvas id="canvas"></canvas>
			</div>
		</div>
		<div id="palette-container">
			<table id="selectedColor">
				<tr><th>現在色<th><td id="currentColor"></td><td><span style="font-weight:bold">ドット</span>
					<select id="dotSizeSelect">
						<option value="32">32px</option>
						<option value="16">16px</option>
						<option value="8">8px</option>
						<option value="4">4px</option>
					</select><td></tr>
				<tr class="none"><th>現在色canvas<th><td><canvas id="currentColorCanvas" width="30px" height="30"></canvas></td>
				</tr>
			</table>
			<table id="palette">
		</table>
		</div>
		<canvas id="hiddenCanvas" class="none"></canvas>
		<div id="downloadSize-container">
			<span>ダウンロードサイズ</span>
			<span>H:</span>
			<select id="downloadSizeSelectHeight">
				<!-- <option value="544">544×544</option> -->
				<option value="480">480</option>
				<option value="352">352</option>
				<option value="224">224</option>
				<option value="160">160</option>
				<option value="128">128</option>
				<option value="96">96</option>
				<option value="64">64</option>
				<option value="32">32</option>
			</select>
			<span>W:</span>
			<select id="downloadSizeSelectWidth">
				<!-- <option value="544">544×544</option> -->
				<option value="480">480</option>
				<option value="352">352</option>
				<option value="224">224</option>
				<option value="160">160</option>
				<option value="128">128</option>
				<option value="96">96</option>
				<option value="64">64</option>
				<option value="32">32</option>
			</select>
		</div>
		<div id="preview-link-container">
			<span><label for="preview-link" id="previewLinkButton">プレビュー&ダウンロード</label></span>
			<button id="preview-link">プレビュー&ダウンロード</button>
			<button id="make-dots-pictute">ドットに変換</button>
		</div>
	</div>
	<div id="previewOptions-container">
		<span id="rewrite">書き直す</span>
		<a id="download-link" href="" download="">ダウンロード</a>
		<?php echo $saveMaptipContainer ?>
	</div>
<script src="./js/dot-editor.js"></script>
</body>
</html>
