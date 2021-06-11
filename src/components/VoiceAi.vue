<template>
  <div class="body" style="height: 100%;width: 100%">
    <div style="width: auto;height: 60%;font-size: 80px;text-align: center">
      <p>点击图标开始识别</p>
      <img src="../static/image/timg.gif" alt="" @click="translationStart">
    </div>
    <div style="width: auto ;height: 40%;font-size: 100px;text-align: center">
      <span @click="translationEnd">停止</span>
    </div>
  </div>
</template>

<script>
  import IatRecorder from '@/assets/js/IatRecorder.js'

  const iatRecorder = new IatRecorder('en_us', 'mandarin', '5fd028b0')

  export default {
    name: "VoiceAi",
    components: {
    },
    data() {
      return {
        synth: {},
        msg: null,
        url: "http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&text=",
        audio: null,
      };
    },
    mounted() {
      this.synth = window.speechSynthesis;
      this.msg = new SpeechSynthesisUtterance();
      this.audio = new Audio();
    },
    created() {
    },
    methods: {
      translationStart() {
        iatRecorder.start()
        this.handleStop()
      },
      translationEnd() {
        iatRecorder.stop()
        //语音播报
        let a = "卧梅又闻花，卧枝绘中天。鱼吻卧石水，卧石答春绿。";

        //方式一
        let target = this.url + encodeURI(a);
        this.audio.src = target;
        this.audio.play();  //播放阅读
        //  this.audio.cancel();  //取消阅读
        //  this.audio.pause();  //暂停阅读

        //方式二
        /*this.msg.text = a;
        this.msg.volume = 100;
        this.msg.rate = 1.5;
        this.msg.pitch = 2;
        console.log(this.msg);
        this.synth.speak(this.msg);*/
      },
      // 语音播报停止
      handleStop(e) {
        this.msg.text = e;
        this.msg.lang = "zh-CN";
        this.synth.cancel(this.msg);
      },
    },
  };
</script>
<style scoped>
  .body {
    user-select: none;
  }

  audio {
    display: block;
    margin-bottom: 10px;
  }

  #audio-container {
    padding: 20px 0;
  }

  .ui-btn {
    display: inline-block;
    padding: 5px 20px;
    font-size: 14px;
    line-height: 1.428571429;
    box-sizing: content-box;
    text-align: center;
    border: 1px solid #e8e8e8;
    border-radius: 3px;
    color: #555;
    background-color: #fff;
    border-color: #e8e8e8;
    white-space: nowrap;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .ui-btn:hover,
  .ui-btn.hover {
    color: #333;
    text-decoration: none;
    background-color: #f8f8f8;
    border: 1px solid #ddd;
  }

  .ui-btn:focus,
  .ui-btn:active {
    color: #333;
    outline: 0;
  }

  .ui-btn.disabled,
  .ui-btn.disabled:hover,
  .ui-btn.disabled:active,
  .ui-btn[disabled],
  .ui-btn[disabled]:hover,
  .ui-state-disabled .ui-btn {
    cursor: not-allowed;
    background-color: #eee;
    border-color: #eee;
    color: #aaa;
  }

  .ui-btn-primary {
    color: #fff;
    background-color: #39b54a;
    border-color: #39b54a;
    position: fixed;
    bottom: 1.5rem;
    width: 80%;
    margin-left: 10%;
    padding: 0.5rem 0;
  }

  .ui-btn-primary:hover,
  .ui-btn-primary.hover {
    color: #fff;
    background-color: #16a329;
    border-color: #16a329;
  }

  .ui-btn-primary:focus,
  .ui-btn-primary:active {
    color: #fff;
  }

  .ui-btn-primary.disabled:focus {
    color: #aaa;
  }

  img {
    display: block;
    width: 40%;
    margin: auto;
  }

  body {
    margin: 0;
    padding: 0;
  }

  #mask {
    width: 43%;
    background: rgba(0, 0, 0, 0.05);
    padding: 3rem 0 1rem 0;
    display: none;
    margin: 2rem auto;
    margin-top: 51%;
  }

  #mask p {
    text-align: center;
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.5);
  }
</style>
