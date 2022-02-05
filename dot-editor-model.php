<?php
//dot-editorのmodel
//クラスを作って、コンストラクタと各ファンクションを記述する
require("admin.php");

class dotEditor {

    private $maptipTypes; //マップチップ種類
    private $maptipTypeDirPath; //マップチップディレクトリパス（マップエディター）
    private $rpgEditorPrjDirPath; //マップエディターディレクトリパス
    private $projectDirPath;    //プロジェクトディレクトリパス（RPGプレイヤー）
    private $characterImageTypes; //キャラクター画像タイプ
    private $objectTypes; //オブジェクトタイプ
    private $cutSceneTypes; //カットシーンタイプ
    private $backUpDirPath; //バックアップディレクトリパス

    /**
     * ドットエディタコンストラクタ
     */
    function __construct() {
        $this->MaptipTypes = array(
            '選択してください',
            'character',
            'map',
            'mapPass',
            'tool',
            'building',
            'mapRepeat',
            'mapTurn',
            'mapTurnPass',
            'design'
        );
        $this->maptipTypeDirPath = '../map-editor/image/map-editor/map-chip/';
        $this->rpgEditorPrjDirPath = '../rpg-editor/public/projects/';
        $this->projectDirPath = '../rpg-player/public/projects/';
        $this->characterImageTypes = ['選択してください', 'wipe', 'battle']; //必要に応じて足していく
        $this->objectTypes = ['選択してください','tool', 'character']; //必要に応じて足していく
        $this->cutSceneTypes = ['選択してください','scene', 'specialSkill']; //必要に応じて足していく
        $this->backUpDirPath = './image/dot-editor/backUp/';
    }

    /**
     * マップチップを取得する
     */
    function getBkMapChips(){
        //表示させないディレクトリ配列
        $excludes = array(
            '.',
            '..',
            '.DS_Store'
        );
        $retArray = array();
        //マップチップディレクトリのディレクトリ（カテゴリ）を取得する
        $bkTypes = scandir($this->backUpDirPath); // charactersとmapChipsとobjects
        if ($this->checkIsDirEmpty($bkTypes)) {
            $retArray[0] = 'バックアップ画像がありません';
            return $retArray;
        }
        foreach($bkTypes AS $bkType) { // charactersとmapChipsとobjectsとcutScenes
            if (in_array($bkType, $excludes)) continue;
            switch ($bkType) { // charactersとmapChipsとobjects
                case 'characters':
                    $charaImageTypes = scandir($this->backUpDirPath . 'characters'); //battleとwipe
                    if ($this->checkIsDirEmpty($charaImageTypes)) {
                        $retArray['characters'][0] = 'characters/は空です';
                    continue 2;
                    }
                    foreach($charaImageTypes AS $charaImageType) {
                        if (in_array($charaImageType, $excludes)) continue;
                        switch ($charaImageType) { //battleとwipe
                            case 'battle':
                                $projects = scandir($this->backUpDirPath . 'characters/battle'); //プロジェクト毎
                                if ($this->checkIsDirEmpty($projects)) {
                                    $retArray['characters']['battle'][0] = 'characters/battle/は空です';
                                    continue 2;
                                }
                                foreach($projects AS $project) { //プロジェクト毎
                                    if (in_array($project, $excludes)) continue;
                                    $files = scandir($this->backUpDirPath . 'characters/battle' . '/' . $project); //バトルキャラのpmg
                                    foreach($files AS $file) {
                                        if (in_array($file, $excludes)) continue;
                                        $retArray['characters']['battle'][$project][] = $file;
                                    }
                                }
                            break;
                            case 'wipe': //wipeの場合複数構成。
                                $projects = scandir($this->backUpDirPath . 'characters/wipe'); //プロジェクト毎
                                if ($this->checkIsDirEmpty($projects)) {
                                    $retArray['characters']['wipe'][0] = 'characters/wipe/は空です';
                                    continue 2;
                                }
                                foreach($projects AS $project) { //プロジェクト毎
                                    if (in_array($project, $excludes)) continue;
                                    $charaDirs = scandir($this->backUpDirPath . 'characters/wipe/' . $project); //バトルキャラのディレクトリ
                                    if ($this->checkIsDirEmpty($charaDirs)) {
                                        $retArray['characters']['wipe'][$project][0] = 'characters/wipe/' . $project . 'は空です';
                                        continue;
                                    }
                                    foreach($charaDirs AS $charaDir) {
                                        if (in_array($charaDir, $excludes)) continue;
                                        $files = scandir($this->backUpDirPath . 'characters/wipe/' . $project . '/' . $charaDir); //バトルキャラのディレクトリ
                                        foreach($files AS $file) {
                                            if (in_array($file, $excludes)) continue;
                                            $retArray['characters']['wipe'][$project][$charaDir][] = $file;
                                        }
                                    }
                                }  
                            break;
                        }
                    }
                break;
                case 'mapChips':
                    $projects = scandir($this->backUpDirPath . 'mapChips'); //プロジェクト毎
                    if ($this->checkIsDirEmpty($projects)) {
                        $retArray['mapChips'][0] = $project .'mapChips/は空です';
                        continue 2;
                    }
                    foreach ($projects AS $project) {
                        //特定のディレクトリの場合は表示させない
                        if (in_array($project, $excludes)) continue;
                        $mapTypes = scandir($this->backUpDirPath . 'mapChips/' . $project);
                        if ($this->checkIsDirEmpty($mapTypes)) {
                            $retArray['mapChips'][$project][0] = $project .'は空です';
                            continue;
                        }
                        foreach ($mapTypes AS $mapType) {
                            //特定のディレクトリの場合は表示させない
                            if (in_array($mapType, $excludes)) continue;
                            //ここからはファイルとディレクトリが混在する。
                            $rets = scandir($this->backUpDirPath . 'mapChips/' . $project . '/' . $mapType);
                            if ($this->checkIsDirEmpty($rets)) {
                                $retArray['mapChips'][$project][$mapType][0] = $mapType .'は空です';
                                continue;
                            }
                            foreach ($rets AS $ret) {
                                //特定のディレクトリの場合は表示させない
                                if (in_array($ret, $excludes)) continue;
                                if (substr($ret, -4) == '.png') {
                                    //マップファイルの場合
                                    $retArray['mapChips'][$project][$mapType][] = $ret;
                                } else {
                                    //ディレクトリの場合
                                    //正直ここからはマップチップの構成が変わると階層をいじる必要が出てくるかも。まあそん時はそん時。
                                    $files = scandir($this->backUpDirPath . 'mapChips/' . $project . '/' . $mapType . '/' . $ret);
                                    if ($this->checkIsDirEmpty($files)) {
                                        $retArray['mapChips'][$project][$mapType][$ret][0] = $ret. 'は空です';
                                        continue;
                                    }
                                    foreach ($files AS $file) {
                                        //特定のディレクトリの場合は表示させない
                                        if (in_array($file, $excludes)) continue;
                                        $retArray['mapChips'][$project][$mapType][$ret][] = $file;
                                    }
                                }
                            }
                        }
                    }
                break;
                case 'objects':
                    $objectTypes = scandir($this->backUpDirPath . 'objects'); //battleとwipe
                    if ($this->checkIsDirEmpty($objectTypes)) {
                        $retArray['objects'][0] = 'objects/は空です';
                    continue 2;
                    }
                    foreach($objectTypes AS $objectType) {
                        if (in_array($objectType, $excludes)) continue;
                        switch ($objectType) { //charactersとtools
                            case 'characters': //wipeの場合複数構成。
                                $projects = scandir($this->backUpDirPath . 'objects/characters'); //プロジェクト毎
                                if ($this->checkIsDirEmpty($projects)) {
                                    $retArray['objects']['characters'][0] = 'objects/characters/は空です';
                                    continue 2;
                                }
                                foreach($projects AS $project) { //プロジェクト毎
                                    if (in_array($project, $excludes)) continue;
                                    $charaDirs = scandir($this->backUpDirPath . 'objects/characters/' . $project); //バトルキャラのディレクトリ
                                    if ($this->checkIsDirEmpty($charaDirs)) {
                                        $retArray['objects']['characters'][$project][0] = 'objects/characters/' . $project . 'は空です';
                                        continue;
                                    }
                                    foreach($charaDirs AS $charaDir) {
                                        if (in_array($charaDir, $excludes)) continue;
                                        $files = scandir($this->backUpDirPath . 'objects/characters/' . $project . '/' . $charaDir); //バトルキャラのディレクトリ
                                        foreach($files AS $file) {
                                            if (in_array($file, $excludes)) continue;
                                            $retArray['objects']['characters'][$project][$charaDir][] = $file;
                                        }
                                    }
                                }  
                            break;
                            case 'tools':
                                $projects = scandir($this->backUpDirPath . 'objects/tools'); //プロジェクト毎
                                if ($this->checkIsDirEmpty($projects)) {
                                    $retArray['objects']['tools'][0] = 'objects/tools/は空です';
                                    continue 2;
                                }
                                foreach($projects AS $project) { //プロジェクト毎
                                    if (in_array($project, $excludes)) continue;
                                    $files = scandir($this->backUpDirPath . 'objects/tools' . '/' . $project); //バトルキャラのpmg
                                    foreach($files AS $file) {
                                        if (in_array($file, $excludes)) continue;
                                        $retArray['objects']['tools'][$project][] = $file;
                                    }
                                }
                            break;
                        }
                    }
                break;
                case 'cutScenes':
                    $cutSceneTypes = scandir($this->backUpDirPath . 'cutScenes'); //sceneとspecialSkill
                    if ($this->checkIsDirEmpty($cutSceneTypes)) {
                        $retArray['cutScenes'][0] = 'cutScenes/は空です';
                        continue 2;
                    }
                    foreach($cutSceneTypes AS $cutSceneType) {
                        if (in_array($cutSceneType, $excludes)) continue;
                        switch ($cutSceneType) { //battleとwipe
                            case 'specialSkill': //specialSkillの場合複数構成。
                                $projects = scandir($this->backUpDirPath . 'cutScenes/specialSkill'); //プロジェクト毎
                                if ($this->checkIsDirEmpty($projects)) {
                                    $retArray['cutScenes']['specialSkill'][0] = 'cutScenes/specialSkill/は空です';
                                    continue 2;
                                }
                                foreach($projects AS $project) { //プロジェクト毎
                                    if (in_array($project, $excludes)) continue;
                                    $charaDirs = scandir($this->backUpDirPath . 'cutScenes/specialSkill/' . $project); //バトルキャラのディレクトリ
                                    if ($this->checkIsDirEmpty($charaDirs)) {
                                        $retArray['cutScenes']['specialSkill'][$project][0] = 'cutScenes/specialSkill/' . $project . 'は空です';
                                        continue;
                                    }
                                    foreach($charaDirs AS $charaDir) {
                                        if (in_array($charaDir, $excludes)) continue;
                                        $files = scandir($this->backUpDirPath . 'cutScenes/specialSkill/' . $project . '/' . $charaDir); //バトルキャラのディレクトリ
                                        foreach($files AS $file) {
                                            if (in_array($file, $excludes)) continue;
                                            $retArray['cutScenes']['specialSkill'][$project][$charaDir][] = $file;
                                        }
                                    }
                                }  
                            break;
                            case 'scene':
                                $projects = scandir($this->backUpDirPath . 'cutScenes/scene'); //プロジェクト毎
                                if ($this->checkIsDirEmpty($projects)) {
                                    $retArray['cutScenes']['scene'][0] = 'cutScenes/scene/は空です';
                                    continue 2;
                                }
                                foreach($projects AS $project) { //プロジェクト毎
                                    if (in_array($project, $excludes)) continue;
                                    $files = scandir($this->backUpDirPath . 'cutScenes/scene' . '/' . $project); //シーンのpmg
                                    foreach($files AS $file) {
                                        if (in_array($file, $excludes)) continue;
                                        $retArray['cutScenes']['scene'][$project][] = $file;
                                    }
                                }
                            break;
                        }
                    }
                break;
            }
        }
        return $retArray;
    }

