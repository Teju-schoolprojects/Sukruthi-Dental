Add-Type -AssemblyName System.Drawing

# Find the logo file in artifacts
$artifactsDir = "C:\Users\ADMIN\.gemini\antigravity\brain\d60b4db0-509a-4352-8f83-b7b49136822f"
$logoFile = Get-ChildItem -Path $artifactsDir -Filter "brand_logo*.jpg" | Select-Object -First 1

if (-not $logoFile) {
    Write-Error "Logo file not found in artifacts directory."
    exit 1
}

Write-Host "Found logo at: $($logoFile.FullName)"

# Load the logo image
$srcImg = [System.Drawing.Image]::FromFile($logoFile.FullName)
$bmp = New-Object System.Drawing.Bitmap($srcImg)

# Process transparency (replace white with transparent)
Write-Host "Processing transparency..."
for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $pixel = $bmp.GetPixel($x, $y)
        # Check if pixel is close to white (R,G,B > 240)
        if ($pixel.R -gt 240 -and $pixel.G -gt 240 -and $pixel.B -gt 240) {
            $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        }
    }
}

# Function to resize bitmap
function Resize-Bitmap ($originalBmp, $width, $height, $padColor) {
    $resized = New-Object System.Drawing.Bitmap($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($resized)
    $g.Clear([System.Drawing.Color]::Transparent)
    
    if ($padColor) {
        $g.Clear([System.Drawing.ColorTranslator]::FromHtml($padColor))
    }
    
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    
    if ($padColor) {
        # Calculate aspect scaling to fit with padding
        $scale = [System.Math]::Min($width / $originalBmp.Width, $height / $originalBmp.Height) * 0.8
        $newW = [System.Math]::Round($originalBmp.Width * $scale)
        $newH = [System.Math]::Round($originalBmp.Height * $scale)
        $posX = [System.Math]::Round(($width - $newW) / 2)
        $posY = [System.Math]::Round(($height - $newH) / 2)
        $g.DrawImage($originalBmp, $posX, $posY, $newW, $newH)
    } else {
        $g.DrawImage($originalBmp, 0, 0, $width, $height)
    }
    
    $g.Dispose()
    return $resized
}

# Save main logo
Write-Host "Saving logo.png..."
$logoPath = Join-Path (Get-Item .).FullName "public/assets/logo.png"
$bmp.Save($logoPath, [System.Drawing.Imaging.ImageFormat]::Png)

# Save icons in different sizes
$sizes = @{
    "public/icon-512.png" = 512
    "public/icon-192.png" = 192
    "public/apple-touch-icon.png" = 180
    "public/favicon-32.png" = 32
    "public/favicon-16.png" = 16
}

foreach ($key in $sizes.Keys) {
    $sz = $sizes[$key]
    Write-Host "Saving $key ($($sz)x$($sz))..."
    $resizedBmp = Resize-Bitmap $bmp $sz $sz $null
    $savePath = Join-Path (Get-Item .).FullName $key
    $resizedBmp.Save($savePath, [System.Drawing.Imaging.ImageFormat]::Png)
    $resizedBmp.Dispose()
}

# Save maskable icon (padded)
Write-Host "Saving maskable icon..."
$maskableBmp = Resize-Bitmap $bmp 512 512 "#F7F9F8" # Pad with ground color
$maskablePath = Join-Path (Get-Item .).FullName "public/icon-512-maskable.png"
$maskableBmp.Save($maskablePath, [System.Drawing.Imaging.ImageFormat]::Png)
$maskableBmp.Dispose()

$bmp.Dispose()
$srcImg.Dispose()

Write-Host "All logo icons generated successfully!"
