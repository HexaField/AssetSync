export default class t{constructor(e){this.conjure=e,this.keys={}}addKey(e,s){this.keys[e]=s}removeKey(e){delete this.keys[e]}changeKey(e,s){this.addKey(e,s)}getKey(e){return this.keys[String(e)]}}