    function checkIsDirEmpty($dir) {
        if (count($dir) == 0) return true;
        foreach ($dir AS $file) {
            if ($file == '.' || $file == '..') continue;
            return false;
        }
        return true;
    }



    function getBkMapChipContainer($mapChips) {
        $html = '';
        if ($mapChips[0] == 'バックアップ画像がありません') {
            $html .= '<div>バックアップ画像がありません</div>';
            return $html;
        }
        foreach($mapChips AS $bkTypeKey => $bkType){
            if (substr($bkType[0], -9) == '空です') {
                $html .= '<div style="color:red;">' . $bkType[0] . '</div>';
                continue;
            }
            if ($bkTypeKey == 'characters') {
                $html .= '<div class="Cprojects" style="color:red">';
                $html .= '<span class="unfoldButton">＋</span>';
                $html .= '<span class="foldButton">ー</span>' . $bkTypeKey;
                $html .= '</div>';
                $html .= '<div class="acordion">';
                foreach ($bkType AS $charaImageTypeKey => $charaImageType) {
                    if (substr($charaImageType[0], -9) == '空です') {
                        $html .= '<div style="color:orange; margin-left:10px; margin-top:4px; border-left:1px solid black;">' . $charaImageType[0] . '</div>';
                        continue;
                    }
                    $html .= '<div class="CmapTypes" style="color:orange; margin-left:10px; margin-top:4px; border-left:1px solid black;">';
                    $html .= '<span class="unfoldButton">＋</span>';
                    $html .= '<span class="foldButton">ー</span>' . $charaImageTypeKey;
                    $html .= '</div>';
                    $html .= '<div class="acordion" style="margin-left:10px; border-left:1px solid black;">';
                    foreach ($charaImageType AS $projectKey => $project) {
                        if (substr($project[0], -9) == '空です') {
                            $html .= '<div style="color:green; margin-left:20px; margin-top:4px; border-left:1px solid black;">' . $project[0] . '</div>';
                            continue;
                        }
                        $html .= '<div class="Cmaps" style="color:green; margin-left:20px; margin-top:4px; border-left:1px solid black;">';
                        $html .= '<span class="unfoldButton">＋</span>';
                        $html .= '<span class="foldButton">ー</span>' . $projectKey;
                        $html .= '</div>';
                        $html .= '<div class="acordion" style="margin-left:20px; border-left:1px solid black;">';
                        foreach ($project AS $fileKey => $file) {
                            if (is_array($file)) {
                                if (substr($file[0], -9) == '空です') {
                                    $html .= '<div style="color:black; margin-left:20px; margin-top:4px; border-left:1px solid black;">' . $file[0] . '</div>';
                                    continue;
                                }
                                $html .= '<div class="Cmaps" style="color:black; margin-left:20px; margin-top:4px; border-left:1px solid black;">';
                                $html .= '<span class="unfoldButton">＋</span>';
                                $html .= '<span class="foldButton">ー</span>' . $fileKey;
                                $html .= '</div>';
                                $html .= '<div class="acordion" style="margin-left:20px; border-left:1px solid black;">';
                                foreach ($file AS $png) {
                                    //今のところここが最下層
                                    $html .= '<span><img src="'. $this->backUpDirPath . $bkTypeKey . '/' . $charaImageTypeKey . '/' . $projectKey . '/' . $fileKey . '/' .$png.'" alt="' . $png . '" class="bkImages"><button class="delBkImg">削除</button></span>';
                                }
                                $html .= '</div>';
                            } else {
                                //ここにはこないけど書いちゃった
                                $html .= '<span><img src="'. $this->backUpDirPath . $bkTypeKey . '/' . $charaImageTypeKey . '/' . $projectKey . '/' .$file.'" alt="' . $file . '" class="bkImages"><button class="delBkImg">削除</button></span>';
                            }
                        }
                        $html .= '</div>';
                    }
                    $html .= '</div>';
                }
                $html .= '</div>';

            } else if ($bkTypeKey == 'mapChips') {
                $html .= '<div class="Cprojects" style="color:red">';
                $html .= '<span class="unfoldButton">＋</span>';
                $html .= '<span class="foldButton">ー</span>' . $bkTypeKey;
                $html .= '</div>';
                $html .= '<div class="acordion">';
                foreach ($bkType AS $projectKey => $project) {
                    if (substr($project[0], -9) == '空です') {
                        $html .= '<div style="color:orange; margin-left:10px; margin-top:4px; border-left:1px solid black;">' . $project[0] . '</div>';
                        continue;
                    }
                    $html .= '<div class="CmapTypes" style="color:orange; margin-left:10px; margin-top:4px; border-left:1px solid black;">';
                    $html .= '<span class="unfoldButton">＋</span>';
                    $html .= '<span class="foldButton">ー</span>' . $projectKey;
                    $html .= '</div>';
                    $html .= '<div class="acordion" style="margin-left:10px; border-left:1px solid black;">';
                    foreach ($project AS $mapTypeKey => $mapType) {
                        if (substr($mapType[0], -9) == '空です') {
                            $html .= '<div style="color:green; margin-left:20px; margin-top:4px; border-left:1px solid black;">' . $mapType[0] . '</div>';
                            continue;
                        }
                        $html .= '<div class="Cmaps" style="color:green; margin-left:20px; margin-top:4px; border-left:1px solid black;">';
                        $html .= '<span class="unfoldButton">＋</span>';
                        $html .= '<span class="foldButton">ー</span>' . $mapTypeKey;
                        $html .= '</div>';
                        $html .= '<div class="acordion" style="margin-left:20px; border-left:1px solid black;">';
                        foreach ($mapType AS $fileKey => $file) {
                            if (is_array($file)) {
                                if (substr($file[0], -9) == '空です') {
                                    $html .= '<div style="color:black; margin-left:20px; margin-top:4px; border-left:1px solid black;">' . $file[0] . '</div>';
                                    continue;
                                }
                                $html .= '<div class="Cmaps" style="color:black; margin-left:20px; margin-top:4px; border-left:1px solid black;">';
                                $html .= '<span class="unfoldButton">＋</span>';
                                $html .= '<span class="foldButton">ー</span>' . $fileKey;
                                $html .= '</div>';
                                $html .= '<div class="acordion" style="margin-left:20px; border-left:1px solid black;">';
                                foreach ($file AS $png) {
                                    //今のところここが最下層
                                    $html .= '<span><img src="'. $this->backUpDirPath . $bkTypeKey . '/' . $projectKey . '/' . $mapTypeKey . '/' . $fileKey . '/' .$png.'" alt="' . $png . '" class="bkImages"><button class="delBkImg">削除</button></span>';
                                }
                                $html .= '</div>';
                            } else {
                                //ここにはこないけど書いちゃった
                                $html .= '<span><img src="'. $this->backUpDirPath . $bkTypeKey . '/' . $projectKey . '/' . $mapTypeKey . '/' .$file.'" alt="' . $file . '" class="bkImages"><button class="delBkImg">削除</button></span>';
                            }
                        }
                        $html .= '</div>';
                    }
                    $html .= '</div>';
                }
                $html .= '</div>';

            } else if ($bkTypeKey == 'objects') {
                $html .= '<div class="Cprojects" style="color:red">';
                $html .= '<span class="unfoldButton">＋</span>';
                $html .= '<span class="foldButton">ー</span>' . $bkTypeKey;
                $html .= '</div>';
                $html .= '<div class="acordion">';
                foreach ($bkType AS $objectTypeKey => $objectType) {
                    if (substr($objectType[0], -9) == '空です') {
                        $html .= '<div style="color:orange; margin-left:10px; margin-top:4px; border-left:1px solid black;">' . $objectType[0] . '</div>';
                        continue;
                    }
                    $html .= '<div class="CmapTypes" style="color:orange; margin-left:10px; margin-top:4px; border-left:1px solid black;">';
                    $html .= '<span class="unfoldButton">＋</span>';
                    $html .= '<span class="foldButton">ー</span>' . $objectTypeKey;
                    $html .= '</div>';
                    $html .= '<div class="acordion" style="margin-left:10px; border-left:1px solid black;">';
                    foreach ($objectType AS $projectKey => $project) {
                        if (substr($project[0], -9) == '空です') {
                            $html .= '<div style="color:green; margin-left:20px; margin-top:4px; border-left:1px solid black;">' . $project[0] . '</div>';
                            continue;
                        }
                        $html .= '<div class="Cmaps" style="color:green; margin-left:20px; margin-top:4px; border-left:1px solid black;">';
                        $html .= '<span class="unfoldButton">＋</span>';
                        $html .= '<span class="foldButton">ー</span>' . $projectKey;
                        $html .= '</div>';
                        $html .= '<div class="acordion" style="margin-left:20px; border-left:1px solid black;">';
                        foreach ($project AS $fileKey => $file) {
                            if (is_array($file)) {
                                if (substr($file[0], -9) == '空です') {
                                    $html .= '<div style="color:black; margin-left:20px; margin-top:4px; border-left:1px solid black;">' . $file[0] . '</div>';
                                    continue;
                                }
                                $html .= '<div class="Cmaps" style="color:black; margin-left:20px; margin-top:4px; border-left:1px solid black;">';
                                $html .= '<span class="unfoldButton">＋</span>';
                                $html .= '<span class="foldButton">ー</span>' . $fileKey;
                                $html .= '</div>';
                                $html .= '<div class="acordion" style="margin-left:20px; border-left:1px solid black;">';
                                foreach ($file AS $png) {
                                    //今のところここが最下層
                                    $html .= '<span><img src="'. $this->backUpDirPath . $bkTypeKey . '/' . $objectTypeKey . '/' . $projectKey . '/' . $fileKey . '/' .$png.'" alt="' . $png . '" class="bkImages"><button class="delBkImg">削除</button></span>';
                                }
                                $html .= '</div>';
                            } else {
                                //ここにはこないけど書いちゃった
                                $html .= '<span><img src="'. $this->backUpDirPath . $bkTypeKey . '/' . $objectTypeKey . '/' . $projectKey . '/' .$file.'" alt="' . $file . '" class="bkImages"><button class="delBkImg">削除</button></span>';
                            }
                        }
                        $html .= '</div>';
                    }
                    $html .= '</div>';
                }
                $html .= '</div>';
                $html .= '<form name="del_bk_image" action="" method="post">';
                $html .= '<input type="hidden" name="del_img_path" value="" />';
                $html .= '</form>';

            } else if ($bkTypeKey == 'cutScenes') {
                $html .= '<div class="Cprojects" style="color:red">';
                $html .= '<span class="unfoldButton">＋</span>';
                $html .= '<span class="foldButton">ー</span>' . $bkTypeKey;
                $html .= '</div>';
                $html .= '<div class="acordion">';
                foreach ($bkType AS $cutSceneTypeKey => $cutSceneType) {
                    if (substr($cutSceneType[0], -9) == '空です') {
                        $html .= '<div style="color:orange; margin-left:10px; margin-top:4px; border-left:1px solid black;">' . $cutSceneTypeKey[0] . '</div>';
                        continue;
                    }
                    $html .= '<div class="CmapTypes" style="color:orange; margin-left:10px; margin-top:4px; border-left:1px solid black;">';
                    $html .= '<span class="unfoldButton">＋</span>';
                    $html .= '<span class="foldButton">ー</span>' . $cutSceneTypeKey;
                    $html .= '</div>';
                    $html .= '<div class="acordion" style="margin-left:10px; border-left:1px solid black;">';
                    foreach ($cutSceneType AS $projectKey => $project) {
                        if (substr($project[0], -9) == '空です') {
                            $html .= '<div style="color:green; margin-left:20px; margin-top:4px; border-left:1px solid black;">' . $project[0] . '</div>';
                            continue;
                        }
                        $html .= '<div class="Cmaps" style="color:green; margin-left:20px; margin-top:4px; border-left:1px solid black;">';
                        $html .= '<span class="unfoldButton">＋</span>';
                        $html .= '<span class="foldButton">ー</span>' . $projectKey;
                        $html .= '</div>';
                        $html .= '<div class="acordion" style="margin-left:20px; border-left:1px solid black;">';
                        foreach ($project AS $fileKey => $file) {
                            if (is_array($file)) {
                                if (substr($file[0], -9) == '空です') {
                                    $html .= '<div style="color:black; margin-left:20px; margin-top:4px; border-left:1px solid black;">' . $file[0] . '</div>';
                                    continue;
                                }
                                $html .= '<div class="Cmaps" style="color:black; margin-left:20px; margin-top:4px; border-left:1px solid black;">';
                                $html .= '<span class="unfoldButton">＋</span>';
                                $html .= '<span class="foldButton">ー</span>' . $fileKey;
                                $html .= '</div>';
                                $html .= '<div class="acordion" style="margin-left:20px; border-left:1px solid black;">';
                                foreach ($file AS $png) {
                                    //今のところここが最下層
                                    $html .= '<span><img src="'. $this->backUpDirPath . $bkTypeKey . '/' . $cutSceneTypeKey . '/' . $projectKey . '/' . $fileKey . '/' .$png.'" alt="' . $png . '" class="bkImages"><button class="delBkImg">削除</button></span>';
                                }
                                $html .= '</div>';
                            } else {
                                //ここにはこないけど書いちゃった
                                $html .= '<span><img src="'. $this->backUpDirPath . $bkTypeKey . '/' . $cutSceneTypeKey . '/' . $projectKey . '/' .$file.'" alt="' . $file . '" class="bkImages"><button class="delBkImg">削除</button></span>';
                            }
                        }
                        $html .= '</div>';
                    }
                    $html .= '</div>';
                }
                $html .= '</div>';
            } else {

            }
        }
        return $html;
    }


