import uint8ArrayToString from 'uint8arrays/to-string.js'

export default function (_message) {
  let message = _message
  if (message.constructor === Uint8Array) {
    message = String(uint8ArrayToString(message))
  }
  return message
}
