<?php
require_once("dot-editor-model.php");

$obj = new dotEditor();

if (isset($_POST['del_img_path'])) {
    $ret = $obj->delBkImage($_POST['del_img_path']);
    if ($ret) {
		echo $_POST['del_img_path'] . ' を削除しました！';
	} else {
		echo '削除できませんでした。';
	}
}

if (isset($_POST['new_project_name'])) {
	//マップ画像データとマップオブジェクトデータを取得
	$newProjectName = $_POST['new_project_name'];
    //プロジェクトをサーバに作成
    $ret = $obj->makeNewProject($newProjectName);
    if ($ret) {
		echo 'プロジェクトを作成しました！';
	}
}

if (isset($_POST['maptip_image_data']) && isset($_POST['maptipTypes'])) {
	//マップ画像データとマップオブジェクトデータを取得
	$project = $_POST['projectsForMapChip'];
	$maptipBackUpImageData = $_POST['maptip_backUpImage_data'];
	$maptipBackUpImageHeight = $_POST['maptip_backUpImage_height'];
	$maptipBackUpImageWidth = $_POST['maptip_backUpImage_width'];
	$maptipImageData = $_POST['maptip_image_data'];
	$maptipType = $_POST['maptipTypes'];
	$maptipHeight = $_POST['maptip_height'];
	$maptipWidth = $_POST['maptip_width'];
	if ($maptipType == 'mapRepeat') {
		//マップリピートの保存
		$mapRepeatDirection = $_POST['mapRepeatDirection'];
		$ret = $obj->addMaptipData($project, $maptipBackUpImageData, $maptipBackUpImageHeight, $maptipBackUpImageWidth, $maptipType, $maptipImageData, $maptipHeight, $maptipWidth, $mapRepeatDirection);
	} else {
		//マップリピート以外のマップチップの保存
		$multiMapChipName = $_POST['mapchip_name'];
    	//マップチップをサーバに保存
    	$ret = $obj->addMaptipData($project, $maptipBackUpImageData, $maptipBackUpImageHeight, $maptipBackUpImageWidth, $maptipType, $maptipImageData, $maptipHeight, $maptipWidth, $multiMapChipName);
	}

    if ($ret) {
		echo '保存しました！（マップチップ）';
	}
}

if (isset($_POST['character_image_data']) && isset($_POST['projects']) && isset($_POST['characterImageTypes'])) {
	//キャラクター画像データとマップオブジェクトデータを取得
	$characterBackUpImageData = $_POST['character_backUpImage_data'];
	$characterBackUpImageHeight = $_POST['character_backUpImage_height'];
	$characterBackUpImageWidth = $_POST['character_backUpImage_width'];
	$characterImageData = $_POST['character_image_data'];
	$project = $_POST['projects'];
	$characterImageType = $_POST['characterImageTypes'];
	$characterHeight = $_POST['character_height'];
	$characterWidth = $_POST['character_width'];
	$charaName = $_POST['chara_name'];
	//$charaObjPatern = $_POST['charaObjPatern'];
	
    //キャラクター画像をサーバに保存
    $obj->addCharacterToProject($characterBackUpImageData, $characterBackUpImageHeight, $characterBackUpImageWidth, $characterImageData, $project, $characterImageType, $characterHeight, $characterWidth, $charaName);
    echo '保存しました！（キャラクター）';
}

//オブジェクト登録。結構ややこしくなるかも。
//ifの条件は、toolか、charaのオブジェクトが送信されたらで良いのかな。その先は、caseで拾う。
if ((isset($_POST['tool_object_data']) || isset($_POST['character_object_data'])) && isset($_POST['projects']) && isset($_POST['objectTypes'])) {
	$objectType = $_POST['objectTypes'];
	//オブジェクトタイプでケース分けする
	switch ($objectType) {
		case 'tool':
			//キャラクター画像データとマップオブジェクトデータを取得
			$toolBackUpImageData = $_POST['tool_backUpImage_data'];
			$toolBackUpImageHeight = $_POST['tool_backUpImage_height'];
			$toolBackUpImageWidth = $_POST['tool_backUpImage_width'];
			$toolObjectData = $_POST['tool_object_data'];
			$project = $_POST['projects'];
			//$objectType = $_POST['objectTypes'];
			$toolHeight = $_POST['tool_height'];
			$toolWidth = $_POST['tool_width'];
			$toolName = $_POST['tool_name'];
    		//キャラクター画像をサーバに保存
    		$obj->addToolObjToProject($toolBackUpImageData, $toolBackUpImageHeight, $toolBackUpImageWidth, $toolObjectData, $project, $toolHeight, $toolWidth, $toolName);
    		echo '保存しました！（ツールオブジェクト）';
			break;
		case 'character':
			//キャラクター画像データとマップオブジェクトデータを取得
			$characterBackUpImageData = $_POST['character_backUpImage_data'];
			$characterBackUpImageHeight = $_POST['character_backUpImage_height'];
			$characterBackUpImageWidth = $_POST['character_backUpImage_width'];
			$characterObjectData = $_POST['character_object_data'];
			$project = $_POST['projects'];
			//$objectType = $_POST['objectTypes'];
			$characterHeight = $_POST['character_height'];
			$characterWidth = $_POST['character_width'];
			$characterName = $_POST['character_name'];
			$characterPattern = $_POST['character_pattern'];
    		//キャラクター画像をサーバに保存
    		$obj->addCharacterObjToProject($characterBackUpImageData, $characterBackUpImageHeight, $characterBackUpImageWidth, $characterObjectData, $project, $characterHeight, $characterWidth, $characterName, $characterPattern);
    		echo '保存しました！（キャラクターオブジェクト）';
			break;
	}
}

