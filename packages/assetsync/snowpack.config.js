module.exports = {
  buildOptions: {
    clean: true
  },
  mount: {
    public: "/",
    src: "/_dist_"
  },
  devOptions: {
    
  },
  buildOptions: {
    clean: true
  },
  installOptions: {
    treeshake: true,
    polyfillNode: false,
    rollup: {
      plugins: [
        // require('rollup-plugin-sass')(),
        require('rollup-plugin-node-polyfills')({ fs: true, crypto: true, include:["os"] })
      ],
    },
    namedExports: [
      
    ]
  },
  plugins: [
    [
      "@snowpack/plugin-babel",
      { }
    ],
    [
      "@snowpack/plugin-optimize", 
      { }
    ],
    [
      "snowpack-plugin-import-replacer", {
        modules: {

        },
        extensions: [".js"]
      }
    ]
  ],
}
