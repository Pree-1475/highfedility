$replacements = @{
    'bg-\[#ffffff\]' = 'bg-card'
    'text-\[#ffffff\]' = 'text-card-foreground'
    'bg-\[#0d2617\]' = 'bg-foreground'
    'bg-\[#ddd9cf\]' = 'bg-secondary'
    'bg-\[#2a3023\]' = 'bg-foreground/90'
    'hover:bg-\[#2a3023\]' = 'hover:bg-foreground/90'
    'bg-\[#eae8e0\]' = 'bg-secondary'
    'bg-\[#fdfcf7\]' = 'bg-background'
    'bg-\[#fbfaf8\]' = 'bg-background'
    'text-\[#c8c4b8\]' = 'text-muted-foreground'
    'text-\[#c8c4b8\]/50' = 'text-muted-foreground/50'
    'text-\[#c8c4b8\]/20' = 'text-muted-foreground/20'
    'border-\[#c8c4b8\]' = 'border-border'
    'bg-\[#f5f3ec\]' = 'bg-card'
    'text-\[#c77c22\]' = 'text-primary'
    'bg-\[#f0ede4\]' = 'bg-muted'
    'border-\[#f0ede4\]' = 'border-muted'
    'text-\[#6b7462\]' = 'text-muted-foreground'
    'bg-\[#fdfdfc\]' = 'bg-card'
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
