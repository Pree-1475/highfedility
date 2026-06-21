$replacements = @{
    'bg-\[#1c2117\]' = 'bg-foreground'
    'text-\[#1c2117\]' = 'text-foreground'
    'text-\[#f5f3ec\]' = 'text-background'
    'bg-\[#f5f3ec\]' = 'bg-background'
    'border-\[#f5f3ec\]' = 'border-background'
    'text-\[#f5f3ec\]/60' = 'text-background/60'
    'text-\[#f5f3ec\]/80' = 'text-background/80'
    'text-\[#f5f3ec\]/40' = 'text-background/40'
    'text-\[#f5f3ec\]/30' = 'text-background/30'
    'border-\[#f5f3ec\]/10' = 'border-background/10'
    'text-\[#f5f3ec\]/\[0\.03\]' = 'text-background/[0.03]'
}

$files = Get-ChildItem -Path "c:\Users\Preetham\Desktop\high fedility\High-Fidelity Frontend\src\components" -Recurse -Filter "*.tsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    foreach ($key in $replacements.Keys) {
        $val = $replacements[$key]
        $content = [System.Text.RegularExpressions.Regex]::Replace($content, $key, $val)
    }
    
    if ($content -cne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated $($file.Name)"
    }
}
