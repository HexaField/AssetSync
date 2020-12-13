import * as Schema from '@geckos.io/typed-array-buffer-schema'
import { NETWORKING_OPCODES } from '../../../backend/Constants.js'

const SCHEMA_POSITION = Schema.BufferSchema.schema('position', {
    x: Schema.float32,
    y: Schema.float32,
    z: Schema.float32,
})

const SCHEMA_VELOCITY = Schema.BufferSchema.schema('velocity', {
    x: Schema.float32,
    y: Schema.float32,
    z: Schema.float32,
})

const SCHEMA_QUATERNION = Schema.BufferSchema.schema('quaternion', {
    _x: Schema.float32,
    _y: Schema.float32,
    _z: Schema.float32,
    _w: Schema.float32,
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

    toBuffer(opcode, content) {
        if (!this.schemas[opcode]) {
            return
        }
        const data = new Uint8Array(this.schemas[opcode].model.toBuffer(content))
        return data
    }

    fromBuffer(buf) {
        const buffer = new Uint8Array(buf)
        if(buffer.length < 5) return {}
        const id = getSchemaIdFromBuffer(buffer.buffer)
        if(!this.schemaIDs[id]) return {}
        const content = this.schemaIDs[id].model.fromBuffer(buffer.buffer)
        const opcode = this.schemaIDs[id].schema.name
        return { opcode, content }
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