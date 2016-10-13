# nsfw
This is a simple web app written in Python http://itoolset.com/nsfw

Online demo of the yahoo/open_nsfw library https://github.com/yahoo/open_nsfw

According to the document, The network takes in an image and gives output a probability (score between 0-1) which can be used to filter not suitable for work images. Scores < 0.2 indicate that the image is likely to be safe with high probability. Scores > 0.8 indicate that the image is highly probable to be NSFW. Scores in middle range may be binned for different NSFW levels.

for more details please visit the original website.

note: this project not maintained anymore.

## Deps
web front end: please check the package.json file.

back end: Flask & Caffe.

## API endpoint
All API methods are located at: https://www.itoolset.com/nsfw/api/0

## Score
This method returns the score of the uploaded image.

### request
`curl -i -X POST -H "Content-Type: multipart/form-data" -F "file=@test_image.jpg" http://itoolset.com/nsfw/api/0/score`

### response
```
HTTP/1.1 100 Continue

HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 89
Server: Werkzeug/0.11.11 Python/2.7.6
Date: Thu, 13 Oct 2016 09:03:28 GMT

{
  "name": "test_image.jpg",
  "score": 0.016876673325896263,
  "status": "success"
}
```

`status` will be `"success"` if the operation is successful. It will be `"error"` when something erros happened.

## License
nsfw is released under the MIT license. See LICENSE for details.

## Contact
itoolset.dev@gmail.com