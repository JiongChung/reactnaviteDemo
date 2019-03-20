export default class CommonService {
    interval = null;
    
    static int(int){
        let myreg = /^[0-9]*[0-9][0-9]*$/;
        return myreg.test(int);
    }

    static phone(phone){
        let myreg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
        return myreg.test(phone);
    }

    static password(password){
        let myreg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/;
        return myreg.test(password);
    }

    static setTimer(countdownDate, callbak) {
        this.interval = setInterval(() => {
            let time = this.getDateData(countdownDate);
            callbak && callbak(time)
        }, 1000);
    }

    static getDateData(countdownDate) {
        let prams = {};
        let status = true;
        let times = (Date.parse(new Date(countdownDate)) - Date.parse(new Date)) / 1000;
     
        if (times <= 0) {
            this.stop();
            return {second: 0, status: true};
        }else{
            status = false;
        }

        prams.second = times;
        prams.status = status;
        return prams;
    }
     
      
    /** 清除定时器 */
    static stop() {
        clearInterval(this.interval);
    }
}
