function hsbToRgb(hue, saturation, brightness) {
  let h = Number.parseFloat(hue)
  let s = Number.parseFloat(saturation) / 100
  let v = Number.parseFloat(brightness) / 100

  let _h = h % 6
  let f = h / 60 - _h
  let p = v * (1 - s)
  let q = v * (1 - f * s)
  let t = v * (1 - (1-f) * s)
  let rgb = null

  switch (_h) {
    case 0:
      rgb = [v, t, p]; break;
    case 1:
      rgb = [q, v, p]; break;
    case 2:
      rgb = [p, v, t]; break;
    case 3:
      rgb = [p, q, v]; break;
    case 4:
      rgb = [t, p, v]; break;
    case 5:
      rgb = [v, p, q]; break;
  }

  return rgb.map(i => Math.trunc(i * 255))
}

function rgbToHex(r, g, b) {
  return toHex(r) + toHex(g) + toHex(b)
}

function toHex(n) {
 n = Number.parseInt(n)
 if (isNaN(n)) return "00"
 n = Math.max(0, Math.min(n, 255))
 return "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16)
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
    item.getElementsByClassName('color-block')[0].style = "background-color: #" + colorHex
    item.getElementsByClassName('color-hex-value')[0].innerText = colorHex
  })
}
