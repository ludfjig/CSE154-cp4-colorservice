# Color API Documentation
This API is used to get information about different colors.

## Get a json object containing all colors in this service.
**Request Format:** colors.php?color=all&mode=json

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns a JSON object containing all colors in this api.


**Example Request:** colors.php?color=all&mode=json

**Example Response:**


```json
{
  black: {
    name: "black",
    description: "Black is the darkest color, the result of the absence or complete absorption of visible light. It is an achromatic color, literally a color without hue, like white and gray. It is often used symbolically or figuratively to represent darkness, while white represents light. Black and white have often been used to describe opposites; particularly truth and ignorance, good and evil, the Dark Ages versus Age of Enlightenment. Since the Middle Ages, black has been the symbolic color of solemnity and authority, and for this reason is still commonly worn by judges and magistrates. ",
    RGB-values: [0, 0, 0]
  },
  blue: {
    name: "blue",
    description: "Blue is one of the three primary colours of pigments in painting and traditional colour theory, as well as in the RGB colour m odel. It lies between violet and green on the spectrum of visible light. The eye perceives blue when observing light with a dominant wavelength between approximately 450 and 495 nanometres. Most blues contain a slight mixture of other colours; azure contains some green, while ultramarine contains some violet. The clear daytime sky and the deep sea appear blue because ofan optical effect known as Rayleigh scattering. An optical effect called Tyndall scattering explains blue eyes. Distant objects appear more blue because of another optical effect called aerial perspective. ",
    RGB-values: [0, 0, 255]
  },
  gray: {
    name: "gray",
    description: "Grey (British English) or gray (American English; see spelling differences) is an intermediate color between black and white. It is a neutral color or achromatic color, meaning literally that it is a color \"without color,\" because it can be composed of black and white. It is the color of a cloud-covered sky, of ash and of lead. ",
    RGB-values: [128, 128, 128]
  }
}
```

**Error Handling:**
- If missing the `all`, it will 400 error with a helpful message: `The color {color} does not exist in my list of colors! Please pass a common color name or simply all.`
- If missing parameter `color` or `mode`, will 400 error with: `Please include both parameters color and mode in your query!`
- If `mode` is not json or text, will 400 error with: `Parameter mode must be either json or text!`

## Get a JSON object containing a specific color
**Request Format:** colors.php?color={name}&mode=json

**Request Type**: POST

**Returned Data Format**: JSON

**Description:** Returns a JSON object representing a single color.

**Example Request:** colors.php?color=red&mode=json

**Example Response:**
*Fill in example response in the ticks*

```json
{
  name: "red",
  description: "Red is the color at the end of the visible spectrum of light, next to orange and opposite violet. It has a dominant wavelength of approximately 625–740 nanometres. It is a primary color in the RGB color model and the CMYK color model, and is the complementary color of cyan. Reds range from the brilliant yellow-tinged scarlet and vermillion to bluish-red crimson, and vary in shade from the pale red pink to the dark red burgundy. The red sky at sunset results from Rayleigh scattering, while the red color of the Grand Canyon and other geological features is caused by hematite or red ochre, both forms of iron oxide. Iron oxide also gives the red color to the planet Mars. The red colour of blood comes from protein hemoglobin, while ripe strawberries, red apples and reddish autumn leaves are colored by anthocyanins. ",
  RGB-values: [255, 0, 0]
}
```

**Error Handling:**
- If passed in an invalid color name, it will 400 error with: `The color {color} does not exist in my list of colors! Please pass a common color name or simply all.`
- If missing parameter `color` or `mode`, will 400 error with: `Please include both parameters color and mode in your query!`
- If `mode` is not json or text, will 400 error with: `Parameter mode must be either json or text!`
