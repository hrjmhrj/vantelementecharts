import Vue from 'vue'
import Element from 'element-ui'
import '../element-variables.scss'

Vue.use(Element)

export function successTip(title,message,time) {
  this.$notify({
    title: title,
    message: message,
    type: 'success',
    duration: time == null?2000:time
  });
}

export function warningTip(title, message,time) {
  this.$notify({
    title: title,
    message: message,
    type: 'warning',
    duration: time == null?2000:time
  });
}

export function failedTip(title, message,time) {
  this.$notify.error({
    title: title,
    message: message,
    duration: time == null?2000:time
  });
}
