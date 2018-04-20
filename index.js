function hsb2rgb(hue, saturation, brightness) {
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