// カットシーン登録。
if (isset($_POST['cut_scene_image_data']) && isset($_POST['projects']) && isset($_POST['cutSceneTypes'])) {
	$cutSceneType = $_POST['cutSceneTypes'];
	$cutSceneBackUpImageData = $_POST['cut_scene_backUpImage_data'];
	$cutSceneBackUpImageHeight = $_POST['cut_scene_backUpImage_height'];
	$cutSceneBackUpImageWidth = $_POST['cut_scene_backUpImage_width'];
	$cutSceneImageData = $_POST['cut_scene_image_data'];
	$project = $_POST['projects'];
	//$objectType = $_POST['objectTypes'];
	$cutSceneHeight = $_POST['cut_scene_height'];
	$cutSceneWidth = $_POST['cut_scene_width'];
	$specialSkillUserName = $_POST['special_skill_user_name'];
	//echo "<pre>"; echo var_dump($_POST); echo "</pre>"; exit();
    //カットシーン画像をサーバに保存
    $obj->addCutSceneToProject($cutSceneBackUpImageData, $cutSceneBackUpImageHeight, $cutSceneBackUpImageWidth, $cutSceneImageData, $project, $cutSceneType, $cutSceneHeight, $cutSceneWidth, $specialSkillUserName);
    echo '保存しました！（カットシーン）';
}

if(isset($_GET['id']) && isset($_GET['pas'])) {
	$id = $_GET['id'];
	$pas = $_GET['pas'];
	$adminRes = $obj->isAdmin($id, $pas);
	if ($adminRes) {
		$bkMapChips = $obj->getBkMapChips();
		$bkMapChipContainer = $obj->getBkMapChipContainer($bkMapChips);
		$makeProjectContainer = $obj->getMakeProjectContainer();
		$saveMaptipContainer = $obj->getSaveMaptipContainer(); //マップチップ登録
		$saveCharacterContainer = $obj->getSaveCharacterContainer(); //キャラクター画像登録
		$saveObjectContainer = $obj->getSaveObjectContainer(); //オブジェクト登録
		$saveCutSceneContainer = $obj->getSaveCutSceneContainer(); //カットシーン登録
		$multiMapChipNames = $obj->getMultiMapChipNames();
		$wipeCharaNames = $obj->getWipeCharaNames();
		$charaObjectNames = $obj->getCharaObjectNames();
		$specialSkillUserNames = $obj->getSpecialSkillUserNames();
	}
} else {
	$saveMaptipContainer = '';
	$saveCharacterContainer = '';
	$saveObjectContainer = '';
}

//バックアップ画像取得
$mapChips = $obj->getBkImages();

?>

