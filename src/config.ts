const missingSetting = "Warning: no value set for this environment variable"

const config = {
    "PORT": process.env.PORT || missingSetting,
}; 

export default config; 
