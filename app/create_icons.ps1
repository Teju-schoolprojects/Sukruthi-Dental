Add-Type -AssemblyName System.Drawing

$outDir = "C:\Users\ADMIN\Desktop\sukruthi Dental website\app\public\assets\icons"
if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force
}

function Create-Icon ($filename, $drawAction) {
    $bmp = New-Object System.Drawing.Bitmap 128, 128
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    # Enable high-quality rendering
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.Clear([System.Drawing.ColorTranslator]::FromHtml("#EBF6F6")) # Soft teal background
    
    # Execute custom drawing
    Invoke-Command -ScriptBlock $drawAction -ArgumentList $g
    
    # Save image
    $filePath = Join-Path $outDir $filename
    $bmp.Save($filePath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Generated icon: $filename"
}

# 1. Root Canal Treatment Icon
Create-Icon "icon-rct.png" {
    param($g)
    $pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#0E6E73")), 4
    $brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
    $redPen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#FF5A5F")), 4
    $bluePen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#3D9BFF")), 4
    
    # Tooth outline
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.StartFigure()
    $path.AddBezier(35, 20, 45, 20, 55, 30, 50, 55)
    $path.AddBezier(50, 55, 45, 90, 40, 105, 35, 105)
    $path.AddBezier(35, 105, 33, 90, 32, 75, 32, 60)
    $path.AddBezier(32, 60, 31, 90, 29, 105, 29, 105)
    $path.AddBezier(29, 105, 24, 90, 14, 55, 14, 55)
    $path.AddBezier(14, 55, 9, 30, 19, 20, 29, 20)
    $path.AddBezier(29, 20, 32, 25, 32, 25, 35, 20)
    $path.CloseFigure()
    
    $g.FillPath($brush, $path)
    $g.DrawPath($pen, $path)
    
    # Root canal red/blue threads
    $g.DrawLine($redPen, 32, 35, 32, 60)
    $g.DrawBezier($redPen, 32, 60, 32, 80, 30, 95, 29, 100)
    $g.DrawBezier($bluePen, 32, 60, 32, 80, 34, 95, 35, 100)
}

# 2. Tooth Whitening Icon
Create-Icon "icon-whitening.png" {
    param($g)
    $pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#0E6E73")), 4
    $brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
    $yellowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#F9C74F"))
    
    # Tooth outline
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.StartFigure()
    $path.AddBezier(35, 30, 45, 30, 55, 40, 50, 65)
    $path.AddBezier(50, 65, 45, 95, 40, 110, 35, 110)
    $path.AddBezier(35, 110, 33, 95, 32, 80, 32, 70)
    $path.AddBezier(32, 70, 31, 95, 29, 110, 29, 110)
    $path.AddBezier(29, 110, 24, 95, 14, 65, 14, 65)
    $path.AddBezier(14, 65, 9, 40, 19, 30, 29, 30)
    $path.AddBezier(29, 30, 32, 35, 32, 35, 35, 30)
    $path.CloseFigure()
    
    $g.FillPath($brush, $path)
    $g.DrawPath($pen, $path)
    
    # Draw four-pointed stars
    function Draw-Star ($x, $y, $size) {
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
    
    Draw-Star 85 30 18
    Draw-Star 25 70 12
    Draw-Star 80 85 10
}

# 3. Dental Braces Fixing Icon
Create-Icon "icon-braces.png" {
    param($g)
    $pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#0E6E73")), 4
    $greyPen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#B0C4DE")), 6
    $blueBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#3D9BFF"))
    
    # Draw simplified teeth rows side by side
    $g.DrawRectangle($pen, 15, 25, 16, 40)
    $g.DrawRectangle($pen, 31, 23, 18, 42)
    $g.DrawRectangle($pen, 49, 25, 16, 40)
    
    # Grey archwire
    $g.DrawCurve($greyPen, @(
        (New-Object System.Drawing.Point (10, 48)),
        (New-Object System.Drawing.Point (32, 42)),
        (New-Object System.Drawing.Point (54, 48))
    ))
    
    # Blue brackets
    $g.FillRectangle($blueBrush, 20, 40, 8, 10)
    $g.DrawRectangle($pen, 20, 40, 8, 10)
    
    $g.FillRectangle($blueBrush, 36, 38, 8, 10)
    $g.DrawRectangle($pen, 36, 38, 8, 10)
    
    $g.FillRectangle($blueBrush, 52, 40, 8, 10)
    $g.DrawRectangle($pen, 52, 40, 8, 10)
}

# 4. Laser Gum Surgery Icon
Create-Icon "icon-laser.png" {
    param($g)
    $pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#0E6E73")), 4
    $redBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#FF5A5F"))
    $laserPen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#0E6E73")), 5
    $laserRedPen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#FF5A5F")), 3
    
    # Gum line curve at the bottom
    $gumPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $gumPath.StartFigure()
    $gumPath.AddBezier(10, 85, 25, 75, 45, 75, 60, 85)
    $gumPath.AddLine(60, 85, 60, 118)
    $gumPath.AddLine(60, 118, 10, 118)
    $gumPath.CloseFigure()
    $g.FillPath((New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#FFB5B5"))), $gumPath)
    $g.DrawPath($pen, $gumPath)
    
    # Laser pen pointer
    $g.DrawLine($laserPen, 95, 20, 60, 55)
    $g.DrawLine($laserPen, 90, 15, 55, 50)
    $g.DrawLine($laserPen, 55, 50, 60, 55)
    
    # Concentrated light waves
    $g.FillEllipse($redBrush, 40, 68, 12, 12)
    
    # Dotted laser ray
    $laserRedPen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
    $g.DrawLine($laserRedPen, 58, 52, 46, 74)
}

# 5. Pits & Fissures Sealants Icon
Create-Icon "icon-sealants.png" {
    param($g)
    $pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#0E6E73")), 4
    $brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
    $greenBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#2EC4B6"))
    
    # Molar outline
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.StartFigure()
    $path.AddBezier(20, 30, 30, 25, 50, 25, 60, 30)
    $path.AddBezier(60, 30, 65, 45, 65, 75, 55, 85)
    $path.AddBezier(55, 85, 45, 90, 40, 105, 38, 105)
    $path.AddBezier(38, 105, 35, 90, 32, 85, 32, 85)
    $path.AddBezier(32, 85, 29, 90, 26, 105, 26, 105)
    $path.AddBezier(26, 105, 21, 90, 9, 75, 9, 75)
    $path.AddBezier(9, 75, 9, 45, 14, 30, 20, 30)
    $path.CloseFigure()
    
    $g.FillPath($brush, $path)
    $g.DrawPath($pen, $path)
    
    # Protective sealant shield overlay (green capsule)
    $g.FillEllipse($greenBrush, 22, 28, 36, 18)
    $g.DrawEllipse((New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#0E6E73")), 2), 22, 28, 36, 18)
}

# 6. Impacted Tooth Extraction Icon
Create-Icon "icon-extraction.png" {
    param($g)
    $pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#0E6E73")), 4
    $brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
    $bluePen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#3D9BFF")), 5
    
    # Tooth outline (semi-transparent/under gum contour)
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.StartFigure()
    $path.AddBezier(35, 50, 45, 50, 55, 60, 50, 85)
    $path.AddBezier(50, 85, 45, 110, 40, 120, 35, 120)
    $path.AddBezier(35, 120, 33, 110, 32, 95, 32, 95)
    $path.AddBezier(32, 95, 29, 110, 29, 120, 29, 120)
    $path.AddBezier(29, 120, 24, 110, 14, 85, 14, 85)
    $path.AddBezier(14, 85, 9, 60, 19, 50, 29, 50)
    $path.AddBezier(29, 50, 32, 55, 32, 55, 35, 50)
    $path.CloseFigure()
    
    $g.FillPath($brush, $path)
    $g.DrawPath($pen, $path)
    
    # Extraction upward lift arrow
    $g.DrawLine($bluePen, 32, 58, 32, 15)
    
    # Arrowhead
    $g.DrawLine($bluePen, 32, 15, 24, 25)
    $g.DrawLine($bluePen, 32, 15, 40, 25)
}
