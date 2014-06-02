/*
 * grunt-file-package
 * https://github.com/robinma/grunt-file-package
 *
 * Copyright (c) 2014 robinma
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
//files automatic make package and make zip



  grunt.registerMultiTask('file_package', 'files automatic package tools', function(arg1,arg2) {
    // grunt.log.write(this,'=-=-=-=-=-');
    // console.log(this);
    // if(arguments.length === 0){
    //   grunt.log.writeln(this.name + ", no args");
    // }else{
    //   grunt.log.writeln(this.name,arg1,arg2);
    // }
    // grunt.log.writeln(this.target,this.data,'===');


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
    if(grunt.file.exists(destpath)){
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
            var fileContent=grunt.file.read(filepath);
            console.log(fileContent)
        });        
    });

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

  });

};