    /**
     * 既存のプロジェクトのデータを取得する
     * return プロジェクトのセレクトボックス
     */
    function getProjectsData() {
        $dirs = scandir($this->projectDirPath);
        //表示させないディレクトリ配列
        $excludes = array(
            '.',
            '..',
            '.DS_Store'
        );
        $projects = '<select id="projects" name="projects">';
        foreach ($dirs AS $dir) {
            //特定のディレクトリの場合は表示させない
            if (in_array($dir, $excludes)) {
                continue;
            }
            //最初の要素を選択状態に
            if ($dir === reset($dirs)) {
                $projects .= '<option value="' . $dir . '" selected>' . $dir . '</option>';
            }
            $projects .= '<option value="' . $dir . '">' . $dir . '</option>';
        }
        $projects .= '</select>';
        return $projects;
    }

    /**
     * プロジェクト作成コンテナを作成する
     * return 作成するプロジェクト名のテキストボックス
     */
    function getMakeProjectContainer() {
        $html = '<div id="make-project-container"><form name="make_project" action="" method="post"><br><p>新規プロジェクト作成</p>'; 
        $html .= '<span>プロジェクト名</span><input type="text" id="new_project_name" name="new_project_name"></input>共通ディレクトリ作成の時は「共通」と入力';
        $html .= '<br><span id="make-project">プロジェクトを作成する</span>';
        $html .= '</form></div>';
        return $html;
    }

