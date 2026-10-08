$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$out1 = "$PSScriptRoot\..\public\assets\floor1_preview.png"
$out2 = "$PSScriptRoot\..\public\assets\admin_preview.png"

$fullOut1 = [System.IO.Path]::GetFullPath($out1)
$fullOut2 = [System.IO.Path]::GetFullPath($out2)

Write-Host "Target 1: $fullOut1"
Write-Host "Target 2: $fullOut2"

& $edge --headless=new --disable-gpu --virtual-time-budget=2000 --window-size=1920,1080 "--screenshot=$fullOut1" "http://localhost:3001/floor1"
& $edge --headless=new --disable-gpu --virtual-time-budget=2000 --window-size=1920,1080 "--screenshot=$fullOut2" "http://localhost:3001/admin98427"

Write-Host "Done!"
