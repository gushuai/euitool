export interface PinyinConstructor {
    /**
     * 将汉字翻译为拼音，其中每一个字的首字母大写
     * 
     * @param {string} value
     * @returns {string}
     * 
     * @memberOf PinYin
     */
    getFullChars(value: string): string;

    /**
     * 将每一个字的拼音的首字母提取出来，是大写的形式
     * 
     * @param {string} value
     * @returns {string}
     * 
     * @memberOf PinYin
     */
    getCamelChars(value: string): string;

}

// declare module "hanzi2pinyin" {
//     /**
//  * 将汉字翻译为拼音，其中每一个字的首字母大写
//  * 
//  * @param {string} value
//  * @returns {string}
//  * 
//  * @memberOf PinYin
//  */
//     function getFullChars(value: string): string;

//     /**
//      * 将每一个字的拼音的首字母提取出来，是大写的形式
//      * 
//      * @param {string} value
//      * @returns {string}
//      * 
//      * @memberOf PinYin
//      */
//     function getCamelChars(value: string): string;
// }

export interface hanzi2pinyin {
    /**
 * 将汉字翻译为拼音，其中每一个字的首字母大写
 * 
 * @param {string} value
 * @returns {string}
 * 
 * @memberOf PinYin
 */
    getFullChars(value: string): string;

    /**
     * 将每一个字的拼音的首字母提取出来，是大写的形式
     * 
     * @param {string} value
     * @returns {string}
     * 
     * @memberOf PinYin
     */
    getCamelChars(value: string): string;
}