    /**
     * 新規プロジェクト作成する
     */
    function makeNewProject($newProjectName) {
        //プロジェクトディレクトリが必要な各所にプロジェクトディレクトリを作成する。
        if ($newProjectName == '共通') {
            //ドットエディタ
            if(!file_exists($this->backUpDirPath . 'characters/battle/common')) mkdir($this->backUpDirPath . 'characters/battle/common', 0755, TRUE);
            if(!file_exists($this->backUpDirPath . 'characters/wipe/common')) mkdir($this->backUpDirPath . 'characters/wipe/common', 0755, TRUE);
            if(!file_exists($this->backUpDirPath . 'mapChips/common')) mkdir($this->backUpDirPath . 'mapChips/common', 0755, TRUE);
            if(!file_exists($this->backUpDirPath . 'objects/characters/common')) mkdir($this->backUpDirPath . 'objects/characters/common', 0755, TRUE);
            if(!file_exists($this->backUpDirPath . 'objects/tools/common')) mkdir($this->backUpDirPath . 'objects/tools/common', 0755, TRUE);
            if(!file_exists($this->backUpDirPath . 'cutScenes/scene/common')) mkdir($this->backUpDirPath . 'cutScenes/scene/common', 0755, TRUE);
            if(!file_exists($this->backUpDirPath . 'cutScenes/specialSkill/common')) mkdir($this->backUpDirPath . 'cutScenes/specialSkill/common', 0755, TRUE);
            //マップエディタ
            if(!file_exists($this->maptipTypeDirPath . 'common')) mkdir($this->maptipTypeDirPath . 'common', 0755, TRUE);
            //rpgエディタ
            //if(!file_exists($this->rpgEditorPrjDirPath . 'common')) mkdir($this->rpgEditorPrjDirPath . 'common', 0755, TRUE);
            //rpgプレイヤ
            if(!file_exists($this->projectDirPath . 'common/characters/battle')) mkdir($this->projectDirPath . 'common/characters/battle', 0755, TRUE);
            if(!file_exists($this->projectDirPath . 'common/characters/wipe')) mkdir($this->projectDirPath . 'common/characters/wipe', 0755, TRUE);
            if(!file_exists($this->projectDirPath . 'common/objects/characters')) mkdir($this->projectDirPath . 'common/objects/characters', 0755, TRUE);
            if(!file_exists($this->projectDirPath . 'common/objects/tools')) mkdir($this->projectDirPath . 'common/objects/tools', 0755, TRUE);
            if(!file_exists($this->projectDirPath . 'common/cutScenes/scene')) mkdir($this->projectDirPath . 'common/cutScenes/scene', 0755, TRUE);
            if(!file_exists($this->projectDirPath . 'common/cutScenes/specialSkill')) mkdir($this->projectDirPath . 'common/cutScenes/specialSkill', 0755, TRUE);
        } else {
            if(!file_exists($this->backUpDirPath . 'characters/battle/'.$newProjectName)) mkdir($this->backUpDirPath . 'characters/battle/'.$newProjectName, 0755, TRUE);
            if(!file_exists($this->backUpDirPath . 'characters/wipe/'.$newProjectName)) mkdir($this->backUpDirPath . 'characters/wipe/'.$newProjectName, 0755, TRUE);
            if(!file_exists($this->backUpDirPath . 'mapChips/'.$newProjectName)) mkdir($this->backUpDirPath . 'mapChips/'.$newProjectName, 0755, TRUE);
            if(!file_exists($this->backUpDirPath . 'objects/characters/'.$newProjectName)) mkdir($this->backUpDirPath . 'objects/characters/'.$newProjectName, 0755, TRUE);
            if(!file_exists($this->backUpDirPath . 'objects/tools/'.$newProjectName)) mkdir($this->backUpDirPath . 'objects/tools/'.$newProjectName, 0755, TRUE);
            if(!file_exists($this->backUpDirPath . 'cutScenes/scene/'.$newProjectName)) mkdir($this->backUpDirPath . 'cutScenes/scene/'.$newProjectName, 0755, TRUE);
            if(!file_exists($this->backUpDirPath . 'cutScenes/specialSkill/'.$newProjectName)) mkdir($this->backUpDirPath . 'cutScenes/specialSkill/'.$newProjectName, 0755, TRUE);
            //マップエディタ
            if(!file_exists($this->maptipTypeDirPath .$newProjectName)) mkdir($this->maptipTypeDirPath .$newProjectName, 0755, TRUE);
            //rpgエディタ
            if(!file_exists($this->rpgEditorPrjDirPath .$newProjectName)) mkdir($this->rpgEditorPrjDirPath .$newProjectName, 0755, TRUE);
            //rpgプレイヤ
            if(!file_exists($this->projectDirPath . $newProjectName .'/characters/battle')) mkdir($this->projectDirPath . $newProjectName .'/characters/battle', 0755, TRUE);
            if(!file_exists($this->projectDirPath . $newProjectName .'/characters/wipe')) mkdir($this->projectDirPath . $newProjectName . '/characters/wipe', 0755, TRUE);
            if(!file_exists($this->projectDirPath . $newProjectName .'/objects/characters')) mkdir($this->projectDirPath . $newProjectName . '/objects/characters', 0755, TRUE);
            if(!file_exists($this->projectDirPath . $newProjectName .'/objects/tools')) mkdir($this->projectDirPath . $newProjectName . '/objects/tools', 0755, TRUE);
            if(!file_exists($this->projectDirPath . $newProjectName .'/cutScenes/scene')) mkdir($this->projectDirPath . $newProjectName . '/cutScenes/scene', 0755, TRUE);
            if(!file_exists($this->projectDirPath . $newProjectName .'/cutScenes/specialSkill')) mkdir($this->projectDirPath . $newProjectName . '/cutScenes/specialSkill', 0755, TRUE);
        }

        return true;
    }

    /**
     * 既存のプロジェクトのデータを取得する(オブジェクト登録時)
     * return プロジェクトのセレクトボックス
     */
    function getProjectsDataForMapChip() {
        $dirs = scandir($this->projectDirPath);
        //表示させないディレクトリ配列
        $excludes = array(
            '.',
            '..',
            '.DS_Store',
            'common' //commonを除外対象に。ベタがきと重複されるため。
        );
        $projects = '<select id="projectsForMapChip" name="projectsForMapChip" onchange="resetMapChipRegisterContainer()">';
        $projects .= '<option value="common">common</option>';
        foreach ($dirs AS $dir) {
            //特定のディレクトリの場合は表示させない
            if (in_array($dir, $excludes)) {
                continue;
            }
            //最初の要素を選択状態に
            if ($dir === reset($dirs)) {
                $projects .= '<option value="' . $dir . '" selected>' . $dir . '</option>';
            }
            $projects .= '<option value="' . $dir . '">' . $dir . '</option>';
        }
        $projects .= '</select>';
        return $projects;
    }

    /**
     * 既存のプロジェクトのデータを取得する(オブジェクト登録時)
     * return プロジェクトのセレクトボックス
     */
    function getProjectsDataForCharacter() {
        $dirs = scandir($this->projectDirPath);
        //表示させないディレクトリ配列
        $excludes = array(
            '.',
            '..',
            '.DS_Store',
            'common' //commonを除外対象に。ベタがきと重複されるため。
        );
        $projects = '<select id="projectsForCharacters" name="projects" onchange="resetCharacterRegisterContainer()">';
        $projects .= '<option value="common">common</option>';
        foreach ($dirs AS $dir) {
            //特定のディレクトリの場合は表示させない
            if (in_array($dir, $excludes)) {
                continue;
            }
            //最初の要素を選択状態に
            if ($dir === reset($dirs)) {
                $projects .= '<option value="' . $dir . '" selected>' . $dir . '</option>';
            }
            $projects .= '<option value="' . $dir . '">' . $dir . '</option>';
        }
        $projects .= '</select>';
        return $projects;
    }