<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>dotEditor</title>
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
			<p class="optionShortCut">A</p>
			<p class="optionShortCut">S</p>
			<p class="optionShortCut">D</p>
			<p class="optionShortCut">F</p>
			<p class="optionShortCut">G</p>
			<p class="optionShortCut">V</p>
			<p class="optionShortCut">B</p>
			<p class="optionShortCut">Q</p>
			<p class="optionShortCut">W</p>
			<p class="optionShortCut">E</p>
			<p class="optionShortCut">R</p>
			<p class="optionShortCut">*</p>
			<p class="optionShortCut">*</p>
			<p class="optionShortCut">*</p>
			<p class="optionShortCut">←</p>
			<p class="optionShortCut">→</p>
			<p class="optionShortCut">↑</p>
			<p class="optionShortCut">↓</p>
			<p class="optionShortCut">*</p>
			<p class="optionShortCut">*</p>
			<br>
			<span class="option"><img src="./image/dot-editor/back.png" alt="戻るダミー" id="backDummy"><img src="./image/dot-editor/backActv.png" alt="戻る" id="back"><span class="z2">戻る</span></span>
			<span class="option"><img src="./image/dot-editor/forward.png" alt="進むダミー" id="forwardDummy"><img src="./image/dot-editor/forwardActv.png" alt="進む" id="forward"><span class="z2">進む</span></span>
			<span class="option"><img src="./image/dot-editor/eraser.png" alt="消しゴム" id="eraser" class="z1"><span class="z2">消しゴム</span></span>
			<span class="option"><img src="./image/dot-editor/normal.png" alt="ノーマル" id="normal" class="z1"><span class="z2">ノーマル</span></span>
			<span class="option"><img src="./image/dot-editor/colorPick.png" alt="カラーピッカー" id="colorPicker" class="z1"><span class="z2">カラーピッカー</span></span>
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
			<span class="option"><label for="make-dots-picture" id="make-dots-picture" class="z1"></label><span class="z2">ドットに変換</span></span>
			<input type="file" id="readFile" value="画像を読み込む">
	</div>
	<div id="preview-container">
		<img id ="preview" src="">
	</div>
	<div id="canvas-container">
		<div id="">
			<button id="half-mode" onclick="changeHalfMode()">ハーフモード</button>
		</div>
		<div id="canvasBG-container">
			<div id="canvasBG">
				<canvas id="canvas"></canvas>
			</div>
		</div>
		<?php 
			if ($adminRes) {
				echo '<div id="bkMapChipContainer">';
				echo $bkMapChipContainer;
				echo '</div>';
			} 
		?>
		<div id="palette-container">
			<table id="selectedColor">
				<tr>
					<th>現在色<th>
					<td id="currentColor"></td>
					<td><span style="font-weight:bold">ドット</span>
						<select id="dotSizeSelect">
							<option value="32">32px(key1)</option>
							<option value="16">16px(key2)</option>
							<option value="8">8px(key3)</option>
							<option value="4">4px(key4)</option>
						</select>
					<td>
				</tr>
				<tr class="none">
					<th>現在色canvas<th>
					<td></td>
					<td>
						<canvas id="currentColorCanvas" width="30px" height="30"></canvas>
					</td>
				</tr>
			</table>
			<table id="palette"></table>
		</div>
		<div id="real-chip-container">
			<span>50×50</sapn><br>
			<img id="real-chip" src="">
		</div>
		<canvas id="hiddenCanvas" class="none"></canvas>
		<div id="downloadSize-container">
			<span>ダウンロードサイズ</span>
			<span>W:</span>
			<select id="downloadSizeSelectWidth">
				<option value="32">32</option>
				<option value="64">64</option>
				<option value="96">96</option>
				<option value="128">128</option>
				<option value="160">160</option>
				<option value="224">224</option>
				<option value="288">288</option>
				<option value="352">352</option>
				<option value="480">480</option>
			</select>
			<span>H:</span>
			<select id="downloadSizeSelectHeight">
				<option value="32">32</option>
				<option value="64">64</option>
				<option value="96">96</option>
				<option value="128">128</option>
				<option value="160">160</option>
				<option value="224">224</option>
				<option value="288">288</option>
				<option value="352">352</option>
				<option value="480">480</option>
			</select>
		</div>
		<div id="preview-link-container">
			<span><label for="preview-link" id="previewLinkButton">プレビュー&ダウンロード</label></span>
			<button id="preview-link">プレビュー&ダウンロード</button>
		</div>
		<div style="background-color: white; margin-top: 10px; width: 250px;">
			<p style="margin: 0 0 0 0;">通常チップ　：32 × 32</p>
			<p style="margin: 0 0 0 0;">ワイプ　　　：96 × 96</p>
			<p style="margin: 0 0 0 0;">バトルキャラ：224 × 224</p>
			<p style="margin: 0 0 0 0;">カットシーン：480 × 288</p>
		</div>
	</div>
	<div id="previewOptions-container">
		<span id="rewrite">書き直す</span>
		<a id="download-link" href="" download="">ダウンロード</a>
		<?php
			if ($adminRes) {
				echo $makeProjectContainer;
				echo $saveMaptipContainer;
				echo $saveCharacterContainer;
				echo $saveObjectContainer;
				echo $saveCutSceneContainer;
				echo $multiMapChipNames;
				echo $wipeCharaNames;
				echo $charaObjectNames;
				echo $specialSkillUserNames;
			}
		?>
	</div>
<script src="./js/dot-editor.js"></script>
</body>
</html>
