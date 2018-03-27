export default {
    mobile: /^1[34578]\d{9}$/,
    url: /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/,
    signlessInteger: /^([1-9][0-9]*)$/, // 正整数
    code: /^[A-Z]*$/, // 大写字母
    chiness: /^[\u4e00-\u9fa5]*$/, // 中文
    notChiness: /^[^\u4e00-\u9fa5]*$/, // 非中文
    word: /^[A-Za-z]*$/, // 英文
    idNo: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/ // 15或18位身份证号码
}