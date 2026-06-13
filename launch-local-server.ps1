$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootKey = [IO.Path]::GetFullPath($root).ToLowerInvariant()
$hashBytes = [Security.Cryptography.SHA256]::Create().ComputeHash([Text.Encoding]::UTF8.GetBytes($rootKey))
$portOffset = [BitConverter]::ToUInt16($hashBytes, 0) % 1000
$basePort = 8757
$port = $basePort + $portOffset
$listener = New-Object System.Net.HttpListener
$attempts = 0

while ($true) {
  try {
    $prefix = "http://localhost:$port/"
    $listener.Prefixes.Clear()
    $listener.Prefixes.Add($prefix)
    $listener.Start()
    break
  } catch {
    $attempts += 1
    if ($attempts -gt 1000) {
      throw "Could not start a local page server."
    }
    $port = $basePort + (($portOffset + $attempts) % 1000)
  }
}

$url = "http://localhost:$port/index.html"
Write-Host "Wind Waker Randomizer Hint Tracker is running at $url"
Write-Host "Keep this window open while using the tracker. Press Ctrl+C to stop it."
Start-Process $url

function Get-ContentType($path) {
  switch ([IO.Path]::GetExtension($path).ToLowerInvariant()) {
    ".html" { "text/html; charset=utf-8" }
    ".css" { "text/css; charset=utf-8" }
    ".js" { "text/javascript; charset=utf-8" }
    ".txt" { "text/plain; charset=utf-8" }
    ".png" { "image/png" }
    ".jpg" { "image/jpeg" }
    ".jpeg" { "image/jpeg" }
    default { "application/octet-stream" }
  }
}

function Write-Response($context, $statusCode, $contentType, $bytes) {
  $context.Response.StatusCode = $statusCode
  $context.Response.ContentType = $contentType
  $context.Response.ContentLength64 = $bytes.Length
  $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  $context.Response.OutputStream.Close()
}

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $requestPath = [System.Uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart("/"))
  if ([string]::IsNullOrWhiteSpace($requestPath)) {
    $requestPath = "index.html"
  }

  if ($requestPath -eq "preferences.json") {
    $preferencesPath = Join-Path $root "preferences.json"

    if ($context.Request.HttpMethod -eq "GET") {
      if (Test-Path -LiteralPath $preferencesPath -PathType Leaf) {
        $bytes = [IO.File]::ReadAllBytes($preferencesPath)
      } else {
        $bytes = [Text.Encoding]::UTF8.GetBytes("{}")
      }
      Write-Response $context 200 "application/json; charset=utf-8" $bytes
      continue
    }

    if ($context.Request.HttpMethod -eq "POST") {
      $reader = New-Object IO.StreamReader($context.Request.InputStream, $context.Request.ContentEncoding)
      $body = $reader.ReadToEnd()
      $reader.Close()

      try {
        $null = $body | ConvertFrom-Json
        [IO.File]::WriteAllText($preferencesPath, $body, [Text.Encoding]::UTF8)
        $bytes = [Text.Encoding]::UTF8.GetBytes("{""ok"":true}")
        Write-Response $context 200 "application/json; charset=utf-8" $bytes
      } catch {
        $bytes = [Text.Encoding]::UTF8.GetBytes("{""ok"":false}")
        Write-Response $context 400 "application/json; charset=utf-8" $bytes
      }
      continue
    }

    $bytes = [Text.Encoding]::UTF8.GetBytes("Method not allowed")
    Write-Response $context 405 "text/plain; charset=utf-8" $bytes
    continue
  }

  $relativePath = $requestPath.Replace("/", [IO.Path]::DirectorySeparatorChar)
  $fullPath = [IO.Path]::GetFullPath((Join-Path $root $relativePath))
  $rootPath = [IO.Path]::GetFullPath($root)

  if (-not $fullPath.StartsWith($rootPath, [StringComparison]::OrdinalIgnoreCase) -or -not (Test-Path -LiteralPath $fullPath -PathType Leaf)) {
    $bytes = [Text.Encoding]::UTF8.GetBytes("Not found")
    Write-Response $context 404 "text/plain; charset=utf-8" $bytes
  } else {
    $bytes = [IO.File]::ReadAllBytes($fullPath)
    Write-Response $context 200 (Get-ContentType $fullPath) $bytes
  }
}
