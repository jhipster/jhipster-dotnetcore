# Monitoring

1. Run container (uncomment chronograf and kapacitor if you would use it): `docker-compose -f ./docker/monitoring.yml up -d`

2. Go to http://localhost:3000 (or http://localhost:8888 if you use chronograf)
3. (Only for chronograf) Change influxdb connection string by `YourApp-influxdb`

4. (Only for chronograf) Change kapacitor connection string by `YourApp-kapacitor`
5. (Only for chronograf) You can now add dashboard (like docker), see your app log in Cronograf Log viewer and send alert with kapacitor
