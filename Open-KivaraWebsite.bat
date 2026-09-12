@echo off
REM ============================================================
REM  KivaraWebsite — open / resume on Windows
REM  Double-click this in the morning to keep building.
REM
REM  Origin CLI works in WSL only (not PowerShell).
REM  Repo: https://cursor.com/codebase/lakisha-thomas/KivaraWebsite
REM ============================================================

setlocal EnableExtensions
set "WSL_REPO=~/KivaraWebsite"

echo.
echo  KivaraWebsite resume helper
echo  ---------------------------
echo.

where wsl >nul 2>&1
if errorlevel 1 (
  echo  ERROR: WSL was not found.
  echo  Install Ubuntu from the Microsoft Store, then run this again.
  echo.
  pause
  exit /b 1
)

echo  Checking for a local clone in WSL...
wsl bash -lc "test -d ~/KivaraWebsite/.git"
if errorlevel 1 (
  echo  No local clone yet — installing Origin CLI and cloning...
  echo  ^(A browser may open so you can sign in.^)
  echo.
  wsl bash -lc "set -e; export PATH=\"$HOME/.local/bin:$PATH\"; if ! command -v origin >/dev/null 2>&1; then curl -fsSL https://downloads.cursor.com/origin/install.sh | sh; grep -q '.local/bin' ~/.bashrc || echo 'export PATH=\"$HOME/.local/bin:$PATH\"' >> ~/.bashrc; export PATH=\"$HOME/.local/bin:$PATH\"; fi; origin auth login; if [ ! -d ~/KivaraWebsite/.git ]; then origin repo clone lakisha-thomas/KivaraWebsite ~/KivaraWebsite; fi"
  if errorlevel 1 (
    echo.
    echo  Setup had a problem. Open Ubuntu ^(WSL^) and paste:
    echo.
    echo    curl -fsSL https://downloads.cursor.com/origin/install.sh ^| sh
    echo    echo 'export PATH="$HOME/.local/bin:$PATH"' ^>^> ~/.bashrc
    echo    source ~/.bashrc
    echo    origin auth login
    echo    origin repo clone lakisha-thomas/KivaraWebsite
    echo.
    pause
    exit /b 1
  )
) else (
  echo  Local clone found at ~/KivaraWebsite
)

echo.
echo  Opening the project...

for /f "delims=" %%i in ('wsl wslpath -w ~/KivaraWebsite') do set "WIN_REPO=%%i"

where cursor >nul 2>&1
if not errorlevel 1 (
  start "" cursor "%WIN_REPO%"
  echo  Launched Cursor with KivaraWebsite.
) else (
  start "" explorer "%WIN_REPO%"
  echo  Cursor was not found on PATH.
  echo  Opened File Explorer — use File ^> Open Folder in Cursor Desktop.
)

echo.
echo  Browse: https://cursor.com/codebase/lakisha-thomas/KivaraWebsite
echo  Done. You can close this window.
echo.
pause
endlocal
