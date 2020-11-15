import * as Schema from '@geckos.io/typed-array-buffer-schema'

export const NETWORKING_OPCODES = {
    HEARTBEAT: 0,
    USER: {
        JOIN: 100,
        LEAVE: 101,
        MOVE: 102,
        // UPDATE: 103,
        // ANIMATION: 104,
    },
}

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

        this.addSchema(NETWORKING_OPCODES.USER.JOIN, { username: Schema.string16 })
        this.addSchema(NETWORKING_OPCODES.USER.LEAVE, { })
        this.addSchema(NETWORKING_OPCODES.USER.MOVE, { 
            position: SCHEMA_POSITION,
            rotation: SCHEMA_QUATERNION,
            velocity: SCHEMA_VELOCITY,
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
            return new Uint8Array([])
        }
        const data = new Uint8Array(this.schemas[opcode].model.toBuffer(content))
        return data
    }

    fromBuffer(buffer) {
        const id = getSchemaIdFromBuffer(buffer.buffer)
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