    /**
     * 既存のプロジェクトのデータを取得する(オブジェクト登録時)
     * return プロジェクトのセレクトボックス
     */
    function getProjectsDataForObj() {
        $dirs = scandir($this->projectDirPath);
        //表示させないディレクトリ配列
        $excludes = array(
            '.',
            '..',
            '.DS_Store',
            'common' //commonを除外対象に。ベタがきと重複されるため。
        );
        $projects = '<select id="projectsForObj" name="projects" onchange="resetObjectRegisterContainer()">';
        $projects .= '<option value="common">common</option>';
        foreach ($dirs AS $dir) {
            //特定のディレクトリの場合は表示させない
            if (in_array($dir, $excludes)) {
                continue;
            }
            //最初の要素を選択状態に
            if ($dir === reset($dirs)) {
                $projects .= '<option value="' . $dir . '" selected>' . $dir . '</option>';
            }
            $projects .= '<option value="' . $dir . '">' . $dir . '</option>';
        }
        $projects .= '</select>';
        return $projects;
    }

    /**
     * 既存のプロジェクトのデータを取得する(カットシーン登録時)
     * return プロジェクトのセレクトボックス
     */
    function getProjectsDataForCutScene() {
        $dirs = scandir($this->projectDirPath);
        //表示させないディレクトリ配列
        $excludes = array(
            '.',
            '..',
            '.DS_Store',
            'common' //commonを除外対象に。ベタがきと重複されるため。
        );
        $projects = '<select id="projectsForCutScene" name="projects" onchange="resetCutSceneRegisterContainer()">';
        $projects .= '<option value="common">common</option>';
        foreach ($dirs AS $dir) {
            //特定のディレクトリの場合は表示させない
            if (in_array($dir, $excludes)) {
                continue;
            }
            //最初の要素を選択状態に
            if ($dir === reset($dirs)) {
                $projects .= '<option value="' . $dir . '" selected>' . $dir . '</option>';
            }
            $projects .= '<option value="' . $dir . '">' . $dir . '</option>';
        }
        $projects .= '</select>';
        return $projects;
    }

    /**
     * マップチップタイプを取得する
     * return マップチップタイプのセレクトボックス
     */
    function getMaptipTypes() {
        $html = '<select id="maptipTypes" name="maptipTypes" onchange="showMapChipRegisterContainer()">';
        foreach ($this->MaptipTypes AS $MaptipType) {
            $html .= '<option value="' . $MaptipType . '">' . $MaptipType . '</option>';
        }
        $html .= '</select><span style="color: red;">mapTurnの場合は、必ず複数構成マップチップにしてください。</span>';
        $html .= '<div id="editMapChipInfo"></div>'; //キャラクタータイプ毎に、登録内容を変化させて表示するコンテナ
        return $html;
    }

    /**
     * キャラクター画像タイプを取得する
     * return キャラクター画像タイプのセレクトボックス
     */
    function getCharacterImageTypes() {
        $charaImgTypes = '<select id="characterImageTypes" name="characterImageTypes" onchange="showCharacterRegisterContainer()">';
        //表示させないディレクトリ配列
        $excludes = array(
            '.',
            '..',
            '.DS_Store'
        );
        foreach ($this->characterImageTypes AS $type) {
            //特定のディレクトリの場合は表示させない
            if (in_array($type, $excludes)) {
                continue;
            }
            $charaImgTypes .= '<option value="' . $type . '">' . $type . '</option>';
        }
        $charaImgTypes .= '</select>';
        $charaImgTypes .= '<div id="editCharaInfo"></div>'; //キャラクタータイプ毎に、登録内容を変化させて表示するコンテナ
        return $charaImgTypes;
    }

    /**
     * オブジェクトタイプを取得する
     * return キャラクター画像タイプのセレクトボックス
     */
    function getObjectTypes() {
        $objectTypes = '<select id="objectTypes" name="objectTypes" onchange="showObjectRegisterContainer()">';
        //表示させないディレクトリ配列
        $excludes = array(
            '.',
            '..',
            '.DS_Store'
        );
        foreach ($this->objectTypes AS $type) {
            //特定のディレクトリの場合は表示させない
            if (in_array($type, $excludes)) {
                continue;
            }
            //最初の要素を選択状態に
            // if ($type === reset($this->characterImageTypes)) {
            //     $charaImgTypes .= '<option value="' . $type . '" selected>' . $type . '</option>';
            // }
            $objectTypes .= '<option value="' . $type . '">' . $type . '</option>';
        }
        $objectTypes .= '</select>';
        $objectTypes .= '<div id="editObjInfo"></div>'; //オブジェクトタイプ毎に、登録内容を変化させて表示するコンテナ
        return $objectTypes;
    }

    /**
     * カットシーンタイプを取得する
     * return カットシーンタイプのセレクトボックス
     */
    function getCutSceneTypes() {
        $cutSceneTypes = '<select id="cutSceneTypes" name="cutSceneTypes" onchange="showCutSceneRegisterContainer()">';
        //表示させないディレクトリ配列
        $excludes = array(
            '.',
            '..',
            '.DS_Store'
        );
        foreach ($this->cutSceneTypes AS $type) {
            //特定のディレクトリの場合は表示させない
            if (in_array($type, $excludes)) {
                continue;
            }
            //最初の要素を選択状態に
            // if ($type === reset($this->characterImageTypes)) {
            //     $charaImgTypes .= '<option value="' . $type . '" selected>' . $type . '</option>';
            // }
            $cutSceneTypes .= '<option value="' . $type . '">' . $type . '</option>';
        }
        $cutSceneTypes .= '</select>';
        $cutSceneTypes .= '<div id="editCutSceneInfo"></div>'; //カットシーンタイプ毎に、登録内容を変化させて表示するコンテナ
        return $cutSceneTypes;
    }

    //全プロジェクトの全マップチップタイプのマルチマップチップの名前を取得する
    //一プロジェクト毎にセレクトボックスを作成し、js側でidで取得する。
    function getMultiMapChipNames() {
        $dirs = scandir($this->maptipTypeDirPath);
        //表示させないディレクトリ配列
        $excludes = array(
            '.',
            '..',
            '.DS_Store'
        );
        $projects = '<div id="MMN_container">';
        foreach ($dirs AS $dir) {
            //特定のディレクトリの場合は表示させない
            if (in_array($dir, $excludes)) {
                continue;
            }
            $projects .= '<span id="MMN_' . $dir . '" name="" style="display:none">';
            //$project .= '<select id="" name="" onChange="">'; //MMN = Multi Mapchip name
            foreach (scandir($this->maptipTypeDirPath . $dir) AS $chipType) {
                //特定のディレクトリの場合は表示させない
                if (!in_array($chipType, $this->MaptipTypes) || in_array($chipType, $excludes)) {
                    continue;
                }
                $projects .= '<span id="MMN_' . $dir . '_' . $chipType . '" name="" style="">';
                $projects .= '<select id="" name="" onChange="changeMMN(this)">'; //MMN = Multi Mapchip name
                $projects .= '<option value="new" selected>新規</option>';
                foreach (scandir($this->maptipTypeDirPath . $dir . '/' . $chipType) AS $file) {
                    //特定のディレクトリの場合は表示させない
                    if (fnmatch("*.png", $file) || in_array($file, $excludes)) {
                        continue;
                    }
                    //最初の要素を選択状態に
                    if ($file === reset(scandir($this->maptipTypeDirPath . $dir . '/' . $chipType))) {
                        $projects .= '<option value="' . $file . '" selected>' . $file . '</option>';
                    }
                    $projects .= '<option value="' . $file . '">' . $file . '</option>';
                }
                $projects .= '</select>';
                $projects .= '</span>';
            }
            $projects .= '</span>';
            //$projects .= $project;
        }
        $projects .= '</div>';
        return $projects;
    }

