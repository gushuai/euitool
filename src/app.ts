
import fs = require("fs-extra");

import pth = require("path");

import Pinyin = require("../lib/hanzi2pinyin");

/** 
 * 美术文件来源根目录
*/
let sourceRootUrl = "E:/uitest/from/";

/**
 * 拷贝的目录文件夹
 */
let copyRootUrl = "E:/uitest/to/";

let sourceFiles: string[];

start();

function start() {
    sourceFiles = [];
    readSourceFolder(sourceRootUrl, "");
    let folders = fs.readdirSync(copyRootUrl);
    let len = folders.length;
    for (let i = 0; i < len; i++) {
        let tmppath = copyRootUrl + folders[i];
        let stat = fs.statSync(tmppath);
        if (stat.isDirectory()) {
            readFolder(tmppath);
        }
    }
}

function readFolder(path: string) {
    let tmpfolder = path + "/tmp/";
    if (fs.existsSync(tmpfolder)) {
        fs.removeSync(tmpfolder);
    }
    fs.mkdirSync(tmpfolder);
    let files = fs.readdirSync(path);
    let len = files.length;
    for (let i = 0; i < len; i++) {
        let tmppath = path + "/" + files[i];
        let stat = fs.statSync(tmppath);
        if (stat.isFile()) {
            let ext = pth.extname(tmppath);
            if (ext == ".png" || ext == ".jpg") {
                let nowName = pth.basename(tmppath);
                let sourceNames = [];
                let slen = sourceFiles.length;
                for (let i = 0; i < slen; i++) {
                    let spath = sourceFiles[i];
                    let sname = pth.basename(spath);
                    if (sname == nowName) {
                        let obj = {} as any;
                        obj.path = spath;
                        obj.name = sname;
                        sourceNames.push(obj);
                    }
                }
                let fileName = nowName.split(".")[0];
                if (sourceNames.length == 1) {
                    //将图片重命名为拼音后复制进tmp文件夹
                    let pinyin = (Pinyin as any).getFullChars(fileName) + ext;
                    fs.copyFileSync(tmppath, tmpfolder + pinyin);
                } else if (sourceNames.length > 1) {
                    //进行尺寸比对
                }
            }
        }
    }
}

function readSourceFolder(pre: string, folder: string) {
    let path = pre;
    if (folder) {
        path = pre + folder + "/";
    }
    let folders = fs.readdirSync(path);
    let len = folders.length;
    for (let i = 0; i < len; i++) {
        let tmp = folders[i];
        let tmppath = path + tmp;

        let stat = fs.statSync(tmppath);
        if (stat.isDirectory()) {
            readSourceFolder(path, tmp);
        } else {
            let ext = pth.extname(tmppath);
            if (ext = ".png" || ext == ".jpg") {
                sourceFiles.push(tmppath);
            }
        }
    }
}