Add-Type -AssemblyName System.Drawing

$outDir = "C:\Users\ADMIN\Desktop\sukruthi Dental website\app\public\assets\icons"
if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force
}

function Create-Premium-Icon ($filename, $drawAction) {
    $bmp = New-Object System.Drawing.Bitmap 256, 256
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    # Enable maximum rendering quality
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    
    # Draw background gradient (soft blue-grey to white)
    $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
        (New-Object System.Drawing.Point (0, 0)),
        (New-Object System.Drawing.Point (256, 256)),
        [System.Drawing.ColorTranslator]::FromHtml("#EAF5F5"),
        [System.Drawing.ColorTranslator]::FromHtml("#FFFFFF")
    )
    $g.FillRectangle($bgBrush, 0, 0, 256, 256)
    $bgBrush.Dispose()
    
    # Draw soft outer border circle
    $borderPen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#D4ECEC")), 3
    $g.DrawEllipse($borderPen, 8, 8, 240, 240)
    $borderPen.Dispose()
    
    # Execute custom drawing
    Invoke-Command -ScriptBlock $drawAction -ArgumentList $g
    
    # Save image
    $filePath = Join-Path $outDir $filename
    $bmp.Save($filePath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Generated premium icon: $filename"
}

# 1. Root Canal Treatment Premium Icon
Create-Premium-Icon "icon-rct.png" {
    param($g)
    $pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#0E6E73")), 6
    $whiteBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
    $toothGrad = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
        (New-Object System.Drawing.Point (64, 64)),
        (New-Object System.Drawing.Point (192, 192)),
        [System.Drawing.Color]::White,
        [System.Drawing.ColorTranslator]::FromHtml("#D8EAEA")
    )
    $redBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#FF5A5F"))
    $bluePen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#3D9BFF")), 8
    
    # Tooth Path
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.StartFigure()
    $path.AddBezier(140, 40, 180, 40, 220, 60, 200, 110)
    $path.AddBezier(200, 110, 180, 170, 160, 210, 140, 210)
    $path.AddBezier(140, 210, 132, 180, 128, 140, 128, 110)
    $path.AddBezier(128, 110, 124, 180, 116, 210, 116, 210)
    $path.AddBezier(116, 210, 96, 170, 56, 110, 56, 110)
    $path.AddBezier(56, 110, 36, 60, 76, 40, 116, 40)
    $path.AddBezier(116, 40, 128, 50, 128, 50, 140, 40)
    $path.CloseFigure()
    
    # Draw Tooth
    $g.FillPath($toothGrad, $path)
    $g.DrawPath($pen, $path)
    
    # Pulp Chamber (Red center)
    $pulp = New-Object System.Drawing.Drawing2D.GraphicsPath
    $pulp.StartFigure()
    $pulp.AddBezier(128, 80, 145, 80, 155, 95, 145, 115)
    $pulp.AddBezier(145, 115, 138, 150, 134, 175, 134, 175)
    $pulp.AddBezier(134, 175, 130, 150, 128, 115, 128, 115)
    $pulp.AddBezier(128, 115, 126, 150, 122, 175, 122, 175)
    $pulp.AddBezier(122, 175, 118, 150, 111, 115, 111, 115)
    $pulp.AddBezier(111, 115, 101, 95, 111, 80, 128, 80)
    $pulp.CloseFigure()
    
    $g.FillPath($redBrush, $pulp)
    
    # Sealing instrument (Blue line)
    $bluePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $g.DrawLine($bluePen, 128, 60, 128, 140)
}

# 2. Tooth Whitening Premium Icon
Create-Premium-Icon "icon-whitening.png" {
    param($g)
    $pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#0E6E73")), 6
    $toothGrad = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
        (New-Object System.Drawing.Point (64, 64)),
        (New-Object System.Drawing.Point (192, 192)),
        [System.Drawing.Color]::White,
        [System.Drawing.ColorTranslator]::FromHtml("#EBF7F7")
    )
    $yellowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#F9C74F"))
    
    # Tooth Path
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.StartFigure()
    $path.AddBezier(140, 60, 180, 60, 220, 80, 200, 130)
    $path.AddBezier(200, 130, 180, 190, 160, 230, 140, 230)
    $path.AddBezier(140, 230, 132, 200, 128, 160, 128, 130)
    $path.AddBezier(128, 130, 124, 200, 116, 230, 116, 230)
    $path.AddBezier(116, 230, 96, 190, 56, 130, 56, 130)
    $path.AddBezier(56, 130, 36, 80, 76, 60, 116, 60)
    $path.AddBezier(116, 60, 128, 70, 128, 70, 140, 60)
    $path.CloseFigure()
    
    # Draw Tooth
    $g.FillPath($toothGrad, $path)
    $g.DrawPath($pen, $path)
    
    # Star drawing helper
    function Draw-Star-Big ($x, $y, $size) {
        $pts = @(
            (New-Object System.Drawing.PointF ($x, ($y - $size))),
            (New-Object System.Drawing.PointF (($x + $size*0.3), ($y - $size*0.3))),
            (New-Object System.Drawing.PointF (($x + $size), $y)),
            (New-Object System.Drawing.PointF (($x + $size*0.3), ($y + $size*0.3))),
            (New-Object System.Drawing.PointF ($x, ($y + $size))),
            (New-Object System.Drawing.PointF (($x - $size*0.3), ($y + $size*0.3))),
            (New-Object System.Drawing.PointF (($x - $size), $y)),
            (New-Object System.Drawing.PointF (($x - $size*0.3), ($y - $size*0.3)))
        )
        $g.FillPolygon($yellowBrush, $pts)
    }
    
    Draw-Star-Big 190 60 25
    Draw-Star-Big 60 140 18
    Draw-Star-Big 200 180 15
}

