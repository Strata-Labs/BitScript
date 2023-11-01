## Stack Visualizer 
A instance of SV will be created on every "complile" of the latest inputed script.

Outside of the SV being able to control It's self it should expose 

## Externally accesible functions requried 

goToStep
- Allows the user to skip steps. (User clicks on `>>` moving the user two steps ahead or they click on `<<` going 2 steps back.
```ts
goToStep(step: number)
```

handlePause
- Allows the user to pause the SV at the current step
```ts
handlePause()
```

handlePlay
- Inverse of pause, allow user to resume the SV (turn back on autopaly)
```ts
handlePlay()
```


## Expected props passed to SV
