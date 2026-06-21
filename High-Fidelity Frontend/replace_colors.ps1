$replacements = @{
    'bg-\[#11311e\]' = 'bg-foreground'
    'text-\[#11311e\]' = 'text-foreground'
    'border-\[#11311e\]' = 'border-foreground'
    'bg-\[#fdfbf7\]' = 'bg-background'
    'text-\[#fdfbf7\]' = 'text-background'
    'bg-\[#8b7355\]' = 'bg-primary'
    'text-\[#8b7355\]' = 'text-primary'
    'border-\[#8b7355\]' = 'border-primary'
    'from-\[#fdfbf7\]' = 'from-background'
    'to-\[#fdfbf7\]' = 'to-background'
    'via-\[#8b7355\]' = 'via-primary'
    'bg-\[#a7e5b9\]' = 'bg-primary/10'
    'text-\[#a7e5b9\]' = 'text-primary/80'
    'bg-\[#6b7462\]' = 'bg-muted-foreground'
    'text-\[#6b7462\]' = 'text-muted-foreground'
    'bg-\[#c8c4b8\]' = 'bg-border'
    'border-\[#c8c4b8\]' = 'border-border'
    'bg-\[#f5f0e7\]' = 'bg-card'
    'bg-\[#eae6db\]' = 'bg-secondary'
    'text-\[#a37c56\]' = 'text-primary'
    'bg-\[#a37c56\]' = 'bg-primary'
    'border-\[#a37c56\]' = 'border-primary'
    'text-white' = 'text-background'
    'bg-white' = 'bg-card'
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
