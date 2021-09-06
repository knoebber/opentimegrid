test:
	go test ./...

client:
	yarn --cwd client/ build

opentimegrid: client
	go build .

.PHONY: test client opentimegrid
