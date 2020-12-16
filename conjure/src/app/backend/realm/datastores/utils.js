
import { Key } from 'interface-datastore'
import { Record } from 'libp2p-record'
import base32 from 'base32.js'

/**
 * Convert a Uint8Array to their SHA2-256 hash.
 *
 * @param {Uint8Array} buf
 * @returns {Key}
 */
export const bufferToKey = (buf) => {
  return new Key('/' + encodeBase32(buf), false)
}

/**
 * Encode a given Uint8Array into a base32 string.
 * @param {Uint8Array} buf
 * @returns {string}
 */
export const encodeBase32 = (buf) => {
  const enc = new base32.Encoder()
  return enc.write(buf).finalize()
}

/**
 * Decode a given base32 string into a Uint8Array.
 * @param {string} raw
 * @returns {Uint8Array}
 */
export const decodeBase32 = (raw) => {
  const dec = new base32.Decoder()
  return Uint8Array.from(dec.write(raw).finalize())
}

/**
 * Create a new put record, encodes and signs it if enabled.
 *
 * @param {Uint8Array} key
 * @param {Uint8Array} value
 * @returns {Uint8Array}
 */
export const createPutRecord = (key, value, time) => {
  const timeReceived = time ? new Date(time) : Date.now()
  const rec = new Record(key, value, timeReceived)

  return rec.serialize()
}

/**
 * Create a new put record, encodes and signs it if enabled.
 *
 * @param {Record} record
 * @returns {Uint8Array}
 */
export const decodeRecord = (record) => {
    return Record.deserialize(record)
}