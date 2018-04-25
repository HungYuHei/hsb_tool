function hsbToRgb(hue, saturation, brightness) {
  let h = Number.parseFloat(hue)
  let s = Number.parseFloat(saturation) / 100
  let v = Number.parseFloat(brightness) / 100

  let C = v * s;
  let hh = h / 60;
  let X = C * (1 - Math.abs(hh % 2 - 1));

  let rgb = null

  if (hh >= 0 && hh < 1) {
    rgb = [C, X, 0]
  } else if (hh >= 1 && hh < 2) {
    rgb = [X, C, 0]
  } else if (hh >= 2 && hh < 3) {
    rgb = [0, C, X]
  } else if (hh >= 3 && hh < 4) {
    rgb = [0, X, C]
  } else if (hh >= 4 && hh < 5) {
    rgb = [X, 0, C]
  } else {
    rgb = [C, 0, X]
  }

  m = v - C;
  return rgb.map(i => Math.trunc((i + m) * 255))
}

function rgbToHex(r, g, b) {
  let hex = (r * 65536 + g * 256 + b).toString(16, 6)
  return hex.length < 6 ? hex.padStart(6, "0") : hex
}

function showColors (h, s, b) {
  let results = document.getElementById('results')
  let colorHexList = []
  colorHexList.push(rgbToHex(...hsbToRgb(h, s, b)))
  colorHexList.push(rgbToHex(...hsbToRgb(h + 30, s, b)))
  colorHexList.push(rgbToHex(...hsbToRgb(h - 30, s, b)))
  colorHexList.push(rgbToHex(...hsbToRgb(Math.abs(h - 180) + 25, s, b)))
  colorHexList.push(rgbToHex(...hsbToRgb(Math.abs(h - 180) - 25, s, b)))

  Array.from(results.getElementsByClassName('color-item')).forEach(function(item) {
    let colorHex = colorHexList.shift()
    item.getElementsByClassName('color-block')[0].style.backgroundColor = '#' + colorHex
    item.getElementsByClassName('color-hex-value')[0].innerText = colorHex.toUpperCase()
  })
}
