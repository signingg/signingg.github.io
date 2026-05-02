param([string]$In, [string]$Out)

[Windows.Data.Pdf.PdfDocument,Windows.Data.Pdf,ContentType=WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile,Windows.Storage,ContentType=WindowsRuntime] | Out-Null
[Windows.Storage.StorageFolder,Windows.Storage,ContentType=WindowsRuntime] | Out-Null
Add-Type -AssemblyName System.Runtime.WindowsRuntime

$asTaskGeneric = ([System.WindowsRuntimeSystemExtensions].GetMethods() |
    Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]
$asTaskAction = ([System.WindowsRuntimeSystemExtensions].GetMethods() |
    Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncAction' })[0]

function AwaitOp($op, $type) { $t = $asTaskGeneric.MakeGenericMethod($type).Invoke($null, @($op)); $t.Wait(-1) | Out-Null; $t.Result }
function AwaitAct($act) { $t = $asTaskAction.Invoke($null, @($act)); $t.Wait(-1) | Out-Null }

$inFull = (Resolve-Path $In).Path
$outDir = Split-Path $Out
$outName = Split-Path $Out -Leaf
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }
$outDirFull = (Resolve-Path $outDir).Path

$pdfFile = AwaitOp ([Windows.Storage.StorageFile]::GetFileFromPathAsync($inFull)) ([Windows.Storage.StorageFile])
$doc = AwaitOp ([Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($pdfFile)) ([Windows.Data.Pdf.PdfDocument])
$page = $doc.GetPage(0)
$folder = AwaitOp ([Windows.Storage.StorageFolder]::GetFolderFromPathAsync($outDirFull)) ([Windows.Storage.StorageFolder])
$outFile = AwaitOp ($folder.CreateFileAsync($outName, [Windows.Storage.CreationCollisionOption]::ReplaceExisting)) ([Windows.Storage.StorageFile])
$stream = AwaitOp ($outFile.OpenAsync([Windows.Storage.FileAccessMode]::ReadWrite)) ([Windows.Storage.Streams.IRandomAccessStream])
$opts = New-Object Windows.Data.Pdf.PdfPageRenderOptions
$opts.DestinationWidth = 1600
AwaitAct ($page.RenderToStreamAsync($stream, $opts))
$stream.Dispose()
Write-Host ("OK: {0} -> {1} ({2} bytes)" -f $In, $Out, (Get-Item (Join-Path $outDirFull $outName)).Length)
