import * as Schema from '@geckos.io/typed-array-buffer-schema'
import { NETWORKING_OPCODES } from '../../../backend/Constants.js'
import uint8ArrayFromString from 'uint8arrays/from-string.js'
import uint8ArrayToString from 'uint8arrays/to-string.js'


const SCHEMA_POSITION = Schema.BufferSchema.schema('position', {
    x: Schema.int16,
    y: Schema.int16,
    z: Schema.int16,
})

const SCHEMA_VELOCITY = Schema.BufferSchema.schema('velocity', {
    x: Schema.int16,
    y: Schema.int16,
    z: Schema.int16,
})

const SCHEMA_QUATERNION = Schema.BufferSchema.schema('quaternion', {
    x: Schema.int16,
    y: Schema.int16,
    z: Schema.int16,
    w: Schema.int16,
})

export class NetworkingSchemas {
    constructor() {
        this.schemas = {}
        this.schemaIDs = {}

        this.addSchema(NETWORKING_OPCODES.USER.METADATA, { 
            username: Schema.string16
        })
        this.addSchema(NETWORKING_OPCODES.USER.MOVE, { 
            position: SCHEMA_POSITION,
            rotation: SCHEMA_QUATERNION,
            velocity: SCHEMA_VELOCITY,
        })
        this.addSchema(NETWORKING_OPCODES.USER.ANIMATION, { 
            name: Schema.string16,
            fadeTime: Schema.float32,
            once: Schema.uint8,
            startTime: Schema.float32,
        })
    }

    addSchema(opcode, args) {
        const schema = Schema.BufferSchema.schema(opcode, args)
        const model = new Schema.Model(schema)
        this.schemas[opcode] = { model, schema }
        this.schemaIDs[schema.id] = { model, schema }
    }

    encode(opcode, content) {
        if (!this.schemas[opcode]) {
            return
        }
        const data = new Uint8Array(this.schemas[opcode].model.toBuffer(content))
        return uint8ArrayToString(data)
    }

    decode(data) {
        try {
            const buffer = new Uint8Array(uint8ArrayFromString(data))
            if(buffer.length < 5) return {}
            const id = getSchemaIdFromBuffer(buffer.buffer)
            if(!this.schemaIDs[id]) return {}
            const content = this.schemaIDs[id].model.fromBuffer(buffer.buffer)
            const opcode = this.schemaIDs[id].schema.name
            return { opcode, content }
        } catch(err) { return {} }
    }
}

function getSchemaIdFromBuffer(buffer) {
    const dataView = new DataView(buffer)
    let id = ''

    for (let i = 0; i < 5; i++) {
        const uInt8 = dataView.getUint8(i)
        id += String.fromCharCode(uInt8)
    }

    return id
}