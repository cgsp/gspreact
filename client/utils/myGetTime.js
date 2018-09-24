import moment from 'moment'

const myGetStrTime = (timestamp) => {
  return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
}

const myGetStampTime = (str) => {
  return new Date(str).valueOf()
}

export { myGetStrTime, myGetStampTime }
