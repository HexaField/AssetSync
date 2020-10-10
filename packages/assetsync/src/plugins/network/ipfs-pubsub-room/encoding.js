import uint8ArrayFromString from 'uint8arrays/from-string.js'

export default function (_message) {
  let message = _message
  if (message.constructor !== Uint8Array) {
    message = uint8ArrayFromString(String(message))
  }
  return message
}
