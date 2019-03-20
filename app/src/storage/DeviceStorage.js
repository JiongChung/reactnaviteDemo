import React, {AsyncStorage} from 'react-native';

export default class DeviceStorage {
    /**
     * 获取
     * @param key
     * @param type(json ｜ html)
     * return value
     * */
    static get(key, type){
        return AsyncStorage.getItem(key).then(value => {
            return (type == 'json') ? JSON.parse(value) : value;
        }).catch(() => {
            return null
        });
    }

    /**
     * 保存
     * @param key
     * @param value
     * @param type
     * return {*}
     * */

    static save(key, value, type){
        return (type == 'json') ? AsyncStorage.setItem(key, JSON.stringify(value)) : AsyncStorage.setItem(key, value);       
    }

    /**
     * 更新
     * @param key
     * @param value
     * @param type
     * return {*}
     * */

    static update(key, value, type){
        return DeviceStorage.get(key, type).then((item) => {
            value = typeof value === 'string' ? value : Object.assign({}, item, value);
            return (type == 'json') ? AsyncStorage.setItem(key, JSON.stringify(value)) : AsyncStorage.setItem(key, value);
        });
    }

    /**
     * 删除
     * @param key
     * return {*}
     * */

    static delete(key){
        return AsyncStorage.removeItem(key);
    }
} 