export default{
    //求出与当前时间间隔
    spaceTime(time){
        let nowDate = new Date(),
            lastRelyDate = new Date(time),
            result = '';
        if(nowDate.getFullYear() > lastRelyDate.getFullYear()){
            result = nowDate.getFullYear() - lastRelyDate.getFullYear() + '年';
        } else if(nowDate.getMonth() > lastRelyDate.getMonth()){
            result = nowDate.getMonth() - lastRelyDate.getMonth() + '月';
        } else if(nowDate.getDate() > lastRelyDate.getDate()){
            let days = nowDate.getDate() - lastRelyDate.getDate();
            result = Math.floor(days / 7) > 0 ? Math.floor(days / 7)+'周':days+'天';
        } else if(nowDate.getHours() > lastRelyDate.getHours()){
            result = nowDate.getHours() - lastRelyDate.getHours()+'小时';
        } else if(nowDate.getMinutes() > lastRelyDate.getMinutes()){
            result = nowDate.getMinutes() - lastRelyDate.getMinutes()+'分';
        } else{
            result = nowDate.getSeconds() - lastRelyDate.getSeconds()+'秒';
        }
        return result;
    }
}