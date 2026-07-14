Add-Type -AssemblyName System.Drawing

$outDir = "C:\Users\ADMIN\Desktop\sukruthi Dental website\app\public\assets"
if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force
}

function Create-Service-Illustration ($filename, $drawAction) {
    # Create 800x600 canvas
    $bmp = New-Object System.Drawing.Bitmap 800, 600
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    # Enable maximum rendering quality
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    
    # Draw background gradient (soft medical gradient)
    $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
        (New-Object System.Drawing.Point (0, 0)),
        (New-Object System.Drawing.Point (800, 600)),
        [System.Drawing.ColorTranslator]::FromHtml("#F0F8F8"),
        [System.Drawing.ColorTranslator]::FromHtml("#FFFFFF")
    )
    $g.FillRectangle($bgBrush, 0, 0, 800, 600)
    $bgBrush.Dispose()
    
    # Draw subtle grid/circles in background for clinical aesthetic
    $gridPen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#E4ECEC")), 2
    $g.DrawEllipse($gridPen, 100, 0, 600, 600)
    $g.DrawEllipse($gridPen, 200, 100, 400, 400)
    $gridPen.Dispose()
    
    # Execute custom drawing
    Invoke-Command -ScriptBlock $drawAction -ArgumentList $g
    
    # Save image (with high quality compression)
    $filePath = Join-Path $outDir $filename
    $bmp.Save($filePath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Generated illustration: $filename"
}

# 1. Root Canal Treatment (RCT) Illustration
Create-Service-Illustration "service-rct.jpg" {
    param($g)
    $pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#0E6E73")), 8
    $whiteBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
    $toothGrad = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
        (New-Object System.Drawing.Point (250, 150)),
        (New-Object System.Drawing.Point (550, 450)),
        [System.Drawing.Color]::White,
        [System.Drawing.ColorTranslator]::FromHtml("#E0F0F0")
    )
    $redBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#FF5A5F"))
    $bluePen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#3D9BFF")), 12
    
    # Large Molar Path
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.StartFigure()
    $path.AddBezier(440, 150, 520, 150, 600, 190, 560, 290)
    $path.AddBezier(560, 290, 520, 410, 480, 490, 440, 490)
    $path.AddBezier(440, 490, 424, 430, 416, 350, 416, 290)
    $path.AddBezier(416, 290, 408, 430, 392, 490, 392, 490)
    $path.AddBezier(392, 490, 352, 410, 272, 290, 272, 290)
    $path.AddBezier(272, 290, 232, 190, 312, 150, 392, 150)
    $path.AddBezier(392, 150, 416, 170, 416, 170, 440, 150)
    $path.CloseFigure()
    
    $g.FillPath($toothGrad, $path)
    $g.DrawPath($pen, $path)
    
    # Pulp Chamber (Red core cross-section)
    $pulp = New-Object System.Drawing.Drawing2D.GraphicsPath
    $pulp.StartFigure()
    $pulp.AddBezier(416, 230, 450, 230, 470, 260, 450, 300)
    $pulp.AddBezier(450, 300, 436, 370, 428, 420, 428, 420)
    $pulp.AddBezier(428, 420, 420, 370, 416, 300, 416, 300)
    $pulp.AddBezier(416, 300, 412, 370, 404, 420, 404, 420)
    $pulp.AddBezier(404, 420, 396, 370, 382, 300, 382, 300)
    $pulp.AddBezier(382, 300, 362, 260, 382, 230, 416, 230)
    $pulp.CloseFigure()
    $g.FillPath($redBrush, $pulp)
    
    # Blue endodontic tool file entering crown
    $bluePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $g.DrawLine($bluePen, 416, 100, 416, 320)
    
    # Sealer halo rings
    $haloPen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#3D9BFF")), 2
    $haloPen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
    $g.DrawEllipse($haloPen, 396, 300, 40, 40)
    $g.DrawEllipse($haloPen, 376, 280, 80, 80)
}

# 2. Tooth Whitening Illustration
Create-Service-Illustration "service-whitening.jpg" {
    param($g)
    $pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#0E6E73")), 8
    $toothGrad = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
        (New-Object System.Drawing.Point (250, 150)),
        (New-Object System.Drawing.Point (550, 450)),
        [System.Drawing.Color]::White,
        [System.Drawing.ColorTranslator]::FromHtml("#E8F6F6")
    )
    $yellowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#F9C74F"))
    
    # Tooth Path
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.StartFigure()
    $path.AddBezier(440, 150, 520, 150, 600, 190, 560, 290)
    $path.AddBezier(560, 290, 520, 410, 480, 490, 440, 490)
    $path.AddBezier(440, 490, 424, 430, 416, 350, 416, 290)
    $path.AddBezier(416, 290, 408, 430, 392, 490, 392, 490)
    $path.AddBezier(392, 490, 352, 410, 272, 290, 272, 290)
    $path.AddBezier(272, 290, 232, 190, 312, 150, 392, 150)
    $path.AddBezier(392, 150, 416, 170, 416, 170, 440, 150)
    $path.CloseFigure()
    
    $g.FillPath($toothGrad, $path)
    $g.DrawPath($pen, $path)
    
    # Large glowing sparkles
    function Draw-Large-Star ($x, $y, $size) {
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
    
    Draw-Large-Star 580 160 50
    Draw-Large-Star 200 300 35
    Draw-Large-Star 560 420 30
    Draw-Large-Star 320 100 20
}

