
import fs = require("fs-extra");

import pth = require("path");

import Pinyin = require("../lib/hanzi2pinyin");

import crypto = require("crypto");

/** 
 * 美术文件来源根目录
*/
let sourceRootUrl = "E:/uitest/from/";

/**
 * 拷贝的目录文件夹
 */
let exportRootUrl = "E:/uitest/to/";


let md5: crypto.Hash;

start();

function start() {
    // let folders: string[] = [];
    // folders = fs.readdirSync(sourceRootUrl);
    // let len = folders.length;
    // for (let i = 0; i < len; i++) {
    //     let tmp = folders[i];
    //     renameFolder(tmp);
    //     // let renamepath = sourceRootUrl + tmp + "/" + "rename/";
    //     // if (fs.existsSync(renamepath)) {
    //     //     fs.removeSync(renamepath);
    //     // }
    //     // fs.mkdirSync(renamepath);
    //     // renameSourceFolder(sourceRootUrl, tmp);
    // }

    //遍历
    // folders = fs.readdirSync(exportRootUrl);
    // len = folders.length;
    // for (let i = 0; i < len; i++) {
    //     let tmppath = exportRootUrl + folders[i];
    //     let stat = fs.statSync(tmppath);
    //     if (stat.isDirectory()) {
    //         checkExportFolder(tmppath);
    //     }
    // }

    renameAll();
    replaceAll();
}

// function checkExportFolder(path: string) {
//     let tmpfolder = path + "/tmp/";
//     if (fs.existsSync(tmpfolder)) {
//         fs.removeSync(tmpfolder);
//     }
//     fs.mkdirSync(tmpfolder);
//     let files = fs.readdirSync(path);
//     let len = files.length;
//     for (let i = 0; i < len; i++) {
//         let tmppath = path + "/" + files[i];
//         let stat = fs.statSync(tmppath);
//         if (stat.isFile()) {
//             let ext = pth.extname(tmppath);
//             if (ext == ".png" || ext == ".jpg") {
//                 let filename = pth.basename(tmppath);
//                 let srcDir = filename.split("@")[0];
//                 let srcPath = sourceRootUrl + srcDir + "/rename/" + filename;

//                 //复制一份到目标文件夹
//                 debugger;
//                 fs.copyFileSync(srcPath, path + "/" + filename);
//                 //复制一份到目标文件夹下的tmp文件夹
//                 debugger;
//                 md5 = crypto.createHash("md5");
//                 md5.update(filename);
//                 let out = md5.digest("hex");
//                 out = out.substr(0, 8);
//                 fs.copyFileSync(srcPath, tmpfolder + out + ext);
//             }
//         }
//     }
// }

// function renameSourceFolder(pre: string, folder: string) {

//     let renamepath = sourceRootUrl + folder + "/" + "rename/";
//     if (fs.existsSync(renamepath)) {
//         fs.removeSync(renamepath);
//     }
//     fs.mkdirSync(renamepath);

//     let path = pre + folder + "/";
//     let folders = fs.readdirSync(path);
//     let len = folders.length;
//     for (let i = 0; i < len; i++) {
//         let tmp = folders[i];
//         if (tmp != "rename") {
//             let tmppath = path + tmp;
//             let stat = fs.statSync(tmppath);
//             if (stat.isDirectory()) {
//                 readFolder(tmppath + "/", folder);
//             } else {
//                 let ext = pth.extname(tmppath);
//                 if (ext = ".png" || ext == ".jpg") {
//                     let slen = sourceRootUrl.length;
//                     let tmpstr = tmppath.substring(slen);
//                     let reg = new RegExp("/", "g");
//                     let tmpname = tmpstr.replace(reg, "@");
//                     fs.copyFileSync(tmppath, sourceRootUrl + folder + "/rename/" + tmpname);
//                 }
//             }
//         }
//     }

