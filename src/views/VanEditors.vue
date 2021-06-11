<template>
    <div class="contentnei" id="contentnei">
        <div v-if="!isShow" class="isshow">暂无数据</div>
        <div v-if="isShow" class="details" v-for="(item,index) in list" :key="index">
            <div class="toptitle">
                <div class="buttonleft" :class="['buttonleft'+(((index%4)+1) == 0 ?4:((index%4)+1))]"></div>
                <div class="button">
                    <div class="lcbt">{{item.moduleName}}</div>
                </div>
            </div>
            <div style="display: inline-block" class="bottomtitle">
                <div v-if="item.isBzds != 1&&item.data.length == 1" v-for="(item1,index1) in item.data" :key="index1" class="dgnr">
                    <div class="zt stepcontent"  v-if="item1.contentType!='video' && item1.hasOwnProperty('content')">
                        <div class="edit">
                            <YwEditor v-model="item1.content"/>
                        </div>
                    </div>
                    <div class="zt stepcontentvideo" v-if="item1.contentType == 'video'">
                        <video :src="videoUrl(item1.content)"
                               class="avatar video-avatar video-yw"
                               style="height: 100%;width: 100%"
                               controls="controls">
                        </video>
                    </div>
                </div>
                <van-steps direction="vertical" :active="0" active-icon="stop" inactive-icon="stop" finish-icon="stop" v-if="item.isBzds != 1&&item.data.length>1">
                    <van-step v-for="(item1,index1) in item.data" :key="index1">
                        <div class="zt bz" :class="['buttonleft'+(((index%4)+1) == 0 ?4:((index%4)+1))]"> {{index1+1}} </div>
                        <div class="zt stepcontent"  v-if="item1.contentType!='video' && item1.hasOwnProperty('content')">
                            <div class="edit">
                                <YwEditor v-model="item1.content"/>
                            </div>
                        </div>
                        <div class="zt stepcontentvideo" v-if="item1.contentType == 'video'">
                            <video :src="videoUrl(item1.content)"
                                   class="avatar video-avatar video-yw"
                                   style="height: 100%;width: 100%"
                                   controls="controls">
                            </video>
                        </div>
                    </van-step>
                </van-steps>
                <div v-if="item.isBzds == 1" class="typyisbzds">
                    <div class="bzdstext"  @click="clickPDF(item2)" v-html="item2.content" v-for="(item2,index2) in item.data" :key="index2"/>
                </div>
            </div>
        </div>
        <van-popup
                v-model="showpdf"
                :style="{ height: '100%',width:'100%',background:'transparent' }"
                custom-class="pdfdialog"
                closeable
                :click-close-icon="handleClose">
            <div class="pdfshow">
                <pdf class="pdf"
                     ref="pdf"
                     v-for="i in numPages1"
                     :key="i"
                     :src="url1"
                     :page="i">
                </pdf>
            </div>
            <div class="pdfshow">
                <pdf class="pdf"
                     ref="kbpdf"
                     v-for="i in numPages2"
                     :key="i"
                     :src="url2"
                     :page="i">
                </pdf>
            </div>
            <div class="qrcodetextstyle qrtextspace" v-if="false">
                <div class="qrcodetext">扫描二维码</div>
                <div class="qrcodetext">下载空白表</div>
                <div class="qrarrows"/>
            </div>
            <div class="div-back">
                <div class="go-back" @click="goback"></div>
            </div>
            <div class="qrcode" v-if="false">
                <vue-qr ref="Qrcode" class="qrcodetp"
                        :text="getQrText('kbb')"
                        :margin="12"
                        :dotScale="0.9"
                >
                </vue-qr>
            </div>
            <div class="qrcodetextstyle" v-if="false">
                <div class="qrcodetext">扫描二维码</div>
                <div class="qrcodetext">下载样表</div>
                <div class="qrarrows"/>
            </div>
            <div class="qrcodeju qrcode" v-if="false">
                <vue-qr ref="Qrcode" class="qrcodetp"
                        :text="getQrText('yb')"
                        :margin="12"
                        :dotScale="0.9"
                >
                </vue-qr>
            </div>
        </van-popup>
    </div>
</template>

