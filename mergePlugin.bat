@echo off

setlocal enabledelayedexpansion

:: 定义源目录
set buildPath=D:\workspace\H5\midea-weex-template\dist\midea-card
::定义目标路径
set pluginPath=D:\Download

set "year=%date:~0,4%"
set "month=%date:~5,2%"
set "day=%date:~8,2%"
set "hour_ten=%time:~0,1%"
set "hour_one=%time:~1,1%"
set "minute=%time:~3,2%"

if "%hour_ten%" == " " (
    set d=%year%%month%%day%_0%hour_one%%minute%
) else (
    set d=%year%%month%%day%_%hour_ten%%hour_one%%minute%
)
echo %d%


echo "删除%pluginPath%\dist_zip"
if exist "%pluginPath%\dist_zip" rmdir "%pluginPath%\dist_zip" /q /s 

::开始循环需要拷贝的目录
for /d %%i in ("%pluginPath%\*") do (
    set folderName=%%~ni
    if exist "%%i\midea-card" rmdir "%%i\midea-card" /q /s 
    if exist "%buildPath%\!folderName!" (
        echo "拷贝!folderName!至!folderName!"
        XCOPY "%buildPath%\!folderName!\*.*" %%i /s/y/q
    ) else (
        set shortFolderName="!folderName:~0,5!"
        if exist "%buildPath%\!shortFolderName!" (
            echo "拷贝!shortFolderName!至!folderName!"
            XCOPY "%buildPath%\!shortFolderName!\*.*" %%i /s/y/q
        ) else (
            echo "拷贝T0xcommon至!folderName!"
            XCOPY "%buildPath%\T0xcommon\*.*" %%i /s/y/q
        )
    )
    if not exist "%pluginPath%\dist_zip" md "%pluginPath%\dist_zip"
    "C:\Program Files\HaoZip\HaoZipC.exe" a -tzip "%pluginPath%\dist_zip\!folderName!_%d%.zip" %%i -sn
    echo "压缩至%pluginPath%\dist_zip\!folderName!_%d%.zip""
);
 
pause
