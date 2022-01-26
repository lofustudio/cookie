/*
Hello. This script automatically updates and generates the latest build of cookie.
*/

import { exec, spawn } from "child_process";
import * as fs from 'fs';

// Pull the latest code from the repo
exec('git pull', (error, stdout) => {
    let res = error || stdout;
    if (!error) {
        if (res.toString().includes('Already up to date')) {
            console.log('Already up to date');
        } else {
            console.log('Pulling the latest changes, please wait...');
            setTimeout(() => {
                console.log('Done!');
            }, 5000);
        }
        // Install the dependencies
        exec('npm install', (error, stdout) => {
            let res = error || stdout;
            if (!error) {
                if (res.toString().includes('up to date')) {
                    console.log('Packages are ready.');
                } else {
                    console.log('Installing packages, please wait...');
                    setTimeout(() => {
                        console.log('Done!');
                    }, 15000);
                }
                // Delete the old files
                fs.rm('./build', { recursive: true }, (err) => {
                    if (!err) {
                        console.log('Deleted old build.');
                        // Compile the new build
                        exec('tsc && echo done', (error, stdout) => {
                            let res = error || stdout;
                            if (!error) {
                                if (res.toString().includes('done')) {
                                    console.log('Build is ready.');
                                    spawn('node', ['./build/index.js'], {
                                        stdio: 'inherit'
                                    });
                                    spawn('node', ['./'])
                                }
                            } else {
                                console.log(res);
                            }
                        });
                    } else {
                        console.log(err);
                    }
                });
            } else {
                console.log(error);
            }
        });
    } else {
        console.log(error);
    }
});