    //全プロジェクトのキャラクター（ワイプ）の名前を取得する
    //一プロジェクト毎にセレクトボックスを作成し、js側でidで取得する。
    function getWipeCharaNames() {
        $dirs = scandir($this->projectDirPath);
        //表示させないディレクトリ配列
        $excludes = array(
            '.',
            '..',
            '.DS_Store'
        );
        $projects = '<div id="WCN_container">';
        foreach ($dirs AS $dir) {
            //特定のディレクトリの場合は表示させない
            if (in_array($dir, $excludes)) {
                continue;
            }
            $project = '<span id="WCN_' . $dir . '" name="" style="display:none">';
            $project .= '<select id="" name="" onChange="changeWCN(this)">'; //CON = chara object name
            if (!file_exists($this->projectDirPath . $dir . "/characters/wipe")) {
                continue;
            }
            $project .= '<option value="new" selected>新規</option>';
            $charas = scandir($this->projectDirPath . $dir . "/characters/wipe");
            foreach ($charas AS $chara) {
                //特定のディレクトリの場合は表示させない
                if (in_array($chara, $excludes)) {
                    continue;
                }
                //最初の要素を選択状態に
                if ($chara === reset($charas)) {
                    $project .= '<option value="' . $chara . '" selected>' . $chara . '</option>';
                }
                $project .= '<option value="' . $chara . '">' . $chara . '</option>';
            }
            $project .= '</select>';
            $project .= '</span>';
            $projects .= $project;
        }
        $projects .= '</div>';
        return $projects;
    }

    //全プロジェクトのキャラオブジェクトの名前を取得する
    //一プロジェクト毎にセレクトボックスを作成し、js側でidで取得する。
    function getCharaObjectNames() {
        $dirs = scandir($this->projectDirPath);
        //表示させないディレクトリ配列
        $excludes = array(
            '.',
            '..',
            '.DS_Store'
        );
        $projects = '<div id="CON_container">';
        $charaObjPattern = '<div id="COP_container">';
        foreach ($dirs AS $dir) {
            //特定のディレクトリの場合は表示させない
            if (in_array($dir, $excludes)) {
                continue;
            }
            $project = '<span id="CON_' . $dir . '" name="" style="display:none">';
            $project .= '<select id="" name="" onChange="changeCON(this)">'; //CON = chara object name
            if (!file_exists($this->projectDirPath . $dir . "/objects/characters")) {
                continue;
            }
            $project .= '<option value="new" selected>新規</option>';
            $charas = scandir($this->projectDirPath . $dir . "/objects/characters");
            foreach ($charas AS $chara) {
                $aryDirectionExist = array(
                    'f' => array(),
                    'fr' => array(),
                    'fl' => array(),
                    'b' => array(),
                    'br' => array(),
                    'bl' => array(),
                    'r' => array(),
                    'rr' => array(),
                    'l' => array(),
                    'll' => array(),
                    'ot' => array(),
                );
                //特定のディレクトリの場合は表示させない
                if (in_array($chara, $excludes)) {
                    continue;
                }
                //最初の要素を選択状態に
                if ($chara === reset($charas)) {
                    $project .= '<option value="' . $chara . '" selected>' . $chara . '</option>';
                }
                $project .= '<option value="' . $chara . '">' . $chara . '</option>';
                ///ここでテーブルを作成（１キャラ１テーブル、新規の場合は空）
                ///changeCONの際に、idかなんかでテーブルを取得する
                //scandirする
                $files = scandir($this->projectDirPath . $dir . "/objects/characters/" . $chara);
                //foreachする（png）
                foreach ($files AS $file) {
                    //excludeすす
                    if (in_array($file, $excludes)) {
                        continue;
                    }
                    //_Dを読み取って、方向を確認する
                    $sPos = strpos($file, '_D');
                    $ePos = strpos($file, '.png');
                    $direction = substr($file, $sPos+2, $ePos-($sPos+2));
                    // 方向存在配列の該当の方向の値を更新する（方向存在配列キーは方向、バリューはまるばつ）
                    $aryDirectionExist[$direction][] = $this->projectDirPath . $dir . "/objects/characters/" . $chara . '/' . $file;
                //foreach終了
                }
                //charaObjPatternのテーブルを作成（あり→画像引っ張ってくる。その他も。なし→なし）
                $charaObjPattern .= '<div id="tbl_' . $chara . '" style="display:none">';
                $charaObjPattern .= '<table border="1">';
                $charaObjPattern .= '<tr>';
                $th = '';
                $td = '';
                foreach($aryDirectionExist AS $dire => $aryPath) {
                    $th .= '<th>' . $dire . '</th>';
                    $td .= '<td>';
                    foreach($aryPath AS $key => $val) {
                        $td .= '<img src="' . $val . '">';
                    }
                    $td .= '</td>';
                }
                $charaObjPattern .= $th;
                $charaObjPattern .= '</tr>';
                $charaObjPattern .= '<tr>';
                $charaObjPattern .= $td;
                $charaObjPattern .= '</tr>';
                $charaObjPattern .= '</table>';
                $charaObjPattern .= '</div>';
                //changeCONも変更するよ
            }
            $project .= '</select>';
            $project .= '</span>';

            $projects .= $project;
        }
        $projects .= '</div>';
        $projects .= $charaObjPattern;

        return $projects;
    }

    //全プロジェクトの大技ユーザーの名前を取得する
    //一プロジェクト毎にセレクトボックスを作成し、js側でidで取得する。
    function getSpecialSkillUserNames() {
        $dirs = scandir($this->projectDirPath);
        //表示させないディレクトリ配列
        $excludes = array(
            '.',
            '..',
            '.DS_Store'
        );
        $projects = '<div id="SUN_container">';
        foreach ($dirs AS $dir) {
            //特定のディレクトリの場合は表示させない
            if (in_array($dir, $excludes)) {
                continue;
            }
            $project = '<span id="SUN_' . $dir . '" name="" style="display:none">';
            $project .= '<select id="" name="" onChange="changeSUN(this)">'; //CON = chara object name
            if (!file_exists($this->projectDirPath . $dir . "/cutScenes/specialSkill")) {
                continue;
            }
            $project .= '<option value="new" selected>新規</option>';
            $charas = scandir($this->projectDirPath . $dir . "/cutScenes/specialSkill");
            foreach ($charas AS $chara) {
                //特定のディレクトリの場合は表示させない
                if (in_array($chara, $excludes)) {
                    continue;
                }
                //最初の要素を選択状態に
                if ($chara === reset($charas)) {
                    $project .= '<option value="' . $chara . '" selected>' . $chara . '</option>';
                }
                $project .= '<option value="' . $chara . '">' . $chara . '</option>';
            }
            $project .= '</select>';
            $project .= '</span>';
            $projects .= $project;
        }
        $projects .= '</div>';
        return $projects;
    }



    /**
     * キャラクター画像を既存プロジェクトに追加する
     * param1 : 既存プロジェクト名
     * param2 : param1 : マップ画像データ(ベース64エンコードずみのもの)
     * param3 : マップオブジェクトデータ（jsonのテキストばんのもの）
     * return bool
     */
    function addCharacterToProject($characterBackUpImageData, $characterBackUpImageHeight, $characterBackUpImageWidth, $characterImagetData, $project, $characterImageType, $characterHeight, $characterWidth, $characterName) {
        //追加先ディレクトリ作成(player)
        $targetImagePath = '';
        if ($project == 'common') {
            if ($characterImageType == 'wipe') {
                $targetImagePath .= $this->projectDirPath . 'common/characters/wipe/' . $characterName;
            } else {
                $targetImagePath .= $this->projectDirPath . 'common/characters/battle';
            }
            if(!file_exists($targetImagePath)) mkdir($targetImagePath, 0755, TRUE);
        } else {
            if ($characterImageType == 'wipe') {
                $targetImagePath .= $this->projectDirPath . $project . '/characters/wipe/' . $characterName;    
            } else {
                $targetImagePath .= $this->projectDirPath . $project . '/characters/battle';
            }
            if(!file_exists($targetImagePath)) mkdir($targetImagePath, 0755, TRUE);
        }
        //追加先ディレクトリ作成(dot-editor(バックアップ))
        $targetBackUpPath = '';
        if ($characterImageType == 'wipe') {
            $targetBackUpPath .= $this->backUpDirPath . "characters/wipe/" . $project . "/" . $characterName;
        } else {
            $targetBackUpPath .= $this->backUpDirPath . "characters/battle/" . $project;
        }
        if(!file_exists($targetBackUpPath)) mkdir($targetBackUpPath, 0755, TRUE);
        
        //マップデータデコード
        $decodedBackUpImageData = base64_decode($characterBackUpImageData);
        $decodedImageData = base64_decode($characterImagetData);
        $date = date('YmdHis'); //名前用時刻取得
        //まずはバックアップ画像を保存
        $fp = fopen($targetBackUpPath . "/" . $date . "_H" . $characterBackUpImageHeight . "_W" . $characterBackUpImageWidth . ".png", "wb");
        fwrite($fp, $decodedBackUpImageData);
        fclose($fp);
        //次にrpg-playerへ保存
        if ($characterImageType == 'wipe') {
            $fp = fopen($targetImagePath . "/" . $date . "_H" . $characterHeight . "_W" . $characterWidth . "_N" . $characterName . ".png", "wb"); //_Nいらんかもだけど一応つける
        } else {
            $fp = fopen($targetImagePath . "/" . $date . "_H" . $characterHeight . "_W" . $characterWidth .".png", "wb"); //_Nいらんかもだけど一応つける
        }
        fwrite($fp, $decodedImageData);
        fclose($fp);
    }

