mkdir -Force src/pages
$urls = @{
    "Home.html" = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzkwYTU2MThiODA5ZTQ2ODZiODRjNzVlN2RjMzRhZWFhEgsSBxD97OvyuxUYAZIBIwoKcHJvamVjdF9pZBIVQhM1NDA5Mzg3MTg4MDA2NDQ3MDQy&filename=&opi=89354086"
    "Booking.html" = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2I4Y2U3MjY1OTZiZTQwZjhiZjNmOWY1NDVhNDE1MDYzEgsSBxD97OvyuxUYAZIBIwoKcHJvamVjdF9pZBIVQhM1NDA5Mzg3MTg4MDA2NDQ3MDQy&filename=&opi=96797242"
    "Menu.html" = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzZiNGZkMGUyODFiYzRmNzZiNGY2YzIwYWJhMGNmYmE0EgsSBxD97OvyuxUYAZIBIwoKcHJvamVjdF9pZBIVQhM1NDA5Mzg3MTg4MDA2NDQ3MDQy&filename=&opi=96797242"
    "Rewards.html" = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzBjNWM1YzdmODFiZTRlODNhMTBjNzc4ZTg2NWNiZDQ1EgsSBxD97OvyuxUYAZIBIwoKcHJvamVjdF9pZBIVQhM1NDA5Mzg3MTg4MDA2NDQ3MDQy&filename=&opi=96797242"
    "Profile.html" = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2VjODMxOGNhNjUyZDQwNzM5N2MxZWY3N2QwOTRkNzk5EgsSBxD97OvyuxUYAZIBIwoKcHJvamVjdF9pZBIVQhM1NDA5Mzg3MTg4MDA2NDQ3MDQy&filename=&opi=96797242"
}

foreach ($key in $urls.Keys) {
    Invoke-WebRequest -Uri $urls[$key] -OutFile "src/pages/$key"
}