# 3. Dental Braces Fixing Premium Icon
Create-Premium-Icon "icon-braces.png" {
    param($g)
    $pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#0E6E73")), 6
    $greyPen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#8FA7A7")), 8
    $blueBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#3D9BFF"))
    
    # Draw three teeth blocks side by side
    $toothBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
    
    $g.FillRectangle($toothBrush, 32, 50, 45, 110)
    $g.DrawRectangle($pen, 32, 50, 45, 110)
    
    $g.FillRectangle($toothBrush, 92, 45, 72, 120)
    $g.DrawRectangle($pen, 92, 45, 72, 120)
    
    $g.FillRectangle($toothBrush, 179, 50, 45, 110)
    $g.DrawRectangle($pen, 179, 50, 45, 110)
    
    # Silver Wire arch
    $g.DrawCurve($greyPen, @(
        (New-Object System.Drawing.Point (15, 110)),
        (New-Object System.Drawing.Point (128, 95)),
        (New-Object System.Drawing.Point (240, 110))
    ))
    
    # Brackets
    $g.FillRectangle($blueBrush, 42, 95, 25, 20)
    $g.DrawRectangle($pen, 42, 95, 25, 20)
    
    $g.FillRectangle($blueBrush, 113, 90, 30, 25)
    $g.DrawRectangle($pen, 113, 90, 30, 25)
    
    $g.FillRectangle($blueBrush, 189, 95, 25, 20)
    $g.DrawRectangle($pen, 189, 95, 25, 20)
}

# 4. Laser Gum Surgery Premium Icon
Create-Premium-Icon "icon-laser.png" {
    param($g)
    $pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#0E6E73")), 6
    $redBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#FF5A5F"))
    $laserPen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#0E6E73")), 10
    $laserRayPen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#FF5A5F")), 4
    
    # Gum line curve at the bottom
    $gumPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $gumPath.StartFigure()
    $gumPath.AddBezier(20, 170, 70, 150, 186, 150, 236, 170)
    $gumPath.AddLine(236, 170, 236, 236)
    $gumPath.AddLine(236, 236, 20, 236)
    $gumPath.CloseFigure()
    $g.FillPath((New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#FFC0C0"))), $gumPath)
    $g.DrawPath($pen, $gumPath)
    
    # Laser pen pointer
    $g.DrawLine($laserPen, 210, 40, 130, 110)
    $g.DrawLine($laserPen, 200, 30, 120, 100)
    $g.DrawLine($laserPen, 120, 100, 130, 110)
    
    # Concentrated light glowing circle
    $g.FillEllipse($redBrush, 80, 130, 24, 24)
    
    # Laser beam ray
    $laserRayPen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
    $g.DrawLine($laserRayPen, 125, 105, 92, 142)
}

# 5. Pits & Fissures Sealants Premium Icon
Create-Premium-Icon "icon-sealants.png" {
    param($g)
    $pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#0E6E73")), 6
    $toothGrad = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
        (New-Object System.Drawing.Point (64, 64)),
        (New-Object System.Drawing.Point (192, 192)),
        [System.Drawing.Color]::White,
        [System.Drawing.ColorTranslator]::FromHtml("#DDF0F0")
    )
    $greenBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#2EC4B6"))
    
    # Molar Path
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.StartFigure()
    $path.AddBezier(40, 60, 60, 50, 196, 50, 216, 60)
    $path.AddBezier(216, 60, 226, 90, 226, 150, 206, 170)
    $path.AddBezier(206, 170, 186, 180, 176, 210, 172, 210)
    $path.AddBezier(172, 210, 166, 180, 160, 170, 160, 170)
    $path.AddBezier(160, 170, 154, 180, 148, 210, 148, 210)
    $path.AddBezier(148, 210, 138, 180, 114, 150, 114, 150)
    $path.AddBezier(114, 150, 114, 90, 28, 150, 40, 60)
    $path.CloseFigure()
    
    $g.FillPath($toothGrad, $path)
    $g.DrawPath($pen, $path)
    
    # Green protective sealant layer on top grooves
    $g.FillEllipse($greenBrush, 50, 55, 156, 36)
    $g.DrawEllipse($pen, 50, 55, 156, 36)
}

# 6. Impacted Tooth Extraction Premium Icon
Create-Premium-Icon "icon-extraction.png" {
    param($g)
    $pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#0E6E73")), 6
    $brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
    $bluePen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#3D9BFF")), 10
    
    # Submerged Tooth (Lower Opacity)
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.StartFigure()
    $path.AddBezier(140, 90, 180, 90, 220, 110, 200, 160)
    $path.AddBezier(200, 160, 180, 220, 160, 260, 140, 260)
    $path.AddBezier(140, 260, 132, 230, 128, 190, 128, 160)
    $path.AddBezier(128, 160, 124, 230, 116, 260, 116, 260)
    $path.AddBezier(116, 260, 96, 220, 56, 160, 56, 160)
    $path.AddBezier(56, 160, 36, 110, 76, 90, 116, 90)
    $path.AddBezier(116, 90, 128, 100, 128, 100, 140, 90)
    $path.CloseFigure()
    
    $g.FillPath($brush, $path)
    $g.DrawPath($pen, $path)
    
    # Extraction Arrow pointing up
    $bluePen.EndCap = [System.Drawing.Drawing2D.LineCap]::ArrowAnchor
    $g.DrawLine($bluePen, 128, 150, 128, 30)
}
