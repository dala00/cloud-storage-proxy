require('dotenv').config()
const { createError } = require('micro')
const { Storage } = require('@google-cloud/storage')
const storage = new Storage({
  keyFile:
    __dirname + '/keys/' + process.env.GOOGLE_APPLICATION_CREDENTIALS_FILENAME,
  projectId: process.env.GCP_PROJECT_ID
})
const bucket = storage.bucket(process.env.STORAGE_BUCKET)

module.exports = async (req, res) => {
  const contentType = getContentType(req.url)
  if (!contentType) {
    throw createError(404, 'Not found')
  }

  const path = req.url.substr(1)
  const file = bucket.file(path)
  if (!file) {
    throw createError(404, 'Not found')
  }

  const image = await getRawData(file)

  res.writeHead(200, {
    'Cache-Control': 'public, max-age=315360000, s_maxage=315360000',
    Expires: new Date(Date.now() + 315360000000).toUTCString(),
    'Content-Type': getContentType(path),
    'Content-Length': image.length
  })
  res.end(image)
}

async function getRawData(file) {
  return new Promise((resolve, reject) => {
    let contents = Buffer.from([])

    file
      .createReadStream()
      .on('error', err => reject(err))
      .on('data', function(chunk) {
        contents = Buffer.concat([contents, chunk])
      })
      .on('end', () => {
        resolve(contents)
      })
  })
}

function getContentType(path) {
  if (path.match(/\.png$/i)) {
    return 'image/png'
  }
  if (path.match(/\.jpe?g$/i)) {
    return 'image/jpeg'
  }
  if (path.match(/\.gif$/i)) {
    return 'image/gif'
  }
  return null
}
