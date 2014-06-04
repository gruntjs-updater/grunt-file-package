/*
 * grunt-file-package
 * https://github.com/robinma/grunt-file-package
 *
 * Copyright (c) 2014 robinma
 * Licensed under the MIT license.
 */

'use strict';

var path=require('path');
var fs=require('fs');
var targz = require('tar.gz');

module.exports = function(grunt) {
//files automatic make package and make zip

    //get file name for path
    var getFileName=function(sp){
        //var bname=path.basename(sp);
        var extname=path.extname(sp);

        return path.basename(sp,extname);
    };
    //整理文件内容
    var filterFiles=function(filepath,newFileDir){
        //读取文件内容
        var fileContent=grunt.file.read(filepath);
        //将每行内容作为一条记录装到数组中
        var filesArr=fileContent.split('\n');
        //遍历每行文件名
        filesArr.forEach(function(filepathitem){
            var srcfilepath=filepathitem.split('\\').join('/')
            //if srcfilepath is null or empty space
            if(!srcfilepath) return false;

            if(grunt.file.exists(srcfilepath)){
                grunt.log.ok('Source file "'+ srcfilepath + '" ok.');
                var newFilePath=path.join(newFileDir,srcfilepath)
                grunt.file.copy(srcfilepath,newFilePath,{process:function(){
                    return true
                }})
             
              
            }else{
                grunt.log.warn('Source file "'+ srcfilepath + '" not found.');
                return false;

            }
    
        });

    }

    //make zip package
    var makeZip=function(newFileDir,done){

        var perPath=path.resolve(newFileDir,'../');
        //get dirfileName
        var dirfileName=getFileName(newFileDir);


       var compress=new targz().compress(newFileDir,path.join(perPath,dirfileName+'.zip'),function(err){
            if(err)
                console.log('err',err)
            done(compress);
       })
    }

  grunt.registerMultiTask('file_package', 'files automatic package tools', function(arg1,arg2) {

    //获取文件夹下所有文件
    var srcpath=this.data.src;
    if(srcpath  === '' && !srcpath){
        grunt.log.error('src path error !');
        return false;
    }
    //dest exists
    var destpath=this.data.dest;
    if(!destpath){
        grunt.log.error('dest path not exists');
        return false;
    }
    //if dest path not exists,create the path
    if(!grunt.file.exists(destpath)){
        grunt.file.mkdir(destpath);
    };

    var done=this.async();

    this.files.forEach(function(f){
        var src=f.src.filter(function(filepath){
            if(!grunt.file.exists(filepath)){
                grunt.log.warn('Source file '+ filepath + 'not found.');
                return false;
            }else{
                return true;
            }
        }).map(function(filepath){
            var newpackagename=getFileName(filepath);
            var newFileDir=path.join(destpath,newpackagename);
            grunt.file.exists(newFileDir)?'':grunt.file.mkdir(newFileDir);
            
            filterFiles(filepath,newFileDir);

            //make zip
            makeZip(newFileDir,done)

        });        
    });

  });

};