FROM golang:1-alpine3.15
ARG ACCESS_TOKEN_USR
ARG ACCESS_TOKEN_PWD

# copy files
RUN mkdir /app 
ADD . /app/
COPY go.mod go.sum /app/
WORKDIR /app 

# needed for private images
RUN apk add --no-cache ca-certificates git
ENV GOPRIVATE=github.com/joinpickup
RUN echo "machine github.com login ${ACCESS_TOKEN_USR} password ${ACCESS_TOKEN_PWD}" > ~/.netrc

RUN go mod download && go mod verify

# build and run app
RUN go build -o main .
CMD ["./main"]