# 3. Dental Braces Fixing Illustration
Create-Service-Illustration "service-braces.jpg" {
    param($g)
    $pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#0E6E73")), 8
    $wirePen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#8FA7A7")), 12
    $blueBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#3D9BFF"))
    $toothBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
    
    # Draw three molar silhouettes side by side
    $g.FillRectangle($toothBrush, 120, 180, 160, 240)
    $g.DrawRectangle($pen, 120, 180, 160, 240)
    
    $g.FillRectangle($toothBrush, 310, 160, 180, 280)
    $g.DrawRectangle($pen, 310, 160, 180, 280)
    
    $g.FillRectangle($toothBrush, 520, 180, 160, 240)
    $g.DrawRectangle($pen, 520, 180, 160, 240)
    
    # Draw orthodontics arch wire
    $g.DrawCurve($wirePen, @(
        (New-Object System.Drawing.Point (80, 310)),
        (New-Object System.Drawing.Point (400, 280)),
        (New-Object System.Drawing.Point (720, 310))
    ))
    
    # Draw brackets with colored brackets
    $g.FillRectangle($blueBrush, 170, 280, 60, 50)
    $g.DrawRectangle($pen, 170, 280, 60, 50)
    
    $g.FillRectangle($blueBrush, 360, 270, 80, 60)
    $g.DrawRectangle($pen, 360, 270, 80, 60)
    
    $g.FillRectangle($blueBrush, 570, 280, 60, 50)
    $g.DrawRectangle($pen, 570, 280, 60, 50)
}

# 4. Laser Gum Surgery Illustration
Create-Service-Illustration "service-laser.jpg" {
    param($g)
    $pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#0E6E73")), 8
    $pinkBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#FFC0C0"))
    $laserPen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#0E6E73")), 16
    $redBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#FF5A5F"))
    $redPen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#FF5A5F")), 4
    
    # Gum tissue base
    $gumPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $gumPath.StartFigure()
    $gumPath.AddBezier(50, 420, 200, 380, 600, 380, 750, 420)
    $gumPath.AddLine(750, 420, 750, 550)
    $gumPath.AddLine(750, 550, 50, 550)
    $gumPath.CloseFigure()
    $g.FillPath($pinkBrush, $gumPath)
    $g.DrawPath($pen, $gumPath)
    
    # Laser pen pointer
    $g.DrawLine($laserPen, 650, 80, 420, 280)
    $g.DrawLine($laserPen, 630, 60, 400, 260)
    $g.DrawLine($laserPen, 400, 260, 420, 280)
    
    # Target concentric glow rings
    $g.FillEllipse($redBrush, 320, 360, 50, 50)
    
    $redPen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
    $g.DrawEllipse($redPen, 300, 340, 90, 90)
    $g.DrawEllipse($redPen, 270, 310, 150, 150)
    
    # Concentrated beam ray
    $g.DrawLine((New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#FF5A5F")), 6), 405, 270, 345, 375)
}

# 5. Pits & Fissures Sealants Illustration
Create-Service-Illustration "service-sealants.jpg" {
    param($g)
    $pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#0E6E73")), 8
    $toothGrad = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
        (New-Object System.Drawing.Point (250, 150)),
        (New-Object System.Drawing.Point (550, 450)),
        [System.Drawing.Color]::White,
        [System.Drawing.ColorTranslator]::FromHtml("#E8F6F6")
    )
    $greenBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#2EC4B6"))
    
    # Molar Path
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.StartFigure()
    $path.AddBezier(150, 200, 250, 160, 550, 160, 650, 200)
    $path.AddBezier(650, 200, 690, 250, 690, 350, 630, 390)
    $path.AddBezier(630, 390, 570, 410, 550, 490, 538, 490)
    $path.AddBezier(538, 490, 520, 410, 500, 390, 500, 390)
    $path.AddBezier(500, 390, 480, 410, 462, 490, 462, 490)
    $path.AddBezier(462, 490, 430, 410, 360, 350, 360, 350)
    $path.AddBezier(360, 350, 360, 250, 110, 350, 150, 200)
    $path.CloseFigure()
    
    $g.FillPath($toothGrad, $path)
    $g.DrawPath($pen, $path)
    
    # Protective sealant shield overlay (green capsule)
    $g.FillEllipse($greenBrush, 190, 180, 420, 80)
    $g.DrawEllipse($pen, 190, 180, 420, 80)
}

# 6. Impacted Tooth Extraction Illustration
Create-Service-Illustration "service-extraction.jpg" {
    param($g)
    $pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#0E6E73")), 8
    $brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
    $bluePen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#3D9BFF")), 16
    
    # Tooth outline (semi-transparent/under gum contour)
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.StartFigure()
    $path.AddBezier(440, 220, 520, 220, 600, 260, 560, 360)
    $path.AddBezier(560, 360, 520, 480, 480, 560, 440, 560)
    $path.AddBezier(440, 560, 424, 500, 416, 420, 416, 360)
    $path.AddBezier(416, 360, 408, 500, 392, 560, 392, 560)
    $path.AddBezier(392, 560, 352, 480, 272, 360, 272, 360)
    $path.AddBezier(272, 360, 232, 260, 312, 220, 392, 220)
    $path.AddBezier(392, 220, 416, 240, 416, 240, 440, 220)
    $path.CloseFigure()
    
    $g.FillPath($brush, $path)
    $g.DrawPath($pen, $path)
    
    # Extraction upward lift arrow
    $bluePen.EndCap = [System.Drawing.Drawing2D.LineCap]::ArrowAnchor
    $g.DrawLine($bluePen, 416, 320, 416, 100)
}
