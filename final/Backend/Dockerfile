# FROM golang:1.22-alpine
# WORKDIR /go/src/example.com/ProjectSeG13
# COPY Backend .
# RUN apk add build-base
# RUN go mod tidy
# RUN go build -o main .
# EXPOSE 8000
# CMD ["./main"]

# Use a multi-stage build to reduce the final image size 
FROM golang:1.22-alpine AS builder 
WORKDIR /go/src/example.com/ProjectSeG13
COPY Backend . 
RUN apk add --no-cache build-base 
RUN go mod tidy 
RUN go build -o main . 
# Use a minimal base image for the final stage 
FROM alpine:latest 
WORKDIR /go/src/example.com/ProjectSeG13
COPY --from=builder /go/src/example.com/ProjectSeG13/main . 
EXPOSE 8080 
CMD ["./main"] 