//     function readFolder(folderPath: string, folder: string) {
//         let folders = fs.readdirSync(folderPath);
//         let len = folders.length;
//         for (let i = 0; i < len; i++) {
//             let tmp = folders[i];
//             if (tmp != "rename") {
//                 let tmppath = folderPath + tmp;
//                 let stat = fs.statSync(tmppath);
//                 if (stat.isDirectory()) {
//                     readFolder(tmppath + "/", folder);
//                 } else {
//                     let ext = pth.extname(tmppath);
//                     if (ext = ".png" || ext == ".jpg") {
//                         let slen = sourceRootUrl.length;
//                         let tmpstr = tmppath.substring(slen);
//                         let reg = new RegExp("/", "g");
//                         let tmpname = tmpstr.replace(reg, "@");
//                         fs.copyFileSync(tmppath, sourceRootUrl + folder + "/rename/" + tmpname);
//                     }
//                 }
//             }
//         }
//     }
// }

function renameFolder(folder: string) {

    let path = sourceRootUrl + folder + "/";

    let renamepath = path + "rename/";
    if (fs.existsSync(renamepath)) {
        fs.removeSync(renamepath);
    }
    fs.mkdirSync(renamepath);

    let folders = fs.readdirSync(path);
    let len = folders.length;
    for (let i = 0; i < len; i++) {
        let tmp = folders[i];
        if (tmp != "rename") {
            let tmppath = path + tmp;
            let stat = fs.statSync(tmppath);
            if (stat.isDirectory()) {
                readFolder(tmppath + "/", folder);
            } else {
                let ext = pth.extname(tmppath);
                if (ext = ".png" || ext == ".jpg") {
                    let slen = sourceRootUrl.length;
                    let tmpstr = tmppath.substring(slen);
                    let reg = new RegExp("/", "g");
                    let tmpname = tmpstr.replace(reg, "@");
                    fs.copyFileSync(tmppath, sourceRootUrl + folder + "/rename/" + tmpname);
                }
            }
        }
    }

    function readFolder(folderPath: string, folder: string) {
        let folders = fs.readdirSync(folderPath);
        let len = folders.length;
        for (let i = 0; i < len; i++) {
            let tmp = folders[i];
            if (tmp != "rename") {
                let tmppath = folderPath + tmp;
                let stat = fs.statSync(tmppath);
                if (stat.isDirectory()) {
                    readFolder(tmppath + "/", folder);
                } else {
                    let ext = pth.extname(tmppath);
                    if (ext = ".png" || ext == ".jpg") {
                        let slen = sourceRootUrl.length;
                        let tmpstr = tmppath.substring(slen);
                        let reg = new RegExp("/", "g");
                        let tmpname = tmpstr.replace(reg, "@");
                        fs.copyFileSync(tmppath, sourceRootUrl + folder + "/rename/" + tmpname);
                    }
                }
            }
        }
    }
}

function renameAll() {
    let folders = fs.readdirSync(sourceRootUrl);
    let len = folders.length;
    for (let i = 0; i < len; i++) {
        renameFolder(folders[i]);
    }
}

function replaceFolder(folder: string) {
    let folderpath = exportRootUrl + folder;
    let stat = fs.statSync(folderpath);
    if (!stat.isDirectory()) {
        return;
    }
    let tmpfolder = folderpath + "/tmp/";
    if (fs.existsSync(tmpfolder)) {
        fs.removeSync(tmpfolder);
    }
    fs.mkdirSync(tmpfolder);
    let files = fs.readdirSync(folderpath);
    let len = files.length;
    for (let i = 0; i < len; i++) {
        let tmppath = folderpath + "/" + files[i];
        let stat = fs.statSync(tmppath);
        if (stat.isFile()) {
            let ext = pth.extname(tmppath);
            if (ext == ".png" || ext == ".jpg") {
                let filename = pth.basename(tmppath);
                let srcDir = filename.split("@")[0];
                let srcPath = sourceRootUrl + srcDir + "/rename/" + filename;
                if (fs.existsSync(srcPath)) {
                    //复制一份到目标文件夹
                    fs.copyFileSync(srcPath, folderpath + "/" + filename);
                    //复制一份到目标文件夹下的tmp文件夹
                    md5 = crypto.createHash("md5");
                    md5.update(filename);
                    let out = md5.digest("hex");
                    out = out.substr(0, 8);
                    fs.copyFileSync(srcPath, tmpfolder + out + ext);
                } else {
                    fs.remove(tmppath);
                }

            }
        }
    }
}

function replaceAll() {
    let folders = fs.readdirSync(exportRootUrl);
    let len = folders.length;
    for (let i = 0; i < len; i++) {
        replaceFolder(folders[i]);
    }
}