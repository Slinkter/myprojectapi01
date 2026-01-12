# PowerShell script to clean up duplicate files
# Feature-Based Architecture - Cleanup Script

Write-Host "🧹 Iniciando limpieza de archivos duplicados..." -ForegroundColor Cyan
Write-Host ""

$filesToDelete = @(
    "src\components\UserCard.jsx",
    "src\components\SkeletonCard.jsx",
    "src\components\layout\UserList.jsx",
    "src\components\layout\SkeletonGrid.jsx",
    "src\hooks\useUserFetching.js"
)

$deletedCount = 0
$errorCount = 0

foreach ($file in $filesToDelete) {
    if (Test-Path $file) {
        try {
            Remove-Item $file -Force
            Write-Host "✅ Eliminado: $file" -ForegroundColor Green
            $deletedCount++
        }
        catch {
            Write-Host "❌ Error al eliminar: $file" -ForegroundColor Red
            Write-Host "   Razón: $_" -ForegroundColor Yellow
            $errorCount++
        }
    }
    else {
        Write-Host "⚠️  No encontrado: $file" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "📊 Resumen:" -ForegroundColor Cyan
Write-Host "   Archivos eliminados: $deletedCount" -ForegroundColor Green
Write-Host "   Errores: $errorCount" -ForegroundColor $(if ($errorCount -eq 0) { "Green" } else { "Red" })
Write-Host ""

if ($deletedCount -eq 5) {
    Write-Host "🎉 ¡Limpieza completada exitosamente!" -ForegroundColor Green
    Write-Host "   Arquitectura Feature-Based: 100% ✅" -ForegroundColor Green
}
else {
    Write-Host "⚠️  Algunos archivos no fueron eliminados" -ForegroundColor Yellow
    Write-Host "   Por favor, elimínalos manualmente desde el Explorador de Archivos" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Presiona cualquier tecla para continuar..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
