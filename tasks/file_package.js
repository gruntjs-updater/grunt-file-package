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
var zip=require("node-zip")();

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
    var makeZip=function(newFileDir){
        console.log(newFileDir,'newFileDir')
        zip.file(newFileDir,'hello there');
        var data=zip.generate({base64:false,compression:'DEFLATE'});

        var perPath=path.resolve(newFileDir,'../');

       var statu= fs.writeFileSync(path.join(perPath,'name.zip'),data,'binary');
       console.log(statu,'=-=-=')
    }

  grunt.registerMultiTask('file_package', 'files automatic package tools', function(arg1,arg2) {

<<<<<<< HEAD

    grunt.log.writeln(this.target,this.data,'===');

    var srcPath=this.src;
    grunt.


    // Merge task-specific and/or target-specific options with these defaults.
    // var options = this.options({
    //   punctuation: '.',
    //   separator: ', '
    // });

    // // Iterate over all specified file groups.
    // this.files.forEach(function(f) {
    //   // Concat specified files.
    //   var src = f.src.filter(function(filepath) {
    //     // Warn on and remove invalid source files (if nonull was set).
    //     if (!grunt.file.exists(filepath)) {
    //       grunt.log.warn('Source file "' + filepath + '" not found.');
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   }).map(function(filepath) {
    //     // Read file source.
    //     return grunt.file.read(filepath);
    //   }).join(grunt.util.normalizelf(options.separator));

    //   // Handle options.
    //   src += options.punctuation;

    //   // Write the destination file.
    //   grunt.file.write(f.dest, src);

    //   // Print a success message.
    //   grunt.log.writeln('File "' + f.dest + '" created.');
    // });
=======
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
            makeZip(newFileDir)

        });        
    });
>>>>>>> a20c9b4e9495754fc00fcdd486eddacf464fd2eb

  });

};
