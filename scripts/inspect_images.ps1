Add-Type -AssemblyName System.Drawing

function Check-Img($name, $file) {
    if (Test-Path $file) {
        $bmp = [System.Drawing.Bitmap]::FromFile($file)
        $p = $bmp.GetPixel(0, 0)
        Write-Host "$name : $($bmp.Width)x$($bmp.Height), TopLeft A=$($p.A) R=$($p.R) G=$($p.G) B=$($p.B)"
        $bmp.Dispose()
    } else {
        Write-Host "$name : File not found ($file)"
    }
}

Check-Img "HackNext Neon Logo" "public/assets/hacknext-logo.png"
Check-Img "Mascot" "public/assets/mascot.png"
Check-Img "Logo Left" "public/assets/logo-left.png"
Check-Img "Logo Right" "public/assets/logo-right.png"
