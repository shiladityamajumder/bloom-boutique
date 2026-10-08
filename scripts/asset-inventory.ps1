Add-Type -AssemblyName System.Drawing
$source = Join-Path $PSScriptRoot '../../assets'
$files = @(Get-ChildItem -LiteralPath $source -Filter '*.png' | Sort-Object Name)
$thumbWidth = 250
$thumbHeight = 200
$sheet = New-Object System.Drawing.Bitmap (1250, ([int][Math]::Ceiling($files.Count / 5) * 230))
$graphics = [System.Drawing.Graphics]::FromImage($sheet)
$graphics.Clear([System.Drawing.Color]::White)
$font = New-Object System.Drawing.Font ('Arial', 10)
$inventory = @()
for ($i = 0; $i -lt $files.Count; $i++) {
  $img = [System.Drawing.Image]::FromFile($files[$i].FullName)
  $x = ($i % 5) * 250
  $y = [int][Math]::Floor($i / 5) * 230
  $scale = [Math]::Min(250 / $img.Width, 200 / $img.Height)
  $graphics.DrawImage($img, [int]$x, [int]$y, [int]($img.Width*$scale), [int]($img.Height*$scale))
  $graphics.DrawString("$i : $($img.Width)x$($img.Height)", $font, [System.Drawing.Brushes]::Black, [single]$x, [single]($y+202))
  $inventory += [PSCustomObject]@{index=$i;name=$files[$i].Name;width=$img.Width;height=$img.Height}
  $img.Dispose()
}
$sheet.Save((Join-Path $PSScriptRoot 'asset-sheet.jpg'), [System.Drawing.Imaging.ImageFormat]::Jpeg)
$inventory | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $PSScriptRoot 'asset-inventory.json')
$graphics.Dispose()
$sheet.Dispose()
