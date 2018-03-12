/**
 * Created by LiuTao on 2018/3/12.
 */
const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
export function shuffle (arr) {
  const _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandom(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
