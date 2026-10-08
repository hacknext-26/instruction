Add-Type -AssemblyName System.Drawing

function Create-Logo {
    param(
        [string]$Path,
        [string]$Title,
        [string]$Subtitle,
        [int]$Red,
        [int]$Green,
        [int]$Blue,
        [int]$AccRed,
        [int]$AccGreen,
        [int]$AccBlue
    )

    $bmp = New-Object System.Drawing.Bitmap 320, 320
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $g.Clear([System.Drawing.Color]::Transparent)

    $mainColor = [System.Drawing.Color]::FromArgb($Red, $Green, $Blue)
    $accentColor = [System.Drawing.Color]::FromArgb($AccRed, $AccGreen, $AccBlue)

    # Outer circle ring
    $pen = New-Object System.Drawing.Pen $mainColor, 6
    $g.DrawEllipse($pen, 16, 16, 288, 288)

    # Inner soft tint
    $tint = [System.Drawing.Color]::FromArgb(25, $Red, $Green, $Blue)
    $fillBrush = New-Object System.Drawing.SolidBrush $tint
    $g.FillEllipse($fillBrush, 24, 24, 272, 272)

    # Shield polygon
    $p1 = New-Object System.Drawing.Point 160, 56
    $p2 = New-Object System.Drawing.Point 232, 88
    $p3 = New-Object System.Drawing.Point 232, 176
    $p4 = New-Object System.Drawing.Point 160, 240
    $p5 = New-Object System.Drawing.Point 88, 176
    $p6 = New-Object System.Drawing.Point 88, 88
    [System.Drawing.Point[]]$points = @($p1, $p2, $p3, $p4, $p5, $p6)

    $gradStart = New-Object System.Drawing.Point 88, 56
    $gradEnd = New-Object System.Drawing.Point 232, 240
    $shieldBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $gradStart, $gradEnd, $mainColor, $accentColor
    $g.FillPolygon($shieldBrush, $points)

    # Text
    $fontTitle = New-Object System.Drawing.Font "Arial", 26, ([System.Drawing.FontStyle]::Bold)
    $fontSub = New-Object System.Drawing.Font "Arial", 13, ([System.Drawing.FontStyle]::Bold)
    $whiteBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)

    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = [System.Drawing.StringAlignment]::Center
    $sf.LineAlignment = [System.Drawing.StringAlignment]::Center

    $rectTitle = New-Object System.Drawing.RectangleF 88, 102, 144, 42
    $rectSub = New-Object System.Drawing.RectangleF 88, 150, 144, 28

    $g.DrawString($Title, $fontTitle, $whiteBrush, $rectTitle, $sf)
    $g.DrawString($Subtitle, $fontSub, $whiteBrush, $rectSub, $sf)

    $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
}

Create-Logo "public/assets/logo-left.png" "SNS" "TECH" 2 132 199 14 165 233
Create-Logo "public/assets/logo-right.png" "SNS" "INNOVATION" 79 70 229 99 102 241
Write-Host "Logos created successfully!"
