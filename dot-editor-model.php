<?php
//dot-editorのmodel
//クラスを作って、コンストラクタと各ファンクションを記述する
require("admin.php");

class dotEditor {

    private $maptipTypeDirPath; //プロジェクトディレクトリパス

    /**
     * ドットエディタコンストラクタ
     */
    function __construct() {
        $this->maptipTypeDirPath = '../map-editor/image/map-editor/map-chip/';
    }

    /**
     * マップチップタイプを取得する
     * return マップチップタイプのセレクトボックス
     */
    function getMaptipTypes() {
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

    /**
     * マップチップデータをサーバに追加する
     * param1 : マップチップタイプ名
     * param2 : param1 : マップ画像データ(ベース64エンコードずみのもの)
     * return bool
     */
    function addMaptipData($maptipTypeName, $maptipImageData, $maptipHeight, $maptipWidth) {
        //新規マップチップのパスを保存
        $MaptipPath = $this->maptipTypeDirPath . $maptipTypeName;
        //新規プロジェクトディレクトリ作成
        if(file_exists($MaptipPath)) {
            //マップデータデコード
            $decodedImageData = base64_decode($maptipImageData);
            //名前用時刻取得
            $date = date('YmdHis');
            //マップ画像を保存
            $fp = fopen($MaptipPath . "/" . $date . "_H" . $maptipHeight . "_W" . $maptipWidth . ".png", "wb");
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
        $html = '<div id="save-maptip-container"><form name="maptip_data" action="" method="post"><br><p>マップチップ属性</p>';
        $html .= $this->getMaptipTypes();
        $html .= '<br><span id="save-maptip-data">この内容でサーバに保存</span>';
        $html .= '<input type="hidden" name="maptip_image_data" value="" />';
        $html .= '<input type="hidden" name="maptip_height" value="" />';
        $html .= '<input type="hidden" name="maptip_width" value="" /></form></div>';
        return $html;
    }
}

?>