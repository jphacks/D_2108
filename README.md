# おんとおふ　On "to" off

[![IMAGE ALT TEXT HERE](https://jphacks.com/wp-content/uploads/2021/07/JPHACKS2021_ogp.jpg)](https://www.youtube.com/watch?v=LUPQFB4QyVo)

## 背景(製品開発のきっかけ、課題等)
## オフラインとオンラインが混在する活動の中で、オンラインの人に孤独感やもどかしさ、オフラインの人に煩わしさや面倒くささを感じさせてしまう状況を打開すべく開発しました。
### 製品説明（具体的な製品の説明）
### イベントやサークル活動におけるオンライン参加者とオフライン参加者を温かくつなぐWebサービスです。オフライン参加者側からルーム作成を行い、オンライン参加者とオフライン参加者は作成したルームに参加します。ルーム内ではオンライン参加者はオフライン参加者の中から通話したい相手を選ぶことができます。オンライン参加者がオフライン参加者を選択するとビデオチャットが開始されます。
### 特長
#### 1. オンライン参加者とオフライン参加者がスムーズに会話できる
#### 2. オンライン参加者が任意のオフライン参加者を選択して自由に会話スペースを移動できる

### 解決出来ること
オンライン参加者とオフライン参加者の会話をスムーズにする
### 今後の展望
#### 今回実装できなかったオフライン参加者がオンライン参加者の会話にスムーズに参加できる機能
* 顔の表情からデフォルメして表情を誇張する(ぴえん顔、グルグルな目 etc...)
* 顔の表情から顔の色を変更する(怒ってたら赤、悲しいなら青など)
### 注力したこと（こだわり等）
* DB構造
* ビデオチャット通話実装
* git管理
* webデザイン

## 開発技術
### 活用した技術
#### API・データ
* WebAudioAPI

#### フレームワーク・ライブラリ・モジュール
* nuxt.js
* AWS
* Lambda
* WebRTC

#### デバイス
* webブラウザ

### 独自技術
#### ハッカソンで開発した独自機能・技術
* 接続状態を管理するDBのAPI作成
