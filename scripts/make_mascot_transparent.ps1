Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("$PSScriptRoot\..\public\assets\mascot.png")
$out = New-Object System.Drawing.Bitmap $src.Width, $src.Height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Lock bits for high-speed pixel manipulation
$rect = New-Object System.Drawing.Rectangle 0, 0, $src.Width, $src.Height
$srcData = $src.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$outData = $out.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$byteCount = [Math]::Abs($srcData.Stride) * $src.Height
[byte[]]$srcBytes = New-Object byte[] $byteCount
[byte[]]$outBytes = New-Object byte[] $byteCount

[System.Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $srcBytes, 0, $byteCount)

for ($i = 0; $i -lt $byteCount; $i += 4) {
    $b = $srcBytes[$i]
    $g = $srcBytes[$i + 1]
    $r = $srcBytes[$i + 2]
    $a = $srcBytes[$i + 3]

    # Threshold for near-white background removal with smooth edge feathering
    if ($r -ge 248 -and $g -ge 248 -and $b -ge 248) {
        $outBytes[$i] = 0
        $outBytes[$i + 1] = 0
        $outBytes[$i + 2] = 0
        $outBytes[$i + 3] = 0
    } elseif ($r -ge 238 -and $g -ge 238 -and $b -ge 238) {
        # Soft feather edge
        $factor = (248.0 - (($r + $g + $b) / 3.0)) / 10.0
        $outBytes[$i] = $b
        $outBytes[$i + 1] = $g
        $outBytes[$i + 2] = $r
        $outBytes[$i + 3] = [byte]([Math]::Min(255, [Math]::Max(0, [int]($factor * 255))))
    } else {
        $outBytes[$i] = $b
        $outBytes[$i + 1] = $g
        $outBytes[$i + 2] = $r
        $outBytes[$i + 3] = $a
    }
}

[System.Runtime.InteropServices.Marshal]::Copy($outBytes, 0, $outData.Scan0, $byteCount)

$src.UnlockBits($srcData)
$out.UnlockBits($outData)

$destPath = "$PSScriptRoot\..\public\assets\mascot-clean.png"
$out.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)

$src.Dispose()
$out.Dispose()

Write-Host "Mascot transparent PNG successfully created at $destPath!"
