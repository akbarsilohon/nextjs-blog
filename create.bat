@echo off
setlocal EnableExtensions EnableDelayedExpansion
color 0A

echo ==========================================
echo.
echo    SSSS  IIIII  L      OOO   H   H   OOO   N   N
echo   S        I    L     O   O  H   H  O   O  NN  N
echo    SSS     I    L     O   O  HHHHH  O   O  N N N
echo       S    I    L     O   O  H   H  O   O  N  NN
echo   SSSS   IIIII  LLLLL  OOO   H   H   OOO   N   N
echo.
echo ==========================================
echo.

echo What do you want to create?
echo [1] Post
echo [2] Page
echo.

set /p "choice=Enter your choice (1 or 2): "

if "%choice%"=="1" goto CreatePost
if "%choice%"=="2" goto CreatePage

echo.
echo [WARNING] Invalid choice! Exiting...
goto End


:CreatePost

echo.
set /p "title=Your Post Title: "

if "!title!"=="" (
    echo [ERROR] Post Title required!
    goto End
)

set /p "slug=Post Slug: "

if "!slug!"=="" (
    echo [ERROR] Slug is required!
    goto End
)

set /p "category=Post Category (One Only): "

if "!category!"=="" set "category=General"

rem Get current date and time
for /f "delims=" %%D in ('powershell -NoProfile -Command "Get-Date -Format 'yyyy-MM-ddTHH:mm:sszzz'"') do (
    set "date_today=%%D"
)

if not defined date_today (
    echo [ERROR] Failed to get current date!
    goto End
)

rem Format slug: replace spaces with hyphens
rem Convert slug to lowercase

set "filename=!slug!"
set "filename=!filename: =-!"

set "SLUG=!filename!"

for /f "delims=" %%I in ('powershell -NoProfile -Command "$env:SLUG.ToLowerInvariant()"') do (
    set "filename=%%I"
)

rem Create posts folder if it does not exist

if not exist "posts" mkdir "posts"

rem Check duplicate filename

set "base_filename=!filename!"
set "filepath=posts\!filename!.md"
set "counter=1"

:CheckFile

if exist "!filepath!" (
    set "filename=!base_filename!-!counter!"
    set "filepath=posts\!filename!.md"
    set /a counter+=1
    goto CheckFile
)

rem Create Markdown file

(
    echo ---
    echo title: "!title!"
    echo date: "!date_today!"
    echo category: "!category!"
    echo description: ""
    echo thumbnail: ""
    echo ---
    echo.
) > "!filepath!"

if not exist "!filepath!" (
    echo.
    echo [ERROR] Failed to create post!
    goto End
)

echo.
echo ==========================================
echo [SUCCESS] Post successfully created!
echo.
echo File: !filepath!
echo ==========================================

goto End



:CreatePage

echo.
set /p "title=Your Page Title: "

if "!title!"=="" (
    echo [ERROR] Page Title required!
    goto End
)

set /p "slug=Page Slug: "

if "!slug!"=="" (
    echo [ERROR] Slug is required!
    goto End
)

rem Get current date and time

for /f "delims=" %%D in ('powershell -NoProfile -Command "Get-Date -Format 'yyyy-MM-ddTHH:mm:sszzz'"') do (
    set "date_today=%%D"
)

if not defined date_today (
    echo [ERROR] Failed to get current date!
    goto End
)

rem Format slug

set "filename=!slug!"
set "filename=!filename: =-!"
set "SLUG=!filename!"

for /f "delims=" %%I in ('powershell -NoProfile -Command "$env:SLUG.ToLowerInvariant()"') do (
    set "filename=%%I"
)

rem Create pages folder if it does not exist

if not exist "pages" mkdir "pages"

rem Check duplicate filename

set "base_filename=!filename!"
set "filepath=pages\!filename!.md"
set "counter=1"

:CheckPageFile

if exist "!filepath!" (
    set "filename=!base_filename!-!counter!"
    set "filepath=pages\!filename!.md"
    set /a counter+=1
    goto CheckPageFile
)

rem Create Markdown page

(
    echo ---
    echo title: "!title!"
    echo date: "!date_today!"
    echo description: ""
    echo thumbnail: ""
    echo ---
    echo.
) > "!filepath!"

if not exist "!filepath!" (
    echo.
    echo [ERROR] Failed to create page!
    goto End
)

echo.
echo ==========================================
echo [SUCCESS] Page successfully created!
echo.
echo File: !filepath!
echo ==========================================

goto End

:End

echo.
pause
endlocal
