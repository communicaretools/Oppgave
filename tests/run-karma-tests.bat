@echo off

REM Windows script for runing karma tests
REM You have to run server and capture some browser first
REM 
REM Requirements:
REM - NodeJS
REM - Karma (npm install -g karma)

set BASE_DIR=%~dp0
karma start "%BASE_DIR%\karma.conf.js" %*