<script>
  import '../assets/css/backywlc.css';//返回样式
  import VueQr from "vue-qr";
  import pdf from 'vue-pdf'
  import {Step, Steps,Popup,Icon } from 'vant';
  import YwEditor from '@/components/YwEditor';
  //vant官网
  //https://vant-contrib.gitee.io/vant/#/zh-CN/index-bar

  export default {
    name: "detail",
    components: {
      [Step.name]: Step,
      [Steps.name]: Steps,
      [Popup.name]: Popup,
      [Icon.name]: Icon,
      YwEditor,
      VueQr,
      pdf,
    },
    data() {
      return {
        //pdf展示层
        showpdf: false,
        //没有数据时展示
        isShow: false,
        //本地pdf
        url2: "http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf",
        url1: "",
        //线上PDF
        //url2: "",
        pdfDetails: [], //pdf地址名称类型
        numPages1: 3, // 左pdf 总页数
        numPages2: 3, // 右pdf 总页数
        list: [
          {
            isBzds: '0',
            moduleName: '业务流程',
            data: [
              {
                content:"aaaa<br/>aaaaaaaa<br/>aaaaaaaa<br/>aaaaaaaa<br/>aaaaaaaa<br/>aaaaaaaa<br/>aaaaaaaa<br/>aaaa",
              },
              {
                content:"/profile/upload/2021/02/23/f57158e9-4d3b-4ad1-9c26-c5c75492631e.mp4",
                contentType:'video',
              },
              {
                content:"ccc"
              },
            ],
          },
          {
            isBzds: '0',
            moduleName: '报送资料',
            data: [
              {
                content:"bbb"
              },
              {
                content:"ccc"
              },
              {
                content:"ddd"
              },
            ]
          },
          {
            isBzds: '1',
            moduleName: '表证单书PDF',
            data: [
              {
                content:"《增a表》"
              },
              {
                content:"《增b表》"
              },
              {
                content:"《增c表》"
              },
            ],
          },
          {
            isBzds: '2',
            moduleName: '表证单书',
            data: [
              {
                content:"《增d表》"
              },
              {
                content:"《增e表》"
              },
              {
                content:"《增f表》"
              },
            ],
          },
        ],
      }
    },
    methods: {
      //视频播放
      videoUrl(val){
        return process.env.VUE_APP_BASE_API + val;
      },
      clickPDF(val) {
        this.pdfDetails = val
        this.url1 = this.getPdfUrl('yb');
        this.url2 = this.getPdfUrl('ylb');
        this.getNumPages('yb',this.url1);
        this.getNumPages('ylb',this.url2);
        this.showpdf = true
      },
      getPdfUrl(val){
        return process.env.VUE_APP_BASE_API + this.pdfDetails[val];
      },
      //计算pdf页码总数
      getNumPages(p1,val) {
        let loadingTask = pdf.createLoadingTask(val)
        loadingTask.promise.then(pdf => {
          if(p1 === 'yb'){
            this.numPages1 = pdf.numPages
          }else {
            this.numPages2 = pdf.numPages
          }
        }).catch(err => {
          console.error('pdf 加载失败', err);
        })
      },
      getQrText(val){
        return localStorage.getItem('apiAddress') + this.pdfDetails[val];
      },
      //关闭PDF展示框
      handleClose() {
        this.showpdf = false
      },
      //返回
      goback(){
        if (this.showpdf){
          this.showpdf = false
        }else {
          this.$router.go(-1);
        }
      },
      gototop(){
        document.querySelector('#contentnei').scrollTop = 0
      },
      /** 获取政策查询详情信息 */
      getDetails(listId,type){
        let params = {
          deviceId: this.$store.state.deviceId?this.$store.state.deviceId:'1', //设备id
          listId: listId,
          type: type
        }

        this.isShow = true;
        this.customLoadingClose();
        /*this.axios({
          url: '/mobile/public/details',
          method: 'get',
          params:params
        }).then(res=>{
          if (res.data.code == 200 && res.data.data.length != 0){
            this.list = res.data.data
            this.isShow = true;
          }else {
            this.isShow = false;
          }
          this.customLoadingClose(); //关闭加载
        })*/
      },
    },
    mounted() {
      /** 加载中 */
      this.customLoadingOpen(); //加载中
      let listId = this.$route.query.listId;
      let type = this.$route.query.type;
      this.getDetails(listId,type);
      setTimeout(() => {
        this.gototop();
      }, 1000)
    },
    created() {
    },
    beforeDestroy() {
    },
  }
</script>