    /**
     * カットシーン画像を既存プロジェクトに追加する
     * param1 : 既存プロジェクト名
     * param2 : param1 : マップ画像データ(ベース64エンコードずみのもの)
     * param3 : マップオブジェクトデータ（jsonのテキストばんのもの）
     * return bool
     */
    function addCutSceneToProject($cutSceneBackUpImageData, $cutSceneBackUpImageHeight, $cutSceneBackUpImageWidth, $cutSceneImageData, $project, $cutSceneType, $cutSceneHeight, $cutSceneWidth, $specialSkillUserName) {
        //追加先ディレクトリ作成(player)
        $targetImagePath = '';
        if ($project == 'common') {
            if ($cutSceneType == 'specialSkill') {
                $targetImagePath .= $this->projectDirPath . 'common/cutScenes/specialSkill/' . $specialSkillUserName;
            } else {
                $targetImagePath .= $this->projectDirPath . 'common/cutScenes/scene';
            }
            if(!file_exists($targetImagePath)) mkdir($targetImagePath, 0755, TRUE);
        } else {
            if ($cutSceneType == 'specialSkill') {
                $targetImagePath .= $this->projectDirPath . $project . '/cutScenes/specialSkill/' . $specialSkillUserName;    
            } else {
                $targetImagePath .= $this->projectDirPath . $project . '/cutScenes/scene';
            }
            if(!file_exists($targetImagePath)) mkdir($targetImagePath, 0755, TRUE);
        }
        //追加先ディレクトリ作成(dot-editor(バックアップ))
        $targetBackUpPath = '';
        if ($cutSceneType == 'specialSkill') {
            $targetBackUpPath .= $this->backUpDirPath . "cutScenes/specialSkill/" . $project . "/" . $specialSkillUserName;
        } else {
            $targetBackUpPath .= $this->backUpDirPath . "cutScenes/scene/" . $project;
        }
        if(!file_exists($targetBackUpPath)) mkdir($targetBackUpPath, 0755, TRUE);
        
        //マップデータデコード
        $decodedBackUpImageData = base64_decode($cutSceneBackUpImageData);
        $decodedImageData = base64_decode($cutSceneImageData);
        $date = date('YmdHis'); //名前用時刻取得
        //まずはバックアップ画像を保存
        $fp = fopen($targetBackUpPath . "/" . $date . "_H" . $cutSceneBackUpImageHeight . "_W" . $cutSceneBackUpImageWidth . ".png", "wb");
        fwrite($fp, $decodedBackUpImageData);
        fclose($fp);
        //次にrpg-playerへ保存
        if ($cutSceneType == 'specialSkill') {
            $fp = fopen($targetImagePath . "/" . $date . "_H" . $cutSceneHeight . "_W" . $cutSceneWidth . "_N" . $specialSkillUserName . ".png", "wb"); //_Nいらんかもだけど一応つける
        } else {
            $fp = fopen($targetImagePath . "/" . $date . "_H" . $cutSceneHeight . "_W" . $cutSceneWidth .".png", "wb"); //_Nいらんかもだけど一応つける
        }
        fwrite($fp, $decodedImageData);
        fclose($fp);
    }

    /**
     * ツールオブジェクトを追加する
     * param1 : 既存プロジェクト名
     * param2 : param1 : マップ画像データ(ベース64エンコードずみのもの)
     * param3 : マップオブジェクトデータ（jsonのテキストばんのもの）
     * return bool
     */
    function addToolObjToProject($toolBackUpImageData, $toolBackUpImageHeight, $toolBackUpImageWidth, $toolObjectData, $project, $toolHeight, $toolWidth, $toolName) {
        //追加先ディレクトリ作成(player)
        $targetObjectPath = '';
        if ($project == 'common') {
            $targetObjectPath = $this->projectDirPath . 'common/objects/tools';
            if(!file_exists($targetObjectPath)) mkdir($targetObjectPath, 0755, TRUE);        
        } else {
            $targetObjectPath = $this->projectDirPath . $project . '/objects/tools/';
            if(!file_exists($targetObjectPath)) mkdir($targetObjectPath, 0755, TRUE);
        }
        //追加先ディレクトリ作成(dot-editor(バックアップ))
        $targetBackUpPath = $this->backUpDirPath . "objects/tools/" . $project;
        if(!file_exists($targetBackUpPath)) mkdir($targetBackUpPath, 0755, TRUE);

        //マップデータデコード
        $decodedBackUpImageData = base64_decode($toolBackUpImageData);
        $decodedImageData = base64_decode($toolObjectData);
        $date = date('YmdHis'); //名前用時刻取得
        //まずはバックアップ画像を保存
        $fp = fopen($targetBackUpPath . "/" . $date . "_H" . $toolBackUpImageHeight . "_W" . $toolBackUpImageWidth . ".png", "wb");
        fwrite($fp, $decodedBackUpImageData);
        fclose($fp);
        //次にrpg-playerへ保存
        $fp = fopen($targetObjectPath . "/" . $date . "_H" . $toolHeight . "_W" . $toolWidth . "_" . $toolName . ".png", "wb");
        fwrite($fp, $decodedImageData);
        fclose($fp);
    }

    /**
     * キャラクターオブジェクトを追加する
     * param1 : 既存プロジェクト名
     * param2 : param1 : マップ画像データ(ベース64エンコードずみのもの)
     * param3 : マップオブジェクトデータ（jsonのテキストばんのもの）
     * return bool
     */
    function addCharacterObjToProject($characterBackUpImageData, $characterBackUpImageHeight, $characterBackUpImageWidth, $characterObjectData, $project, $characterHeight, $characterWidth, $characterName, $characterPattern) {
        //追加先ディレクトリ作成(player)
        $targetObjectPath = '';
        if ($project == 'common') {
            $targetObjectPath = $this->projectDirPath . 'common/objects/characters/' . $characterName;
            if(!file_exists($targetObjectPath)) mkdir($targetObjectPath, 0755, TRUE);        
        } else {
            $targetObjectPath = $this->projectDirPath . $project . '/objects/characters/' . $characterName;
            if(!file_exists($targetObjectPath)) mkdir($targetObjectPath, 0755, TRUE);
        }
        //追加先ディレクトリ作成(dot-editor(バックアップ))
        $targetBackUpPath = $this->backUpDirPath . "objects/characters/" . $project . "/" . $characterName;
        if(!file_exists($targetBackUpPath)) mkdir($targetBackUpPath, 0755, TRUE);

        //マップデータデコード
        $decodedBackUpImageData = base64_decode($characterBackUpImageData);
        $decodedImageData = base64_decode($characterObjectData);
        $date = date('YmdHis'); //名前用時刻取得
        //まずはバックアップ画像を保存
        $fp = fopen($targetBackUpPath . "/" . $date . "_H" . $characterBackUpImageHeight . "_W" . $characterBackUpImageWidth . ".png", "wb");
        fwrite($fp, $decodedBackUpImageData);
        fclose($fp);
        //次にrpg-playerへ保存
        $fp = fopen($targetObjectPath . "/" . $date . "_H" . $characterHeight . "_W" . $characterWidth . "_N" . $characterName . "_D" . $characterPattern . ".png", "wb"); //_Nいらんかもだけど一応つける
        fwrite($fp, $decodedImageData);
        fclose($fp);
    }

