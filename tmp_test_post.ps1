$body = @{ email='debug5@example.com'; password='Pass123!'; mode='signup'; confirmPassword='Pass123!' } | ConvertTo-Json
try {
  $res = Invoke-RestMethod -Uri 'http://localhost:5000/api/login' -Method Post -Body $body -ContentType 'application/json' -Headers @{ 'Origin' = 'http://localhost:5173' } -ErrorAction Stop
  $res | ConvertTo-Json -Depth 5
} catch {
  Write-Output "ERROR: $_"
}