<style scoped lang="scss">
    .isshow{
        margin-top: 200px;
        text-align: center;
        font-size: 40px;
    }
    .contentnei {
        width: 940px;
        height: 75vh;
        background-color: rgba(206, 212, 224, 0.82);
        border-radius: 20px;
        margin-left: 0px;
        margin-top: 20px;
        display: block;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .details {
        display: block;
        margin: 30px 0px 0px 30px;
    }

    .van-steps {
        background-color: rgba(206, 212, 224, 0)!important;
    }

    .dgnr{
        margin-left: 32px;
    }
    .typyisbzds {
        display: inline-block;
        width: 800px;
        margin: 30px 0px 30px 72px;
        border-radius: 20px;
        background-color: #FFF;
    }
    .stepcontent {
        margin: 30px 20px 20px 40px;
        background-color: #FFF;
        display: inline-block;
        border-radius: 20px;
        width: 770px;
    }
    .stepcontentvideo {
        margin: 30px 20px 20px 40px;
        background-color: #FFF;
        display: inline-block;
        border-radius: 20px;
        width: 770px;
        height: 300px;
    }
    .bzdstext {
        counter-increment: mycounter;
        padding: 20px 20px;
        float: left;
        text-align: left;
        margin: 4px 10px;
        color: rgb(30, 191, 255);
        width: 100%;
        font-size: 36px;
        letter-spacing: 1px;
    }
    .bzdstext:before {
        content: counter(mycounter, decimal) '.';
    }

    .pdfshow {
        height: 680px;
        width: 460px;
        display: inline-block;
        overflow-y: auto;
        overflow-x: hidden;
        margin: 400px 10px 10px 10px;
    }

    .pdfshow::-webkit-scrollbar {
        display: none;
    }
    .pdf {
        display: inline-block;
        height: 680px;
        width: 460px;
    }

    .toptitle {
        margin-left: -20px;
        line-height: 40px;
        text-align: left;
        vertical-align: middle;
        background-color: rgba(206, 212, 224, 0);
    }

    .bottomtitle {
        width: 82vw;
        margin-left: -3vw;
        line-height: 40px;
        text-align: left;
        vertical-align: middle;
        background-color: rgba(206, 212, 224, 0);
    }

    .buttonleft {
        margin: 20px -20px 20px 20px;
        display: inline-block;
        width: 45px;
        height: 55px;
        line-height: 55px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        border: 1px solid #d1d1d1;
        background-color: #d1d1d1;
        text-align: center;
        vertical-align: middle;
    }

    .buttonleft1 {
        background-color: #00c2f2;
        border: 1px solid #00c2f2;
    }

    .buttonleft2 {
        background-color: #ffc544;
        border: 1px solid #ffc544;
    }

    .buttonleft3 {
        background-color: #33cb2f;
        border: 1px solid #33cb2f;
    }

    .buttonleft4 {
        background-color: #ffa89c;
        border: 1px solid #ffa89c;
    }

    .button {
        margin: 20px 18px;
        min-width: 130px;
        height: 55px;
        line-height: 55px;
        display: inline-block;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        border: 1px solid #FFF;
        text-align: center;
        vertical-align: middle;
        background-color: #FFF;
    }

    .lcbt {
        color: #000;
        font-size: 30px;
        font-weight: 600;
        padding: 0px 15px;
        letter-spacing: 1px;
    }
    .zt {
        color: #000;
        font-size: 28px;
        font-weight: 600;
        padding: 0px 15px;
        letter-spacing: 1px;
    }
    .bz{
        margin:0px 0px 0px 20px ;
        font-size: 20px;
        width: 30px !important;
        height: 30px !important;
        line-height: 30px !important;
        padding: 0 !important;
        text-align: center;
        border-radius: 50%;
        color: white !important;
    }

    .qrcode {
        margin: 1700px 0px 0px 550px;
        display: inline-block;
        position: fixed;
        top: 0px;
        left: 300px;
    }
    .qrcodeju{
        margin-left: 100px;
    }
    .qrcodetp {
        display: inline-block;
        width: 180px;
        height: 180px;
    }

    .qrcodetext {
        color: yellow;
        font-size: 34px;
        text-align: center;
    }
    .qrcodetextstyle{
        margin: 600px 0px 0px 200px;
        display: block;
        position: fixed;
    }
    .qrtextspace{
        margin-left: 650px;
    }
    .qrarrows{
        height: 60px;
        margin: 20px 0px 0px 10px;
        background: url("../assets/img/yjt.png") no-repeat;
        background-size: 157px 52px;
    }
</style>
<style lang="scss">
    .van-step--vertical .van-step__circle-container {
        font-size: 50px;
        margin-left: 0.5px;
        color: rgba(228,238,236,1)!important;
    }
    .van-step__icon--active {
        color: rgba(228,238,236,1)!important;
        margin-top: -10px;
        font-size: 50px;
    }
    .van-step--vertical .van-step__line{
        width: 2px;
        background-color: rgba(228,238,236,1)!important;
    }
    .van-step--vertical:not(:last-child)::after{
        border-color:transparent!important;
    }
</style>