    /**
     * マップチップデータをサーバに追加する
     * param1 : マップチップタイプ名
     * param2 : param1 : マップ画像データ(ベース64エンコードずみのもの)
     * return bool
     */
    function addMaptipData($project, $maptipBackUpImageData, $maptipBackUpImageHeight, $maptipBackUpImageWidth, $maptipTypeName, $maptipImageData, $maptipHeight, $maptipWidth, $multiMapChipName) {
        //まずは全マップチップタイプのディレクトリを保存先のプロジェクトに作成（ドットエディタのバックアップディレと、マップエディタのマップチップディレ）
        foreach ($this->MaptipTypes AS $MaptipType) {
            if ($MaptipType == '選択してください') continue;
            if (!file_exists($this->backUpDirPath . 'mapChips/' . $project . '/' . $MaptipType)) mkdir($this->backUpDirPath . 'mapChips/' . $project . '/' . $MaptipType);
            if (!file_exists($this->maptipTypeDirPath . $project . '/' . $MaptipType)) mkdir($this->maptipTypeDirPath . $project . '/' . $MaptipType);
        } 
        //新規マップチップのパスを保存
        $MaptipPath = $this->maptipTypeDirPath . $project. '/' . $maptipTypeName;
        //新規プロジェクトディレクトリ作成
        if(file_exists($MaptipPath)) {
            //マップデータデコード
            $decodedBackUpImageData = base64_decode($maptipBackUpImageData);
            $decodedImageData = base64_decode($maptipImageData);
            //名前用時刻取得
            $date = date('YmdHis');
            //マップ画像を保存
            //まずはバックアップ画像を保存
            //if(!file_exists($this->backUpDirPath . "mapChip")) mkdir($this->backUpDirPath . "mapChip");
            if ($multiMapChipName == '') {
                $fp = fopen($this->backUpDirPath . "mapChips/" . $project . '/' . $maptipTypeName . '/'. $date . "_H" . $maptipBackUpImageHeight . "_W" . $maptipBackUpImageWidth . ".png", "wb");
            } else {
                if (!file_exists($this->backUpDirPath . "mapChips/" . $project . '/' . $maptipTypeName . '/'. $multiMapChipName)) mkdir($this->backUpDirPath . "mapChips/" . $project . '/' . $maptipTypeName . '/'. $multiMapChipName);
                $fp = fopen($this->backUpDirPath . "mapChips/" . $project . '/' . $maptipTypeName . '/'. $multiMapChipName . '/' . $date . "_H" . $maptipBackUpImageHeight . "_W" . $maptipBackUpImageWidth . ".png", "wb");
            }
            fwrite($fp, $decodedBackUpImageData);
            fclose($fp);
            //次にマップチップエディターへ保存
            if ($multiMapChipName == '') {
                $fp = fopen($MaptipPath . "/" . $date . "_H" . $maptipHeight . "_W" . $maptipWidth . ".png", "wb");
            } else {
                if (!file_exists($MaptipPath . "/" . $multiMapChipName)) mkdir($MaptipPath . "/" . $multiMapChipName);
                $fp = fopen($MaptipPath . "/" . $multiMapChipName . '/' . $date . "_H" . $maptipHeight . "_W" . $maptipWidth . ".png", "wb");
            }
            fwrite($fp, $decodedImageData);
            fclose($fp);

            return true;
        };
    return false;
    }

    function isAdmin ($id, $pas) {
        global $adminId;
        global $adminPas;
        if ($id == $adminId && $pas == $adminPas) {
            return true;
        }
        return false;
    }

    function getSaveMaptipContainer() {
        $html = '<div id="save-maptip-container" class="save-container"><form name="maptip_data" action="" method="post"><p>マップチップ登録</p>';
        $html .= $this->getProjectsDataForMapChip(). '<br>';
        $html .= $this->getMaptipTypes();
        $html .= '<span id="save-maptip-data" class="save-button">この内容でサーバに保存</span>';
        $html .= '<input type="hidden" name="maptip_backUpImage_data" value="" />';
        $html .= '<input type="hidden" name="maptip_backUpImage_height" value="" />';
        $html .= '<input type="hidden" name="maptip_backUpImage_width" value="" />';
        $html .= '<input type="hidden" name="maptip_image_data" value="" />';
        $html .= '<input type="hidden" name="maptip_height" value="" />';
        $html .= '<input type="hidden" name="maptip_width" value="" /></form></div>';
        return $html;
    }

    function getSaveCharacterContainer() {
        $html = '<div id="save-character-container" class="save-container"><form name="character_data" action="" method="post"><p>キャラクター画像登録（wipe、battle）</p>';
        $html .= $this->getProjectsDataForCharacter(). '<br>';
        $html .= $this->getCharacterImageTypes();
        $html .= '<span id="save-character-data" class="save-button">この内容でサーバに保存</span>';
        $html .= '<input type="hidden" name="character_backUpImage_data" value="" />';
        $html .= '<input type="hidden" name="character_backUpImage_height" value="" />';
        $html .= '<input type="hidden" name="character_backUpImage_width" value="" />';
        $html .= '<input type="hidden" name="character_image_data" value="" />';
        $html .= '<input type="hidden" name="character_height" value="" />';
        $html .= '<input type="hidden" name="character_width" value="" /></form></div>';
        return $html;
    }

    //valueをつめるのは、jsの、saveObjectDataToSever
    function getSaveObjectContainer() {
        $html = '<div id="save-object-container" class="save-container"><form name="object_data" action="" method="post"><p>オブジェクト登録（tool、character）</p>';
        $html .= $this->getProjectsDataForObj() . '<br>';
        $html .= $this->getObjectTypes();
        //$html .= $this->getProjetCharaObjNames(); //_Nをインデックスに、プロジェクトのキャラオブジェクト名を取得する
        $html .= '<span id="save-object-data" class="save-button">この内容でサーバに保存</span>';
        // ここからツール
        $html .= '<input type="hidden" name="tool_backUpImage_data" value="" />';
        $html .= '<input type="hidden" name="tool_backUpImage_height" value="" />';
        $html .= '<input type="hidden" name="tool_backUpImage_width" value="" />';
        $html .= '<input type="hidden" name="tool_object_data" value="" />';
        $html .= '<input type="hidden" name="tool_height" value="" />';
        $html .= '<input type="hidden" name="tool_width" value="" />';
        // ここからキャラ
        $html .= '<input type="hidden" name="character_backUpImage_data" value="" />';
        $html .= '<input type="hidden" name="character_backUpImage_height" value="" />';
        $html .= '<input type="hidden" name="character_backUpImage_width" value="" />';
        $html .= '<input type="hidden" name="character_object_data" value="" />';
        $html .= '<input type="hidden" name="character_height" value="" />';
        $html .= '<input type="hidden" name="character_width" value="" /></form></div>';
        return $html;
    }

    function getSaveCutSceneContainer() {
        $html = '<div id="save-cut-scene-container" class="save-container"><form name="cut_scene_data" action="" method="post"><p>カットシーン登録（scene、specialSkill）</p>';
        $html .= $this->getProjectsDataForCutScene() . '<br>';
        $html .= $this->getCutSceneTypes();
        //$html .= $this->getProjetCharaObjNames(); //_Nをインデックスに、プロジェクトのキャラオブジェクト名を取得する
        $html .= '<span id="save-cut-scene-data" class="save-button">この内容でサーバに保存</span>';
        $html .= '<input type="hidden" name="cut_scene_backUpImage_data" value="" />';
        $html .= '<input type="hidden" name="cut_scene_backUpImage_height" value="" />';
        $html .= '<input type="hidden" name="cut_scene_backUpImage_width" value="" />';
        $html .= '<input type="hidden" name="cut_scene_image_data" value="" />';
        $html .= '<input type="hidden" name="cut_scene_height" value="" />';
        $html .= '<input type="hidden" name="cut_scene_width" value="" />';
        return $html;
    }

    /**
     * マップチップタイプを取得する
     * return マップチップタイプのセレクトボックス
     */
    function getProjetCharaObjNames() {
        $dirs = scandir($this->maptipTypeDirPath);
        //表示させないディレクトリ配列
        $excludes = array(
            '.',
            '..',
            '.DS_Store'
        );
        $projects = '<select id="maptipTypes" name="maptipTypes">';
        foreach ($dirs AS $dir) {
            //特定のディレクトリの場合は表示させない
            if (in_array($dir, $excludes)) {
                continue;
            }
            //最初の要素を選択状態に
            if ($dir === reset($dirs)) {
                $projects .= '<option value="' . $dir . '" selected>' . $dir . '</option>';
            }
            $projects .= '<option value="' . $dir . '">' . $dir . '</option>';
        }
        $projects .= '</select>';
        return $projects;
    }

    function delBkImage($delImgPath) {
        $sPos = strpos($delImgPath, '/image');
        $delPath = substr($delImgPath, $sPos);
        $delPath = '.' . $delPath;
        //以下、ディレクトリ削除を試みようとしたが、パスに日本語が入っているためにうまくいかず、、
        //めんどくさいので一旦やめににするが、後々は直したい。
        // $delPathDir = dirname($delPath);
        // $img2 = scandir($delPathDir);
        return unlink($delPath);
    }

    /**
     * マップチップを取得する
     */
    function getBkImages(){
        //マップチップディレクトリのディレクトリ（カテゴリ）を取得する
        $dirs = scandir($this->backUpDirPath);
        //表示させないディレクトリ配列
        $excludes = array(
            '.',
            '..',
            '.DS_Store'
        );
        foreach ($dirs AS $dir) {
            //特定のディレクトリの場合は表示させない
            if (in_array($dir, $excludes)) {
                continue;
            }
            //ディレクトリの中のマップチップを取得する
            foreach(glob($this->mapChipDirPath . $dir . '/*') AS $file){
                if(is_file($file)){
                    $mapChips[$dir][] = $file;
                }
            }
        }
        return $mapChips;
    }
}

?>